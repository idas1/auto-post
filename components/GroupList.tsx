
import React from 'react';
import type { FacebookGroup } from '../types';
import GroupListItem from './GroupListItem';

interface GroupListProps {
  groups: FacebookGroup[];
  selectedGroupIds: Set<string>;
  onToggleGroup: (groupId: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectAll: () => void;
  allSelected: boolean;
}

const GroupList: React.FC<GroupListProps> = ({ groups, selectedGroupIds, onToggleGroup, searchTerm, setSearchTerm, onSelectAll, allSelected }) => {
  return (
    <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Groups</h2>
        <div className="relative mb-4">
            <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center justify-between mb-3 px-1">
             <div className="flex items-center">
                 <input
                    id="select-all"
                    type="checkbox"
                    checked={allSelected}
                    onChange={onSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="select-all" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select All
                  </label>
             </div>
             <span className="text-sm text-gray-500 dark:text-gray-400">{selectedGroupIds.size} / {groups.length} selected</span>
        </div>
        <div className="flex-grow overflow-y-auto -mr-4 pr-4">
            <ul className="space-y-2">
                {groups.map(group => (
                    <GroupListItem
                        key={group.id}
                        group={group}
                        isSelected={selectedGroupIds.has(group.id)}
                        onToggle={onToggleGroup}
                    />
                ))}
            </ul>
        </div>
    </div>
  );
};

export default GroupList;
