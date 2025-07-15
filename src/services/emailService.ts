interface EmailData {
  request_type: string;
  user_name?: string;
  user_email?: string;
  user_location?: string;
  business_type?: string;
  products_services?: string;
  installation_timeline?: string;
  user_question?: string;
  timestamp: string;
  to_email: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    console.log('🔄 Starting email send process...');
    console.log('📧 Email data:', data);
    
    // Check if EmailJS is available
    if (typeof window !== 'undefined' && (window as any).emailjs) {
      const emailjs = (window as any).emailjs;
      console.log('✅ EmailJS library found');
      
      // Initialize EmailJS with your public key
      emailjs.init('Txq4l3HisplFnFjK8');
      console.log('✅ EmailJS initialized with public key');
      
      const templateParams = {
        request_type: data.request_type,
        user_name: data.user_name || 'Not provided',
        user_email: data.user_email || 'Not provided',
        user_location: data.user_location || 'Not provided',
        business_type: data.business_type || 'Not provided',
        products_services: data.products_services || 'Not provided',
        installation_timeline: data.installation_timeline || 'Not provided',
        user_question: data.user_question || 'Not provided',
        timestamp: data.timestamp,
        to_email: data.to_email
      };

      console.log('📋 Template parameters:', templateParams);
      console.log('🚀 Sending email...');

      // Send email using your service and template
      const response = await emailjs.send(
        'service_8tnpp8e', // Your service ID
        'template_gph0dwl', // Your template ID
        templateParams
      );

      console.log('✅ Email sent successfully:', response);
      console.log('📬 Email should arrive at: admin@hapogroup.co.za');
      return true;
    } else {
      console.error('❌ EmailJS not available on window object');
      console.log('🔍 Available on window:', Object.keys(window));
      
      // Fallback for development - log the email data
      console.log('📝 Email data that would be sent:');
      console.log('='.repeat(50));
      console.log(`Request Type: ${data.request_type}`);
      console.log(`To: ${data.to_email}`);
      console.log(`User Name: ${data.user_name || 'Not provided'}`);
      console.log(`User Email: ${data.user_email || 'Not provided'}`);
      console.log(`Location: ${data.user_location || 'Not provided'}`);
      console.log(`Business Type: ${data.business_type || 'Not provided'}`);
      console.log(`Products/Services: ${data.products_services || 'Not provided'}`);
      console.log(`Timeline: ${data.installation_timeline || 'Not provided'}`);
      console.log(`Question: ${data.user_question || 'Not provided'}`);
      console.log(`Timestamp: ${data.timestamp}`);
      console.log('='.repeat(50));
      return false; // Return false when EmailJS is not available
    }
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    
    // Log more detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return false;
  }
};