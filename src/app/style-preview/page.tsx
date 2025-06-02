'use client'
import CustomButton from '@/components/atoms/CustomButton';
import IconButton from '@/components/atoms/IconButton';
import InputSpinner from '@/components/molecules/InputSpinner';
import PINInput from '@/components/atoms/PinInput';
import TextField from '@/components/molecules/TextField';
import { ChevronUp, LocateFixed, Mail, MapPin, Search, X } from 'lucide-react';
import React, { useState } from 'react';

export default function StylePreview() {
  const [spinnerValue, setSpinnerValue] = useState(1);
  const [, setPinValue] = useState('');

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
          
          <div className="space-y-12">
            {/* Main Buttons */}
            <div>
              <h3 className="font-chivo text-background text-lg font-bold mb-6 uppercase tracking-wider">
                Main Buttons
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-background/80 text-sm font-medium">Active States</h4>
                  <CustomButton size='lg' showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton size='sm' showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton variant="outline" size='lg' showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton variant="outline" showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton variant="outline" size='sm' showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                </div>
                <div className="space-y-4">
                  <h4 className="text-background/80 text-sm font-medium">Inactive States</h4>
                  <CustomButton state="disabled" size='lg' showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton state="disabled" showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton state="disabled" size='sm' showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton variant="outline" state="disabled" size='lg' showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton variant="outline" state="disabled" showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                  <CustomButton variant="outline" state="disabled" size='sm' showLeftArrow showRightArrow>
                    Continue
                  </CustomButton>
                </div>
              </div>
            </div>

            {/* Icon Buttons */}
            <div className='bg-background px-4 py-6 rounded-lg shadow-lg'>
              <h3 className="font-chivo text-main text-lg font-bold mb-6 uppercase tracking-wider">
                Icon Buttons
              </h3>
              <div className="flex gap-4">
                <IconButton 
                  size="lg"
                  icon={<LocateFixed className='!w-6 !h-6'/>}
                />
                <IconButton 
                  size="md"
                  icon={<LocateFixed className='!w-6 !h-6'/>}
                />
                <IconButton 
                  size="sm"
                  icon={<LocateFixed className='!w-6 !h-6'/>}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <h3 className="font-chivo text-background text-lg font-bold mb-6 uppercase tracking-wider">
                Action Buttons
              </h3>
              <div className="flex gap-4">
                <CustomButton variant="outline-main" className='bg-background'>
                  Cancel
                </CustomButton>
                <CustomButton>
                  Continue
                </CustomButton>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div>
              <h3 className="font-chivo text-background text-lg font-bold mb-6 uppercase tracking-wider">
                Social Media Buttons
              </h3>
              <div className="flex gap-4">
                <IconButton
                  variant="outline"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='!w-6 !h-6'>
                      <path d="M14.4227 7.86847C14.0241 7.86847 13.6495 7.93037 13.299 8.05416C12.9485 8.17107 12.6323 8.29142 12.3505 8.41522C12.0687 8.53901 11.8213 8.6009 11.6082 8.6009C11.3883 8.6009 11.1409 8.54245 10.866 8.42553C10.5979 8.30862 10.3093 8.19514 10 8.08511C9.69072 7.96819 9.36082 7.90974 9.01031 7.90974C8.35052 7.90974 7.71134 8.09198 7.09278 8.45648C6.4811 8.8141 5.97938 9.34709 5.58763 10.0554C5.19588 10.7569 5 11.6269 5 12.6654C5 13.6351 5.16151 14.5979 5.48454 15.5538C5.81443 16.5029 6.20962 17.3075 6.6701 17.9678C7.06873 18.5248 7.45704 19.0028 7.83505 19.4017C8.21306 19.8006 8.65292 20 9.15464 20C9.48454 20 9.76976 19.945 10.0103 19.8349C10.2577 19.7249 10.5155 19.6149 10.7835 19.5048C11.0584 19.3948 11.3986 19.3398 11.8041 19.3398C12.2234 19.3398 12.5567 19.3948 12.8041 19.5048C13.0515 19.608 13.2921 19.7146 13.5258 19.8246C13.7594 19.9278 14.0584 19.9794 14.4227 19.9794C14.9656 19.9794 15.4296 19.773 15.8144 19.3604C16.2062 18.9478 16.5704 18.4973 16.9072 18.009C17.2921 17.4451 17.567 16.9327 17.732 16.472C17.9038 16.0112 17.9931 15.767 18 15.7395C17.9863 15.7326 17.8694 15.6707 17.6495 15.5538C17.4364 15.4369 17.189 15.2547 16.9072 15.0071C16.6323 14.7526 16.3883 14.4191 16.1753 14.0064C15.9691 13.5938 15.866 13.0918 15.866 12.5003C15.866 11.9845 15.9485 11.5409 16.1134 11.1696C16.2783 10.7913 16.4708 10.4818 16.6907 10.2411C16.9107 9.99355 17.11 9.80787 17.2887 9.68407C17.4674 9.55341 17.567 9.47776 17.5876 9.45712C17.2302 8.94133 16.8316 8.57339 16.3918 8.35332C15.9588 8.12637 15.5601 7.98882 15.1959 7.94068C14.8316 7.89254 14.5739 7.86847 14.4227 7.86847ZM13.8557 6.55835C14.1031 6.25575 14.3058 5.91188 14.4639 5.52676C14.622 5.13475 14.701 4.73243 14.701 4.31979C14.701 4.196 14.6907 4.0894 14.6701 4C14.2715 4.01375 13.8522 4.13411 13.4124 4.36106C12.9725 4.58801 12.6082 4.87341 12.3196 5.21728C12.0928 5.47174 11.89 5.79497 11.7113 6.18698C11.5326 6.5721 11.4433 6.97099 11.4433 7.38362C11.4433 7.44552 11.4467 7.50398 11.4536 7.55899C11.4605 7.61401 11.4674 7.65184 11.4742 7.67247C11.543 7.68622 11.6151 7.6931 11.6907 7.6931C12.055 7.6931 12.4399 7.5865 12.8454 7.37331C13.2509 7.15323 13.5876 6.88158 13.8557 6.55835Z" fill="currentColor"/>
                    </svg>
                  }
                />
                <IconButton 
                  variant="outline"
                  icon={
                    <svg viewBox="0 0 24 24" fill="currentColor" className='!w-6 !h-6'>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  }
                />
                <IconButton 
                  variant="outline"
                  icon={
                    <svg viewBox="0 0 24 24" fill="currentColor" className='!w-6 !h-6'>
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Original Button Variants */}
            <div>
              <h3 className="font-chivo text-background text-lg font-bold mb-6 uppercase tracking-wider">
                Primary Buttons
              </h3>
              <div className="flex flex-wrap gap-4">
                <CustomButton>
                  Primary Button
                </CustomButton>
                <CustomButton state="active">
                  Primary Variant
                </CustomButton>
                <CustomButton variant="outline">
                  Primary Outline
                </CustomButton>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <h3 className="font-chivo text-background text-lg font-bold mb-6 uppercase tracking-wider">
                Secondary Buttons
              </h3>
              <div className="flex flex-wrap gap-4">
                <CustomButton variant="secondary">
                  Secondary Button
                </CustomButton>
                <CustomButton variant="secondary" state="active">
                  Secondary Variant
                </CustomButton>
                <CustomButton variant="outline" className="border-secondary text-secondary hover:bg-secondary">
                  Secondary Outline
                </CustomButton>
              </div>
            </div>

            {/* Status Buttons */}
            <div>
              <h3 className="font-chivo text-background text-lg font-bold mb-6 uppercase tracking-wider">
                Status Buttons
              </h3>
              <div className="flex flex-wrap gap-4">
                <CustomButton variant="error">
                  Error Button
                </CustomButton>
                <CustomButton variant="badge">
                  Badge Button
                </CustomButton>
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
            <div className="bg-background p-8 rounded-2xl shadow-xl flex flex-col items-center">
              <h3 className="font-syne text-2xl font-bold text-primary mb-4">Dark Theme</h3>
              <p className="font-inter text-main-400 mb-6">
                Using the default background color with proper text contrast.
              </p>
              <CustomButton>
                Call to Action
              </CustomButton>
            </div>
            <div className="bg-background-600 p-8 rounded-2xl shadow-xl flex flex-col items-center">
              <h3 className="font-syne text-2xl font-bold text-primary mb-4">Variant Background</h3>
              <p className="font-inter text-main-500 mb-6">
                Using background-600 for subtle variations in dark sections.
              </p>
              <CustomButton variant='outline-primary'>
                Learn More
              </CustomButton>
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
          
          <div className="bg-background p-8 rounded-2xl shadow-xl">
            <form className="space-y-6">
              <InputSpinner 
                value={spinnerValue}
                onChange={setSpinnerValue}
                min={0}
                max={10}
              />
              <PINInput 
                length={6}
                onChange={setPinValue}
              />
              <TextField 
                type="tel"
                prefix="(+250)"
                icon={<ChevronUp className='!w-2.5 !h-2.5' />}
                suffix={<X className='!w-6 !h-6' />}
              />
              <TextField 
                type="email"
                error="Enter a valid email address"
                icon={<Mail />}
                suffix={<X className='!w-6 !h-6' />}
              />
              <TextField 
                type="search"
                placeholder="Search"
                icon={<Search />}
              />
              <TextField 
                value="New York City"
                onChange={(e) => console.log(e.target.value)}
                icon={<MapPin />}
                suffix={<X className='!w-6 !h-6' />}
              />
              <TextField 
                placeholder="Full Name"
                suffix={<X className='!w-6 !h-6' />}
              />
              
              <CustomButton className='w-full' textClassName='font-extrabold'>
                Send Message
              </CustomButton>
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