const KEY = "ze_user";

export function getUser() {
  try { return JSON.parse(localStorage.getItem(KEY)); }
  catch { return null; }
}

export function signIn(email, name) {
  const user = { id: "local", email, user_metadata: { name: name || email.split("@")[0] } };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function signOut() {
  localStorage.removeItem(KEY);
}
