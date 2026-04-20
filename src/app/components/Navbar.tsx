"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/Courses", label: "Courses", icon: "📚" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/certificate", label: "Certificates", icon: "🏆" },
];

type DemoUser = {
  name?: string;
  email?: string;
};

function readStoredUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  const savedUser = window.localStorage.getItem("elearn-user");
  if (!savedUser) return null;
  try {
    return JSON.parse(savedUser) as DemoUser;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<DemoUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const syncUser = () => setUser(readStoredUser());
    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("elearn-auth-changed", syncUser as EventListener);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener(
        "elearn-auth-changed",
        syncUser as EventListener,
      );
    };
  }, []);

  const firstName = user?.name?.split(" ")[0] || "Student";
  const isSignedIn = Boolean(user?.name || user?.email);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname?.startsWith(href);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("elearn-user");
    window.localStorage.removeItem("elearn-token");
    setUser(null);
    window.dispatchEvent(new Event("elearn-auth-changed"));
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-lg text-white shadow-md">
              🎓
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold tracking-tight text-foreground">
                E-Learn
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Professional Academy
              </p>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden items-center gap-1 rounded-full border border-border bg-muted p-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 md:flex">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-[10px] text-white flex items-center justify-center font-bold">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Hi, {firstName}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary sm:block"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hidden rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted sm:block"
                >
                  Register
                </Link>
                <Link
                  href="/Courses"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm active:scale-95"
                >
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
