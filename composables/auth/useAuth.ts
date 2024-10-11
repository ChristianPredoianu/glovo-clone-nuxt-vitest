export function useAuth() {
  const {
    validateEmail,
    validatePassword,
    validateRepeatedPassword,
    emailError,

    repeatedPasswordError,
  } = useAuthValidation();

  function signUp(email: string, password: string, repeatedPassword: string) {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isRepeatedPasswordValid = validateRepeatedPassword(password, repeatedPassword);

    if (isEmailValid && isPasswordValid && isRepeatedPasswordValid) {
      console.log('Sign up successful');
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
