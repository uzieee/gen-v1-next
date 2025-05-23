import React from 'react';

export default function StylePreview() {
  return (
    <div className="min-h-screen bg-background text-main">
      {/* Hero Section with Primary Brand Color Background */}
      <section className="bg-primary px-6 py-20 text-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-syne text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Design System
          </h1>
          <p className="font-inter text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Showcasing custom fonts, colors, and components built with Tailwind CSS
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-background text-primary hover:bg-main-600 px-8 py-4 rounded-lg font-chivo font-semibold text-lg transition-all duration-200 transform hover:scale-105">
              Primary Action
            </button>
            <button className="border-2 border-background text-background hover:bg-background hover:text-primary px-8 py-4 rounded-lg font-chivo font-semibold text-lg transition-all duration-200">
              Secondary Action
            </button>
          </div>
        </div>
      </section>

      {/* Typography Showcase */}
      <section className="bg-main px-6 py-16 text-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-center mb-12">
            Typography Scale
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Syne Font Display */}
            <div className="space-y-6">
              <h3 className="font-chivo text-primary text-lg font-bold uppercase tracking-wider">
                Syne - Display Font
              </h3>
              <div className="space-y-4">
                <h4 className="font-syne text-4xl font-bold">Large Heading</h4>
                <h5 className="font-syne text-3xl font-semibold">Medium Heading</h5>
                <h6 className="font-syne text-2xl font-medium">Small Heading</h6>
                <p className="font-syne text-lg">Display text for impact</p>
              </div>
            </div>

            {/* Inter Font Display */}
            <div className="space-y-6">
              <h3 className="font-chivo text-primary text-lg font-bold uppercase tracking-wider">
                Inter - Body Font
              </h3>
              <div className="space-y-4">
                <p className="font-inter text-lg leading-relaxed">
                  Inter provides excellent readability for body text and user interface elements.
                </p>
                <p className="font-inter text-base text-secondary-600">
                  Perfect for paragraphs, descriptions, and content that needs to be easily readable.
                </p>
                <p className="font-inter text-sm text-secondary-800">
                  Small text for captions and metadata information.
                </p>
              </div>
            </div>

            {/* Chivo Font Display */}
            <div className="space-y-6">
              <h3 className="font-chivo text-primary text-lg font-bold uppercase tracking-wider">
                Chivo - UI Font
              </h3>
              <div className="space-y-4">
                <p className="font-chivo text-lg font-semibold">
                  Button Labels
                </p>
                <p className="font-chivo text-base font-medium">
                  Navigation Items
                </p>
                <p className="font-chivo text-sm font-bold uppercase tracking-wide">
                  Form Labels
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="bg-background-100 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-center mb-12 text-main">
            Color System
          </h2>
          
          {/* Primary Colors */}
          <div className="mb-12">
            <h3 className="font-chivo text-primary text-xl font-bold mb-6 uppercase tracking-wider">
              Primary Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-primary shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Primary</p>
                <p className="font-inter text-xs text-secondary-600">#D1E50C</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-primary-200 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Primary 200</p>
                <p className="font-inter text-xs text-secondary-600">#9DAC09</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-primary-300 shadow-lg"></div>
                <p className="font-inter text-sm text-background font-medium">Primary 300</p>
                <p className="font-inter text-xs text-secondary-600">#F3F9C2</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-primary-400 shadow-lg"></div>
                <p className="font-inter text-sm text-background font-medium">Primary 400</p>
                <p className="font-inter text-xs text-secondary-600">#DDEC49</p>
              </div>
            </div>
          </div>
          
          {/* Main Colors */}
          <div className="mb-12">
            <h3 className="font-chivo text-main text-xl font-bold mb-6 uppercase tracking-wider">
              Main Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-main shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Main</p>
                <p className="font-inter text-xs text-secondary-600">#D1E50C</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-main-300 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Main 300</p>
                <p className="font-inter text-xs text-secondary-600">#FDFEF3</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-main-400 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Main 400</p>
                <p className="font-inter text-xs text-secondary-600">#F2F4F3</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-main-500 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Main 500</p>
                <p className="font-inter text-xs text-secondary-600">#F5F5F7</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-main-600 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Main 600</p>
                <p className="font-inter text-xs text-secondary-600">#F4F4F6</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-main-700 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Main 700</p>
                <p className="font-inter text-xs text-secondary-600">#FDFEF3</p>
              </div>
            </div>
          </div>
         
          {/* Secondary Colors */}
          <div className="mb-12">
            <h3 className="font-chivo text-secondary text-xl font-bold mb-6 uppercase tracking-wider">
              Secondary Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-secondary shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Secondary</p>
                <p className="font-inter text-xs text-secondary-600">#B6B6C0</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-secondary-400 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Secondary 400</p>
                <p className="font-inter text-xs text-secondary-600">#E9E9EA</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-secondary-500 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Secondary 500</p>
                <p className="font-inter text-xs text-secondary-600">#D9D9D9</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-secondary-600 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Secondary 600</p>
                <p className="font-inter text-xs text-secondary-600">#6C6D80</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-secondary-800 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Secondary 800</p>
                <p className="font-inter text-xs text-secondary-600">#959595</p>
              </div>
            </div>
          </div>

          {/* Background Colors */}
          <div className="mb-12 bg-main p-4 rounded-md">
            <h3 className="font-chivo text-background text-xl font-bold mb-6 uppercase tracking-wider">
              Background Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-background shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Background</p>
                <p className="font-inter text-xs text-secondary-600">#131313</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-background-100 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Background 100</p>
                <p className="font-inter text-xs text-secondary-600">#201F20</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-background-500 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Background 500</p>
                <p className="font-inter text-xs text-secondary-600">#141B34</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-background-600 shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Background 600</p>
                <p className="font-inter text-xs text-secondary-600">#19191F</p>
              </div>
            </div>
          </div>

          {/* Status Colors */}
          <div className="mb-12">
            <h3 className="font-chivo text-error text-xl font-bold mb-6 uppercase tracking-wider">
              Status Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-error shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Error</p>
                <p className="font-inter text-xs text-secondary-600">#FF4051</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-xl mb-3 bg-badge-red shadow-lg"></div>
                <p className="font-inter text-sm text-main font-medium">Badge Red</p>
                <p className="font-inter text-xs text-secondary-600">#BC2200</p>
              </div>
            </div>
          </div>

          {/* Card Colors */}
          <div className="mb-12 bg-main p-4 rounded-md">
            <h3 className="font-chivo text-background text-xl font-bold mb-6 uppercase tracking-wider">
              Card Colors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card-primary rounded-2xl p-6 shadow-lg">
                <h4 className="font-syne text-2xl font-bold text-background mb-3">Primary Card</h4>
                <p className="font-inter text-background-100">Green theme card for primary content</p>
              </div>
              <div className="bg-card-blue rounded-2xl p-6 shadow-lg">
                <h4 className="font-syne text-2xl font-bold text-main mb-3">Blue Card</h4>
                <p className="font-inter text-background">Blue theme card for secondary content</p>
              </div>
              <div className="bg-card-purple rounded-2xl p-6 shadow-lg">
                <h4 className="font-syne text-2xl font-bold text-main mb-3">Purple Card</h4>
                <p className="font-inter text-background">Purple theme card for accent content</p>
              </div>

              <div className="bg-gradient-to-b from-card-primary-50 to-card-primary rounded-2xl p-6 shadow-lg">
                <h4 className="font-syne text-2xl font-bold text-background mb-3">Primary Card</h4>
                <p className="font-inter text-background-100">Green theme card for primary content</p>
              </div>
              <div className="bg-gradient-to-b from-card-blue-50 to-card-blue rounded-2xl p-6 shadow-lg">
                <h4 className="font-syne text-2xl font-bold text-background mb-3">Blue Card</h4>
                <p className="font-inter text-background">Blue theme card for secondary content</p>
              </div>
              <div className="bg-gradient-to-b from-card-purple-50 to-card-purple rounded-2xl p-6 shadow-lg">
                <h4 className="font-syne text-2xl font-bold text-background mb-3">Purple Card</h4>
                <p className="font-inter text-background">Purple theme card for accent content</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button Components Section */}
      <section className="bg-main px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-center mb-12 text-background">
            Button Components
          </h2>
          
          <div className="space-y-8">
            {/* Primary Buttons */}
            <div>
              <h3 className="font-chivo text-background text-lg font-bold mb-6 uppercase tracking-wider">
                Primary Buttons
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary hover:bg-primary-200 text-background px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Primary Button
                </button>
                <button className="bg-primary-400 hover:bg-primary text-background px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Primary Variant
                </button>
                <button className="border-2 border-primary text-primary hover:bg-primary hover:text-background px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200">
                  Primary Outline
                </button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <h3 className="font-chivo text-background text-lg font-bold mb-6 uppercase tracking-wider">
                Secondary Buttons
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-secondary hover:bg-secondary-600 text-background px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Secondary Button
                </button>
                <button className="bg-secondary-400 hover:bg-secondary text-background px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Secondary Variant
                </button>
                <button className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-background px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200">
                  Secondary Outline
                </button>
              </div>
            </div>

            {/* Error Button */}
            <div>
              <h3 className="font-chivo text-background text-lg font-bold mb-6 uppercase tracking-wider">
                Status Buttons
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-error hover:opacity-90 text-main px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Error Button
                </button>
                <button className="bg-badge-red hover:opacity-90 text-main px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Badge Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Sections Demo */}
      <section className="bg-background-500 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-syne text-4xl md:text-5xl font-bold mb-6 text-main">
            Brand Background
          </h2>
          <p className="font-inter text-xl text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            This section demonstrates the use of brand background colors with proper contrast and typography hierarchy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background p-8 rounded-2xl shadow-xl">
              <h3 className="font-syne text-2xl font-bold text-primary mb-4">Dark Theme</h3>
              <p className="font-inter text-main-400 mb-6">
                Using the default background color with proper text contrast.
              </p>
              <button className="bg-primary hover:bg-primary-400 text-background px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200">
                Call to Action
              </button>
            </div>
            <div className="bg-background-600 p-8 rounded-2xl shadow-xl">
              <h3 className="font-syne text-2xl font-bold text-primary mb-4">Variant Background</h3>
              <p className="font-inter text-main-500 mb-6">
                Using background-600 for subtle variations in dark sections.
              </p>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-background px-6 py-3 rounded-lg font-chivo font-semibold transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements Demo */}
      <section className="bg-main-300 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-center mb-12 text-background">
            Form Elements
          </h2>
          
          <div className="bg-main p-8 rounded-2xl shadow-xl">
            <form className="space-y-6">
              <div>
                <label className="block font-chivo text-sm font-bold text-background mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-secondary-400 rounded-lg font-inter focus:border-primary focus:outline-none transition-colors bg-main-500 text-background"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block font-chivo text-sm font-bold text-background mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-secondary-400 rounded-lg font-inter focus:border-primary focus:outline-none transition-colors bg-main-500 text-background"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block font-chivo text-sm font-bold text-background mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-secondary-400 rounded-lg font-inter focus:border-primary focus:outline-none transition-colors resize-none bg-main-500 text-background"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button className="w-full bg-primary hover:bg-primary-400 text-background px-6 py-4 rounded-lg font-chivo font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-syne text-2xl font-bold text-primary mb-4">
            Design System Complete
          </h3>
          <p className="font-inter text-secondary max-w-2xl mx-auto leading-relaxed">
            Your Tailwind CSS configuration is now fully integrated with custom fonts (Syne, Inter, Chivo) 
            and your brand color palette. Ready for production use!
          </p>
        </div>
      </footer>
    </div>
  );
}