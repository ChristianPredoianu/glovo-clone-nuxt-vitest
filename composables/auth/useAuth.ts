import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User } from 'firebase/auth';

export function useAuth() {
  const authErrorMessage = ref('');
  const user = ref<User | null>(null); // Type the user as User or null

  const auth = getAuth();
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
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          authErrorMessage.value = error.message;
        });
    } else {
      console.log('Sign up failed');
    }
  }

  function signIn(email: string, password: string) {
    authErrorMessage.value = '';
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          router.push('/dashboard');
        })
        .catch((error) => {
          authErrorMessage.value = error.code;
          /*   authErrorMessage.value = error.message; */
        });
    } else {
      console.log('Sign in failed', emailError.value, passwordError.value);
    }
  }

  onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
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
    user,
    authErrorMessage,
  } as const;
}
