import React, { useState } from 'react';
import {
  Globe,
  Users,
  Building2,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface LandingViewProps {
  onViewChange: (view: string) => void;
}

type Language = 'en' | 'zu' | 'xh' | 'af' | 'st';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
  { code: 'xh', name: 'isiXhosa', flag: '🇿🇦' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'st', name: 'Sesotho', flag: '🇿🇦' }
];

const translations = {
  en: {
    businessName: "Dintshang?",
    tagline: "empowered by active nine, from street corner to your screen",
    aboutTitle: "About Us",
    aboutText: "Dintshang? is a revolutionary platform that connects township entrepreneurs with customers across South Africa. We empower local businesses to thrive in the digital age while preserving the authentic spirit of community commerce.",
    contactTitle: "Contact Us",
    featuresTitle: "Why Choose Dintshang?",
    features: [
      "Digital marketplace for township businesses",
      "Secure payment processing",
      "Business management tools",
      "Community networking",
      "24/7 customer support",
      "Local delivery services"
    ],
    userTypeTitle: "Choose Your Journey",
    entrepreneur: "I'm an Entrepreneur",
    entrepreneurDesc: "Sell your products and grow your business",
    buyer: "I'm a Buyer",
    buyerDesc: "Discover amazing local products and services",
    getStarted: "Get Started",
    footer: "active9#TVHackathon @2025"
  },
  zu: {
    businessName: "Dintshang?",
    tagline: "eqiniswe yi-active nine, kusukela ekhoneni lomgwaqo kuya esikrinini sakho",
    aboutTitle: "Mayelana Nathi",
    aboutText: "I-Dintshang? iyinkundla eguquguqukayo exhumanisa osomabhizinisi basezindaweni zelokishi namakhasimende kulo lonke elaseNingizimu Afrika. Sinika amandla amabhizinisi endawo ukuthi aphumelele enkathini yedijithali kuyilapho sigcina umoya wangempela wezohwebo zomphakathi.",
    contactTitle: "Xhumana Nathi",
    featuresTitle: "Kungani Ukhetha I-Dintshang?",
    features: [
      "Imakethe yedijithali yamabhizinisi asezindaweni zelokishi",
      "Ukucutshungulwa kwezinkokhelo okuphephile",
      "Amathuluzi okuphatha ibhizinisi",
      "Ukuxhumana komphakathi",
      "Usizo lwamakhasimende lwe-24/7",
      "Izinsiza zokulethwa kwendawo"
    ],
    userTypeTitle: "Khetha Uhambo Lwakho",
    entrepreneur: "Ngingusomabhizinisi",
    entrepreneurDesc: "Thengisa imikhiqizo yakho futhi ukhulise ibhizinisi lakho",
    buyer: "Ngingumthengi",
    buyerDesc: "Thola imikhiqizo nezinsiza zendawo ezimangalisayo",
    getStarted: "Qala",
    footer: "active9#TVHackathon @2025"
  },
  xh: {
    businessName: "Dintshang?",
    tagline: "exhotyiswe yi-active nine, ukusuka kwikona yesitrato ukuya kwiscreen sakho",
    aboutTitle: "Malunga Nathi",
    aboutText: "I-Dintshang? liqonga eliguqukayo elidibanisa oosomashishini basezidolophini nabathengi kulo lonke elaseMzantsi Afrika. Sixhobisa amashishini asekuhlaleni ukuba aphumelele kwixesha ledijithali ngelixa sigcina umoya wokwenyani worhwebo loluntu.",
    contactTitle: "Qhagamshelana Nathi",
    featuresTitle: "Kutheni Ukhetha I-Dintshang?",
    features: [
      "Imarike yedijithali yamashishini ezidolophini",
      "Ukuqhubekeka kweentlawulo ezikhuselekileyo",
      "Izixhobo zolawulo lweshishini",
      "Unxibelelwano loluntu",
      "Inkxaso yabathengi ye-24/7",
      "Iinkonzo zokuhanjiswa kwendawo"
    ],
    userTypeTitle: "Khetha Uhambo Lwakho",
    entrepreneur: "Ndingusomashishini",
    entrepreneurDesc: "Thengisa iimveliso zakho kwaye ukhulise ishishini lakho",
    buyer: "Ndingumthengi",
    buyerDesc: "Fumana iimveliso neenkonzo zalapha ekhaya ezimangalisayo",
    getStarted: "Qala",
    footer: "active9#TVHackathon @2025"
  },
  af: {
    businessName: "Dintshang?",
    tagline: "bemagtig deur active nine, van straathoek tot jou skerm",
    aboutTitle: "Oor Ons",
    aboutText: "Dintshang? is 'n revolusionêre platform wat township-ondernemers met kliënte regoor Suid-Afrika verbind. Ons bemagtig plaaslike besighede om in die digitale era te floreer terwyl ons die outentieke gees van gemeenskapsbesigheid bewaar.",
    contactTitle: "Kontak Ons",
    featuresTitle: "Hoekom Kies Dintshang?",
    features: [
      "Digitale mark vir township-besighede",
      "Veilige betalingsverwerking",
      "Besigheidsbestuurshulpmiddels",
      "Gemeenskapsnetwerking",
      "24/7 kliëntediens",
      "Plaaslike afleweringsdienste"
    ],
    userTypeTitle: "Kies Jou Reis",
    entrepreneur: "Ek is 'n Entrepreneur",
    entrepreneurDesc: "Verkoop jou produkte en groei jou besigheid",
    buyer: "Ek is 'n Koper",
    buyerDesc: "Ontdek wonderlike plaaslike produkte en dienste",
    getStarted: "Begin",
    footer: "active9#TVHackathon @2025"
  },
  st: {
    businessName: "Dintshang?",
    tagline: "e matlafalitsoe ke active nine, ho tloha khoneng ea seterata ho ea skrineng ea hau",
    aboutTitle: "Ka Rona",
    aboutText: "Dintshang? ke sethala se fetolang mekhoa se hokahanyang bo-rakhoebo ba literopo le bareki ho pholletsa le Afrika Borwa. Re matlafatsa likhoebo tsa lehae hore li atlehe mehleng ea dijithale ha re ntse re boloka moea oa 'nete oa khoebo ea sechaba.",
    contactTitle: "Ikopanye Le Rona",
    featuresTitle: "Hobaneng U Khetha Dintshang?",
    features: [
      "Mmaraka oa dijithale bakeng sa likhoebo tsa literopo",
      "Ts'ebetso e sireletsehileng ea litefo",
      "Lisebelisoa tsa tsamaiso ea khoebo",
      "Khokahano ea sechaba",
      "Tšehetso ea bareki ea 24/7",
      "Litšebeletso tsa phano ea lehae"
    ],
    userTypeTitle: "Khetha Leeto La Hao",
    entrepreneur: "Ke Rakhoebo",
    entrepreneurDesc: "Rekisa lihlahisoa tsa hau 'me u holise khoebo ea hau",
    buyer: "Ke Moreki",
    buyerDesc: "Fumana lihlahisoa le litšebeletso tsa lehae tse babatsehang",
    getStarted: "Qala",
    footer: "active9#TVHackathon @2025"
  }
};

