import { Briefcase, Rocket, Users, Bell, Sparkles, Clock } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          
          {/* Header Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=500&fit=crop" 
                alt="Elite Jobs" 
                className="relative w-40 h-40 rounded-3xl object-cover border-4 border-white/30 shadow-2xl"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="w-10 h-10 text-blue-400" />
                <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Elite Jobs
                </h1>
                <Sparkles className="w-10 h-10 text-purple-400" />
              </div>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
                <Rocket className="w-5 h-5 text-yellow-400 animate-bounce" />
                <span className="text-xl md:text-2xl font-medium text-white">Under Construction</span>
              </div>
            </div>
          </div>

          {/* Main Message Card */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-10 md:p-14 border border-white/20 shadow-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Something Extraordinary is Coming
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed text-center max-w-3xl mx-auto">
              We're crafting the ultimate job platform that connects talent with opportunity. 
              Get ready for a revolutionary way to find your dream career.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="group bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105">
              <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all">
                <Users className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Top Talent</h3>
              <p className="text-gray-300">Connect with the best professionals in the industry</p>
            </div>

            <div className="group bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-xl rounded-2xl p-8 border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105">
              <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-all">
                <Briefcase className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Jobs</h3>
              <p className="text-gray-300">Access exclusive opportunities from leading companies</p>
            </div>

            <div className="group bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-xl rounded-2xl p-8 border border-pink-400/30 hover:border-pink-400/60 transition-all duration-300 hover:scale-105">
              <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-pink-500/30 transition-all">
                <Bell className="w-8 h-8 text-pink-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-300">Be first to know when we launch</p>
            </div>
          </div>

          {/* Countdown Section */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" style={{animationDuration: '3s'}} />
            <p className="text-2xl font-semibold text-white mb-2">Launching Soon</p>
            <p className="text-gray-300">Our team is working around the clock to bring you the best experience</p>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-400">
            <p className="text-sm">© 2025 Elite Jobs. Your future career starts here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;