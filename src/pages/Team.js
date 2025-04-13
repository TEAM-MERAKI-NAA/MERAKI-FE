import React from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  HandRaisedIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const teamMembers = [
  {
    name: 'Swagat Koirala',
    role: 'Backend Developer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Swagat&backgroundColor=4571aa&radius=50',
    bio: 'Experienced backend developer specializing in Node.js and database architecture.',
    expertise: ['Node.js', 'PostgreSQL', 'Express', 'API Design'],
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    name: 'Abi Chitrakar',
    role: 'Backend Developer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abi&backgroundColor=4571aa&radius=50',
    bio: 'Backend developer with expertise in server-side technologies and cloud infrastructure.',
    expertise: ['Python', 'Django', 'AWS', 'Docker'],
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    name: 'Arjoo Khattri',
    role: 'Frontend Developer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yash&backgroundColor=4571aa&radius=50',
    bio: 'Lead frontend developer responsible for most of the frontend architecture and implementation.',
    expertise: ['React', 'JavaScript', 'CSS', 'Web Performance', 'Frontend Architecture'],
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    name: 'Yash Gujral',
    role: 'Frontend Developer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjoo&backgroundColor=4571aa&radius=50',
    bio: 'Frontend developer supporting UI components and responsive design implementation.',
    expertise: ['React', 'TypeScript', 'Tailwind CSS', 'UI/UX'],
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },

  {
    name: 'Sandesh Dhakal',
    role: 'SRE Engineer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sandesh&backgroundColor=4571aa&radius=50',
    bio: 'SRE engineer specializing in CI/CD pipelines, cloud infrastructure, and containerization.',
    expertise: ['CI/CD Pipelines', 'Azure', 'Kubernetes', 'Docker', 'DevOps'],
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  }
];

const Team = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl tracking-tight">
              <span className="block">Meet Our</span>
              <span className="block text-primary-600">Talented Team</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind ImmigrantHub who are dedicated to helping you succeed.
              Our diverse team brings together expertise from various fields to provide comprehensive support for immigrants.
            </p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
              We are a dedicated team of immigration experts, developers, and support staff working together to help immigrants navigate their journey to Canada.
            </p>
          </div>
          <div className="mt-20 overflow-x-auto">
            <ul
              role="list"
              className="flex space-x-8 min-w-max pb-8"
            >
              {teamMembers.map((person) => (
                <li key={person.name} className="group w-80 flex-shrink-0">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="aspect-[3/2] w-full overflow-hidden bg-primary-50 flex items-center justify-center">
                      <img 
                        className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
                        src={person.image} 
                        alt={person.name} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-semibold leading-8 tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{person.name}</h3>
                      <p className="text-base leading-7 text-primary-600 font-medium">{person.role}</p>
                      <p className="mt-4 text-base leading-7 text-gray-600">{person.bio}</p>
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900">Expertise</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {person.expertise.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 transition-colors duration-300 hover:bg-primary-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 flex space-x-4">
                        <a href={person.social.linkedin} className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                          <span className="sr-only">LinkedIn</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a href={person.social.github} className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                          <span className="sr-only">GitHub</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href={person.social.twitter} className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                          <span className="sr-only">Twitter</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Join Our Team Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Have Questions? Contact Us!</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're always looking for passionate individuals who want to make a difference in the lives of immigrants.
              If you share our vision and have expertise in technology, community building, or immigrant services,
              we'd love to hear from you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-300 flex items-center group"
              >
                Contact Us
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
           
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Team; 