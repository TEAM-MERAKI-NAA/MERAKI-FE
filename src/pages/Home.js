import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Document Management',
    description: 'Keep track of your important immigration documents and get timely reminders for renewals.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Community Support',
    description: 'Connect with other immigrants, share experiences, and get advice from those who have been there.',
    icon: UserGroupIcon,
  },
  {
    name: 'Financial Planning',
    description: 'Track your expenses, create budgets, and plan your financial future in Canada.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Cultural Integration',
    description: 'Access resources and guides to help you adapt to Canadian culture and society.',
    icon: NewspaperIcon,
  },
  {
    name: 'Health & Wellness',
    description: 'Information about healthcare services, mental health support, and wellness resources.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Education & Career',
    description: 'Resources for education, job search, and professional development opportunities.',
    icon: BookOpenIcon,
  },
];

const testimonials = [
  {
    content: "ImmigrantHub made my transition to Canada so much easier. The document management system helped me keep track of all my important papers, and the community support was invaluable.",
    author: "Priya S.",
    role: "New Immigrant from India"
  },
  {
    content: "As a newcomer, I was worried about managing my finances in a new country. The financial planning tools on ImmigrantHub helped me create a realistic budget and track my expenses.",
    author: "Carlos M.",
    role: "New Immigrant from Mexico"
  },
  {
    content: "The cultural integration resources helped me understand Canadian customs and traditions. I feel much more confident navigating social situations now.",
    author: "Mei L.",
    role: "New Immigrant from China"
  }
];

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            filter: "brightness(0.7)"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="text-center md:text-left md:max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-primary-200">Immigration Hub</span>
            </h1>
            <p className="mt-6 text-xl text-white/90 max-w-3xl">
              Your comprehensive platform for managing your immigration journey to Canada. 
              We provide tools, resources, and community support to help you succeed.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50 transition-all duration-300"
              >
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to manage your immigration
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Our comprehensive platform provides all the tools and resources you need to navigate your immigration journey successfully.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div 
                  key={feature.name} 
                  className="relative group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                  </div>
                  <div className="pt-8">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Hear from immigrants who have used our platform to navigate their journey to Canada.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-primary-500 mr-2" />
                  <div className="h-px flex-1 bg-gray-200"></div>
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to start your journey?</span>
              <span className="block text-primary-200">Sign up today and join our community.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-100">
              Join thousands of immigrants who are already using ImmigrantHub to manage their immigration journey to Canada.
            </p>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-all duration-300"
              >
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home; 