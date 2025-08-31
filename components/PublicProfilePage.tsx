
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Avatar, Skeleton } from './ui';
import { 
    InstagramIcon, 
    TikTokIcon, 
    OnlyFansIcon, 
    YouTubeIcon, 
    XIcon, 
    WebsiteIcon 
} from './icons';

interface Creator {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  heroUrl?: string;
  isSubscribed: boolean; // Simulates if the viewing user is a subscriber
  price: number;
  links: { [key: string]: string | undefined };
}

const mockCreator: Creator = {
  username: "ava",
  displayName: "Ava Noir",
  bio: "Curated drops. VIP only. Unlock exclusive content, BTS, and more.",
  avatarUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=600&auto-format=fit-crop",
  heroUrl: "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1000&auto-format=fit=crop",
  isSubscribed: false,
  price: 9.99,
  links: {
    Instagram: "https://instagram.com/example",
    TikTok: "https://tiktok.com/@example",
    OnlyFans: "https://onlyfans.com/example",
    YouTube: "https://youtube.com/@example",
    X: "https://x.com/example",
    Website: "https://example.com",
  },
};

// Map link labels (lowercase) to icon components
const socialIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
    instagram: InstagramIcon,
    tiktok: TikTokIcon,
    onlyfans: OnlyFansIcon,
    youtube: YouTubeIcon,
    x: XIcon,
    website: WebsiteIcon,
};


// Reusable Social Button
const LinkButton = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center h-12 bg-[--glass-sm] border border-[--chrome] rounded-lg hover:bg-[--chrome] transition-all group"
      aria-label={label}
    >
      {icon}
    </a>
  );

// Background Effects Component
const BackgroundEffects = () => {
  const orbs = useMemo(() => Array.from({ length: 4 }).map((_, i) => {
    const size = `${Math.random() * 200 + 100}px`;
    return {
      id: i,
      style: {
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${20 + Math.random() * 20}s`,
        animationDelay: `${Math.random() * -20}s`,
      },
      gradient: i % 2 === 0 ? 'from-[--luxury-violet]/40 to-transparent' : 'from-[--iridescent-aqua]/40 to-transparent',
    };
  }), []);

  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {orbs.map(orb => (
          <div
            key={orb.id}
            className={`absolute rounded-full bg-gradient-to-br ${orb.gradient} animate-float`}
            style={orb.style}
          />
        ))}
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(20px, 40px) scale(1.1); }
          50% { transform: translate(-20px, -10px) scale(0.9); }
          75% { transform: translate(10px, -30px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
};

// Loading Skeleton
const LoadingState = () => (
    <div className="w-full max-w-xs mx-auto bg-[--glass] backdrop-blur-xl border border-[--chrome] rounded-2xl p-6 shadow-2xl">
      <div className="text-center">
        <Skeleton className="w-24 h-24 rounded-full mx-auto" />
        <Skeleton className="h-6 w-32 mx-auto mt-4 rounded" />
        <Skeleton className="h-4 w-48 mx-auto mt-2 rounded" />
      </div>
      <div className="mt-6">
        <Skeleton className="w-full h-40 rounded-xl" />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>
    </div>
);

// Error Fallback
const ErrorState = ({ username }: { username: string }) => (
    <div className="text-center text-red-400 bg-[--glass] p-8 rounded-2xl border border-red-500/30">
        <p className="text-2xl font-bold">❌</p>
        <p className="text-lg mt-2">Creator Not Found</p>
        <p className="text-sm text-[--text-muted]">The profile for @{username} could not be loaded.</p>
    </div>
);


export default function PublicProfilePage({ username }: { username: string }) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate fetching data for the creator
    setLoading(true);
    setError(false);
    const timer = setTimeout(() => {
      if (username === mockCreator.username) {
        setCreator(mockCreator);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full p-4 font-sans isolate">
      <BackgroundEffects />
      
      {loading && <LoadingState />}
      {error && <ErrorState username={username} />}
      {!loading && !error && creator && (
         <div className="w-full max-w-xs mx-auto">
            <div className="bg-[--glass] backdrop-blur-xl border border-[--chrome] rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(168,85,247,0.2),0_0_15px_rgba(168,85,247,0.1)]">
                <div className="text-center pt-8 px-6">
                    <Avatar 
                        src={creator.avatarUrl} 
                        alt={creator.displayName} 
                        className="w-24 h-24 mx-auto border-4 border-[--iridescent-aqua] shadow-lg"
                    />
                    <h1 className="mt-4 text-3xl font-heading tracking-wider font-black text-white">
                        @{creator.username}
                    </h1>
                     <span className="inline-flex items-center gap-1.5 text-sm text-[--gold-accent] font-semibold mt-1">
                        🏆 VIP Creator
                     </span>
                    <p className="text-center text-[--text-muted] text-sm mt-3">
                        {creator.bio}
                    </p>
                </div>

                {creator.heroUrl && (
                    <div className="mt-6 px-4">
                        <div className="relative rounded-xl overflow-hidden aspect-video bg-black/50">
                            <img
                            src={creator.heroUrl}
                            alt="VIP Preview"
                            className={`w-full h-full object-cover transition-all duration-300 ${!creator.isSubscribed ? "blur-md scale-110" : ""}`}
                            />
                            {!creator.isSubscribed && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white text-lg font-bold">🔒</span>
                            </div>
                            )}
                        </div>
                    </div>
                )}
                
                {!creator.isSubscribed && (
                    <div className="px-6 pt-6 pb-2">
                        <button className="w-full bg-gradient-to-r from-[--luxury-violet] to-[--iridescent-aqua] text-white font-black py-4 px-4 text-base font-heading tracking-wider shadow-neon hover:scale-105 transition-all duration-300 ease-in-out rounded-lg">
                            Unlock for ${creator.price}/month
                        </button>
                    </div>
                )}
                
                <div className="px-6 pt-6 pb-6">
                    <div className="grid grid-cols-3 gap-3">
                    {Object.entries(creator.links).map(([label, href]) => {
                        const IconComponent = socialIcons[label.toLowerCase()];
                        return href && IconComponent ? (
                            <LinkButton 
                                key={label} 
                                href={href} 
                                label={label} 
                                icon={<IconComponent className="w-6 h-6 text-white/80 group-hover:text-white transition-colors"/>}
                            />
                        ) : null
                    })}
                    </div>
                </div>

                <footer className="px-6 pb-4 pt-2">
                    <p className="text-[--chrome-gray] text-xs text-center">
                    Powered by <span className="text-[--iridescent-aqua] font-semibold">FansWorld</span>
                    </p>
                </footer>
            </div>
        </div>
      )}
    </div>
  );
};
