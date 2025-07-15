import { motion } from 'framer-motion';

export default function Social() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Building Inclusive Growth and Strong Community Partnerships in our Industry</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Community Engagement</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Partner with local businesses in Cape Town to foster economic growth and community development</li>
              <li>• Support local charities and social initiatives through donations and volunteering</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Employee Welfare</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Provide a safe and inclusive workplace</li>
              <li>• Offer professional development opportunities and promote work-life balance</li>
              <li>• Ensure fair wages and benefits for all employees</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}