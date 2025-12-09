// src/components/business/Icons.jsx   ← নতুন ফাইল বানাও (যেকোনো নামে)

import IconLibrary from "../admin/IconLibrary";
import { motion } from "framer-motion";

// ১. Discussion Icon
export const BusinessDiscussionIcon = ({ className = "w-28 h-28" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.4, y: 40 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <IconLibrary name="discussionicon" className={`${className} text-orange-600 drop-shadow-xl`} />
  </motion.div>
);

// ২. Think Icon
export const BusinessThinkIcon = ({ className = "w-28 h-28" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.4, y: 40 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  >
    <IconLibrary name="thinkicon" className={`${className} text-blue-600 drop-shadow-xl`} />
  </motion.div>
);

// ৩. Delivery Icon
export const BusinessDeliveryIcon = ({ className = "w-28 h-28" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.4, y: 40 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
  >
    <IconLibrary name="deliveryicon" className={`${className} text-green-600 drop-shadow-xl`} />
  </motion.div>
);

// ৪. Support & Follow-up Icon
export const BusinessSupportIcon = ({ className = "w-28 h-28" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.4, y: 40 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
  >
    <IconLibrary name="supportfollowupicon" className={`${className} text-purple-600 drop-shadow-xl`} />
  </motion.div>
);