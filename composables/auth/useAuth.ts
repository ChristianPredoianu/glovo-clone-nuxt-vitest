export function useAuth() {
  const {
    validateEmail,
    validatePassword,
    validateRepeatedPassword,
    emailError,
    passwordError: signInPasswordError,
    passwordError: signUpPasswordError,
    repeatedPasswordError,
  } = useAuthValidation();

  // Sign up function with validation
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
    signInPasswordError,
    signUpPasswordError,
    repeatedPasswordError,
    signUp,
  } as const;
}
