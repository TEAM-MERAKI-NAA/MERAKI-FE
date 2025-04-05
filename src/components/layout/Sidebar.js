import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  NewspaperIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import authService from '../../services/authService';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
  { name: 'News', href: '/dashboard/news', icon: NewspaperIcon },
  { name: 'Community', href: '/dashboard/community', icon: UserGroupIcon },
  { name: 'Guidelines', href: '/dashboard/guidelines', icon: BookOpenIcon },
  { name: 'Budget', href: '/dashboard/budget', icon: ChartBarIcon },
  { name: 'Deals', href: '/dashboard/deals', icon: ShoppingBagIcon },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full">
        {/* Logo and Toggle Button */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {isExpanded ? (
            <Link to="/" className="text-2xl font-bold text-primary-500">
              ImmigrantHub
            </Link>
          ) : (
            <div className="w-8 h-8 mx-auto bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">IH</span>
            </div>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? (
              <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={!isExpanded ? item.name : ""}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? 'text-primary-700' : 'text-gray-400'
                  } ${!isExpanded ? 'mx-auto' : 'mr-3'}`}
                />
                {isExpanded && item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile and Logout */}
        <div className="p-4 border-t space-y-2">
          <Link
            to="/dashboard/profile"
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              location.pathname === '/dashboard/profile'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            title={!isExpanded ? "Profile" : ""}
          >
            <UserCircleIcon
              className={`h-5 w-5 ${
                location.pathname === '/dashboard/profile'
                  ? 'text-primary-700'
                  : 'text-gray-400'
              } ${!isExpanded ? 'mx-auto' : 'mr-3'}`}
            />
            {isExpanded && "Profile"}
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
            title={!isExpanded ? "Sign Out" : ""}
          >
            <ArrowLeftOnRectangleIcon className={`h-5 w-5 ${!isExpanded ? 'mx-auto' : 'mr-3'}`} />
            {isExpanded && "Sign Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 