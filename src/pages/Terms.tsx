import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">General Terms and Conditions</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              General Terms and Conditions for the supply of goods
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Sales transactions are subject to the conditions of the contract with the BUYER. Alternatively, or if there is no contract that covers these transactions, the following CONDITIONS shall apply:
            </p>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">1. Interpretation</h2>
              <p className="text-gray-600 mb-4">
                Unless the context requires otherwise, these terms will have the following meaning:
              </p>
              
              <div className="space-y-4 text-gray-600">
                <div>
                  <strong>BUYER:</strong> The individual or juristic person (with an asset/annual turnover which does not exceed R3 million); or a juristic person with an asset/annual turnover which exceeds R3 million) who purchases Goods from the Company.
                </div>
                
                <div>
                  <strong>COMPANY:</strong> HAPO GROUP (PTY) LTD (Company registration number 2014/050305/07) whose registered office is at: 7 Visagie Street, Tableview, Cape Town, 7441 Western Cape South Africa
                </div>
                
                <div>
                  <strong>CONTRACT:</strong> Any agreement, which is binding in law, between the Company and the Buyer for the sale and purchase of Goods, incorporating these conditions.
                </div>
                
                <div>
                  <strong>DELIVERY POINT:</strong> The place where delivery of the Goods is to take place in terms of clause 4.
                </div>
                
                <div>
                  <strong>GOODS:</strong> Any products or materials, as agreed in terms of the contract, to be supplied to the Buyer by the Company (including any part or parts of them) and which are described in section 1 of the Consumer Protection Act 68 of 2008.
                </div>
              </div>

              <div className="mt-6 space-y-2 text-gray-600">
                <p>• A reference to a particular law is a reference to it as it is in force for the time being taking account any amendment, extension, application or re-enactment and includes any subordinate legislation for the time being in force made under it.</p>
                <p>• Words in the singular include words in the plural and words in the plural include words in the singular.</p>
                <p>• A reference to one gender includes a reference to the other gender.</p>
                <p>• Clause headings do not affect the interpretation of those clauses.</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">2. Applications of Terms</h2>
              <div className="space-y-4 text-gray-600">
                <p>2.1 Subject to any variation under clause 2.3 the Contract shall be on these conditions to exclusion of all other terms and conditions (including any terms or conditions which the Buyer purports to apply under any purchase order, confirmation of order, specification or other document).</p>
                
                <p>2.2 No terms and conditions endorsed on, delivered with or contained in the Buyer's purchase order, confirmation of order, specification or other document shall form part of the Contract simply as a result of such document being referred to in the Contract.</p>
                
                <p>2.3 Any variation to these conditions and/special terms and conditions agreed to between the parties and/or any representations about the goods shall have no effect unless expressly agreed in writing and signed by an authorised representative of the Company.</p>
                
                <p>2.4 The Buyer acknowledges that it has not relied on any statement, promise or representation made or given by or on behalf of the Company which is not set out in the Contract or is not signed by an authorised representative of the Company.</p>
                
                <p>2.5 Each order or acceptance of a quotation for Goods by the Buyer from the Company shall be deemed to be an offer by the Buyer to buy the Goods subject to these conditions as set out in the Contract.</p>
                
                <p>2.6 No order placed by the Buyer shall be deemed to be accepted by the Company until a written acknowledgement of the order is issued by the Company or the Company delivers the Goods to the Buyer; whichever is the earlier.</p>
                
                <p>2.7 The Buyer shall ensure that the terms of its order and any applicable specification/s are complete and accurate.</p>
                
                <p>2.8 Any quotation is given on the basis that no Contract shall come into existence until the Company dispatches an acknowledgement of the order to the Buyer. Any quotation issued by the Company is valid for a period of 15 days from the date of issue thereof, provided that the Company has not previously withdrawn it.</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">3. Description</h2>
              <div className="space-y-4 text-gray-600">
                <p>3.1 The quantity and description of the Goods shall be as set out in the Company's quotation or acknowledgement of order.</p>
                
                <p>3.2 Except where indicated otherwise, all samples, drawings, descriptive matter, specifications and advertising issued by the Company and any descriptions or illustrations contained in the Company's catalogues or brochures are issued or published for the sole purpose of giving an approximate idea of the Goods described in them ("examples").</p>
                
                <p>3.3 The examples described herein shall not form part of the Contract and the sales effected by the Company are not sales by sample. The Company will not be held liable for any inaccuracies described/featured in these examples.</p>
                
                <p>3.4 All examples referred to in clause 3.2 (including any concerning specially manufactured products) are the property of the Company and the Company shall retain all rights to the copyright therein.</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">4. Delivery</h2>
              <div className="space-y-4 text-gray-600">
                <p>4.1 Unless otherwise agreed in writing by the Company, delivery of the Goods shall take place at the Company's place of business.</p>
                
                <p>4.2 The date for delivery will be as agreed upon between the Company and the Buyer. If no such date is specified, delivery shall take place within a reasonable time from the date of transaction or agreement.</p>
                
                <p>4.3 The time of delivery will take place when the Buyer expressly or by conduct accepts delivery of the Goods; or the Buyer does anything in relation to the Goods that is inconsistent with the Company's ownership of those Goods; or the Buyer has kept the Goods for an unreasonably long period of time without indicating to the Company that the Buyer does not want the Goods.</p>
                
                <p>4.4 Subject to the other provisions of these conditions the Company shall not be liable for any direct, indirect or consequential loss (all three of which terms include, without limitation, pure economic loss, loss of profits, loss of business, depletion of goodwill and similar loss), costs, damages, charges or expenses caused directly or indirectly by any delay in the delivery of the Goods.</p>
                
                <p>4.5 In the event of the Company defaulting on delivery for a period exceeding 90 days from receipt of all imported key components, the Buyer is entitled to terminate the Contract. The Company will notify the Buyer when unexpected significant delays occur relating to the importation of key components.</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">7. Price</h2>
              <div className="space-y-4 text-gray-600">
                <p>7.1 The price for the Goods will be as stated in a quotation given to the Buyer from the Company. If no such quotation is given in writing, the price for the Goods shall be the price set out in the Company's price list published on the date of delivery or deemed delivery.</p>
                
                <p>7.2 The price for the Goods shall be exclusive of any value added tax (VAT) and all additional costs or charges in relation to packaging, loading, unloading, carriage and insurance, all of which amounts will be payable by the Buyer at the same time the price for the Goods so delivered becomes payable.</p>
                
                <p>7.3 All prices are subject to change without notice.</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">8. Payment</h2>
              <div className="space-y-4 text-gray-600">
                <p>8.1 Subject to clause 8.4, payment of the price for the Goods is to be made in South African Rand (ZAR), or the currency stated in the quotation, with 70% receivable upon confirmation of order and receipt of initial invoice as a deposit, with the balance due, within 7 days from the date of final invoice from the Company.</p>
                
                <p>8.2 The Buyer will be responsible for its own bank charges required to effect the payment.</p>
                
                <p>8.3 No payment shall be deemed to have been received until the Company has received cleared funds into its banking account.</p>
                
                <p>8.4 All payments payable to the Company under the Contract shall become due immediately on the termination of such contract despite any other provision contained herein.</p>
                
                <p>8.5 The Buyer shall make all payments due under the Contract in full without any deduction whether by way of set-off, counterclaim, discount (with the exception of clause 8.2.), abatement or otherwise.</p>
                
                <p>8.6 If the Buyer fails to make payments timeously, the Company will be entitled to charge interest at a rate of 2% per month.</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">15. Manufacturer's Warranty</h2>
              <div className="space-y-4 text-gray-600">
                <p>15.1 The Company warrants the FIRST purchaser of the Goods, that the product/s shall be free of any defects in materials and/or workmanship for a period of 24 months (two years) from the verifiable date of purchase. Such verification shall include a valid proof of purchase by the FIRST retail purchaser.</p>
                
                <p>15.2 The warranty covers 3% of the parts and components included in the Goods, and is applicable to the Goods if sold and installed in Africa.</p>
                
                <p>15.3 The warranty shall constitute the sole remedy available under law to the first retail purchaser for any damage related to, or resulting from, a defective part/or product. The warranty is strictly limited to the repair or replacement of the parts of this product at the discretion the Company.</p>
                
                <div className="mt-4">
                  <p className="font-semibold">The Warranty does not cover:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Non-defective damage caused by unreasonable use including use not in complete accordance with proper installation procedures</li>
                    <li>Labour charges for the removal or re-installation of replaced Goods</li>
                    <li>Transport costs incurred in transporting the Goods to the Company</li>
                    <li>Damage caused by incorrect installation</li>
                    <li>Goods which are installed outdoors and are damaged by extreme wind, hail or lightning or other force of nature</li>
                    <li>Consequential or incidental damage to property or person</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gray-50 p-6 rounded-lg mt-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
              <p className="text-gray-600 mb-2">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="text-gray-600">
                <p><strong>Company:</strong> HAPO GROUP (PTY) LTD</p>
                <p><strong>Registration:</strong> 2014/050305/07</p>
                <p><strong>Address:</strong> 7 Visagie Street, Tableview, Cape Town, 7441 Western Cape South Africa</p>
                <p><strong>Email:</strong> admin@hapogroup.co.za</p>
                <p><strong>Phone:</strong> +27 (0) 21 140-8375</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-center mt-8 pt-6 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}