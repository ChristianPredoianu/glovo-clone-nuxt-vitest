import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export function useAuth() {
  const {
    validateEmail,
    validatePassword,
    validateRepeatedPassword,
    emailError,

    repeatedPasswordError,
  } = useAuthValidation();

  const auth = getAuth();

  function signUp(email: string, password: string, repeatedPassword: string) {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isRepeatedPasswordValid = validateRepeatedPassword(password, repeatedPassword);

    if (isEmailValid && isPasswordValid && isRepeatedPasswordValid) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      console.log('Sign up failed', repeatedPasswordError.value);
    }
  }

  function signIn(email: string, password: string) {}

  return {
    emailError,
    repeatedPasswordError,
    signUp,
  } as const;
}
