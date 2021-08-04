export default function ({ $auth, redirect, route }) {
  const user = $auth.user;
  if (!user || user.role !== 'admin') {
    redirect('/');
  }
}
