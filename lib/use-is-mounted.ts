"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * `false` while server-rendering / hydrating, `true` once mounted on the client.
 * Used to defer browser-only UI without a mount flag + effect.
 */
export function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
