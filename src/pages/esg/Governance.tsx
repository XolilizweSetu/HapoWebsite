import { motion } from 'framer-motion';

export default function Governance() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Corporate Governance</h1>
        <p className="text-lg text-gray-600 mb-12">
          Hapo Group is committed to maintaining the highest standards of corporate governance, ensuring transparency, accountability, and ethical business practices across all our operations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Board Structure & Leadership</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Independent board oversight with diverse expertise in technology, finance, and governance</li>
              <li>• Clear separation of roles between executive management and board governance</li>
              <li>• Regular board meetings with comprehensive reporting on business performance and risk management</li>
              <li>• Commitment to board diversity and inclusion in leadership positions</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Ethics & Compliance</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Comprehensive code of conduct governing all business activities</li>
              <li>• Zero tolerance policy for corruption, bribery, and unethical business practices</li>
              <li>• Regular ethics training for all employees and management</li>
              <li>• Whistleblower protection and anonymous reporting mechanisms</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Risk Management</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Comprehensive risk assessment and management framework</li>
              <li>• Regular monitoring of operational, financial, and strategic risks</li>
              <li>• Cybersecurity and data protection protocols</li>
              <li>• Business continuity planning and crisis management procedures</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Transparency & Accountability</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Regular financial reporting and disclosure to stakeholders</li>
              <li>• Open communication with investors, customers, and community partners</li>
              <li>• Annual sustainability and governance reporting</li>
              <li>• Commitment to regulatory compliance and industry best practices</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Stakeholder Engagement</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Regular engagement with customers, suppliers, and community stakeholders</li>
              <li>• Feedback mechanisms to ensure stakeholder concerns are addressed</li>
              <li>• Collaborative approach to business development and community investment</li>
              <li>• Commitment to fair and transparent business relationships</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Data Privacy & Security</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Strict data protection policies compliant with POPIA and international standards</li>
              <li>• Regular security audits and vulnerability assessments</li>
              <li>• Employee training on data handling and privacy protection</li>
              <li>• Transparent privacy policies and customer data rights protection</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Our Governance Commitment</h2>
          <p className="text-lg mb-4">
            At Hapo Group, we believe that strong governance is fundamental to sustainable business success. Our governance framework ensures that we operate with integrity, transparency, and accountability while delivering value to all our stakeholders.
          </p>
          <p className="text-lg">
            We continuously review and enhance our governance practices to meet evolving regulatory requirements and stakeholder expectations, ensuring that Hapo Group remains a trusted and responsible business partner.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}