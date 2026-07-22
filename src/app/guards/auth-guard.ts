import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userId = sessionStorage.getItem("userId");
  const userEmail = sessionStorage.getItem("email");
  const userRole = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  const isAdminRoute = state.url.startsWith("/admin");

  // 🔹 First, make sure user is logged in
  if (!token || !userEmail || userEmail.trim() === "") {
    router.navigate(['/access']);
    return false;
  }

  // 🔹 For NON-ADMIN ROUTES → userId REQUIRED
  if (!isAdminRoute) {
    if (!userId || userId.trim() === "") {
      router.navigate(['/access']);
      return false;
    }
    return true; // normal pages ok
  }

  // 🔹 For ADMIN ROUTES → check role
  const isAdmin = userRole === "admin";

  if (!isAdmin) {
    router.navigate(['/home']); // normal user → block admin
    return false;
  }

  return true; // admin allowed
};
