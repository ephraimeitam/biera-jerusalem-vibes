import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

/**
 * Props describing a single venue.
 * `hours` and `additionalImages` are optional so the card renders gracefully even when the data is incomplete.
 */
export interface VenueCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  address: string;
  /** Opening‑hours text, e.g. "🕕 Sun‑Thu 18:00–00:30" */
  hours?: string;
  /** Main image (first in the carousel) */
  imageUrl: string;
  /** Extra images that follow the first one */
  additionalImages?: string[];
}

const VenueCard: React.FC<VenueCardProps> = ({
  id,
  name,
  icon,
  description,
  address,
  hours,
  imageUrl,
  additionalImages = [],
}) => {
  // ---------------------------------------------------------------------------
  //  Local state – likes & carousel
  // ---------------------------------------------------------------------------
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Merge main image with all extra images to create the carousel array
  const allImages = [imageUrl, ...additionalImages];

  // ---------------------------------------------------------------------------
  //  Handlers
  // ---------------------------------------------------------------------------
  const handleLike = () => {
    if (liked) return; // guard – already liked

    setLiked(true);
    setLikeCount((prev) => prev + 1);

    toast.success(`תודה! הצבעת עבור ${name}`, {
      position: 'top-center',
      duration: 2000,
    });

    // Persist the like in localStorage so the user can vote only once per venue
    const likedVenues: Record<string, boolean> = JSON.parse(
      localStorage.getItem('likedVenues') || '{}'
    );
    likedVenues[id] = true;
    localStorage.setItem('likedVenues', JSON.stringify(likedVenues));
  };

  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % allImages.length);
  const prevImage = () =>
    setCurrentImageIndex((i) => (i - 1 + allImages.length) % allImages.length);

  // ---------------------------------------------------------------------------
  //  Effects – initialise like state & random like‑count for visual flair
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const likedVenues: Record<string, boolean> = JSON.parse(
      localStorage.getItem('likedVenues') || '{}'
    );
    if (likedVenues[id]) setLiked(true);

    // purely cosmetic – start with some likes so the UI doesn’t feel empty
    setLikeCount(Math.floor(Math.random() * 15) + 3);
  }, [id]);

  // ---------------------------------------------------------------------------
  //  Derived data – ensure we never call .includes on undefined
  // ---------------------------------------------------------------------------
  const safeHours = hours ?? '';
  const showClockEmoji = !safeHours.includes('🕕');

  // ---------------------------------------------------------------------------
  //  Render
  // ---------------------------------------------------------------------------
  return (
    <div className="card-container flex h-full flex-col">
      {/* Image / Carousel */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={allImages[currentImageIndex]}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error(`Failed to load image: ${target.src}`);
            target.onerror = null;
            target.src =
              import.meta.env.BASE_URL +
              'placeholder.svg';
          }}
        />

        {/* Carousel navigation (shown only when there is more than one image) */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white transition-all hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white transition-all hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    currentImageIndex === index
                      ? 'bg-white scale-110'
                      : 'bg-white/50 hover:bg-white/80'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Title overlay */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent p-4">
          <h3 className="flex items-center gap-1 text-2xl font-bold text-jerusalem-light">
            {icon} {name}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-4 leading-relaxed text-jerusalem-light">{description}</p>

        <div className="mb-4 space-y-1 text-jerusalem-light/80">
          <p className="flex items-center gap-2">
            <span className="text-jerusalem-gold">📍</span> {address}
          </p>
          {safeHours && (
            <p className="flex items-center gap-2">
              {showClockEmoji && <span className="text-jerusalem-gold">🕕</span>}
              {safeHours}
            </p>
          )}
        </div>

        {/* Like button & counter */}
        <div className="mt-auto flex items-center justify-between">
          <button
            onClick={handleLike}
            disabled={liked}
            className={cn(
              'flex items-center gap-2 rounded-full py-2 px-4 transition-all',
              liked
                ? 'bg-red-500/20 text-red-300'
                : 'bg-jerusalem-purple/10 text-jerusalem-purple hover:bg-jerusalem-purple/20'
            )}
          >
            <Heart
              size={20}
              className={cn(
                'transition-all',
                liked
                  ? 'fill-red-400 text-red-400'
                  : 'text-jerusalem-purple'
              )}
            />
            <span>{liked ? 'אהבתי!' : 'אהוב'}</span>
          </button>
          <div className="flex items-center text-sm text-jerusalem-light/60">
            <span>{likeCount}</span>
            <Heart className="mr-1 h-3 w-3 fill-jerusalem-light/60 text-jerusalem-light/60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
