import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LightBulbIcon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  HandRaisedIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const missionPoints = [
  {
    title: 'Empower Immigrants',
    description: 'Providing tools and resources to help immigrants navigate their journey to Canada with confidence.',
    icon: LightBulbIcon,
  },
  {
    title: 'Ensure Trust',
    description: 'Building a reliable platform that immigrants can trust for accurate information and guidance.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Foster Innovation',
    description: 'Continuously improving our platform with cutting-edge technology to better serve our users.',
    icon: SparklesIcon,
  },
  {
    title: 'Support Communities',
    description: 'Creating a supportive environment where immigrants can connect and share experiences.',
    icon: HandRaisedIcon,
  },
];

const values = [
  {
    title: 'Integrity',
    description: 'We operate with honesty and transparency in all our interactions.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Innovation',
    description: 'We continuously seek new ways to improve our services and user experience.',
    icon: SparklesIcon,
  },
  {
    title: 'Community',
    description: 'We foster a supportive environment where immigrants can connect and thrive.',
    icon: UserGroupIcon,
  },
  {
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from customer service to platform functionality.',
    icon: CheckCircleIcon,
  },
];

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Immigration journey"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About Immigration Hub
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-100">
              A comprehensive platform for managing immigration journeys to Canada, providing guidance, resources, and support every step of the way.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-primary-700 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Get in Touch
                <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-500">Empowering immigrants on their journey to Canada</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {missionPoints.map((point) => (
              <div key={point.title} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-6 bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white shadow-lg shadow-primary-500/30">
                    <point.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{point.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-primary-200">What we stand for</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-primary-200 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-6 bg-primary-800 rounded-lg shadow-sm ring-1 ring-primary-700/50 hover:shadow-md transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white shadow-lg shadow-primary-500/30">
                    <value.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-base text-primary-200">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Story</h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Immigration Hub was founded by a team of immigrants and immigration professionals who understood firsthand the challenges of navigating the Canadian immigration process. We recognized the need for a comprehensive platform that could simplify this journey and provide reliable guidance.
              </p>
              <div className="mt-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white">
                      <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Global Reach</h4>
                    <p className="mt-1 text-base text-gray-500">
                      Supporting immigrants from around the world in their journey to Canada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg blur opacity-25"></div>
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Team collaboration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block text-primary-200">Join thousands of successful immigrants.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-primary-600 hover:bg-primary-50"
              >
                Get Started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-5 py-3 text-base font-medium text-white hover:bg-primary-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 