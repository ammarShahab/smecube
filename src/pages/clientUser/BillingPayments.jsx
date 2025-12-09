import { useState } from "react";

function BillingPayments() {
  const [autoRenewal, setAutoRenewal] = useState(true);
  const invoices = [
    { id: "INV-001", date: "2025-10-01", amount: 150, status: "Pending", dueDate: "2025-10-15" },
    { id: "INV-002", date: "2025-09-15", amount: 200, status: "Paid", dueDate: "2025-09-30" },
    { id: "INV-003", date: "2025-08-01", amount: 180, status: "Paid", dueDate: "2025-08-15" },
  ];
  const paymentMethods = [
    { type: "Credit Card", details: "Visa **** 1234", expiry: "12/25" },
    { type: "Digital Wallet", details: "bKash", expiry: "" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
              <p className="text-gray-500 text-sm mt-2">Manage your invoices, payment methods, and subscription settings</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Invoices</option>
                <option>Pending</option>
                <option>Paid</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Invoices and Subscription Settings */}
          <div className="lg:col-span-3 space-y-8">
            {/* Invoices */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Invoice History</h2>
                <p className="text-gray-500 text-sm mt-1">View and manage your past and pending invoices</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{invoice.id}</p>
                          <p className="text-sm text-gray-500">Issued: {invoice.date} | Due: {invoice.dueDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${invoice.amount.toFixed(2)}</p>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            invoice.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="p-2 text-gray-500 hover:text-gray-700 transition-all" title="Download Invoice">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                        {invoice.status === "Pending" && (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium">
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subscription Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Subscription Settings</h2>
                <p className="text-gray-500 text-sm mt-1">Configure your subscription preferences</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Auto-Renewal</p>
                    <p className="text-sm text-gray-500">Enable to automatically renew your subscription</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={autoRenewal}
                      onChange={() => setAutoRenewal(!autoRenewal)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-all">
                    + Add New
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{method.type}</p>
                          <p className="text-sm text-gray-500">{method.details} {method.expiry && `| Expires ${method.expiry}`}</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-700 font-medium text-sm transition-all">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Billing Summary */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Billing Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-blue-100">Current Balance</span>
                  <span className="font-semibold">$150.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Next Billing</span>
                  <span className="font-semibold">Oct 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Plan</span>
                  <span className="font-semibold">Enterprise</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-white text-blue-700 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingPayments;