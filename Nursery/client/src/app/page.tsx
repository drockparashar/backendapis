import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjxwYXRoIGQ9Ik0wIDRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat opacity-40 z-0"></div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
        {/* Main content area */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
            Plant Growth Tracker
          </h1>
          <p className="text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Nurture virtual plants from seed to harvest in your own digital garden paradise
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
            <Link
              href="/plants"
              className="transform transition-all duration-300 hover:scale-105 bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 rounded-full px-8 py-4 text-xl font-medium hover:bg-white/30 hover:border-white/60 shadow-lg"
            >
              View Your Garden
            </Link>
            <Link
              href="/plants/new"
              className="transform transition-all duration-300 hover:scale-105 bg-white text-indigo-600 rounded-full px-8 py-4 text-xl font-medium hover:bg-white/90 hover:text-indigo-700 shadow-lg"
            >
              Plant New Seed
            </Link>
          </div>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-12">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-green-400 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
              🌱
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Grow Plants</h3>
            <p className="text-white/80">
              Watch your seeds evolve through six unique growth stages, from seedling to maturity.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-blue-400 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
              💧
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Care & Nurture</h3>
            <p className="text-white/80">
              Water and fertilize your plants to keep them healthy and thriving in your virtual garden.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
              🌾
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Harvest Rewards</h3>
            <p className="text-white/80">
              Reap the rewards of your dedication when plants reach full maturity and are ready to harvest.
            </p>
          </div>
        </div>
        
        {/* Getting started section */}
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl border border-white/40 max-w-3xl mx-auto shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Start Your Digital Garden Journey</h2>
          <p className="text-white/90 mb-6">
            Begin by planting your first seed. Choose from various plant species, each with unique growth patterns and care requirements. Water regularly, add fertilizer when needed, and watch your garden flourish!
          </p>
          <Link
            href="/plants/new"
            className="inline-block bg-white/90 text-indigo-600 hover:bg-white hover:text-indigo-700 rounded-lg px-6 py-3 font-medium shadow-md transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </div>
      
      {/* Animated floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
    </div>
  );
}