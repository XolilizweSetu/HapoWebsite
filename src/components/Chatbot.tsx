import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hi! I'm here to help you discover how Hapo Group can transform your business with cutting-edge technology solutions. What would you like to explore today?",
      isUser: false,
      quickReplies: [
        { title: "🔍 Discover Software Solutions", next: "ai_iot_solutions" },
        { title: "📺 Explore Hardware Solutions", next: "hardware_solutions" },
        { title: "🔧 Installation & Support", next: "installation_support" },
        { title: "💬 Talk to a Human", next: "talk_to_human" },
        { title: "📞 Request a Quote", next: "request_quote" }
      ]
    }
  ]);
  const [currentStep, setCurrentStep] = useState('start');
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [isTyping, setIsTyping] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');

  const chatFlow: Record<string, Message> = {
    hardware_solutions: {
      text: "📺 Discover our premium LED display solutions designed to captivate your audience and deliver stunning visual experiences. Choose your environment:",
      isUser: false,
      quickReplies: [
        { title: "🏢 Indoor LED Displays", next: "indoor_led" },
        { title: "🌞 Outdoor LED Displays", next: "outdoor_led" }
        
      ]
    },
    indoor_led: {
      text: "🏢 Indoor LED Displays - Perfect for:\n\n✅ Corporate lobbies & boardrooms\n✅ Retail stores & shopping centers\n✅ Restaurants & entertainment venues\n✅ Conference rooms & presentations\n\nFeatures:\n🎯 Ultra-high resolution up to 8K\n💡 Energy-efficient technology\n🎨 Vibrant colors & sharp contrast\n⚙️ Easy content management\n🔧 Professional installation included",
      isUser: false,
      quickReplies: [
        { title: "See Indoor Gallery", next: "indoor_gallery" },
        { title: "Get Indoor Quote", next: "request_quote" },
        { title: "Schedule Demo", next: "schedule_demo" }
        
      ]
    },
    outdoor_led: {
      text: "🌞 Outdoor LED Displays - Built to withstand the elements:\n\n✅ Stadiums & sports venues\n✅ Billboards & advertising\n✅ Transportation hubs\n✅ Outdoor events & festivals\n\nFeatures:\n🌧️ Weather-resistant (IP65+ rating)\n☀️ High brightness for daylight visibility\n🏗️ Durable construction\n📡 Remote monitoring capabilities\n🔧 Professional installation & maintenance",
      isUser: false,
      quickReplies: [
        { title: "See Outdoor Gallery", next: "outdoor_gallery" },
        { title: "Get Outdoor Quote", next: "request_quote" },
        
      ]
    },
    /*custom_displays: {
      text: "🎯 Custom Display Solutions:\n\nWe create bespoke LED displays for unique requirements:\n\n✅ Curved & flexible displays\n✅ Interactive touch screens\n✅ Video walls & seamless arrays\n✅ Transparent LED displays\n✅ Creative shapes & sizes\n\nOur design team works with you to create the perfect solution for your space and brand.",
      isUser: false,
      quickReplies: [
        { title: "Design Consultation", next: "design_consultation" },
        { title: "Custom Quote", next: "custom_quote" },
        { title: "View Custom Projects", next: "custom_gallery" },
        { title: "Technical Requirements", next: "technical_requirements" }
      ]
    },
    /*compare_displays: {
      text: "📋 Indoor vs Outdoor LED Displays:\n\n🏢 INDOOR:\n• Resolution: Up to 8K\n• Brightness: 500-1500 nits\n• Price: From $2,500\n• Best for: Controlled environments\n\n🌞 OUTDOOR:\n• Resolution: Up to 4K\n• Brightness: 5000-8000 nits\n• Price: From $5,000\n• Best for: All weather conditions\n\nWhich environment suits your needs?",
      isUser: false,
      quickReplies: [
        { title: "Choose Indoor", next: "indoor_led" },
        { title: "Choose Outdoor", next: "outdoor_led" },
        { title: "Need Both", next: "dual_solution" },
        { title: "Get Comparison Sheet", next: "comparison_sheet" }
      ]
    },*/
    indoor_gallery: {
      text: "🖼️ Indoor LED Display Gallery:\n\n🏪 Retail Success Stories:\n• 40% increase in customer engagement\n• Dynamic product showcases\n• Real-time promotional updates\n\n🏢 Corporate Installations:\n• Impressive lobby displays\n• Interactive meeting rooms\n• Employee communication hubs\n\nWould you like to see specific case studies?",
      isUser: false,
      quickReplies: [
        { title: "Schedule Site Visit", next: "site_visit" },
        { title: "Get Indoor Quote", next: "request_quote" }
      ]
    },
    outdoor_gallery: {
      text: "🌟 Outdoor LED Display Gallery:\n\n🏟️ Stadium Installations:\n• Massive video walls\n• Real-time sports updates\n• Fan engagement displays\n\n📢 Billboard Solutions:\n• High-impact advertising\n• Dynamic content rotation\n• Weather-resistant performance\n\nExplore our outdoor success stories:",
      isUser: false,
      quickReplies: [
      
        { title: "Get Outdoor Quote", next: "request_quote" }
      ]
    },
   /* weather_resistance: {
      text: "🌧️ Weather Resistance Technology:\n\n🛡️ Protection Features:\n• IP65+ waterproof rating\n• Temperature range: -40°C to +85°C\n• UV-resistant materials\n• Anti-corrosion coating\n• Lightning protection\n\n🧪 Testing Standards:\n• 1000+ hours salt spray testing\n• Extreme temperature cycling\n• Vibration & shock resistance\n\nYour display will perform reliably in any weather!",
      isUser: false,
      quickReplies: [
        { title: "See Test Results", next: "test_results" },
        { title: "Warranty Information", next: "warranty_info" },
        { title: "Get Outdoor Quote", next: "request_quote" },
        { title: "Installation Process", next: "installation_process" }
      ]
    },
    design_consultation: {
      text: "🎨 Free Design Consultation:\n\nOur design experts will help you create the perfect display solution:\n\n✅ Site assessment & measurements\n✅ 3D visualization & mockups\n✅ Content strategy recommendations\n✅ Technical specifications\n✅ Installation planning\n\nLet's schedule your consultation:",
      isUser: false,
      inputFields: [
        { title: "Project location", field: "location" },
        { title: "Your name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Project description", field: "question" }
      ]
    },*/
    /*installation_support: {
      text: "🔧 Professional Installation & Support:\n\n📋 Our comprehensive service includes:\n\n✅ Site survey & planning\n✅ Professional installation\n✅ System configuration & testing\n✅ Staff training\n✅ Ongoing maintenance\n✅ 24/7 technical support\n✅ Remote monitoring\n✅ Warranty coverage\n\nWhat type of support do you need?",
      isUser: false,
      quickReplies: [
        { title: "🏗️ New Installation", next: "new_installation" },
        { title: "🔧 Maintenance Service", next: "maintenance_service" },
        { title: "📞 Technical Support", next: "technical_support" },
        { title: "📚 Training Programs", next: "training_programs" }
      ]
    },
    new_installation: {
      text: "🏗️ New Installation Process:\n\n📅 Timeline (2-4 weeks):\n\n1️⃣ Site Survey (Day 1-2)\n• Technical assessment\n• Structural analysis\n• Power & connectivity planning\n\n2️⃣ Design & Approval (Week 1)\n• Custom design creation\n• Client approval process\n\n3️⃣ Installation (Week 2-3)\n• Professional mounting\n• System integration\n• Testing & calibration\n\n4️⃣ Training & Handover (Week 4)\n• Staff training\n• Documentation delivery\n\nReady to start your project?",
      isUser: false,
      quickReplies: [
        { title: "Schedule Site Survey", next: "site_survey" },
        { title: "Get Installation Quote", next: "installation_quote" },
        { title: "View Installation Gallery", next: "installation_gallery" },
        { title: "Emergency Installation", next: "emergency_installation" }
      ]
    },
    maintenance_service: {
      text: "🔧 Maintenance & Support Plans:\n\n🛡️ BASIC PLAN ($99/month):\n• Quarterly inspections\n• Remote monitoring\n• Email support\n• Software updates\n\n⭐ PREMIUM PLAN ($199/month):\n• Monthly inspections\n• 24/7 monitoring\n• Priority phone support\n• On-site repairs\n• Preventive maintenance\n\n🏆 ENTERPRISE PLAN (Custom):\n• Weekly inspections\n• Dedicated technician\n• Same-day response\n• Spare parts included\n\nWhich plan suits your needs?",
      isUser: false,
      quickReplies: [
        { title: "Choose Basic Plan", next: "basic_plan" },
        { title: "Choose Premium Plan", next: "premium_plan" },
        { title: "Enterprise Quote", next: "enterprise_quote" },
        { title: "Compare All Plans", next: "compare_plans" }
      ]
    },
    technical_support: {
      text: "📞 24/7 Technical Support:\n\n🚨 EMERGENCY SUPPORT:\n• Hardware failures\n• System outages\n• Critical issues\n• Response time: <2 hours\n\n🔧 STANDARD SUPPORT:\n• Software issues\n• Configuration help\n• Performance optimization\n• Response time: <24 hours\n\n📚 SELF-SERVICE:\n• Online knowledge base\n• Video tutorials\n• Remote diagnostics\n• Community forums\n\nWhat type of support do you need?",
      isUser: false,
      quickReplies: [
        { title: "Report Emergency", next: "emergency_support" },
        { title: "Standard Support", next: "standard_support" },
        { title: "Access Knowledge Base", next: "knowledge_base" },
        { title: "Schedule Training", next: "training_programs" }
      ]
    },
    training_programs: {
      text: "📚 Training Programs:\n\n👨‍🏫 BASIC TRAINING (2 hours):\n• System overview\n• Content uploading\n• Basic troubleshooting\n• Cost: Included with installation\n\n🎓 ADVANCED TRAINING (1 day):\n• Advanced features\n• Content creation\n• System administration\n• Analytics & reporting\n• Cost: $500\n\n🏆 CERTIFICATION PROGRAM (3 days):\n• Complete system mastery\n• Technical certification\n• Ongoing support access\n• Cost: $1,500\n\nWhich training level interests you?",
      isUser: false,
      quickReplies: [
        { title: "Basic Training", next: "basic_training" },
        { title: "Advanced Training", next: "advanced_training" },
        { title: "Certification Program", next: "certification_program" },
        { title: "Custom Training", next: "custom_training" }
      ]
    },
    site_survey: {
      text: "📋 Free Site Survey:\n\nOur certified technicians will visit your location to:\n\n✅ Assess structural requirements\n✅ Evaluate power & connectivity\n✅ Measure installation space\n✅ Identify potential challenges\n✅ Provide detailed recommendations\n✅ Create installation timeline\n\nSchedule your free site survey:",
      isUser: false,
      inputFields: [
        { title: "Site address", field: "location" },
        { title: "Contact person", field: "name" },
        { title: "Email", field: "email" },
        { title: "Preferred date/time", field: "installationTimeline" },
        { title: "Project details", field: "question" }
      ]
    },
    installation_quote: {
      text: "💰 Installation Quote Request:\n\nTo provide an accurate quote, we need some details about your project:\n\n📏 Display specifications\n📍 Installation location\n🔌 Power requirements\n🏗️ Mounting complexity\n⏰ Timeline requirements\n\nLet's gather your project details:",
      isUser: false,
      inputFields: [
        { title: "Display size/type needed", field: "productsServices" },
        { title: "Installation location", field: "location" },
        { title: "Your name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Project timeline", field: "installationTimeline" },
        { title: "Special requirements", field: "question" }
      ]
    },*/
    ai_iot_solutions: {
      text: "🚀 Explore our innovative technology solutions designed to enhance your business operations and customer experience. Choose a category:",
      isUser: false,
      quickReplies: [
        { title: "🎶 In-store Music + AI Promotions", next: "in_store_music" },
        { title: "🧠 Content Management System (CMS)", next: "cms" },
        { title: "🚗 AI Virtual Assistant for Drive-Thru", next: "ai_drive_thru" },
        { title: "📡 IoT Sensors & Smart Integrations", next: "iot_sensors" }
      ]
    },
    in_store_music: {
      text: "🎵 Transform your retail atmosphere with our AI-powered in-store music system:\n\n✅ Curated playlists for different times of day\n✅ AI-driven promotional content integration\n✅ Customer demographic analysis\n✅ Mood-based music selection\n\nWould you like a demo?",
      isUser: false,
      quickReplies: [
        { title: "Schedule Demo", next: "schedule_demo" },
        { title: "Get Pricing", next: "request_quote" },
        { title: "Learn More", next: "more_info_music" }
      ]
    },
    cms: {
      text: "🧠 Our Content Management System offers:\n\n✅ Cloud-based remote management\n✅ Real-time content updates\n✅ Multi-display network control\n✅ Advanced scheduling & analytics\n✅ User role management\n\nWhat would you like to know?",
      isUser: false,
      quickReplies: [
        { title: "See Demo", next: "schedule_demo" },
        { title: "Pricing Details", next: "request_quote" },
        { title: "Technical Specs", next: "spec_sheet" }
      ]
    },
    ai_drive_thru: {
      text: "🚗 AI Virtual Assistant for Drive-Thru:\n\n✅ Natural language processing\n✅ Order accuracy improvement\n✅ Reduced wait times\n✅ 24/7 operation capability\n✅ Multi-language support\n\nPerfect for QSR and fast-food chains. Interested in a pilot program?",
      isUser: false,
      quickReplies: [
        { title: "Pilot Program", next: "pilot_program" },
        { title: "ROI Calculator", next: "roi_calculator" },
        { title: "Request Quote", next: "request_quote" }
      ]
    },
    iot_sensors: {
      text: "📡 IoT Sensors & Smart Integrations:\n\n✅ People counting sensors\n✅ Environmental monitoring\n✅ Traffic flow analysis\n✅ Real-time data integration\n✅ Custom dashboard analytics\n\nIntegrate with existing systems for smart building solutions. What's your use case?",
      isUser: false,
      quickReplies: [
        { title: "Retail Analytics", next: "retail_analytics" },
        { title: "Smart Building", next: "smart_building" },
        { title: "Custom Integration", next: "custom_integration" }
      ]
    },
    schedule_demo: {
      text: "📅 Great! I'd love to schedule a personalized demo for you. Please provide your details and our team will contact you within 24 hours to arrange a convenient time.",
      isUser: false,
      inputFields: [
        { title: "Your name", field: "name" },
        { title: "Email address", field: "email" },
        { title: "Company name", field: "businessType" },
        { title: "Preferred demo focus", field: "productsServices" }
      ]
    },
    more_info_music: {
      text: "🎵 Our In-Store Music + AI system includes:\n\n🎯 Demographic-based playlist selection\n📊 Customer behavior analytics\n🔄 Seamless promotional content integration\n⏰ Automated dayparting\n📱 Mobile app control\n\nWould you like to see how it works in a live environment?",
      isUser: false,
      quickReplies: [
        { title: "Live Demo", next: "schedule_demo" },
        { title: "Case Studies", next: "case_studies" },
        { title: "Get Quote", next: "request_quote" }
      ]
    },
    spec_sheet: {
      text: "📋 Technical Specifications:\n\n🖥️ Cloud-based architecture\n📱 Mobile & web interfaces\n🔒 Enterprise-grade security\n📊 Real-time analytics dashboard\n🔄 API integrations\n⚡ 99.9% uptime guarantee\n\nWould you like detailed documentation?",
      isUser: false,
      quickReplies: [
        { title: "Download Specs", next: "schedule_demo" },
        { title: "Schedule Demo", next: "schedule_demo" },
        { title: "Get Quote", next: "request_quote" }
      ]
    },
    pilot_program: {
      text: "🚀 Our AI Drive-Thru Pilot Program includes:\n\n✅ 30-day free trial\n✅ Full installation and setup\n✅ Training for your staff\n✅ Performance analytics\n✅ No long-term commitment\n\nLet's get you started!",
      isUser: false,
      inputFields: [
        { title: "Restaurant name", field: "businessType" },
        { title: "Location", field: "location" },
        { title: "Contact email", field: "email" },
        { title: "Current daily drive-thru volume", field: "question" }
      ]
    },
    roi_calculator: {
      text: "💰 ROI Calculator for AI Drive-Thru:\n\nTypical results:\n• 25% faster order processing\n• 15% increase in order accuracy\n• 30% reduction in labor costs\n• 20% increase in customer satisfaction\n\nLet's calculate your specific ROI:",
      isUser: false,
      inputFields: [
        { title: "Daily drive-thru orders", field: "question" },
        { title: "Average order value", field: "productsServices" },
        { title: "Contact email for results", field: "email" }
      ]
    },
    retail_analytics: {
      text: "🛍️ Retail Analytics with IoT:\n\n📊 Customer traffic patterns\n⏱️ Dwell time analysis\n🎯 Heat mapping\n📈 Conversion rate optimization\n🔄 Real-time inventory alerts\n\nTransform your retail space into a data-driven environment!",
      isUser: false,
      quickReplies: [
        { title: "See Demo", next: "schedule_demo" },
        { title: "Pricing", next: "request_quote" },
        { title: "Case Study", next: "case_studies" }
      ]
    },
    smart_building: {
      text: "🏢 Smart Building Solutions:\n\n🌡️ Climate monitoring\n💡 Energy optimization\n🚶 Occupancy tracking\n🔒 Security integration\n📱 Mobile app control\n\nCreate an intelligent, efficient building ecosystem!",
      isUser: false,
      quickReplies: [
        { title: "Building Assessment", next: "building_assessment" },
        { title: "Energy Savings Calculator", next: "energy_calculator" },
        { title: "Get Quote", next: "request_quote" }
      ]
    },
    custom_integration: {
      text: "🔧 Custom IoT Integration:\n\nWe specialize in:\n✅ API development\n✅ Legacy system integration\n✅ Custom sensor deployment\n✅ Real-time dashboards\n✅ Scalable architecture\n\nTell us about your specific requirements:",
      isUser: false,
      inputFields: [
        { title: "Your name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Current systems to integrate", field: "productsServices" },
        { title: "Integration goals", field: "question" }
      ]
    },
    case_studies: {
      text: "📚 Success Stories:\n\n🏪 Retail Chain: 40% increase in sales with targeted music\n🍔 QSR: 60% faster drive-thru with AI assistant\n🏢 Corporate: 35% energy savings with smart sensors\n\nWould you like detailed case studies sent to your email?",
      isUser: false,
      inputFields: [
        { title: "Your email", field: "email" },
        { title: "Industry of interest", field: "businessType" }
      ]
    },
    building_assessment: {
      text: "🏗️ Free Building Assessment:\n\nOur experts will evaluate:\n✅ Current energy usage\n✅ Optimization opportunities\n✅ ROI projections\n✅ Implementation timeline\n\nSchedule your free assessment:",
      isUser: false,
      inputFields: [
        { title: "Building location", field: "location" },
        { title: "Contact person", field: "name" },
        { title: "Email", field: "email" },
        { title: "Building size (sq ft)", field: "question" }
      ]
    },
    energy_calculator: {
      text: "⚡ Energy Savings Calculator:\n\nTypical smart building savings:\n• 20-35% reduction in energy costs\n• 15-25% improvement in efficiency\n• 2-3 year ROI payback\n\nLet's calculate your potential savings:",
      isUser: false,
      inputFields: [
        { title: "Monthly energy bill", field: "question" },
        { title: "Building type", field: "businessType" },
        { title: "Email for results", field: "email" }
      ]
    },
    installation_support: {
      text: "Our expert team handles everything from site surveys to installation and maintenance. Where is your business located?",
      isUser: false,
      inputFields: [
        { title: "📍 Your location", field: "location" }
      ]
    },
    schedule_consultation: {
      text: "📅 Perfect! Let's schedule your consultation. Our local technician will assess your space and provide recommendations.",
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
        to_email: 'admin@hapogroup.co.za'
      };

      console.log('Attempting to send email with data:', emailData);
      
      const success = await sendEmail(emailData);
      
      if (success) {
        setEmailStatus('✅ Email sent successfully!');
        console.log('Email sent successfully to admin@hapogroup.co.za');
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

    // Reset form immediately after extracting data, before state updates
    e.currentTarget.reset();

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
    } else if (currentStep === 'schedule_demo' || currentStep === 'pilot_program' || currentStep === 'roi_calculator' || currentStep === 'custom_integration' || currentStep === 'case_studies' || currentStep === 'building_assessment' || currentStep === 'energy_calculator' || currentStep === 'spec_sheet') {
      // Send email for demo/consultation requests
      await sendEmailNotification('Demo/Consultation Request', updatedUserInfo);
      
      simulateTyping({
        text: "✅ Thank you! Our team has received your request and will contact you within 24 hours. We've sent your details to our specialists.",
        isUser: false
      });
    } else if (currentStep === 'schedule_consultation') {
      // Send email for consultation scheduling
      await sendEmailNotification('Consultation Scheduling', updatedUserInfo);
      
      simulateTyping({
        text: "✅ Consultation scheduled! Our local technician will contact you to confirm the appointment details.",
        isUser: false
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
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:w-96 bg-white rounded-lg shadow-xl max-w-sm sm:max-w-none mx-auto sm:mx-0"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <img
                  src="/HapoPrimary.jpg"
                  alt="Hapo"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h3 className="text-base sm:text-lg font-semibold">Chat with Hapo</h3>
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

            <div className="h-80 sm:h-96 overflow-y-auto p-4 space-y-4">
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
                    <p className="whitespace-pre-line text-sm sm:text-base">{message.text}</p>
                    {message.quickReplies && (
                      <div className="mt-3 space-y-2">
                        {message.quickReplies.map((reply, replyIndex) => (
                          <button
                            key={replyIndex}
                            onClick={() => handleQuickReply(reply)}
                            className="block w-full text-left p-2 rounded bg-white hover:bg-gray-50 transition-colors duration-200 text-sm"
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
                  {messages[messages.length - 1].inputFields?.map((field, index) => (
                    <input
                      key={index}
                      type={field.field === 'email' ? 'email' : 'text'}
                      name={field.field}
                      placeholder={field.title}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors duration-300 text-sm"
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