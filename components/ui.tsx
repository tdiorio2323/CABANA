
import React from 'react';

// --- Avatar Component ---
interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}
export const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => (
  <div className={`relative inline-block rounded-full overflow-hidden ${className}`}>
    <img src={src} alt={alt} className="w-full h-full object-cover" />
    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10"></div>
  </div>
);


// --- Skeleton Component ---
interface SkeletonProps {
  className?: string;
}
export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={`animate-pulse bg-white/10 ${className}`} />
);
