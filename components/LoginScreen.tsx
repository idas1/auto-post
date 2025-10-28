
import React from 'react';
import { FacebookIcon } from './icons';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
          Group Poster
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Effortlessly post to all your Facebook groups at once.
        </p>
        <button
          onClick={onLogin}
          className="w-full inline-flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transition-transform transform hover:scale-105"
        >
          <FacebookIcon className="w-6 h-6 mr-3" />
          Connect with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
