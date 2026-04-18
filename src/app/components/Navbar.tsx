"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/Courses", label: "Courses", icon: "📚" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/certificate", label: "Certificates", icon: "🎖️" },
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
      window.removeEventListener("elearn-auth-changed", syncUser as EventListener);
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
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 backdrop-blur-xl shadow-sm dark:shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 dark:from-indigo-500 dark:to-cyan-500 text-lg text-white shadow-lg dark:shadow-indigo-500/50 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              🎓
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">E-Learn</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Professional Academy</p>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden items-center gap-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-1 lg:flex backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(link.href) 
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md dark:shadow-lg" 
                    : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <span className="text-base">{link.icon}</span>
                <span className="hidden xl:inline">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="flex lg:hidden items-center gap-2 rounded-lg p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ModeToggle />

            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-indigo-100 to-cyan-100 dark:from-indigo-900/40 dark:to-cyan-900/40 px-3 py-2 lg:flex border border-indigo-200 dark:border-indigo-800/40">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-600 dark:from-indigo-500 dark:to-cyan-500 text-[11px] text-white flex items-center justify-center font-bold">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Hi, {firstName}</span>
                </div>
                <button onClick={handleSignOut} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="hidden px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors sm:block">
                  Login
                </Link>
                <Link href="/register" className="hidden rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors sm:block">
                  Register
                </Link>
                <Link href="/Courses" className="rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-600 dark:to-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:from-indigo-700 hover:to-indigo-800 dark:hover:from-indigo-700 dark:hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mt-3 space-y-1 border-t border-slate-200 dark:border-slate-800 pt-3 lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  isActive(link.href) 
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}