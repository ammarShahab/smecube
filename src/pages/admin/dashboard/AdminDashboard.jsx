// // src/pages/admin/AdminDashboard.jsx
// import { motion } from "framer-motion";
// import { BarChart3, Users, DollarSign, FileText } from "lucide-react";

// export default function AdminDashboard() {
//   const stats = [
//     {
//       title: "Total Users",
//       value: "124",
//       icon: <Users size={28} className="text-purple-600" />,
//       color: "from-purple-100 to-purple-50",
//     },
//     {
//       title: "Total Revenue",
//       value: "$12,540",
//       icon: <DollarSign size={28} className="text-green-600" />,
//       color: "from-green-100 to-green-50",
//     },
//     {
//       title: "Active Policies",
//       value: "58",
//       icon: <FileText size={28} className="text-blue-600" />,
//       color: "from-blue-100 to-blue-50",
//     },
//     {
//       title: "Visitors",
//       value: "1.4K",
//       icon: <BarChart3 size={28} className="text-pink-600" />,
//       color: "from-pink-100 to-pink-50",
//     },
//   ];

//   return (
//     <div>
//       {/* <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1> */}

//       {/* Stats cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((s, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ y: -5, scale: 1.02 }}
//             className={`p-6 rounded-2xl shadow-md bg-gradient-to-br ${s.color} border border-gray-100 flex items-center justify-between`}
//           >
//             <div>
//               <p className="text-sm text-gray-500">{s.title}</p>
//               <h3 className="text-2xl font-bold text-gray-800">{s.value}</h3>
//             </div>
//             {s.icon}
//           </motion.div>
//         ))}
//       </div>

//       {/* Example section below cards */}
//       <div className="mt-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//           Recent Activity
//         </h2>
//         <ul className="space-y-3 text-gray-600">
//           <li>
//             ✅ New user registered: <span className="font-medium">Ammar</span>
//           </li>
//           <li>💳 Payment received for policy #T-2458</li>
//           <li>📈 Blog post "Why Life Insurance Matters" reached 500+ views</li>
//         </ul>
//       </div>
//     </div>
//   );
// }
