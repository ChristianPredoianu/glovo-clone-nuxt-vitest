export function useAuthValidation() {
  const emailError = ref<string | null>(null);
  const passwordError = ref<string | null>(null);
  const formError = ref<string | null>(null);

  function validateEmail(email: string) {
    if (!email) {
      emailError.value = 'Email is required';
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.value = 'Please enter a valid email';
      return false;
    }
    emailError.value = null;
    return true;
  }

  function validatePassword(password: string) {
    if (!password) {
      passwordError.value = 'Password is required';
      return false;
    }
    if (password.length < 6) {
      passwordError.value = 'Password must be at least 6 characters long';
      return false;
    }
    passwordError.value = null;
    return true;
  }

  return { emailError, passwordError, validateEmail, validatePassword } as const;
}
