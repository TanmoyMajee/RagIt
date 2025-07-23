// import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[500px] bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Chat with Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
              PDFs Instantly
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Upload any PDF document and get instant, AI-powered answers to your questions.
            No more scrolling through pages—just ask and get answers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="/chat"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            <span className="relative flex items-center gap-2">
              Try RagIT Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>

          <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-400 transition-all duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10V7a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Watch Demo
          </button>
        </div>

        {/* Preview mockup */}
        {/* <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-gray-300 text-sm">research-paper.pdf uploaded</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-gray-300 text-sm">
                "What are the main conclusions of this research?"
              </div>
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3 text-blue-300 text-sm">
                Based on the PDF, the main conclusions are: The study found that...
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;