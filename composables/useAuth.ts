export function useAuth() {
  function signIn(email: string, password: string, e: Event) {
    e.preventDefault();

    console.log(email, password);
  }

  return { signIn } as const;
}
