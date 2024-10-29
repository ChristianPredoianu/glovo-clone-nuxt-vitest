import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User, Auth } from 'firebase/auth';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

declare module '#app' {
  interface NuxtApp {
    $auth: Auth;
  }
}

export function useAuth() {
  const { $auth } = useNuxtApp(); // Use the injected $auth instance

  const authErrorMessage = ref('');
  const user = ref<User | null>(null);
  const router = useRouter();

  const {
    validateEmail,
    validatePassword,
    validateRepeatedPassword,
    emailError,
    passwordError,
    repeatedPasswordError,
  } = useAuthValidation();

  function signUp(email: string, password: string, repeatedPassword: string) {
    authErrorMessage.value = '';
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isRepeatedPasswordValid = validateRepeatedPassword(password, repeatedPassword);

    if (isEmailValid && isPasswordValid && isRepeatedPasswordValid) {
      createUserWithEmailAndPassword($auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          authErrorMessage.value = error.message;
        });
    } else {
      console.log('Sign up failed');
    }
  }

  function signIn(email: string, password: string): Promise<void> {
    authErrorMessage.value = '';
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      return signInWithEmailAndPassword($auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          router.push('/dashboard');
        })
        .catch((error) => {
          authErrorMessage.value = error.message; // Keep this for user feedback
          throw error; // Propagate the error to the caller
        });
    } else {
      console.log('Sign in failed', emailError.value, passwordError.value);
      return Promise.reject(new Error('Invalid email or password')); // Return a rejected Promise
    }
  }

  function signUserOut() {
    authErrorMessage.value = '';
    signOut($auth)
      .then(() => {
        console.log('User signed out successfully.');
        user.value = null; // Clear the user state
        router.push('/'); // Redirect to home or sign-in page
      })
      .catch((error) => {
        authErrorMessage.value = error.message;
      });
  }

  onMounted(() => {
    onAuthStateChanged($auth, (currentUser) => {
      if (currentUser) {
        user.value = currentUser;
        console.log('User is signed in:', user.value);
      } else {
        user.value = null;
        console.log('No user is signed in.');
      }
    });
  });

  return {
    emailError,
    repeatedPasswordError,
    signIn,
    signUp,
    signUserOut,
    user,
    authErrorMessage,
  } as const;
}
