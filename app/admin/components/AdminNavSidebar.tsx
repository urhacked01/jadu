'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Building,
  Gauge,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react';

const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Inventory',
    href: '/admin/inventory',
    icon: Layers,
  },
  {
    name: 'Showrooms',
    href: '/admin/showrooms',
    icon: Building,
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: Users,
  },
  {
    name: 'Testimonials',
    href: '/admin/testimonials',
    icon: MessageSquare,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: 'Service Reports',
    href: '/admin/service-reports',
    icon: Gauge,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminNavSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full bg-white border-r shadow-sm">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-center">Admin Panel</h2>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4 bg-white">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive ? 'text-indigo-600' : 'text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@dhanlaxmi.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
