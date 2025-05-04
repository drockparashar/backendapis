import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import { ToastProvider } from '@/components/ToastProvider';

export const metadata = {
  title: 'Plant Growth Tracker',
  description: 'Track and manage your virtual plant collection',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen relative">
        {/* Background gradient and pattern that persists across all pages */}
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 opacity-90 z-0"></div>
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjxwYXRoIGQ9Ik0wIDRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat opacity-40 z-0"></div>
        
        {/* Animated floating elements */}
        <div className="fixed top-1/4 left-10 w-20 h-20 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="fixed bottom-1/4 right-10 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="fixed top-1/3 right-1/3 w-16 h-16 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        
        <ToastProvider>
          {/* Glassmorphic navigation */}
          <nav className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg text-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold flex items-center">
                  <span className="mr-2">🌱</span>
                  Plant Growth Tracker
                </Link>
                <div className="space-x-6">
                  <Link href="/plants" className="hover:text-white/80 transition-colors font-medium">
                    My Garden
                  </Link>
                  <Link 
                    href="/plants/new" 
                    className="bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/40 rounded-full px-4 py-2 font-medium"
                  >
                    Plant New Seed
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Main content area */}
          <main className="relative z-10 container mx-auto px-4 py-8 min-h-[calc(100vh-8rem)]">
            {children}
          </main>
          
          {/* Footer with glassmorphic effect */}
          <footer className="relative z-10 bg-white/10 backdrop-blur-md border-t border-white/20 mt-auto">
            <div className="container mx-auto px-4 py-4 text-center text-white/80 text-sm">
              &copy; {new Date().getFullYear()} Plant Growth Tracker • Nurture your digital garden
            </div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  );
}