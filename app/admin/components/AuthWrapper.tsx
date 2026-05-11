"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaSignOutAlt, FaUser, FaChartLine } from 'react-icons/fa';
import Image from 'next/image';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminUser', username);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    router.push('/');
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#334155] border-t-[#0EA5E9] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaShieldAlt className="text-[#0EA5E9] text-xl animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-[#94A3B8] font-medium">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  // 2. Login Screen (Dark Mode)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
         

          {/* Login Card */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC] mb-2">Welcome Back</h2>
              <p className="text-[#94A3B8] text-sm">Enter your credentials to access the dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Admin Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-[#64748B] text-sm" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-[#334155] rounded-lg placeholder-[#64748B] text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-colors"
                    placeholder="Enter admin username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-[#64748B] text-sm" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-10 py-3 border border-[#334155] rounded-lg placeholder-[#64748B] text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-colors"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-[#64748B] hover:text-[#94A3B8] text-sm" />
                    ) : (
                      <FaEye className="text-[#64748B] hover:text-[#94A3B8] text-sm" />
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
                className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] text-white py-3 px-4 rounded-lg font-medium hover:from-[#0EA5E9]/90 hover:to-[#3B82F6]/90 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center justify-center">
                  <FaChartLine className="mr-2" />
                  Access Dashboard
                </span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#334155]">
              <div className="flex items-center justify-center text-xs text-[#64748B]">
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
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      {/* Admin Header */}
      <header className="bg-[#1E293B] border-b border-[#334155] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#0EA5E9] to-[#3B82F6] rounded-lg shadow-md">
                <Image src="/logo.png" alt="Logo" width={40} height={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#F8FAFC]">Admin Panel</h1>
                <p className="text-xs text-[#94A3B8]">FUTURE MIND EDUCARE</p>
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