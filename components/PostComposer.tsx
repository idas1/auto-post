
import React, { useRef } from 'react';
import { ImagePlusIcon } from './icons';

interface PostComposerProps {
  postContent: string;
  onContentChange: (content: string) => void;
  postImage: string | null;
  onImageUpload: (file: File) => void;
  onRemoveImage: () => void;
  selectedGroupCount: number;
}

const PostComposer: React.FC<PostComposerProps> = ({ postContent, onContentChange, postImage, onImageUpload, onRemoveImage, selectedGroupCount }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Post</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedGroupCount > 0 ? `This post will be published to ${selectedGroupCount} group(s).` : 'Select a group to get started.'}
        </p>
      </div>
      <div className="flex-grow p-6 flex flex-col md:flex-row gap-6 overflow-y-auto">
        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={postContent}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full flex-grow p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
          <div className="mt-4 flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={handleImageClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ImagePlusIcon className="w-5 h-5 mr-2" />
              Add Photo
            </button>
          </div>
        </div>
        {/* Preview */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
            <h3 className="font-bold text-lg mb-4 text-gray-700 dark:text-gray-300">Post Preview</h3>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 mb-2 break-words">
                  {postContent || <span className="text-gray-400">Your text will appear here...</span>}
                </div>
                {postImage && (
                    <div className="mt-4 relative">
                        <img src={postImage} alt="Preview" className="max-h-60 w-full object-contain rounded-md" />
                         <button onClick={onRemoveImage} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
