"use client";
import React, { useState, useEffect } from 'react';
import {
  FaUsers,
  FaChartBar,
  FaPhone,
  FaEnvelope,
  FaSearch,
  FaEdit,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaTrash,
  FaMoneyBill,
} from 'react-icons/fa';
import AuthWrapper from './components/AuthWrapper';
import { SkeletonAdmin } from "@/components/Skeleton";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  courseInterest: string;
  neetScore: string;
  status: 'new' | 'contacted' | 'in-progress' | 'closed';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  totalEnquiries: number;
  todayEnquiries: number;
  weekEnquiries: number;
  monthEnquiries: number;
  statusStats: Record<string, number>;
  courseStats: Record<string, number>;
  recentEnquiries: Enquiry[];
}

interface OrderItem {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  planId: string;
  planName: string;
  amountPaid: number;
  razorpayOrderId: string;
  razorpayPaymentId: string | null;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'orders'>('enquiries');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [ordersTotalPages, setOrdersTotalPages] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersSearch, setOrdersSearch] = useState('');
  const [ordersStatusFilter, setOrdersStatusFilter] = useState('all');

  const enquiriesPerPage = 10;

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchEnquiries = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: enquiriesPerPage.toString(),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(search && { search }),
      });

      const response = await fetch(`/api/admin/enquiries?${params}`);
      const data = await response.json();

      setEnquiries(data.enquiries);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setLoadFailed(true);
    }
  };

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        page: ordersPage.toString(),
        limit: '10',
        ...(ordersStatusFilter !== 'all' && { status: ordersStatusFilter }),
        ...(ordersSearch && { search: ordersSearch }),
      });

      const response = await fetch(`/api/admin/orders?${params}`);
      const data = await response.json();

      setOrders(data.orders);
      setOrdersTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchStats(), fetchEnquiries(), fetchOrders()]);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, statusFilter, search, ordersPage, ordersStatusFilter, ordersSearch]);

  const updateEnquiryStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/enquiries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        fetchEnquiries();
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateEnquiryNotes = async () => {
    if (!selectedEnquiry) return;

    try {
      const response = await fetch('/api/admin/enquiries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedEnquiry._id, notes }),
      });

      if (response.ok) {
        setEditingNotes(false);
        fetchEnquiries();
        setSelectedEnquiry({ ...selectedEnquiry, notes });
      }
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchEnquiries();
        fetchStats();
        if (selectedEnquiry?._id === id) {
          setShowDetails(false);
          setSelectedEnquiry(null);
        }
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-brand-100 text-brand-800';
      case 'contacted':
        return 'bg-accent-100 text-accent-800';
      case 'in-progress':
        return 'bg-brand-100 text-brand-700';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <FaUsers className="text-brand-600" />;
      case 'contacted':
        return <FaPhone className="text-accent-600" />;
      case 'in-progress':
        return <FaClock className="text-brand-600" />;
      case 'closed':
        return <FaCheckCircle className="text-green-600" />;
      default:
        return <FaUsers className="text-gray-600" />;
    }
  };

  if (!loadFailed && enquiries.length === 0) {
    return <SkeletonAdmin />;
  }

  const renderEnquiriesTab = () => (
    <div className="space-y-6">
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-brand-900 border border-brand-900 rounded-xl p-6 hover:border-brand-800 transition-all hover:shadow-lg hover:shadow-accent-600/10">
            <div className="flex items-center">
              <div className="p-3 bg-accent-600/20 rounded-lg">
                <FaUsers className="text-accent-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-xs text-ink-subtle uppercase tracking-wider">Total Enquiries</p>
                <p className="text-2xl font-bold text-ink-on-brand">{stats.totalEnquiries}</p>
              </div>
            </div>
          </div>
          <div className="bg-brand-900 border border-brand-900 rounded-xl p-6 hover:border-brand-800 transition-all hover:shadow-lg hover:shadow-accent-600/10">
            <div className="flex items-center">
              <div className="p-3 bg-accent-600/20 rounded-lg">
                <FaClock className="text-accent-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-xs text-ink-subtle uppercase tracking-wider">Pending</p>
                <p className="text-2xl font-bold text-ink-on-brand">{stats.statusStats?.new || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-brand-900 border border-brand-900 rounded-xl p-6 hover:border-brand-800 transition-all hover:shadow-lg hover:shadow-accent-700/10">
            <div className="flex items-center">
              <div className="p-3 bg-accent-700/20 rounded-lg">
                <FaCheckCircle className="text-accent-300 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-xs text-ink-subtle uppercase tracking-wider">Resolved</p>
                <p className="text-2xl font-bold text-ink-on-brand">{stats.statusStats?.closed || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-brand-900 border border-brand-900 rounded-xl p-6 hover:border-brand-800 transition-all hover:shadow-lg hover:shadow-brand-600/10">
            <div className="flex items-center">
              <div className="p-3 bg-brand-600/20 rounded-lg">
                <FaChartBar className="text-brand-300 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-xs text-ink-subtle uppercase tracking-wider">In Progress</p>
                <p className="text-2xl font-bold text-ink-on-brand">{stats.statusStats?.['in-progress'] || 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-brand-900 border border-brand-900 rounded-xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted" />
              <input type="text" placeholder="Search enquiries..." value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-3 bg-brand-950 border border-brand-900 rounded-lg text-ink-on-brand placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors" />
            </div>
          </div>
          <div className="flex gap-2">
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-3 bg-brand-950 border border-brand-900 rounded-lg text-ink-on-brand focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors">
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-brand-900 border border-brand-900 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-900">
          <h2 className="text-lg font-semibold text-ink-on-brand">Enquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-900">
            <thead className="bg-brand-950">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-brand-900 divide-y divide-brand-900">
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="hover:bg-brand-900/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-ink-on-brand">{enquiry.name}</div>
                    {enquiry.neetScore && <div className="text-xs text-ink-subtle">NEET: {enquiry.neetScore}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-ink-on-brand"><FaEnvelope className="inline mr-1 text-ink-muted text-xs" /> {enquiry.email}</div>
                    {enquiry.mobile && <div className="text-sm text-ink-subtle"><FaPhone className="inline mr-1 text-ink-muted text-xs" /> {enquiry.mobile}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-on-brand">{enquiry.courseInterest}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                      {getStatusIcon(enquiry.status)} <span className="ml-1">{enquiry.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-subtle">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => { setSelectedEnquiry(enquiry); setNotes(enquiry.notes); setShowDetails(true); }}
                        className="text-accent-400 hover:text-accent-300 transition-colors"><FaEye /></button>
                      <button onClick={() => deleteEnquiry(enquiry._id)}
                        className="text-red-500 hover:text-red-400 transition-colors"><FaTrash /></button>
                      <select value={enquiry.status} onChange={(e) => updateEnquiryStatus(enquiry._id, e.target.value)}
                        className="text-xs bg-brand-950 border border-brand-900 rounded px-2 py-1 text-ink-on-brand">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-brand-900">
            <div className="flex items-center justify-between">
              <div className="text-sm text-ink-subtle">Page {currentPage} of {totalPages}</div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-brand-900 rounded-md text-sm text-ink-on-brand disabled:opacity-50">Previous</button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-brand-900 rounded-md text-sm text-ink-on-brand disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <div className="bg-brand-900 border border-brand-900 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted" />
              <input type="text" placeholder="Search orders..." value={ordersSearch}
                onChange={(e) => { setOrdersSearch(e.target.value); setOrdersPage(1); }}
                className="w-full pl-10 pr-4 py-3 bg-brand-950 border border-brand-900 rounded-lg text-ink-on-brand placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors" />
            </div>
          </div>
          <div className="flex gap-2">
            <select value={ordersStatusFilter} onChange={(e) => { setOrdersStatusFilter(e.target.value); setOrdersPage(1); }}
              className="px-4 py-3 bg-brand-950 border border-brand-900 rounded-lg text-ink-on-brand focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors">
              <option value="all">All Status</option>
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-brand-900 border border-brand-900 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-900">
          <h2 className="text-lg font-semibold text-ink-on-brand">Premium Sales / Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-900">
            <thead className="bg-brand-950">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink-subtle uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-brand-900 divide-y divide-brand-900">
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order._id} className="hover:bg-brand-900/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-ink-on-brand">{order.customerName}</div>
                    <div className="text-xs text-ink-subtle">{order.customerEmail}</div>
                    <div className="text-xs text-ink-subtle">{order.customerMobile}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-on-brand">{order.planName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-ink-on-brand">₹{order.amountPaid.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                      order.status === 'FAILED' ? 'bg-red-100 text-red-800' : 'bg-brand-100 text-brand-800'
                    }`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-subtle">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-ink-subtle text-sm">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {ordersTotalPages > 1 && (
          <div className="px-6 py-4 border-t border-brand-900">
            <div className="flex items-center justify-between">
              <div className="text-sm text-ink-subtle">Page {ordersPage} of {ordersTotalPages}</div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setOrdersPage(ordersPage - 1)} disabled={ordersPage === 1}
                  className="px-3 py-1.5 border border-brand-900 rounded-md text-sm text-ink-on-brand disabled:opacity-50">Previous</button>
                <button onClick={() => setOrdersPage(ordersPage + 1)} disabled={ordersPage === ordersTotalPages}
                  className="px-3 py-1.5 border border-brand-900 rounded-md text-sm text-ink-on-brand disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-brand-950 text-ink-on-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-ink-on-brand mb-2">Dashboard</h1>
                <p className="text-ink-subtle text-sm">Welcome back! Here&apos;s your admin overview</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-ink-muted">Last updated</div>
                <div className="text-sm text-ink-subtle font-medium">{new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-1 mb-8 bg-brand-900 border border-brand-900 rounded-xl p-1.5 w-fit">
            <button onClick={() => setActiveTab('enquiries')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'enquiries' ? 'bg-accent-600 text-white shadow-md' : 'text-ink-subtle hover:text-ink-on-brand hover:bg-brand-900'
              }`}><FaUsers /> Enquiries</button>
            <button onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'orders' ? 'bg-accent-600 text-white shadow-md' : 'text-ink-subtle hover:text-ink-on-brand hover:bg-brand-900'
              }`}><FaMoneyBill /> Premium Sales</button>
          </div>
          {activeTab === 'enquiries' && renderEnquiriesTab()}
          {activeTab === 'orders' && renderOrdersTab()}
        </div>
      </div>
      {showDetails && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-brand-900 border border-brand-900 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-ink-on-brand">Enquiry Details</h2>
                <button onClick={() => setShowDetails(false)} className="text-ink-muted hover:text-ink-on-brand transition-colors p-2 hover:bg-brand-900/10 rounded-lg">&times;</button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-ink-subtle mb-2">Name</label>
                    <p className="text-sm text-ink-on-brand bg-brand-950 p-3 rounded-lg border border-brand-900">{selectedEnquiry.name}</p></div>
                  <div><label className="block text-sm font-medium text-ink-subtle mb-2">Email</label>
                    <p className="text-sm text-ink-on-brand bg-brand-950 p-3 rounded-lg border border-brand-900">{selectedEnquiry.email}</p></div>
                  <div><label className="block text-sm font-medium text-ink-subtle mb-2">Mobile</label>
                    <p className="text-sm text-ink-on-brand bg-brand-950 p-3 rounded-lg border border-brand-900">{selectedEnquiry.mobile || 'Not provided'}</p></div>
                  <div><label className="block text-sm font-medium text-ink-subtle mb-2">Course Interest</label>
                    <p className="text-sm text-ink-on-brand bg-brand-950 p-3 rounded-lg border border-brand-900">{selectedEnquiry.courseInterest}</p></div>
                  <div><label className="block text-sm font-medium text-ink-subtle mb-2">NEET Score</label>
                    <p className="text-sm text-ink-on-brand bg-brand-950 p-3 rounded-lg border border-brand-900">{selectedEnquiry.neetScore || 'Not provided'}</p></div>
                  <div><label className="block text-sm font-medium text-ink-subtle mb-2">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEnquiry.status)}`}>{selectedEnquiry.status}</span></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-subtle mb-3">Notes</label>
                  {editingNotes ? (
                    <div className="space-y-3">
                      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
                        className="w-full bg-brand-950 border border-brand-900 rounded-lg px-3 py-3 text-ink-on-brand placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                        placeholder="Add notes about this enquiry..." />
                      <div className="flex justify-end space-x-3">
                        <button onClick={() => { setEditingNotes(false); setNotes(selectedEnquiry.notes); }}
                          className="px-4 py-2 border border-brand-900 rounded-lg text-sm text-ink-on-brand hover:bg-brand-900 transition-colors">Cancel</button>
                        <button onClick={updateEnquiryNotes}
                          className="px-4 py-2 bg-accent-600 text-white rounded-lg text-sm hover:bg-accent-600/90 transition-colors">Save Notes</button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-ink-on-brand bg-brand-950 p-4 rounded-lg border border-brand-900 min-h-20">
                        {selectedEnquiry.notes || 'No notes added yet.'}</p>
                      <button onClick={() => setEditingNotes(true)}
                        className="text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors"><FaEdit className="inline mr-2" /> Edit Notes</button>
                    </div>
                  )}
                </div>
                <div className="border-t border-brand-900 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-ink-subtle">
                    <div><label className="block font-medium mb-2">Created</label>
                      <p className="text-ink-on-brand bg-brand-950 p-3 rounded-lg border border-brand-900">{new Date(selectedEnquiry.createdAt).toLocaleString()}</p></div>
                    <div><label className="block font-medium mb-2">Last Updated</label>
                      <p className="text-ink-on-brand bg-brand-950 p-3 rounded-lg border border-brand-900">{new Date(selectedEnquiry.updatedAt).toLocaleString()}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthWrapper>
  );
};

export default AdminPanel;
