
import React from 'react';
import type { FacebookGroup } from '../types';

interface GroupListItemProps {
  group: FacebookGroup;
  isSelected: boolean;
  onToggle: (groupId: string) => void;
}

const GroupListItem: React.FC<GroupListItemProps> = ({ group, isSelected, onToggle }) => {
  return (
    <li
      onClick={() => onToggle(group.id)}
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
        isSelected ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
      <img
        src={group.coverUrl}
        alt={`${group.name} cover`}
        className="w-12 h-12 rounded-md object-cover ml-3"
      />
      <div className="ml-3 flex-1 overflow-hidden">
        <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">{group.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {group.memberCount.toLocaleString()} members
        </p>
      </div>
    </li>
  );
};

export default GroupListItem;
