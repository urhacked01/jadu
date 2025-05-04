'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  SearchIcon,
  ArrowDown,
  ArrowUp,
  Filter,
  Phone,
  Calendar,
  Bike,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ClockIcon,
} from 'lucide-react';

// Sample inquiry data
const INQUIRIES_DATA = [
  {
    id: 1,
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
    email: 'rahul.s@example.com',
    bikeModel: 'Hero Splendor+',
    showroom: 'City Center',
    type: 'Test Ride',
    status: 'Pending',
    message:
      "I would like to schedule a test ride for the new Hero Splendor+. I'm available on weekends.",
    date: '2023-06-15',
    timeSlot: '10:00 AM - 11:00 AM',
    followUpDate: '2023-06-17',
  },
  {
    id: 2,
    name: 'Priya Patel',
    phone: '+91 8765432109',
    email: 'priya.p@example.com',
    bikeModel: 'Harley Davidson Iron 883',
    showroom: 'Highway Branch',
    type: 'Price Inquiry',
    status: 'Completed',
    message:
      'Looking for financing options for Harley Davidson Iron 883. Please provide details about EMI and down payment.',
    date: '2023-06-12',
    timeSlot: null,
    followUpDate: '2023-06-14',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    phone: '+91 7654321098',
    email: 'vikram.s@example.com',
    bikeModel: 'Hero XPulse 200',
    showroom: 'Suburb Outlet',
    type: 'Test Ride',
    status: 'Cancelled',
    message: 'I want to test ride the Hero XPulse 200. Please let me know the available slots.',
    date: '2023-06-10',
    timeSlot: '3:00 PM - 4:00 PM',
    followUpDate: null,
  },
  {
    id: 4,
    name: 'Sneha Joshi',
    phone: '+91 6543210987',
    email: 'sneha.j@example.com',
    bikeModel: 'Harley Davidson Fat Boy',
    showroom: 'City Center',
    type: 'General Inquiry',
    status: 'In Progress',
    message:
      "I'm interested in the new Harley Davidson Fat Boy. What are the color options available?",
    date: '2023-06-14',
    timeSlot: null,
    followUpDate: '2023-06-16',
  },
  {
    id: 5,
    name: 'Amit Kumar',
    phone: '+91 5432109876',
    email: 'amit.k@example.com',
    bikeModel: 'Hero Splendor+',
    showroom: 'Highway Branch',
    type: 'Test Ride',
    status: 'Completed',
    message: 'Would like to test ride the new Hero Splendor+. Please confirm the availability.',
    date: '2023-06-08',
    timeSlot: '11:00 AM - 12:00 PM',
    followUpDate: '2023-06-09',
  },
  {
    id: 6,
    name: 'Neha Gupta',
    phone: '+91 4321098765',
    email: 'neha.g@example.com',
    bikeModel: 'Harley Davidson Street Rod',
    showroom: 'City Center',
    type: 'Price Inquiry',
    status: 'Pending',
    message:
      'Interested in knowing the on-road price and insurance details for Harley Davidson Street Rod.',
    date: '2023-06-13',
    timeSlot: null,
    followUpDate: '2023-06-15',
  },
];

// Status component with color coding
const StatusBadge = ({ status }: { status: string }) => {
  let colorClass = '';
  let Icon = null;

  switch (status) {
    case 'Completed':
      colorClass = 'bg-green-100 text-green-800';
      Icon = CheckCircle2;
      break;
    case 'Pending':
      colorClass = 'bg-yellow-100 text-yellow-800';
      Icon = ClockIcon;
      break;
    case 'In Progress':
      colorClass = 'bg-blue-100 text-blue-800';
      Icon = MessageSquare;
      break;
    case 'Cancelled':
      colorClass = 'bg-red-100 text-red-800';
      Icon = AlertCircle;
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
      Icon = MessageSquare;
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${colorClass}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {status}
    </span>
  );
};

