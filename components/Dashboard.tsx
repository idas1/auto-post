import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { UserProfile, FacebookGroup } from '../types';
import { MOCK_GROUPS } from '../constants';
import GroupList from './GroupList';
import PostComposer from './PostComposer';
import Header from './Header';
import PostStatusModal from './PostStatusModal';
import { SendIcon } from './icons';

// This lets TypeScript know that the FB object is available on the window
declare const FB: any;

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  // NOTE: In a real app, you would fetch the user's groups from the Facebook Graph API.
  // This requires the 'groups_access_member_info' permission, which needs Facebook App Review.
  // Example API call:
  // FB.api('/me/groups', (response) => {
  //   if (response && !response.error) {
  //     setGroups(response.data);
  //   }
  // });
  const [groups, setGroups] = useState<FacebookGroup[]>(MOCK_GROUPS);
  const [selectedGroupIds, setSelectedGroupIds] = useState<Set<string>>(new Set());
  const [postContent, setPostContent] = useState<string>('');
  const [postImage, setPostImage] = useState<string | null>(null); // Store image as data URL
  const [searchTerm, setSearchTerm] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [postResult, setPostResult] = useState<string | null>(null);

  const handleToggleGroup = useCallback((groupId: string) => {
    setSelectedGroupIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  }, []);
  
  const filteredGroups = useMemo(() => {
    return groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [groups, searchTerm]);

  const handleSelectAll = useCallback(() => {
    if (selectedGroupIds.size === filteredGroups.length) {
      setSelectedGroupIds(new Set());
    } else {
      setSelectedGroupIds(new Set(filteredGroups.map(g => g.id)));
    }
  }, [selectedGroupIds.size, filteredGroups]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPostImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setPostImage(null);
  }

  const handlePost = () => {
    setIsPosting(true);
    setPostResult(null);

    // --- REAL API POSTING LOGIC ---
    // In a real application, you would iterate through the selectedGroupIds
    // and make an API call for each one. This requires the 'publish_to_groups'
    // permission which is very difficult to get from Facebook.
    //
    // const postPromises = Array.from(selectedGroupIds).map(groupId => {
    //   return new Promise((resolve, reject) => {
    //     const postData: any = { message: postContent };
    //     // Note: Posting photos from the client-side via a data URL is complex.
    //     // The standard way is to post a URL to an image hosted elsewhere.
    //     // For direct uploads, a backend is usually required.
    //
    //     FB.api(`/${groupId}/feed`, 'POST', postData, (response: any) => {
    //       if (response && !response.error) {
    //         resolve(response);
    //       } else {
    //         reject(response.error);
    //       }
    //     });
    //   });
    // });
    //
    // Promise.all(postPromises)
    //   .then(results => {
    //     setIsPosting(false);
    //     setPostResult(`Successfully posted to ${results.length} groups.`);
    //     // Reset state
    //   })
    //   .catch(error => {
    //     setIsPosting(false);
    //     setPostResult(`Failed to post: ${error.message}`);
    //   });
    
    // Simulating API call for now
    setTimeout(() => {
      setIsPosting(false);
      const postedToGroups = groups.filter(g => selectedGroupIds.has(g.id)).map(g => g.name);
      setPostResult(`Successfully posted to ${postedToGroups.length} groups.`);
      // Reset state after posting
      setPostContent('');
      setPostImage(null);
      setSelectedGroupIds(new Set());
    }, 2500);
  };
  
  const isPostButtonDisabled = selectedGroupIds.size === 0 || postContent.trim() === '';

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/3 lg:w-1/4 h-1/2 md:h-full overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <GroupList
            groups={filteredGroups}
            selectedGroupIds={selectedGroupIds}
            onToggleGroup={handleToggleGroup}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSelectAll={handleSelectAll}
            allSelected={selectedGroupIds.size > 0 && selectedGroupIds.size === filteredGroups.length}
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4 flex-grow flex flex-col p-4 md:p-6 lg:p-8">
          <PostComposer
            postContent={postContent}
            onContentChange={setPostContent}
            postImage={postImage}
            onImageUpload={handleImageUpload}
            onRemoveImage={handleRemoveImage}
            selectedGroupCount={selectedGroupIds.size}
          />
        </div>
      </main>
       <footer className="sticky bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-end z-10 shadow-up">
        <span className="text-gray-600 dark:text-gray-400 mr-4">
          {selectedGroupIds.size} group{selectedGroupIds.size !== 1 ? 's' : ''} selected
        </span>
        <button
          onClick={handlePost}
          disabled={isPostButtonDisabled || isPosting}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200"
        >
          <SendIcon className="w-5 h-5 mr-2" />
          {isPosting ? 'Publishing...' : `Publish to ${selectedGroupIds.size} groups`}
        </button>
      </footer>
      {postResult && <PostStatusModal message={postResult} onClose={() => setPostResult(null)} />}
    </div>
  );
};

export default Dashboard;