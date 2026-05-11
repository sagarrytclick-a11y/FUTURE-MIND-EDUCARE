"use client";
import React, { useState, useEffect } from 'react';
import {
  FaUsers,
  FaChartBar,
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
  FaSearch,
  FaFilter,
  FaEdit,
  FaEye,
  FaCalendarAlt,
  FaChartLine,
  FaUserCheck,
  FaClock,
  FaCheckCircle,
  FaTrash,
} from 'react-icons/fa';
import AuthWrapper from './components/AuthWrapper';

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

const AdminPanel: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const enquiriesPerPage = 10;

  useEffect(() => {
    fetchStats();
    fetchEnquiries();
  }, [currentPage, statusFilter, search]);

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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

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
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <FaUsers className="text-blue-600" />;
      case 'contacted':
        return <FaPhone className="text-yellow-600" />;
      case 'in-progress':
        return <FaClock className="text-purple-600" />;
      case 'closed':
        return <FaCheckCircle className="text-green-600" />;
      default:
        return <FaUsers className="text-gray-600" />;
    }
  };

  if (loading && enquiries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-lg h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Dashboard</h1>
                <p className="text-[#94A3B8] text-sm">
                  Welcome back! Here's your admin overview
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#64748B]">Last updated</div>
                <div className="text-sm text-[#94A3B8] font-medium">
                  {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#475569] transition-all hover:shadow-lg hover:shadow-[#0EA5E9]/10">
                <div className="flex items-center">
                  <div className="p-3 bg-[#0EA5E9]/20 rounded-lg">
                    <FaUsers className="text-[#0EA5E9] text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Total Enquiries</p>
                    <p className="text-2xl font-bold text-[#F8FAFC]">{stats.totalEnquiries}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#475569] transition-all hover:shadow-lg hover:shadow-[#F59E0B]/10">
                <div className="flex items-center">
                  <div className="p-3 bg-[#F59E0B]/20 rounded-lg">
                    <FaClock className="text-[#F59E0B] text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Pending</p>
                    <p className="text-2xl font-bold text-[#F8FAFC]">{stats.statusStats?.new || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#475569] transition-all hover:shadow-lg hover:shadow-[#10B981]/10">
                <div className="flex items-center">
                  <div className="p-3 bg-[#10B981]/20 rounded-lg">
                    <FaCheckCircle className="text-[#10B981] text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Resolved</p>
                    <p className="text-2xl font-bold text-[#F8FAFC]">{stats.statusStats?.closed || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#475569] transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/10">
                <div className="flex items-center">
                  <div className="p-3 bg-[#8B5CF6]/20 rounded-lg">
                    <FaChartBar className="text-[#8B5CF6] text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wider">In Progress</p>
                    <p className="text-2xl font-bold text-[#F8FAFC]">{stats.statusStats?.['in-progress'] || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Filters and Search */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Search enquiries..."
                  value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-[#334155] rounded-lg text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

        {/* Enquiries Table */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#334155]">
              <h2 className="text-lg font-semibold text-[#F8FAFC]">Enquiries</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#334155]">
                <thead className="bg-[#0F172A]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
              <tbody className="bg-[#1E293B] divide-y divide-[#334155]">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-[#334155]/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#F8FAFC]">{enquiry.name}</div>
                      {enquiry.neetScore && (
                        <div className="text-xs text-[#94A3B8]">NEET: {enquiry.neetScore}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#F8FAFC]">
                        <div className="flex items-center">
                          <FaEnvelope className="text-[#64748B] mr-2 text-xs" />
                          {enquiry.email}
                        </div>
                      </div>
                      {enquiry.mobile && (
                        <div className="text-sm text-[#94A3B8] flex items-center mt-1">
                          <FaPhone className="text-[#64748B] mr-2 text-xs" />
                          {enquiry.mobile}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaGraduationCap className="text-[#64748B] mr-2 text-xs" />
                        <span className="text-sm text-[#F8FAFC]">{enquiry.courseInterest}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                        {getStatusIcon(enquiry.status)}
                        <span className="ml-1">{enquiry.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#94A3B8]">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enquiry);
                            setNotes(enquiry.notes);
                            setShowDetails(true);
                          }}
                          className="text-[#0EA5E9] hover:text-[#38BDF8] transition-colors"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => deleteEnquiry(enquiry._id)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                          title="Delete enquiry"
                        >
                          <FaTrash />
                        </button>
                        <select
                          value={enquiry.status}
                          onChange={(e) => updateEnquiryStatus(enquiry._id, e.target.value)}
                          className="text-xs bg-[#0F172A] border border-[#334155] rounded px-2 py-1 text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
                        >
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-[#334155]">
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#94A3B8]">
                  Showing {((currentPage - 1) * enquiriesPerPage) + 1} to {Math.min(currentPage * enquiriesPerPage, enquiries.length)} of {enquiries.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border border-[#334155] rounded-md text-sm text-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#334155] transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1.5 text-sm text-[#94A3B8]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 border border-[#334155] rounded-md text-sm text-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#334155] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
         </div>

      {/* Enquiry Details Modal */}
      {showDetails && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#F8FAFC]">Enquiry Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-[#64748B] hover:text-[#F8FAFC] transition-colors p-2 hover:bg-[#334155]/10 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Name</label>
                    <p className="text-sm text-[#F8FAFC] bg-[#0F172A] p-3 rounded-lg border border-[#334155]">{selectedEnquiry.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Email</label>
                    <p className="text-sm text-[#F8FAFC] bg-[#0F172A] p-3 rounded-lg border border-[#334155]">{selectedEnquiry.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Mobile</label>
                    <p className="text-sm text-[#F8FAFC] bg-[#0F172A] p-3 rounded-lg border border-[#334155]">{selectedEnquiry.mobile || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Course Interest</label>
                    <p className="text-sm text-[#F8FAFC] bg-[#0F172A] p-3 rounded-lg border border-[#334155]">{selectedEnquiry.courseInterest}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">NEET Score</label>
                    <p className="text-sm text-[#F8FAFC] bg-[#0F172A] p-3 rounded-lg border border-[#334155]">{selectedEnquiry.neetScore || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEnquiry.status)}`}>
                      {selectedEnquiry.status}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-3">Notes</label>
                  {editingNotes ? (
                    <div className="space-y-3">
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-3 text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                        placeholder="Add notes about this enquiry..."
                      />
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => {
                            setEditingNotes(false);
                            setNotes(selectedEnquiry.notes);
                          }}
                          className="px-4 py-2 border border-[#334155] rounded-lg text-sm text-[#F8FAFC] hover:bg-[#334155] transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={updateEnquiryNotes}
                          className="px-4 py-2 bg-[#0EA5E9] text-white rounded-lg text-sm hover:bg-[#0EA5E9]/90 transition-colors"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-[#F8FAFC] bg-[#0F172A] p-4 rounded-lg border border-[#334155] min-h-20">
                        {selectedEnquiry.notes || 'No notes added yet.'}
                      </p>
                      <button
                        onClick={() => setEditingNotes(true)}
                        className="text-[#0EA5E9] hover:text-[#38BDF8] text-sm font-medium transition-colors"
                      >
                        <FaEdit className="inline mr-2" />
                        Edit Notes
                      </button>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#334155] pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#94A3B8]">
                    <div>
                      <label className="block font-medium mb-2">Created</label>
                      <p className="text-[#F8FAFC] bg-[#0F172A] p-3 rounded-lg border border-[#334155]">{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Last Updated</label>
                      <p className="text-[#F8FAFC] bg-[#0F172A] p-3 rounded-lg border border-[#334155]">{new Date(selectedEnquiry.updatedAt).toLocaleString()}</p>
                    </div>
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
