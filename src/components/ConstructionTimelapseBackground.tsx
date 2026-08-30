import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RefreshCw, Eye, Sparkles, Video, Film } from 'lucide-react';

export interface ConstructionVideoSource {
  id: string;
  name: string;
  location: string;
  type: 'youtube' | 'mp4';
  youtubeId?: string;
  mp4Url?: string;
  poster: string;
  description: string;
}

const baseUrl = import.meta.env.BASE_URL || '/';

export const TIMELAPSE_FEEDS: ConstructionVideoSource[] = [
  {
    id: 'construktiq-local-timelapse',
    name: 'CONSTRUKTIQ Construction Timelapse',
    location: 'Site Operations • Structural Progression',
    type: 'mp4',
    mp4Url: `${baseUrl}images/timelapse_video.mp4`,
    poster: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?auto=format&fit=crop&w=2000&q=80',
    description: 'Local construction sequence used as the hero background video'
  },
  {
    id: 'one-vanderbilt-skyscraper',
    name: 'Skyscraper High-Rise Steel & Concrete Timelapse',
    location: 'Metropolitan Core • 67-Story Structural Rise',
    type: 'youtube',
    // Official One Vanderbilt / High-Rise Construction 4K Timelapse (EarthCam / panTerra)
    youtubeId: 'Fj7n1iG_XoY',
    poster: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?auto=format&fit=crop&w=2000&q=80',
    description: 'Foundation to spire structural concrete & glass facade erection'
  },
  {
    id: 'highrise-tower-frankfurt',
    name: 'High-Rise Tower Construction & Tower Cranes',
    location: 'Financial District • Deep Excavation & Formwork',
    type: 'youtube',
    youtubeId: '3eZ8y0qWq1g',
    poster: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80',
    description: 'Heavy crane kinematics, continuous concrete slab pouring'
  },
  {
    id: 'urban-cantilever-timelapse',
    name: 'Modern Architectural Complex & Facade Timelapse',
    location: 'Civic Center • Board-Formed Cantilever',
    type: 'youtube',
    youtubeId: 'q_tY7c8QfTI',
    poster: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=2000&q=80',
    description: 'Monolithic reinforced concrete & post-tensioned spans'
  }
];

export const ConstructionTimelapseBackground: React.FC = () => {
  const [activeFeedIndex, setActiveFeedIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);

  const currentFeed = TIMELAPSE_FEEDS[activeFeedIndex];

  const toggleFeed = () => {
    setActiveFeedIndex((prev) => (prev + 1) % TIMELAPSE_FEEDS.length);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-[#0c0b0b]">
      {/* 1. Full-Bleed 4K YouTube Embedded Background Loop (Bypasses all iframe CORS/hotlink blocks) */}
      {currentFeed.type === 'mp4' && currentFeed.mp4Url && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            key={currentFeed.mp4Url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={currentFeed.poster}
            className="absolute top-1/2 left-1/2 w-[160vw] h-[160vh] sm:w-[130vw] sm:h-[130vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none border-0 opacity-85 filter brightness-[0.78] contrast-[1.12]"
          >
            <source src={currentFeed.mp4Url} type="video/mp4" />
          </video>
        </div>
      )}

      {currentFeed.type === 'youtube' && currentFeed.youtubeId && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <iframe
            key={currentFeed.youtubeId}
            src={`https://www.youtube-nocookie.com/embed/${currentFeed.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentFeed.youtubeId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&enablejsapi=1`}
            title="CONSTRUKTIQ Construction Timelapse 4K Background"
            className="absolute top-1/2 left-1/2 w-[160vw] h-[160vh] sm:w-[130vw] sm:h-[130vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none border-0 opacity-85 filter brightness-[0.78] contrast-[1.12]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            tabIndex={-1}
          />
        </div>
      )}

      {/* 2. Fallback Poster Layer for instant crisp visual while video buffers */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 transition-opacity duration-1000 -z-10"
        style={{ backgroundImage: `url(${currentFeed.poster})` }}
      />

      {/* 3. Subtle CAD / Architectural Blueprint Wireframe Scanning Grid */}
      {showGridLines && (
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />
      )}

      {/* 4. High-End Dark Cinematic Gradient Mask (Leaves video vibrant and 100% visible while making white text pop) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0b] via-[#0c0b0b]/40 to-[#0c0b0b]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,11,11,0.2)_0%,rgba(12,11,11,0.5)_60%,rgba(12,11,11,0.85)_100%)] pointer-events-none" />

      {/* 5. Glowing Construction Brand Horizon Accent Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ff5722]/80 to-transparent" />

    </div>
  );
};
