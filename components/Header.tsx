
import React from 'react';
import type { UserProfile } from '../types';
import { LogoutIcon, FacebookIcon } from './icons';

interface HeaderProps {
  user: UserProfile;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="flex-shrink-0 bg-white dark:bg-gray-800 shadow-md z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <FacebookIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">Group Poster</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <img className="h-9 w-9 rounded-full object-cover" src={user.avatarUrl} alt={user.name} />
              <span className="ml-3 font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              title="Logout"
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              <LogoutIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