export default function InquiriesPage() {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showroomFilter, setShowroomFilter] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeInquiry, setActiveInquiry] = useState<number | null>(null);
  const itemsPerPage = 5;

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  useEffect(() => {
    setIsClient(true);
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);

  // Filter and sort inquiries
  const filteredInquiries = INQUIRIES_DATA.filter(inquiry => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.bikeModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'All' || inquiry.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || inquiry.status === statusFilter;
    const matchesShowroom = showroomFilter === 'All' || inquiry.showroom === showroomFilter;

    return matchesSearch && matchesType && matchesStatus && matchesShowroom;
  }).sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortField === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInquiries = filteredInquiries.slice(startIndex, startIndex + itemsPerPage);

  if (!isClient) {
    return null;
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in to access the admin panel.</p>
          <Link href="/admin" className="btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Inquiries & Test Rides</h1>
          <p className="text-gray-600">Manage customer inquiries and test ride requests</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by name, email, or bike model"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="All">All Types</option>
                <option value="Test Ride">Test Ride</option>
                <option value="Price Inquiry">Price Inquiry</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {/* Showroom Filter */}
              <select
                value={showroomFilter}
                onChange={e => setShowroomFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="All">All Showrooms</option>
                <option value="City Center">City Center</option>
                <option value="Highway Branch">Highway Branch</option>
                <option value="Suburb Outlet">Suburb Outlet</option>
              </select>
            </div>
          </div>

          <div className="text-gray-600 text-sm">
            <span className="font-medium">{filteredInquiries.length}</span>{' '}
            {filteredInquiries.length === 1 ? 'inquiry' : 'inquiries'} found
          </div>
        </div>

        {/* Inquiry List */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center" onClick={() => handleSortChange('date')}>
                    Date
                    {sortField === 'date' &&
                      (sortDirection === 'asc' ? (
                        <ArrowUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 ml-1" />
                      ))}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center" onClick={() => handleSortChange('name')}>
                    Customer
                    {sortField === 'name' &&
                      (sortDirection === 'asc' ? (
                        <ArrowUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 ml-1" />
                      ))}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bike
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedInquiries.length > 0 ? (
                paginatedInquiries.map(inquiry => (
                  <tr
                    key={inquiry.id}
                    className={`hover:bg-gray-50 ${activeInquiry === inquiry.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{inquiry.date}</span>
                      </div>
                      {inquiry.timeSlot && (
                        <div className="text-xs text-gray-500 mt-1">{inquiry.timeSlot}</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {inquiry.phone}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          inquiry.type === 'Test Ride'
                            ? 'bg-purple-100 text-purple-800'
                            : inquiry.type === 'Price Inquiry'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {inquiry.type}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <Bike className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900">{inquiry.bikeModel}</div>
                          <div className="text-xs text-gray-500">{inquiry.showroom}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={inquiry.status} />
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button
                        className="text-blue-600 hover:text-blue-800 mr-3"
                        onClick={() =>
                          setActiveInquiry(activeInquiry === inquiry.id ? null : inquiry.id)
                        }
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between sm:px-6">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(startIndex + itemsPerPage, filteredInquiries.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredInquiries.length}</span> inquiries
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detailed View */}
        {activeInquiry !== null && (
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            {paginatedInquiries.map(inquiry => {
              if (inquiry.id === activeInquiry) {
                return (
                  <div key={inquiry.id}>
                    <div className="flex justify-between items-start mb-5">
                      <h2 className="text-xl font-bold text-gray-800">Inquiry Details</h2>
                      <button
                        onClick={() => setActiveInquiry(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        Close
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">
                          Customer Information
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <span className="block text-sm font-medium text-gray-500">Name</span>
                            <span className="block text-base">{inquiry.name}</span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-500">Phone</span>
                            <span className="block text-base">{inquiry.phone}</span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-500">Email</span>
                            <span className="block text-base">{inquiry.email}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Inquiry Details</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="block text-sm font-medium text-gray-500">Type</span>
                            <span
                              className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${
                                inquiry.type === 'Test Ride'
                                  ? 'bg-purple-100 text-purple-800'
                                  : inquiry.type === 'Price Inquiry'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {inquiry.type}
                            </span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-500">
                              Bike Model
                            </span>
                            <span className="block text-base">{inquiry.bikeModel}</span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-500">
                              Showroom
                            </span>
                            <span className="block text-base">{inquiry.showroom}</span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-500">Date</span>
                            <span className="block text-base">{inquiry.date}</span>
                          </div>
                          {inquiry.timeSlot && (
                            <div>
                              <span className="block text-sm font-medium text-gray-500">
                                Time Slot
                              </span>
                              <span className="block text-base">{inquiry.timeSlot}</span>
                            </div>
                          )}
                          <div>
                            <span className="block text-sm font-medium text-gray-500">Status</span>
                            <StatusBadge status={inquiry.status} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">Message</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{inquiry.message}</p>
                    </div>

                    {inquiry.followUpDate && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">
                          Follow-up Information
                        </h3>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                          <p className="text-sm text-yellow-800">
                            <span className="font-medium">Scheduled follow-up:</span>{' '}
                            {inquiry.followUpDate}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 border-t pt-6 flex justify-between">
                      <div className="space-x-3">
                        <select
                          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          defaultValue={inquiry.status}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button className="btn-primary">Update Status</button>
                      </div>

                      <div>
                        <button className="btn-outline">Send Response</button>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </main>
    </div>
  );
}
