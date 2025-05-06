
import React from 'react';
import VenueCard from '@/components/VenueCard';

const Index = () => {
  // Beer bubble animation elements
  const bubbles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 40 + 10;
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 10;
    const animationDuration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.5 + 0.1;
    
    return (
      <div
        key={i}
        className="beer-bubble"
        style={{
          width: size + 'px',
          height: size + 'px',
          left: left + '%',
          bottom: '-100px',
          opacity,
          animationDelay: animationDelay + 's',
          animationDuration: animationDuration + 's',
        }}
      />
    );
  });
  
  const venues = [
    {
      id: 'andalusia',
      name: 'אנדלוסיה – טאפאס & קוקטייל בר',
      icon: '🍸',
      description: 'בר כשר עם קוקטיילים, מנות שף, שלוש קומות ועיצוב צבעוני בלב כיכר המוזיקה. הופעות חיות כמעט כל ערב.',
      address: 'מעבר בית הכנסת 12, כיכר המוזיקה, ירושלים',
      hours: '🕕 חמישי: 18:00–00:30',
      imageUrl: 'https://kikar-hamusica.com/wp-content/uploads/2020/12/Andalucia-2.jpg'
    },
    {
      id: 'sambation',
      name: 'סמבטיון – בר קוקטיילים ירושלמי',
      icon: '🍹',
      description: '25 מקומות בלבד, אווירה אינטימית ורגועה, קוקטיילים בהשראת התרבות היהודית, Happy Hour 17:00–19:00.',
      address: 'גרשון אגרון 22, ירושלים',
      hours: '🕕 חמישי: 17:00–מאוחר',
      imageUrl: 'https://res.cloudinary.com/dwboekzwq/image/upload/v1714487242/sambation_bar_uw1e1s.jpg'
    },
    {
      id: 'machne-yehuda',
      name: 'שוק מחנה יהודה – חיי לילה תוססים',
      icon: '🍻',
      description: 'בין הסמטאות – ברים, מוזיקה, גרפיטי, מעל 100 סוגי בירות. שוק שהופך למסיבה ירושלמית אחת גדולה.',
      address: 'שוק מחנה יהודה, ירושלים',
      hours: '🕕 חמישי בלילה עד השעות הקטנות',
      imageUrl: 'https://www.machne.co.il/wp-content/uploads/2021/03/DSC_7329.jpg'
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background beer bubble animations */}
      {bubbles}
      
      {/* Jerusalem city skyline */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[url('https://res.cloudinary.com/dwboekzwq/image/upload/v1714486651/jerusalem-skyline_slrspj.png')] bg-repeat-x bg-bottom opacity-20"></div>
      
      {/* Main content */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img 
              src="https://res.cloudinary.com/dwboekzwq/image/upload/v1714486651/beer-mug_wjrbkk.png" 
              alt="Beer Mug" 
              className="w-14 h-14 animate-float" 
            />
            <h1 className="text-4xl md:text-5xl font-extrabold text-jerusalem-gold drop-shadow-lg">
              מה עם בירה בבירה?
            </h1>
            <img 
              src="https://res.cloudinary.com/dwboekzwq/image/upload/v1714486651/beer-mug_wjrbkk.png" 
              alt="Beer Mug" 
              className="w-14 h-14 animate-float" 
              style={{ animationDelay: '1s' }}
            />
          </div>
          
          <div className="bg-jerusalem-dark/70 backdrop-blur-md p-6 rounded-xl max-w-3xl mx-auto border border-jerusalem-gold/10">
            <p className="text-lg text-jerusalem-light leading-relaxed">
              אנחנו ארבעה חברים שמתלבטים לאן לצאת לשתות בירושלים ביום חמישי. תעזרו לנו להחליט – תנו לייק למקום שהכי בא לכם עליו!
            </p>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              id={venue.id}
              name={venue.name}
              icon={venue.icon}
              description={venue.description}
              address={venue.address}
              hours={venue.hours}
              imageUrl={venue.imageUrl}
            />
          ))}
        </div>
        
        <footer className="text-center mt-16 text-jerusalem-light/60 text-sm">
          <p className="flex items-center justify-center gap-2">
            נפגשים לשתות – חברים וירושלים, הכי טוב ביחד 
            <span className="text-jerusalem-gold">🍺</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
