// src/pages/admin/AdminRequests.jsx
import { useState, useEffect } from "react";
import api from "../../../services/api";

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [response, setResponse] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [filterStatus]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/requests?status=${filterStatus}`);
      if (res.data.success) {
        setRequests(res.data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      setUpdating(true);
      const res = await api.put(`/admin/requests/${requestId}`, {
        status,
        admin_response: response
      });

      if (res.data.success) {
        alert('Request updated successfully!');
        setSelectedRequest(null);
        setResponse("");
        fetchRequests();
      }
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update request');
    } finally {
      setUpdating(false);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Requests</h1>
          <p className="text-gray-600 mt-1">Manage client service and tool requests</p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {loading ? (
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
            </div>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No requests found</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {requests.map((req) => (
              <div key={req.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{req.user.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[req.status]}`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Email: {req.user.email}</p>
                      <p>Phone: {req.user.phone || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{req.created_at_human}</p>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      {req.services.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-gray-700">Services:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {req.services.map((service, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {req.tools.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-gray-700">Tools:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {req.tools.map((tool, idx) => (
                              <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {req.admin_response && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700"><strong>Admin Response:</strong> {req.admin_response}</p>
                        <p className="text-xs text-gray-500 mt-1">By {req.responded_by} on {req.admin_responded_at}</p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Request</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Response Message</label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your response to the client..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['approved', 'rejected', 'in-progress', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedRequest.id, status)}
                      disabled={updating}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        statusColors[status]
                      } hover:opacity-80 disabled:opacity-50`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setSelectedRequest(null);
                    setResponse("");
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRequests;