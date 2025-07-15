import { motion } from 'framer-motion';

export default function Environmental() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Environmental Initiatives</h1>
        <p className="text-lg text-gray-600 mb-12">
          Hapo Electronics is committed to sustainable and responsible business practices that support the well-being of our environment, society, and stakeholders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Sustainability</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Implement energy-efficient technologies in all digital signage solutions</li>
              <li>• Utilize recyclable materials for our products and packaging</li>
              <li>• Promote digital advertising as an eco-friendly alternative to traditional print advertising</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Carbon Footprint</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Aim to reduce our carbon footprint through remote work policies and minimizing business travel</li>
              <li>• Support initiatives to offset our carbon emissions</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Waste Management</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Encourage e-waste recycling programs</li>
              <li>• Properly dispose of electronic waste and ensure safe recycling practices</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}