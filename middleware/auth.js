export default function ({ $auth, redirect, route }) {
  const user = $auth.user;
  if (!user) {
    redirect('/auth/login?nextlink=' + route.fullPath);
  }
}
