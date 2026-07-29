"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName?: string;
  role: "customer" | "wholesale" | "admin";
  approved: boolean;
  ein?: string;
  createdAt: string;
};

export type WholesaleApplication = {
  id: string;
  businessName: string;
  ein: string;
  businessType: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
};

const USER_KEY = "mocha-wholesale-user";
const USERS_KEY = "mocha-wholesale-users";
const APPS_KEY = "mocha-wholesale-applications";

type StoredUsers = Record<string, { password: string; user: User }>;

function readUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}
function readApps(): WholesaleApplication[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(APPS_KEY);
    return raw ? (JSON.parse(raw) as WholesaleApplication[]) : [];
  } catch {
    return [];
  }
}

type Listener = () => void;

function createStore<T>(read: () => T, initial: T) {
  let value = read();
  const listeners = new Set<Listener>();
  const subscribe = (l: Listener) => {
    listeners.add(l);
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }
    return () => {
      listeners.delete(l);
      if (typeof window !== "undefined" && listeners.size === 0) {
        window.removeEventListener("storage", onStorage);
      }
    };
  };
  function onStorage() {
    value = read();
    listeners.forEach((l) => l());
  }
  const getSnapshot = () => value;
  const serverSnapshot = initial;
  const getServerSnapshot = () => serverSnapshot;
  function set(next: T) {
    value = next;
    listeners.forEach((l) => l());
  }
  return { subscribe, getSnapshot, getServerSnapshot, set };
}

const userStore = createStore<User | null>(readUser, null);
const appsStore = createStore<WholesaleApplication[]>(readApps, []);

function writeUser(user: User | null) {
  userStore.set(user);
  if (typeof window !== "undefined") {
    try {
      if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      else window.localStorage.removeItem(USER_KEY);
    } catch {
      /* noop */
    }
  }
}
function writeApps(apps: WholesaleApplication[]) {
  appsStore.set(apps);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(APPS_KEY, JSON.stringify(apps));
    } catch {
      /* noop */
    }
  }
}
function loadUsers(): StoredUsers {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUsers) : {};
  } catch {
    return {};
  }
}
function saveUsers(users: StoredUsers) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* noop */
  }
}

type AuthContextValue = {
  user: User | null;
  setUser: (u: User | null) => void;
  signUp: (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<User>;
  signIn: (input: { email: string; password: string }) => Promise<User>;
  signOut: () => void;
  submitWholesaleApplication: (
    input: Omit<WholesaleApplication, "id" | "status" | "submittedAt">
  ) => Promise<WholesaleApplication>;
  applications: WholesaleApplication[];
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
    userStore.getServerSnapshot
  );
  const applications = useSyncExternalStore(
    appsStore.subscribe,
    appsStore.getSnapshot,
    appsStore.getServerSnapshot
  );

  const setUser = useCallback((u: User | null) => writeUser(u), []);

  const signUp: AuthContextValue["signUp"] = useCallback(async (input) => {
    const users = loadUsers();
    if (users[input.email.toLowerCase()]) {
      throw new Error("An account with that email already exists.");
    }
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      role: "customer",
      approved: false,
      createdAt: new Date().toISOString(),
    };
    users[input.email.toLowerCase()] = {
      password: input.password,
      user: newUser,
    };
    saveUsers(users);
    writeUser(newUser);
    return newUser;
  }, []);

  const signIn: AuthContextValue["signIn"] = useCallback(async (input) => {
    const users = loadUsers();
    const record = users[input.email.toLowerCase()];
    if (!record || record.password !== input.password) {
      throw new Error("Invalid email or password.");
    }
    writeUser(record.user);
    return record.user;
  }, []);

  const signOut = useCallback(() => writeUser(null), []);

  const submitWholesaleApplication: AuthContextValue["submitWholesaleApplication"] =
    useCallback(async (input) => {
      const app: WholesaleApplication = {
        id: `app_${Date.now()}`,
        ...input,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };
      writeApps([app, ...applications]);
      const users = loadUsers();
      const record = users[input.email.toLowerCase()];
      if (record) {
        record.user = {
          ...record.user,
          role: "wholesale",
          approved: false,
          ein: input.ein,
          businessName: input.businessName,
        };
        users[input.email.toLowerCase()] = record;
        saveUsers(users);
        writeUser(record.user);
      }
      return app;
    }, [applications]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      setUser,
      signUp,
      signIn,
      signOut,
      submitWholesaleApplication,
      applications,
    }),
    [
      user,
      setUser,
      signUp,
      signIn,
      signOut,
      submitWholesaleApplication,
      applications,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
