import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubbleLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface QuickReply {
  title: string;
  next: string;
}

interface InputField {
  title: string;
  field: string;
}

interface Message {
  text: string;
  isUser: boolean;
  quickReplies?: QuickReply[];
  inputFields?: InputField[];
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

const chatFlow: Record<string, Message> = {
  start: {
    text: "👋 Welcome to Hapo Group! Let's enhance your customer experience. Choose a category:",
    isUser: false,
    quickReplies: [
      { title: "🎶 In-store Music + AI Promotions", next: "in_store_music" },
      { title: "🧠 Content Management System (CMS)", next: "cms" },
      { title: "🚗 AI Virtual Assistant for Drive-Thru", next: "ai_drive_thru" },
      { title: "📡 IoT Sensors & Smart Integrations", next: "iot_sensors" }
    ]
  },
  in_store_music: {
    text:
      "🎵 Transform your retail atmosphere with our AI-powered in-store music system:\n\n✅ Curated playlists for different times of day\n✅ AI-driven promotional content integration\n✅ Customer demographic analysis\n✅ Mood-based music selection. Would you like a demo?",
    isUser: false,
    quickReplies: [
      { title: "Schedule Demo", next: "schedule_demo" },
      { title: "Get Pricing", next: "request_quote" },
      { title: "Learn More", next: "more_info_music" }
    ]
  },
  cms: {
    text:
      "🧠 Our Content Management System offers:\n\n✅ Cloud-based remote management\n✅ Real-time content updates\n✅ Multi-display network control\n✅ Advanced scheduling & analytics\n✅ User role management. What would you like to know?",
    isUser: false,
    quickReplies: [
      { title: "See Demo", next: "schedule_demo" },
      { title: "Pricing Details", next: "request_quote" },
      { title: "Technical Specs", next: "spec_sheet" }
    ]
  },
  ai_drive_thru: {
    text:
      "🚗 AI Virtual Assistant for Drive-Thru:\n\n✅ Natural language processing\n✅ Order accuracy improvement\n✅ Reduced wait times\n✅ 24/7 operation capability\n✅ Multi-language support\n\nPerfect for QSR and fast-food chains. Interested in a pilot program?",
    isUser: false,
    quickReplies: [
      { title: "Pilot Program", next: "pilot_program" },
      { title: "ROI Calculator", next: "roi_calculator" },
      { title: "Request Quote", next: "request_quote" }
    ]
  },
  iot_sensors: {
    text:
      "📡 IoT Sensors & Smart Integrations:\n\n✅ People counting sensors\n✅ Environmental monitoring\n✅ Traffic flow analysis\n✅ Real-time data integration\n✅ Custom dashboard analytics\n\nIntegrate with existing systems for smart building solutions. What's your use case?",
    isUser: false,
    quickReplies: [
      { title: "Retail Analytics", next: "retail_analytics" },
      { title: "Smart Building", next: "smart_building" },
      { title: "Custom Integration", next: "custom_integration" }
    ]
  },
  schedule_demo: {
    text:
      "📅 Great! I'd love to schedule a personalized demo for you. Please provide your details and our team will contact you within 24 hours to arrange a convenient time.",
    isUser: false,
    inputFields: [
      { title: "Your name", field: "name" },
      { title: "Email address", field: "email" },
      { title: "Company name", field: "businessType" },
      { title: "Preferred demo focus", field: "productsServices" }
    ]
  },
  more_info_music: {
    text:
      "🎵 Our In-Store Music + AI system includes:\n\n🎯 Demographic-based playlist selection\n📊 Customer behavior analytics\n🔄 Seamless promotional content integration\n⏰ Automated dayparting\n📱 Mobile app control\n\nWould you like to see how it works in a live environment?",
    isUser: false,
    quickReplies: [
      { title: "Live Demo", next: "schedule_demo" },
      { title: "Case Studies", next: "case_studies" },
      { title: "Get Quote", next: "request_quote" }
    ]
  },
  pilot_program: {
    text:
      "🚀 Our AI Drive-Thru Pilot Program includes:\n\n✅ 30-day free trial\n✅ Full installation and setup\n✅ Training for your staff\n✅ Performance analytics\n✅ No long-term commitment\n\nLet's get you started!",
    isUser: false,
    inputFields: [
      { title: "Restaurant name", field: "businessType" },
      { title: "Location", field: "location" },
      { title: "Contact email", field: "email" },
      { title: "Current daily drive-thru volume", field: "question" }
    ]
  },
  roi_calculator: {
    text:
      "💰 ROI Calculator for AI Drive-Thru:\n\nTypical results:\n• 25% faster order processing\n• 15% increase in order accuracy\n• 30% reduction in labor costs\n• 20% increase in customer satisfaction\n\nLet's calculate your specific ROI:",
    isUser: false,
    inputFields: [
      { title: "Daily drive-thru orders", field: "question" },
      { title: "Average order value", field: "productsServices" },
      { title: "Contact email for results", field: "email" }
    ]
  },
  retail_analytics: {
    text:
      "🛍️ Retail Analytics with IoT:\n\n📊 Customer traffic patterns\n⏱️ Dwell time analysis\n🎯 Heat mapping\n📈 Conversion rate optimization\n🔄 Real-time inventory alerts\n\nTransform your retail space into a data-driven environment!",
    isUser: false,
    quickReplies: [
      { title: "See Demo", next: "schedule_demo" },
      { title: "Pricing", next: "request_quote" },
      { title: "Case Study", next: "case_studies" }
    ]
  },
  smart_building: {
    text:
      "🏢 Smart Building Solutions:\n\n🌡️ Climate monitoring\n💡 Energy optimization\n🚶 Occupancy tracking\n🔒 Security integration\n📱 Mobile app control\n\nCreate an intelligent, efficient building ecosystem!",
    isUser: false,
    quickReplies: [
      { title: "Building Assessment", next: "building_assessment" },
      { title: "Energy Savings Calculator", next: "energy_calculator" },
      { title: "Get Quote", next: "request_quote" }
    ]
  },
  custom_integration: {
    text:
      "🔧 Custom IoT Integration:\n\nWe specialize in:\n✅ API development\n✅ Legacy system integration\n✅ Custom sensor deployment\n✅ Real-time dashboards\n✅ Scalable architecture\n\nTell us about your specific requirements:",
    isUser: false,
    inputFields: [
      { title: "Your name", field: "name" },
      { title: "Email", field: "email" },
      { title: "Current systems to integrate", field: "productsServices" },
      { title: "Integration goals", field: "question" }
    ]
  },
  case_studies: {
    text:
      "📚 Success Stories:\n\n🏪 Retail Chain: 40% increase in sales with targeted music\n🍔 QSR: 60% faster drive-thru with AI assistant\n🏢 Corporate: 35% energy savings with smart sensors\n\nWould you like detailed case studies sent to your email?",
    isUser: false,
    inputFields: [
      { title: "Your email", field: "email" },
      { title: "Industry of interest", field: "businessType" }
    ]
  },
  building_assessment: {
    text:
      "🏗️ Free Building Assessment:\n\nOur experts will evaluate:\n✅ Current energy usage\n✅ Optimization opportunities\n✅ ROI projections\n✅ Implementation timeline\n\nSchedule your free assessment:",
    isUser: false,
    inputFields: [
      { title: "Building location", field: "location" },
      { title: "Contact person", field: "name" },
      { title: "Email", field: "email" },
      { title: "Building size (sq ft)", field: "question" }
    ]
  },
  energy_calculator: {
    text:
      "⚡ Energy Savings Calculator:\n\nTypical smart building savings:\n• 20-35% reduction in energy costs\n• 15-25% improvement in efficiency\n• 2-3 year ROI payback\n\nLet's calculate your potential savings:",
    isUser: false,
    inputFields: [
      { title: "Monthly energy bill", field: "question" },
      { title: "Building type", field: "businessType" },
      { title: "Email for results", field: "email" }
    ]
  },
  installation_support: {
    text:
      "Our expert team handles everything from site surveys to installation and maintenance. Where is your business located?",
    isUser: false,
    inputFields: [{ title: "📍 Your location", field: "location" }]
  },
  schedule_consultation: {
    text:
      "📅 Perfect! Let's schedule your consultation. Our local technician will assess your space and provide recommendations.",
    isUser: false,
    inputFields: [
      { title: "Preferred date/time", field: "installationTimeline" },
      { title: "Contact number", field: "question" }
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
    text:
      "No problem! A Hapo Group specialist will be with you shortly. In the meantime, please leave your name, email, and your question.",
    isUser: false,
    inputFields: [
      { title: "Name", field: "name" },
      { title: "Email", field: "email" },
      { title: "Your question", field: "question" }
    ]
  },
  spec_sheet: {
    text: "Technical specs will be sent to your email. Please provide your email:",
    isUser: false,
    inputFields: [{ title: "Email", field: "email" }]
  }
};

async function sendEmail(data: any): Promise<boolean> {
  // Placeholder for actual email sending logic
  // Replace with your email API call
  console.log("Sending email with data:", data);
  return new Promise((res) => setTimeout(() => res(true), 1000));
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([chatFlow.start]);
  const [currentStep, setCurrentStep] = useState<string>("start");
  const [isTyping, setIsTyping] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  const simulateTyping = (message: Message) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, message]);
    }, 1000);
  };

  const handleQuickReply = (reply: QuickReply) => {
    setMessages((prev) => [...prev, { text: reply.title, isUser: true }]);
    setCurrentStep(reply.next);

    const nextMessage = chatFlow[reply.next];
    if (nextMessage) {
      simulateTyping(nextMessage);
    }
  };

  const sendEmailNotification = async (requestType: string, info: UserInfo) => {
    setEmailStatus("Sending...");

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
        to_email: "admin@hapogroup.co.za"
      };

      const success = await sendEmail(emailData);

      if (success) {
        setEmailStatus("✅ Email sent successfully!");
      } else {
        setEmailStatus("❌ Failed to send email. Please try again.");
      }
    } catch (error) {
      setEmailStatus("❌ Error sending email. Please try again.");
      console.error("Email error:", error);
    }

    setTimeout(() => setEmailStatus(""), 5000);
  };

  const handleInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: Record<string, string> = {};

    formData.forEach((value, key) => {
      values[key] = value.toString();
    });

    e.currentTarget.reset();

    const updatedUserInfo = { ...userInfo, ...values };
    setUserInfo(updatedUserInfo);

    setMessages((prev) => [
      ...prev,
      ...Object.entries(values).map(([_, value]) => ({ text: value, isUser: true }))
    ]);

    // Handle different steps where email is sent or next message shown
    if (currentStep === "installation_support") {
      simulateTyping({
        text: "Thanks! We'll connect you with a local technician. Would you like to schedule a consultation?",
        isUser: false,
        quickReplies: [{ title: "Schedule a Consultation", next: "schedule_consultation" }]
      });
      setCurrentStep("awaiting_response");
    } else if (
      [
        "schedule_demo",
        "pilot_program",
        "roi_calculator",
        "custom_integration",
        "case_studies",
        "building_assessment",
        "energy_calculator",
        "spec_sheet"
      ].includes(currentStep)
    ) {
      await sendEmailNotification("Demo/Consultation Request", updatedUserInfo);

      simulateTyping({
        text: "✅ Thank you! Our team has received your request and will contact you within 24 hours. We've sent your details to our specialists.",
        isUser: false
      });
      setCurrentStep("awaiting_response");
    } else if (currentStep === "schedule_consultation") {
      await sendEmailNotification("Consultation Scheduling", updatedUserInfo);

      simulateTyping({
        text: "✅ Consultation scheduled! Our local technician will contact you to confirm the appointment details.",
        isUser: false
      });
      setCurrentStep("awaiting_response");
    } else if (currentStep === "request_quote") {
      await sendEmailNotification("Quote Request", updatedUserInfo);

      simulateTyping({
        text: "✅ Got it! Our team will get back to you within 24 hours. We've also sent your details to our team.",
        isUser: false
      });
      setCurrentStep("awaiting_response");
    } else if (currentStep === "talk_to_human") {
      await sendEmailNotification("Human Support Request", updatedUserInfo);

      simulateTyping({
        text: "Thank you for providing your information. A specialist will contact you shortly! We've notified our team.",
        isUser: false
      });
      setCurrentStep("awaiting_response");
    } else {
      // Default fallback: go back to start
      simulateTyping(chatFlow.start);
      setCurrentStep("start");
    }
  };

  const resetChat = () => {
    setMessages([chatFlow.start]);
    setUserInfo({});
    setCurrentStep("start");
    setIsTyping(false);
    setEmailStatus("");
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-secondary transition-colors duration-300"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl flex flex-col"
            role="region"
            aria-live="polite"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <img
                  src="/HapoPrimary.jpg"
                  alt="Hapo Logo"
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
                aria-label="Close chat window"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  aria-live="polite"
                >
                  {!message.isUser && (
                    <img
                      src="/HapoPrimary.jpg"
                      alt="Hapo"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 whitespace-pre-line ${
                      message.isUser ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
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

            {/* Input / Form */}
            <div className="border-t p-4">
              {/* Email Status */}
              {emailStatus && (
                <div
                  className={`mb-3 p-2 rounded text-sm ${
                    emailStatus.includes("✅")
                      ? "bg-green-100 text-green-800"
                      : emailStatus.includes("❌")
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                  role="alert"
                >
                  {emailStatus}
                </div>
              )}

              {messages[messages.length - 1]?.inputFields ? (
                <form onSubmit={handleInputSubmit} className="space-y-3" aria-label="User input form">
                  {messages[messages.length - 1].inputFields!.map((field, index) => (
                    <input
                      key={index}
                      type={field.field === "email" ? "email" : "text"}
                      name={field.field}
                      placeholder={field.title}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-required="true"
                    />
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors duration-300"
                  >
                    Send
                  </button>
                </form>
              ) : (
                <p className="text-center text-gray-500">Please select an option above.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