export default function LandingView({ onViewChange }: LandingViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [selectedUserType, setSelectedUserType] = useState<'entrepreneur' | 'buyer' | null>(null);

  const t = translations[selectedLanguage];

  const handleGetStarted = () => {
    if (selectedUserType === 'entrepreneur') {
      onViewChange('register');
    } else if (selectedUserType === 'buyer') {
      onViewChange('register');
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "info@dintshang.co.za" },
    { icon: Phone, label: "Phone", value: "+27 11 123 4567" },
    { icon: MapPin, label: "Address", value: "Johannesburg, South Africa" }
  ];

  return (
    <div className="min-h-screen bg-custom-gradient">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-warm-orange" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as Language)}
              className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t.businessName}
            </h1>
            <p className="text-xl sm:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              {t.tagline}
            </p>
            <p className="text-lg text-orange-50 mb-12 max-w-2xl mx-auto">
              {t.aboutText}
            </p>

            {/* User Type Selection */}
            <div className="max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{t.userTypeTitle}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => setSelectedUserType('entrepreneur')}
                  className={`p-6 rounded-xl transition-all duration-300 text-left ${
                    selectedUserType === 'entrepreneur'
                      ? 'bg-white/20 backdrop-blur-sm border-2 border-white text-white'
                      : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
                  }`}
                >
                  <Building2 className="h-8 w-8 mb-3" />
                  <h3 className="text-xl font-semibold mb-2">{t.entrepreneur}</h3>
                  <p className="text-orange-100">{t.entrepreneurDesc}</p>
                </button>

                <button
                  onClick={() => setSelectedUserType('buyer')}
                  className={`p-6 rounded-xl transition-all duration-300 text-left ${
                    selectedUserType === 'buyer'
                      ? 'bg-white/20 backdrop-blur-sm border-2 border-white text-white'
                      : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
                  }`}
                >
                  <Users className="h-8 w-8 mb-3" />
                  <h3 className="text-xl font-semibold mb-2">{t.buyer}</h3>
                  <p className="text-orange-100">{t.buyerDesc}</p>
                </button>
              </div>

              {selectedUserType && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleGetStarted}
                    className="bg-warm-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 flex items-center gap-2 mx-auto shadow-3d hover:shadow-lg transform hover:scale-105"
                  >
                    {t.getStarted}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            {t.featuresTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4">
                <CheckCircle className="h-6 w-6 text-warm-orange mt-1 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-light-gray py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            {t.contactTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-warm-orange rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{contact.label}</h3>
                  <p className="text-gray-600">{contact.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-medium">{t.footer}</p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <Star className="h-5 w-5 text-warm-orange" />
            <span className="text-orange-100">Made with ❤️ for South African entrepreneurs</span>
            <Star className="h-5 w-5 text-warm-orange" />
          </div>
        </div>
      </footer>
    </div>
  );
}
