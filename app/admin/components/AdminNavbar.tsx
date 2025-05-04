'use client';

import { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminNavSidebar from './AdminNavSidebar';

interface AdminNavbarProps {
  children: React.ReactNode;
}

export default function AdminNavbar({ children }: AdminNavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`md:flex md:w-64 md:flex-col ${sidebarOpen ? 'block absolute z-10 inset-y-0 left-0 w-64 transition-transform duration-300 transform translate-x-0' : 'hidden'}`}
        >
          <AdminNavSidebar />
        </div>
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
