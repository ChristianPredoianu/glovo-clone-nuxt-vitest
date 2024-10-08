export function useAuth() {
  const { validateEmail, validatePassword } = useAuthValidation();

  function signIn(email: string, password: string, e: Event) {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      console.log('ok');
    } else {
      console.log('not ok');
    }
  }

  function signUp(email: string, password: string, e: Event) {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      console.log('ok');
    } else {
      console.log('not ok');
    }
  }

  return { signIn, signUp } as const;
}
