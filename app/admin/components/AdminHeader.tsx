'use client';

import { useState } from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  toggleSidebar?: () => void;
}

export default function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New order #12345 received', time: '5 minutes ago', read: false },
    { id: 2, text: 'New customer registered', time: '2 hours ago', read: false },
    { id: 3, text: 'Inventory low for Splendor+', time: 'Yesterday', read: true },
  ]);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-4">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar || toggleMobileSidebar}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        <div className="hidden md:flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
