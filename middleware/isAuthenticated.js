export default function ({ store, redirect, route }) {
  const protectedRoutes = "dashboard";

  if (store.state.auth.loggedIn) {
    const path = route.name;
    let redirectAdmin = false;
    if (
      path.includes(protectedRoutes) &&
      store.state.auth.user.status == "Admin"
    ) {
      redirectAdmin = true;
    }
    if (redirectAdmin) {
      return redirect("/admin");
    }

    if (path.includes("admin") && store.state.auth.user.status == "User") {
      return redirect("/dashboard");
    }

    if (
      path == "signup" ||
      (path == "login" && store.state.auth.user.status == "User")
    ) {
      return redirect("/dashboard");
    }
  }

  if (!store.state.auth.loggedIn) {
    const path = route.name;
    if (path.includes("admin")) {
      return redirect("/");
    }

    if (path.includes(protectedRoutes)) {
      return redirect("/");
    }
  }
}
