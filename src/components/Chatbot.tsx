import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { sendEmail } from '../services/emailService';

interface Message {
  text: string;
  isUser: boolean;
  quickReplies?: QuickReply[];
  inputFields?: InputField[];
}

interface QuickReply {
  title: string;
  next: string;
}

interface InputField {
  title: string;
  field: string;
}

interface UserInfo {
  name?: string;
  email?: string;
  location?: string;
  businessType?: string;
  productsServices?: string;
  installationTimeline?: string;
  question?: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    text: "👋 Hi there! Welcome to Hapo Group — your partner in cutting-edge digital signage solutions. How can I assist you today?",
    isUser: false,
    quickReplies: [
      { title: "🖥️ Explore Hardware Solutions", next: "hardware_solutions" },
      { title: "💡 Discover Software Solutions", next: "software_solutions" },
      { title: "🛠️ Installation & Support", next: "installation_support" },
      { title: "📞 Request a Quote", next: "request_quote" },
      { title: "🤖 Talk to a Human", next: "talk_to_human" }
    ]
  }]);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [currentStep, setCurrentStep] = useState<string>('start');
  const [isTyping, setIsTyping] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string>('');

  const chatFlow: Record<string, Message> = {
    hardware_solutions: {
      text: "We offer high-performance LED and LCD screens for both indoor and outdoor environments. What would you like to explore?",
      isUser: false,
      quickReplies: [
        { title: "🔲 Indoor Screens", next: "indoor_screens" },
        { title: "🌤️ Outdoor Screens", next: "outdoor_screens" },
        { title: "📸 View Product Gallery", next: "product_gallery" }
      ]
    },
    indoor_screens: {
      text: "✅ High brightness\n✅ Energy efficient\n✅ Custom sizes available\nWould you like a spec sheet or to request a quote?",
      isUser: false,
      quickReplies: [
        { title: "Spec Sheet", next: "spec_sheet" },
        { title: "Request a Quote", next: "request_quote" }
      ]
    },
    outdoor_screens: {
      text: "✅ High brightness\n✅ Energy efficient\n✅ Custom sizes available\nWould you like a spec sheet or to request a quote?",
      isUser: false,
      quickReplies: [
        { title: "Spec Sheet", next: "spec_sheet" },
        { title: "Request a Quote", next: "request_quote" }
      ]
    },
    software_solutions: {
      text: "We offer intelligent software to power your digital signage experience. Choose a category:",
      isUser: false,
      quickReplies: [
        { title: "🎶 In-store Music + AI Promotions", next: "in_store_music" },
        { title: "🧠 Content Management System (CMS)", next: "cms" },
        { title: "🚗 AI Virtual Assistant for Drive-Thru", next: "ai_drive_thru" },
        { title: "📡 IoT Sensors & Smart Integrations", next: "iot_sensors" }
      ]
    },
    installation_support: {
      text: "Our expert team handles everything from site surveys to installation and maintenance. Where is your business located?",
      isUser: false,
      inputFields: [
        { title: "📍 Your location", field: "location" }
      ]
    },
    request_quote: {
      text: "Let's get you a personalized quote! Please provide the following:",
      isUser: false,
      inputFields: [
        { title: "📍 Your location", field: "location" },
        { title: "🏢 Type of business", field: "businessType" },
        { title: "📦 Products/services you're interested in", field: "productsServices" },
        { title: "📅 Desired installation timeline", field: "installationTimeline" }
      ]
    },
    talk_to_human: {
      text: "No problem! A Hapo Group specialist will be with you shortly. In the meantime, please leave your name, email, and your question.",
      isUser: false,
      inputFields: [
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Your question", field: "question" }
      ]
    }
  };

  const simulateTyping = (message: Message) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, message]);
    }, 1000);
  };

  const handleQuickReply = (reply: QuickReply) => {
    setMessages(prev => [...prev, { text: reply.title, isUser: true }]);
    setCurrentStep(reply.next);
    
    const nextMessage = chatFlow[reply.next];
    if (nextMessage) {
      simulateTyping(nextMessage);
    }
  };

  const sendEmailNotification = async (requestType: string, info: UserInfo) => {
    setEmailStatus('Sending...');
    
    try {
      const emailData = {
        request_type: requestType,
        user_name: info.name,
        user_email: info.email,
        user_location: info.location,
        business_type: info.businessType,
        products_services: info.productsServices,
        installation_timeline: info.installationTimeline,
        user_question: info.question,
        timestamp: new Date().toLocaleString(),
        to_email: 'setu@hapogroup.co.za'
      };

      console.log('Attempting to send email with data:', emailData);
      
      const success = await sendEmail(emailData);
      
      if (success) {
        setEmailStatus('✅ Email sent successfully!');
        console.log('Email sent successfully to setu@hapogroup.co.za');
      } else {
        setEmailStatus('❌ Failed to send email. Please try again.');
        console.error('Email sending failed');
      }
    } catch (error) {
      setEmailStatus('❌ Error sending email. Please try again.');
      console.error('Email error:', error);
    }

    // Clear status after 5 seconds
    setTimeout(() => setEmailStatus(''), 5000);
  };

  const handleInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      values[key] = value.toString();
    });

    const updatedUserInfo = { ...userInfo, ...values };
    setUserInfo(updatedUserInfo);
    
    setMessages(prev => [
      ...prev,
      ...Object.entries(values).map(([_, value]) => ({ text: value, isUser: true }))
    ]);

    if (currentStep === 'installation_support') {
      simulateTyping({
        text: "Thanks! We'll connect you with a local technician. Would you like to schedule a consultation?",
        isUser: false,
        quickReplies: [{ title: "Schedule a Consultation", next: "schedule_consultation" }]
      });
    } else if (currentStep === 'request_quote') {
      // Send email for quote request
      await sendEmailNotification('Quote Request', updatedUserInfo);
      
      simulateTyping({
        text: "✅ Got it! Our team will get back to you within 24 hours. We've also sent your details to our team.",
        isUser: false
      });
    } else if (currentStep === 'talk_to_human') {
      // Send email for human support request
      await sendEmailNotification('Human Support Request', updatedUserInfo);
      
      simulateTyping({
        text: "Thank you for providing your information. A specialist will contact you shortly! We've notified our team.",
        isUser: false
      });
    }

    e.currentTarget.reset();
  };

  const resetChat = () => {
    setMessages([messages[0]]);
    setUserInfo({});
    setCurrentStep('start');
    setIsTyping(false);
    setEmailStatus('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-secondary transition-colors duration-300"
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <img
                  src="/HapoPrimary.jpg"
                  alt="Hapo"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h3 className="text-lg font-semibold">Chat with Hapo</h3>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetChat();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <img
                      src="/HapoPrimary.jpg"
                      alt="Hapo"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                    {message.quickReplies && (
                      <div className="mt-3 space-y-2">
                        {message.quickReplies.map((reply, replyIndex) => (
                          <button
                            key={replyIndex}
                            onClick={() => handleQuickReply(reply)}
                            className="block w-full text-left p-2 rounded bg-white hover:bg-gray-50 transition-colors duration-200"
                          >
                            {reply.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <img
                    src="/HapoPrimary.jpg"
                    alt="Hapo"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="bg-gray-100 rounded-lg p-3">
                    <motion.div 
                      className="flex gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.span
                        className="w-2 h-2 bg-gray-500 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-500 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-500 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                      />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t p-4">
              {/* Email Status Display */}
              {emailStatus && (
                <div className={`mb-3 p-2 rounded text-sm ${
                  emailStatus.includes('✅') 
                    ? 'bg-green-100 text-green-800' 
                    : emailStatus.includes('❌')
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {emailStatus}
                </div>
              )}

              {messages[messages.length - 1]?.inputFields && (
                <form onSubmit={handleInputSubmit} className="space-y-3">
                  {messages[messages.length - 1].inputFields.map((field, index) => (
                    <input
                      key={index}
                      type={field.field === 'email' ? 'email' : 'text'}
                      name={field.field}
                      placeholder={field.title}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors duration-300"
                  >
                    Send
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}