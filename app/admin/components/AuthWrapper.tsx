"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaSignOutAlt, FaUser, FaChartLine } from 'react-icons/fa';
import Image from 'next/image';
import { useAdminAuth } from '@/lib/use-admin-auth';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { isAuthenticated, login, logout } = useAdminAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      login(username);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // 2. Login Screen (Dark Mode)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
         

          {/* Login Card */}
          <div className="bg-brand-900 border border-brand-900 rounded-2xl p-8 shadow-2xl">
            <div className="mb-6 flex items-center flex-col">
              <h2 className="text-xl font-semibold text-ink-on-brand mb-2">Welcome Back</h2>
              <p className="text-ink-subtle text-sm">Enter your credentials to access the dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-ink-subtle mb-2">
                  Admin Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-ink-muted text-sm" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-brand-900 rounded-lg placeholder-ink-muted text-ink-on-brand focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                    placeholder="Enter admin username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-ink-subtle mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-ink-muted text-sm" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-10 py-3 border border-brand-900 rounded-lg placeholder-ink-muted text-ink-on-brand focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-ink-muted hover:text-ink-subtle text-sm" />
                    ) : (
                      <FaEye className="text-ink-muted hover:text-ink-subtle text-sm" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                  <FaLock className="text-red-500 mr-2 text-sm" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-accent-600 to-brand-700 text-white py-3 px-4 rounded-lg font-medium hover:from-accent-600/90 hover:to-brand-700/90 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center justify-center">
                  <FaChartLine className="mr-2" />
                  Access Dashboard
                </span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-brand-900">
              <div className="flex items-center justify-center text-xs text-ink-muted">
                <FaShieldAlt className="mr-1" />
                Secure Admin Access
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Layout
  return (
    <div className="min-h-screen bg-brand-950 text-ink-on-brand">
      {/* Admin Header */}
      <header className="bg-brand-900 border-b border-brand-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-accent-600 to-brand-700 rounded-lg shadow-md">
                <Image src="/logo.png" alt="Logo" width={40} height={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-ink-on-brand">Admin Panel</h1>
                <p className="text-xs text-ink-subtle">FUTURE MIND EDUCARE</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors group"
            >
              <FaSignOutAlt className="group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}