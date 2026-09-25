"use client";

import { useCallback, useSyncExternalStore } from "react";

const AUTH_KEY = "adminAuth";
const USER_KEY = "adminUser";
const CHANGE_EVENT = "admin-auth-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function emitChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Reads/writes the admin session from localStorage as a real external store,
 * so no state has to be synchronised through an effect.
 */
export function useAdminAuth() {
  const isAuthenticated = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(AUTH_KEY) === "true",
    () => false
  );

  const username = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(USER_KEY),
    () => null
  );

  const login = useCallback((user?: string) => {
    localStorage.setItem(AUTH_KEY, "true");
    if (user) localStorage.setItem(USER_KEY, user);
    emitChange();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    emitChange();
  }, []);

  return { isAuthenticated, username, login, logout };
}
