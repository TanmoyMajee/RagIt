// import React from 'react';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "Forever",
      description: "Perfect for getting started with basic PDF analysis",
      features: [
        "Upload up to 5 PDFs",
        "100 questions per month",
        "Basic AI responses",
        "Email support",
        "Standard processing speed"
      ],
      buttonText: "Get Started Free",
      buttonClass: "bg-gray-700 hover:bg-gray-600 text-white border-gray-600",
      popular: false
    },
    {
      name: "Pro",
      price: "5",
      period: "per month",
      description: "Ideal for professionals and researchers",
      features: [
        "Unlimited PDF uploads",
        "Unlimited questions",
        "Advanced AI insights",
        "Priority support",
        "3x faster processing",
        "Export conversation history",
        "API access"
      ],
      buttonText: "Coming Soon",
      buttonClass: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
      popular: true,
      badge: "Most Popular"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 ${plan.popular
                  ? 'border-blue-500 shadow-2xl shadow-blue-500/20'
                  : 'border-gray-700 hover:border-gray-600'
                }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-300 mb-6">
                  {plan.description}
                </p>

                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${plan.popular ? 'bg-blue-600' : 'bg-gray-600'
                        }`}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${plan.buttonClass} ${plan.name === 'Pro' ? 'cursor-not-allowed opacity-75' : ''
                  }`}
                disabled={plan.name === 'Pro'}
              >
                {plan.buttonText}
                {plan.name === 'Pro' && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">
                    Soon
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        {/* <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How secure is my data?",
                answer: "Your PDFs are encrypted and processed securely. We never store your documents permanently and don't share data with third parties."
              },
              {
                question: "What file formats do you support?",
                answer: "Currently, we support PDF files up to 50MB. Support for other document formats is coming soon."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes, you can cancel your subscription at any time. Your data will remain accessible until the end of your billing period."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Trust indicators */}
       
      </div>
    </section>
  );
};

export default PricingSection;