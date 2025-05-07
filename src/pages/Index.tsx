import React from 'react';
import VenueCard from '@/components/VenueCard';

// 📦 Static assets handled by Vite – hashes & base path will be injected automatically
import beerMug from '@/assets/images/beer-mug.png';
import andalusiaImg from '@/assets/images/andalusia.jpg';
import sambationImg from '@/assets/images/sambation.jpg';
import craveImg from '@/assets/images/crave.png';

const Index = () => {
  // --- animated beer bubbles (purely visual) ---------------------------------
  const bubbles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 40 + 10;
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 10;
    const animationDuration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.5 + 0.1;

    return (
      <div
        key={i}
        className="beer-bubble pointer-events-none absolute rounded-full bg-jerusalem-gold/30 backdrop-blur-sm"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          bottom: '-100px',
          opacity,
          animationDelay: `${animationDelay}s`,
          animationDuration: `${animationDuration}s`,
        }}
      />
    );
  });

  // --- venues ----------------------------------------------------------------
  const venues = [
    {
      id: 'andalusia',
      name: 'אנדלוסיה – טאפאס & קוקטייל בר',
      icon: '🍸',
      description:
        'בר כשר עם קוקטיילים, מנות שף, שלוש קומות ועיצוב צבעוני בלב כיכר המוזיקה. הופעות חיות כמעט כל ערב.',
      address: 'מעבר בית הכנסת 12, כיכר המוזיקה, ירושלים',
      hours: '🕕 חמישי: 18:00–00:30',
      imageUrl: andalusiaImg,
    },
    {
      id: 'sambation',
      name: 'סמבטיון – בר קוקטיילים ירושלמי',
      icon: '🍹',
      description:
        '25 מקומות בלבד, אווירה אינטימית ורגועה, קוקטיילים בהשראת התרבות היהודית, Happy Hour 17:00–19:00.',
      address: 'גרשון אגרון 22, ירושלים',
      hours: '🕕 חמישי: 17:00–מאוחר',
      imageUrl: sambationImg,
    },
    {
      id: 'machne-yehuda',
      name: 'שוק מחנה יהודה – חיי לילה תוססים',
      icon: '🍻',
      description:
        'בין הסמטאות – ברים, מוזיקה, גרפיטי, מעל 100 סוגי בירות. שוק שהופך למסיבה ירושלמית אחת גדולה.',
      address: 'שוק מחנה יהודה, ירושלים',
      hours: '🕕 חמישי בלילה עד השעות הקטנות',
      imageUrl: craveImg,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-jerusalem-dark text-jerusalem-light font-heebo">
      {/* Animated bubbles */}
      {bubbles}

      {/* Main container */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <header className="mb-14 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <img src={beerMug} alt="Beer Mug" className="h-14 w-14 animate-float" />
            <h1 className="drop-shadow-lg text-4xl font-extrabold text-jerusalem-gold md:text-5xl">
              מה עם בירה בבירה?
            </h1>
            <img
              src={beerMug}
              alt="Beer Mug"
              className="h-14 w-14 animate-float"
              style={{ animationDelay: '1s' }}
            />
          </div>
        </header>

        {/* Venue cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-jerusalem-light/60">
          <p className="flex items-center justify-center gap-2">
            נפגשים לשתות – חברים וירושלים, הכי טוב ביחד <span className="text-jerusalem-gold">🍺</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
