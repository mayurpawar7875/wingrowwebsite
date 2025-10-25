export type Language = 'en' | 'mr' | 'hi';

export const translations = {
  en: {
    // Navigation & Header
    languageSelector: "Language",
    
    // Hero Section
    heroTitle: "Fresh. Local. Sustainable.",
    heroSubtitle: "Connecting farmers, women entrepreneurs & consumers directly through weekly markets",
    bookStall: "Book a Stall",
    visitMarkets: "Visit Our Markets",
    bookYourStall: "Book Your Stall",
    
    // Markets Section
    marketsTitle: "Our Markets in Pune and Mumbai",
    marketsSubtitle: "Find fresh, local produce at our {count} weekly markets across Maharashtra",
    puneMarkets: "Pune Markets",
    mumbaiMarkets: "Mumbai Markets",
    viewDetails: "View Details",
    findUsOnMap: "Find Us on the Map",
    saturday: "Saturday",
    sunday: "Sunday",
    
    // About Section
    aboutTitle: "About Wingrow Market",
    aboutSubtitle: "Empowering farmers and women entrepreneurs across Maharashtra",
    aboutDescription: "Founded by Vrunda Borkar and Mayur Pawar, Wingrow Market bridges the gap between local farmers, women self-help groups, and conscious consumers. We provide a platform for direct trade, ensuring fair prices for producers and fresh, quality products for customers.",
    weeklyMarkets: "Weekly Markets",
    farmers: "Farmers",
    womenSHGs: "Women SHGs",
    revenueGenerated: "Revenue Generated",
    
    // Testimonials Section
    testimonialsTitle: "What Our Community Says",
    testimonialsSubtitle: "Real stories from farmers, entrepreneurs, and customers",
    videoTestimonials: "Video Testimonials",
    liveGoogleReviews: "Live Google Reviews",
    
    // Contact Form
    contactTitle: "Get in Touch",
    contactSubtitle: "Have questions? We'd love to hear from you",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourMessage: "Your Message",
    sendMessage: "Send Message",
    contactInfo: "Contact Information",
    email: "Email",
    phone: "Phone",
    headquarters: "Headquarters",
    
    // Footer
    quickLinks: "Quick Links",
    home: "Home",
    markets: "Markets",
    bookAStall: "Book a Stall",
    contactUs: "Contact Us",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved.",
    
    // Chatbot
    chatbotTitle: "Wingrow Assistant - Book Your Stall",
    chatbotHeader: "Book Your Stall at Wingrow Market",
    bookingThankYou: "Thank you for booking! Our team will contact you soon.",
    farmerName: "Farmer / Business Name",
    address: "Address",
    phoneNumber: "Phone Number",
    producerType: "Producer Type",
    stallType: "Stall Type",
    selectCity: "Select City",
    selectMarket: "Select Market",
    preferredDate: "Preferred Market Date",
    notes: "Additional Notes (Optional)",
    consent: "I agree to be contacted by Wingrow Market regarding my stall booking.",
    submitBooking: "Submit Booking",
    submitting: "Submitting...",
    
    // Form Placeholders & Options
    enterYourName: "Enter your name",
    enterYourAddress: "Enter your full address",
    tenDigitNumber: "10-digit mobile number",
    selectProducerType: "Select producer type",
    selectStallType: "Select stall type",
    chooseCity: "Choose city",
    chooseMarket: "Choose market location",
    pickDate: "Pick a date",
    anySpecialRequirements: "Any special requirements or questions?",
    
    // Producer Types
    producerFarmer: "Farmer",
    producerWSHG: "Women Self-Help Group",
    producerFoodProcessor: "Food Processor",
    producerOther: "Other",
    
    // Stall Types
    stallVegetables: "Vegetables",
    stallFruits: "Fruits",
    stallGrainsPulses: "Grains/Pulses",
    stallMillets: "Millets",
    stallProcessedFoods: "Processed Foods",
    stallOther: "Other",
    
    // Success Message
    bookingSuccessful: "Booking Successful!",
    yourReferenceId: "Your reference ID:",
    bookingSummary: "Booking Summary:",
    summaryName: "Name",
    summaryPhone: "Phone",
    summaryMarket: "Market",
    summaryDate: "Date",
    contactSoon: "We'll contact you soon to confirm your booking details.",
    bookAnother: "Book Another Stall",
    
    // Validation Errors
    nameRequired: "Name is required",
    addressRequired: "Address is required",
    validPhoneRequired: "Valid 10-digit phone number required",
    producerTypeRequired: "Producer type is required",
    stallTypeRequired: "Stall type is required",
    cityRequired: "City is required",
    marketRequired: "Market is required",
    dateRequired: "Preferred date is required",
    consentRequired: "You must agree to be contacted",
    fillAllFields: "Please fill all required fields correctly",
    
    // Toast Messages
    submissionSuccess: "Booking submitted successfully!",
    submissionFailed: "Submission failed. Please try again or contact us directly.",
    
    // Cities
    pune: "Pune",
    mumbai: "Mumbai",
    
    // Market Names - Pune
    kharadiMarket: "Kharadi Market",
    hadapsarMarket: "Hadapsar Market",
    magarpattaMarket: "Magarpatta Market",
    ivyEstateMarket: "Ivy Estate Market",
    banerMarket: "Baner Market",
    wakadMarket: "Wakad Market",
    aundhMarket: "Aundh Market",
    pimpleSaudagarMarket: "Pimple Saudagar Market",
    kalyaniNagarMarket: "Kalyani Nagar Market",
    vimanNagarMarket: "Viman Nagar Market",
    kothrudMarket: "Kothrud Market",
    shivajiNagarMarket: "Shivaji Nagar Market",
    katrajMarket: "Katraj Market",
    warjeMarket: "Warje Market",
    undriMarket: "Undri Market",
    kondhwaMarket: "Kondhwa Market",
    hinjewadiMarket: "Hinjewadi Market",
    pashanMarket: "Pashan Market",
    bavdhanMarket: "Bavdhan Market",
    susMarket: "Sus Market",
    pimpriMarket: "Pimpri Market",
    chinchwadMarket: "Chinchwad Market",
    nigdiMarket: "Nigdi Market",
    
    // Market Names - Mumbai
    dombivliMarket: "Dombivli Market",
    thaneMarket: "Thane Market",
    mulundMarket: "Mulund Market",
    ghatkoperMarket: "Ghatkopar Market",
    borivaliMarket: "Borivali Market",
    chemburMarket: "Chembur Market",
    andheriMarket: "Andheri Market",
    kandivaliMarket: "Kandivali Market",
    maladMarket: "Malad Market",
    goregaonMarket: "Goregaon Market",
    dahisarMarket: "Dahisar Market",
    miraRoadMarket: "Mira Road Market",
    bhandupMarket: "Bhandup Market",
    vikhroliMarket: "Vikhroli Market",
    powaiMarket: "Powai Market",
    kurlaMarket: "Kurla Market",
    vashiMarket: "Vashi Market",
    khargharMarket: "Kharghar Market",
    panvelMarket: "Panvel Market",
    nerulMarket: "Nerul Market",
    airoliMarket: "Airoli Market",
    sanpadaMarket: "Sanpada Market",
    koparKhairaneMarket: "Kopar Khairane Market",
  },
  
  mr: {
    // Navigation & Header
    languageSelector: "भाषा",
    
    // Hero Section
    heroTitle: "ताजे. स्थानिक. टिकाऊ.",
    heroSubtitle: "साप्ताहिक बाजारांद्वारे शेतकरी, महिला उद्योजक आणि ग्राहकांना थेट जोडत आहोत",
    bookStall: "स्टॉल बुक करा",
    visitMarkets: "आमच्या बाजारांना भेट द्या",
    bookYourStall: "तुमचे स्टॉल बुक करा",
    
    // Markets Section
    marketsTitle: "पुणे आणि मुंबईतील आमचे बाजार",
    marketsSubtitle: "महाराष्ट्रभर आमच्या {count} साप्ताहिक बाजारांमध्ये ताजे, स्थानिक उत्पादन मिळवा",
    puneMarkets: "पुणे बाजार",
    mumbaiMarkets: "मुंबई बाजार",
    viewDetails: "तपशील पहा",
    findUsOnMap: "नकाशावर आम्हाला शोधा",
    saturday: "शनिवार",
    sunday: "रविवार",
    
    // About Section
    aboutTitle: "विंग्रो मार्केट बद्दल",
    aboutSubtitle: "महाराष्ट्रभरातील शेतकरी आणि महिला उद्योजकांना सशक्त करत आहोत",
    aboutDescription: "वृंदा बोरकर आणि मयूर पवार यांनी स्थापन केलेली, विंग्रो मार्केट स्थानिक शेतकरी, महिला स्वयंसहाय्यता गट आणि जागरूक ग्राहकांमधील अंतर कमी करते. आम्ही थेट व्यापारासाठी व्यासपीठ प्रदान करतो, उत्पादकांसाठी योग्य किंमत आणि ग्राहकांसाठी ताजे, दर्जेदार उत्पादने सुनिश्चित करतो.",
    weeklyMarkets: "साप्ताहिक बाजार",
    farmers: "शेतकरी",
    womenSHGs: "महिला SHG",
    revenueGenerated: "उत्पन्न निर्माण",
    
    // Testimonials Section
    testimonialsTitle: "आमचा समुदाय काय म्हणतो",
    testimonialsSubtitle: "शेतकरी, उद्योजक आणि ग्राहकांच्या खऱ्या कथा",
    videoTestimonials: "व्हिडिओ प्रशस्तिपत्रे",
    liveGoogleReviews: "लाइव्ह Google Reviews",
    
    // Contact Form
    contactTitle: "संपर्कात रहा",
    contactSubtitle: "प्रश्न आहेत? आम्हाला तुमच्याकडून ऐकायला आवडेल",
    yourName: "तुमचे नाव",
    yourEmail: "तुमचा ईमेल",
    yourMessage: "तुमचा संदेश",
    sendMessage: "संदेश पाठवा",
    contactInfo: "संपर्क माहिती",
    email: "ईमेल",
    phone: "फोन",
    headquarters: "मुख्यालय",
    
    // Footer
    quickLinks: "द्रुत दुवे",
    home: "मुख्यपृष्ठ",
    markets: "बाजार",
    bookAStall: "स्टॉल बुक करा",
    contactUs: "संपर्क साधा",
    followUs: "आम्हाला फॉलो करा",
    allRightsReserved: "सर्व हक्क राखीव.",
    
    // Chatbot
    chatbotTitle: "विंग्रो सहाय्यक - तुमचे स्टॉल बुक करा",
    chatbotHeader: "विंग्रो मार्केटमध्ये तुमचे स्टॉल बुक करा",
    bookingThankYou: "बुकिंगसाठी धन्यवाद! आमची टीम लवकरच तुमच्याशी संपर्क साधेल.",
    farmerName: "शेतकरी / व्यवसाय नाव",
    address: "पत्ता",
    phoneNumber: "फोन नंबर",
    producerType: "उत्पादक प्रकार",
    stallType: "स्टॉल प्रकार",
    selectCity: "शहर निवडा",
    selectMarket: "बाजार निवडा",
    preferredDate: "पसंतीची बाजार तारीख",
    notes: "अतिरिक्त टिपा (पर्यायी)",
    consent: "मी विंग्रो मार्केटद्वारे माझ्या स्टॉल बुकिंगसंदर्भात संपर्क साधण्यास सहमत आहे.",
    submitBooking: "बुकिंग सबमिट करा",
    submitting: "सबमिट करत आहे...",
    
    // Form Placeholders & Options
    enterYourName: "तुमचे नाव टाका",
    enterYourAddress: "तुमचा संपूर्ण पत्ता टाका",
    tenDigitNumber: "१०-अंकी मोबाइल नंबर",
    selectProducerType: "उत्पादक प्रकार निवडा",
    selectStallType: "स्टॉल प्रकार निवडा",
    chooseCity: "शहर निवडा",
    chooseMarket: "बाजार स्थान निवडा",
    pickDate: "तारीख निवडा",
    anySpecialRequirements: "काही विशेष आवश्यकता किंवा प्रश्न?",
    
    // Producer Types
    producerFarmer: "शेतकरी",
    producerWSHG: "महिला स्वयंसहाय्यता गट",
    producerFoodProcessor: "अन्न प्रक्रिया",
    producerOther: "इतर",
    
    // Stall Types
    stallVegetables: "भाज्या",
    stallFruits: "फळे",
    stallGrainsPulses: "धान्य/डाळी",
    stallMillets: "ज्वारीभाजरी",
    stallProcessedFoods: "प्रक्रिया केलेले अन्न",
    stallOther: "इतर",
    
    // Success Message
    bookingSuccessful: "बुकिंग यशस्वी!",
    yourReferenceId: "तुमचा संदर्भ क्रमांक:",
    bookingSummary: "बुकिंग सारांश:",
    summaryName: "नाव",
    summaryPhone: "फोन",
    summaryMarket: "बाजार",
    summaryDate: "तारीख",
    contactSoon: "तुमच्या बुकिंगच्या तपशीलाची पुष्टी करण्यासाठी आम्ही लवकरच संपर्क साधू.",
    bookAnother: "दुसरे स्टॉल बुक करा",
    
    // Validation Errors
    nameRequired: "नाव आवश्यक आहे",
    addressRequired: "पत्ता आवश्यक आहे",
    validPhoneRequired: "वैध १०-अंकी फोन नंबर आवश्यक आहे",
    producerTypeRequired: "उत्पादक प्रकार आवश्यक आहे",
    stallTypeRequired: "स्टॉल प्रकार आवश्यक आहे",
    cityRequired: "शहर आवश्यक आहे",
    marketRequired: "बाजार आवश्यक आहे",
    dateRequired: "पसंतीची तारीख आवश्यक आहे",
    consentRequired: "तुम्ही संपर्क साधण्यास सहमत असले पाहिजे",
    fillAllFields: "कृपया सर्व आवश्यक फील्ड योग्यरित्या भरा",
    
    // Toast Messages
    submissionSuccess: "बुकिंग यशस्वीरित्या सबमिट केले!",
    submissionFailed: "सबमिशन अयशस्वी. कृपया पुन्हा प्रयत्न करा किंवा आम्हाला थेट संपर्क साधा.",
    
    // Cities
    pune: "पुणे",
    mumbai: "मुंबई",
    
    // Market Names - Pune
    kharadiMarket: "खराडी बाजार",
    hadapsarMarket: "हडपसर बाजार",
    magarpattaMarket: "मगरपट्टा बाजार",
    ivyEstateMarket: "आयव्ही इस्टेट बाजार",
    banerMarket: "बाणेर बाजार",
    wakadMarket: "वाकड बाजार",
    aundhMarket: "औंध बाजार",
    pimpleSaudagarMarket: "पिंपळे सौदागर बाजार",
    kalyaniNagarMarket: "कल्याणी नगर बाजार",
    vimanNagarMarket: "विमान नगर बाजार",
    kothrudMarket: "कोथरूड बाजार",
    shivajiNagarMarket: "शिवाजी नगर बाजार",
    katrajMarket: "कात्रज बाजार",
    warjeMarket: "वारजे बाजार",
    undriMarket: "उंदरी बाजार",
    kondhwaMarket: "कोंढवा बाजार",
    hinjewadiMarket: "हिंजवडी बाजार",
    pashanMarket: "पाषाण बाजार",
    bavdhanMarket: "बावधन बाजार",
    susMarket: "सस बाजार",
    pimpriMarket: "पिंपरी बाजार",
    chinchwadMarket: "चिंचवड बाजार",
    nigdiMarket: "निगडी बाजार",
    
    // Market Names - Mumbai
    dombivliMarket: "डोंबिवली बाजार",
    thaneMarket: "ठाणे बाजार",
    mulundMarket: "मुलुंड बाजार",
    ghatkoperMarket: "घाटकोपर बाजार",
    borivaliMarket: "बोरिवली बाजार",
    chemburMarket: "चेंबूर बाजार",
    andheriMarket: "अंधेरी बाजार",
    kandivaliMarket: "कांदिवली बाजार",
    maladMarket: "मलाड बाजार",
    goregaonMarket: "गोरेगाव बाजार",
    dahisarMarket: "दहिसर बाजार",
    miraRoadMarket: "मीरा रोड बाजार",
    bhandupMarket: "भांडुप बाजार",
    vikhroliMarket: "विखरोली बाजार",
    powaiMarket: "पवई बाजार",
    kurlaMarket: "कुर्ला बाजार",
    vashiMarket: "वाशी बाजार",
    khargharMarket: "खारघर बाजार",
    panvelMarket: "पनवेल बाजार",
    nerulMarket: "नेरूळ बाजार",
    airoliMarket: "एअरोली बाजार",
    sanpadaMarket: "सानपाडा बाजार",
    koparKhairaneMarket: "कोपर खैराणे बाजार",
  },
  
  hi: {
    // Navigation & Header
    languageSelector: "भाषा",
    
    // Hero Section
    heroTitle: "ताज़ा. स्थानीय. टिकाऊ.",
    heroSubtitle: "साप्ताहिक बाजारों के माध्यम से किसानों, महिला उद्यमियों और उपभोक्ताओं को सीधे जोड़ना",
    bookStall: "स्टॉल बुक करें",
    visitMarkets: "हमारे बाजारों में आएं",
    bookYourStall: "अपना स्टॉल बुक करें",
    
    // Markets Section
    marketsTitle: "पुणे और मुंबई में हमारे बाजार",
    marketsSubtitle: "महाराष्ट्र भर में हमारे {count} साप्ताहिक बाजारों में ताज़ा, स्थानीय उत्पाद पाएं",
    puneMarkets: "पुणे के बाजार",
    mumbaiMarkets: "मुंबई के बाजार",
    viewDetails: "विवरण देखें",
    findUsOnMap: "नक्शे पर हमें खोजें",
    saturday: "शनिवार",
    sunday: "रविवार",
    
    // About Section
    aboutTitle: "विंग्रो मार्केट के बारे में",
    aboutSubtitle: "महाराष्ट्र भर में किसानों और महिला उद्यमियों को सशक्त बनाना",
    aboutDescription: "वृंदा बोरकर और मयूर पवार द्वारा स्थापित, विंग्रो मार्केट स्थानीय किसानों, महिला स्वयं सहायता समूहों और जागरूक उपभोक्ताओं के बीच की खाई को पाटता है। हम प्रत्यक्ष व्यापार के लिए एक मंच प्रदान करते हैं, उत्पादकों के लिए उचित मूल्य और ग्राहकों के लिए ताज़ा, गुणवत्ता उत्पाद सुनिश्चित करते हैं।",
    weeklyMarkets: "साप्ताहिक बाजार",
    farmers: "किसान",
    womenSHGs: "महिला SHG",
    revenueGenerated: "राजस्व उत्पन्न",
    
    // Testimonials Section
    testimonialsTitle: "हमारा समुदाय क्या कहता है",
    testimonialsSubtitle: "किसानों, उद्यमियों और ग्राहकों की वास्तविक कहानियां",
    videoTestimonials: "वीडियो प्रशंसापत्र",
    liveGoogleReviews: "लाइव Google समीक्षाएं",
    
    // Contact Form
    contactTitle: "संपर्क में रहें",
    contactSubtitle: "सवाल हैं? हम आपसे सुनना पसंद करेंगे",
    yourName: "आपका नाम",
    yourEmail: "आपका ईमेल",
    yourMessage: "आपका संदेश",
    sendMessage: "संदेश भेजें",
    contactInfo: "संपर्क जानकारी",
    email: "ईमेल",
    phone: "फोन",
    headquarters: "मुख्यालय",
    
    // Footer
    quickLinks: "त्वरित लिंक",
    home: "होम",
    markets: "बाजार",
    bookAStall: "स्टॉल बुक करें",
    contactUs: "संपर्क करें",
    followUs: "हमें फॉलो करें",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
    
    // Chatbot
    chatbotTitle: "विंग्रो सहायक - अपना स्टॉल बुक करें",
    chatbotHeader: "विंग्रो मार्केट में अपना स्टॉल बुक करें",
    bookingThankYou: "बुकिंग के लिए धन्यवाद! हमारी टीम जल्द ही आपसे संपर्क करेगी.",
    farmerName: "किसान / व्यवसाय का नाम",
    address: "पता",
    phoneNumber: "फोन नंबर",
    producerType: "उत्पादक प्रकार",
    stallType: "स्टॉल प्रकार",
    selectCity: "शहर चुनें",
    selectMarket: "बाजार चुनें",
    preferredDate: "पसंदीदा बाजार तारीख",
    notes: "अतिरिक्त नोट्स (वैकल्पिक)",
    consent: "मैं अपनी स्टॉल बुकिंग के संबंध में विंग्रो मार्केट द्वारा संपर्क किए जाने के लिए सहमत हूं।",
    submitBooking: "बुकिंग जमा करें",
    submitting: "जमा कर रहे हैं...",
    
    // Form Placeholders & Options
    enterYourName: "अपना नाम दर्ज करें",
    enterYourAddress: "अपना पूरा पता दर्ज करें",
    tenDigitNumber: "10-अंकीय मोबाइल नंबर",
    selectProducerType: "उत्पादक प्रकार चुनें",
    selectStallType: "स्टॉल प्रकार चुनें",
    chooseCity: "शहर चुनें",
    chooseMarket: "बाजार स्थान चुनें",
    pickDate: "तारीख चुनें",
    anySpecialRequirements: "कोई विशेष आवश्यकताएं या प्रश्न?",
    
    // Producer Types
    producerFarmer: "किसान",
    producerWSHG: "महिला स्वयं सहायता समूह",
    producerFoodProcessor: "खाद्य प्रोसेसर",
    producerOther: "अन्य",
    
    // Stall Types
    stallVegetables: "सब्जियां",
    stallFruits: "फल",
    stallGrainsPulses: "अनाज/दालें",
    stallMillets: "बाजरा",
    stallProcessedFoods: "प्रोसेस्ड फूड्स",
    stallOther: "अन्य",
    
    // Success Message
    bookingSuccessful: "बुकिंग सफल!",
    yourReferenceId: "आपका संदर्भ आईडी:",
    bookingSummary: "बुकिंग सारांश:",
    summaryName: "नाम",
    summaryPhone: "फोन",
    summaryMarket: "बाजार",
    summaryDate: "तारीख",
    contactSoon: "हम आपकी बुकिंग विवरण की पुष्टि करने के लिए जल्द ही संपर्क करेंगे।",
    bookAnother: "दूसरा स्टॉल बुक करें",
    
    // Validation Errors
    nameRequired: "नाम आवश्यक है",
    addressRequired: "पता आवश्यक है",
    validPhoneRequired: "मान्य 10-अंकीय फोन नंबर आवश्यक है",
    producerTypeRequired: "उत्पादक प्रकार आवश्यक है",
    stallTypeRequired: "स्टॉल प्रकार आवश्यक है",
    cityRequired: "शहर आवश्यक है",
    marketRequired: "बाजार आवश्यक है",
    dateRequired: "पसंदीदा तारीख आवश्यक है",
    consentRequired: "आपको संपर्क के लिए सहमत होना चाहिए",
    fillAllFields: "कृपया सभी आवश्यक फ़ील्ड सही ढंग से भरें",
    
    // Toast Messages
    submissionSuccess: "बुकिंग सफलतापूर्वक जमा की गई!",
    submissionFailed: "सबमिशन विफल। कृपया पुनः प्रयास करें या हमसे सीधे संपर्क करें।",
    
    // Cities
    pune: "पुणे",
    mumbai: "मुंबई",
    
    // Market Names - Pune
    kharadiMarket: "खराडी बाजार",
    hadapsarMarket: "हडपसर बाजार",
    magarpattaMarket: "मगरपट्टा बाजार",
    ivyEstateMarket: "आइवी एस्टेट बाजार",
    banerMarket: "बानेर बाजार",
    wakadMarket: "वाकड बाजार",
    aundhMarket: "औंध बाजार",
    pimpleSaudagarMarket: "पिंपल सौदागर बाजार",
    kalyaniNagarMarket: "कल्याणी नगर बाजार",
    vimanNagarMarket: "विमान नगर बाजार",
    kothrudMarket: "कोथरूड बाजार",
    shivajiNagarMarket: "शिवाजी नगर बाजार",
    katrajMarket: "कात्रज बाजार",
    warjeMarket: "वारजे बाजार",
    undriMarket: "उंदरी बाजार",
    kondhwaMarket: "कोंढवा बाजार",
    hinjewadiMarket: "हिंजेवाडी बाजार",
    pashanMarket: "पाशन बाजार",
    bavdhanMarket: "बावधन बाजार",
    susMarket: "सस बाजार",
    pimpriMarket: "पिंपरी बाजार",
    chinchwadMarket: "चिंचवड बाजार",
    nigdiMarket: "निगडी बाजार",
    
    // Market Names - Mumbai
    dombivliMarket: "डोंबिवली बाजार",
    thaneMarket: "ठाणे बाजार",
    mulundMarket: "मुलुंड बाजार",
    ghatkoperMarket: "घाटकोपर बाजार",
    borivaliMarket: "बोरिवली बाजार",
    chemburMarket: "चेंबूर बाजार",
    andheriMarket: "अंधेरी बाजार",
    kandivaliMarket: "कांदिवली बाजार",
    maladMarket: "मलाड बाजार",
    goregaonMarket: "गोरेगांव बाजार",
    dahisarMarket: "दहिसर बाजार",
    miraRoadMarket: "मीरा रोड बाजार",
    bhandupMarket: "भांडुप बाजार",
    vikhroliMarket: "विखरोली बाजार",
    powaiMarket: "पवई बाजार",
    kurlaMarket: "कुर्ला बाजार",
    vashiMarket: "वाशी बाजार",
    khargharMarket: "खारघर बाजार",
    panvelMarket: "पनवेल बाजार",
    nerulMarket: "नेरुल बाजार",
    airoliMarket: "एरोली बाजार",
    sanpadaMarket: "सानपाडा बाजार",
    koparKhairaneMarket: "कोपर खैराने बाजार",
  }
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || translations.en[key as keyof typeof translations.en] || key;
}
