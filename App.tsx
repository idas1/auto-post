
import React, { useState, useCallback, useEffect } from 'react';
import type { UserProfile } from './types';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

// Fix: Correctly declare global variables attached to the window object for TypeScript.
// The Facebook SDK script adds `FB` and `fbAsyncInit` to the global `window` object.
// This `declare global` block informs TypeScript about these properties, resolving the errors.
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  const fetchUserProfile = useCallback(() => {
    FB.api('/me?fields=id,name,picture.type(large)', (response: any) => {
      if (response && !response.error) {
        setUser({
          id: response.id,
          name: response.name,
          avatarUrl: response.picture.data.url,
        });
      }
    });
  }, []);

  const initFacebookSdk = useCallback(() => {
    if (window.FB) {
      window.FB.init({
        appId: '1181565490511819', // IMPORTANT: Replace with your actual Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });
      setSdkLoaded(true);

      // Check login status once SDK is initialized
      FB.getLoginStatus((response: any) => {
        if (response.status === 'connected') {
          fetchUserProfile();
        }
      });
    }
  }, [fetchUserProfile]);

  useEffect(() => {
    // The Facebook SDK script is loaded asynchronously.
    // We need to wait for it to be ready.
    if (document.getElementById('facebook-jssdk')) {
      initFacebookSdk();
      return;
    }

    window.fbAsyncInit = initFacebookSdk;
  }, [initFacebookSdk]);


  const handleLogin = useCallback(() => {
    if (!sdkLoaded) {
      alert("Facebook SDK is not loaded yet. Please wait a moment and try again.");
      return;
    }
    // Request basic profile info. For a real app, you'd also request 'groups_access_member_info' and 'publish_to_groups'
    // after passing Facebook's App Review.
    FB.login((response: any) => {
      if (response.authResponse) {
        fetchUserProfile();
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile' });
  }, [fetchUserProfile, sdkLoaded]);

  const handleLogout = useCallback(() => {
    if (!sdkLoaded) return;
    FB.logout(() => {
      setUser(null);
    });
  }, [sdkLoaded]);

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;