
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface VenueCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  address: string;
  hours: string;
  imageUrl: string;
}

const VenueCard: React.FC<VenueCardProps> = ({
  id,
  name,
  icon,
  description,
  address,
  hours,
  imageUrl,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      toast.success(`תודה! הצבעת עבור ${name}`, {
        position: "top-center",
        duration: 2000,
      });
      
      // Store the like in local storage to prevent multiple votes
      const likedVenues = JSON.parse(localStorage.getItem('likedVenues') || '{}');
      likedVenues[id] = true;
      localStorage.setItem('likedVenues', JSON.stringify(likedVenues));
    }
  };

  // Check if already liked from local storage when component mounts
  React.useEffect(() => {
    const likedVenues = JSON.parse(localStorage.getItem('likedVenues') || '{}');
    if (likedVenues[id]) {
      setLiked(true);
    }
    
    // Get random initial count (just for visual effect)
    setLikeCount(Math.floor(Math.random() * 15) + 3);
  }, [id]);

  return (
    <div className="card-container h-full flex flex-col">
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-jerusalem-light">{icon} {name}</h3>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-5 flex flex-col">
        <p className="text-jerusalem-light mb-4 leading-relaxed">{description}</p>
        <div className="text-jerusalem-light/80 space-y-1 mb-4">
          <p className="flex items-center gap-2">
            <span className="text-jerusalem-gold">📍</span> {address}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-jerusalem-gold">{hours.includes('🕕') ? '' : '🕕'}</span> {hours}
          </p>
        </div>
        
        <div className="mt-auto flex justify-between items-center">
          <button 
            onClick={handleLike} 
            className={cn(
              "flex items-center gap-2 py-2 px-4 rounded-full transition-all",
              liked 
                ? "bg-red-500/20 text-red-300" 
                : "bg-jerusalem-purple/10 text-jerusalem-purple hover:bg-jerusalem-purple/20"
            )}
            disabled={liked}
          >
            <Heart 
              className={cn(
                "transition-all", 
                liked ? "fill-red-400 text-red-400" : "text-jerusalem-purple"
              )}
              size={20} 
            />
            <span>{liked ? "אהבתי!" : "אהוב"}</span>
          </button>
          <div className="text-sm text-jerusalem-light/60 flex items-center">
            <span>{likeCount}</span>
            <Heart className="h-3 w-3 mr-1 fill-jerusalem-light/60 text-jerusalem-light/60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
