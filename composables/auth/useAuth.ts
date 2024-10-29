import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User, Auth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app'; // Import the FirebaseError type

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

  async function signIn(email: string, password: string): Promise<void> {
    authErrorMessage.value = '';

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      try {
        const userCredential = await signInWithEmailAndPassword($auth, email, password);
        const user = userCredential.user;
        console.log(user);
        await router.push('/dashboard');
      } catch (error: unknown) {
        // Specify that error is of type unknown
        if (error instanceof FirebaseError) {
          authErrorMessage.value = error.message; // Handle Firebase error
        } else {
          authErrorMessage.value = 'An unexpected error occurred'; // Generic error message
        }
        throw error; // Propagate the error to the caller
      }
    } else {
      console.log('Sign in failed', emailError.value, passwordError.value);
      throw new Error('Invalid email or password'); // Return a rejected Promise
    }
  }

  function signUserOut() {
    authErrorMessage.value = '';
    signOut($auth)
      .then(() => {
        console.log('User signed out successfully.');
        user.value = null;
        router.push('/');
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
