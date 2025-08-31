"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AuthMode } from '../types';
import { CabanaCLogo, LockIcon, UserIcon, AtSignIcon, KeyIcon } from './icons';

// Prop types for the main component
interface VipAuthPageProps {
  onSignedIn: (user: { email: string }) => void;
  onInviteRequested: (data: unknown) => void;
}

// Internal component for background effects
const BackgroundEffects = () => {
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (shadowRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 40; // Parallax intensity
        const y = (clientY / innerHeight - 0.5) * 40;
        shadowRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 15}s`,
    animationDelay: `${Math.random() * -30}s`,
    size: `${1 + Math.random() * 2}px`,
  })), []);
  
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0f0f10]">
      {/* Warm keylight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_60%,rgba(245,207,122,0.1)_0%,transparent_100%)]"></div>

      {/* Parallax shadows (using palette colors) */}
      <div
        ref={shadowRef}
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] transition-transform duration-500 ease-out"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 70% 30%, rgba(180, 140, 255, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(179, 242, 255, 0.08) 0%, transparent 50%)
          `
        }}
      />

      {/* Sparkle particles */}
      <div className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/50 animate-pulse"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              animationName: 'drift',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          25% { opacity: 0.7; }
          75% { opacity: 0.7; }
          100% { transform: translate(${Math.random() * 100 - 50}px, -200px) scale(1.5); opacity: 0; }
        }
      `}</style>
      {/* Final glass blur layer */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[100px]"></div>
    </div>
  );
};


// Internal component for form inputs
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  icon?: React.ReactNode;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ id, label, error, icon, className, ...props }, ref) => (
  <div className="relative w-full">
    <label htmlFor={id} className="sr-only">{label}</label>
    {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#d9d9e3]/40">
            {icon}
        </div>
    )}
    <div className="relative group">
         <div className="absolute -inset-0.5 bg-gradient-to-r from-[#b3f2ff] via-[#b48cff] to-[#f5cf7a] rounded-lg blur-md opacity-0 group-focus-within:opacity-75 transition duration-300"></div>
         <input
            ref={ref}
            id={id}
            className={`relative w-full bg-white/10 border border-white/20 rounded-lg py-3 text-[#d9d9e3] placeholder:text-[#d9d9e3]/40 focus:outline-none focus:ring-0 transition duration-200 ${icon ? 'pl-10' : 'pl-4'} pr-4 ${error ? 'border-red-500/50' : ''} ${className || ''}`}
            {...props}
        />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
));
Input.displayName = 'Input';


// Main component
const VipAuthPage: React.FC<VipAuthPageProps> = ({ onSignedIn, onInviteRequested }) => {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SignIn);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sign In State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vipCode, setVipCode] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);

  // Request Invite State
  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [country, setCountry] = useState('');
  const [agreed, setAgreed] = useState(false);

  // --- Logic Stubs ---
  const signInWithEmailPassword = async () => {
    // TODO: Implement actual email/password authentication logic
    console.log('Signing in with:', { email, password, vipCode });
    await new Promise(res => setTimeout(res, 1500));
    if (email === "creator@cabana.vip" && password === "password") {
       onSignedIn({ email });
    } else {
       throw new Error("Invalid credentials.");
    }
  };

  const signInWithMagicLink = async () => {
    // TODO: Implement magic link logic
    console.log('Sending magic link to:', email);
    await new Promise(res => setTimeout(res, 1500));
    alert(`Magic link sent to ${email}! Check your inbox.`);
  };
  
  const submitInvite = async () => {
      // TODO: Implement actual invite submission logic
      const payload = { name, instagram, email: inviteEmail, portfolio, country };
      console.log('Submitting invite:', payload);
      await new Promise(res => setTimeout(res, 1500));
      onInviteRequested(payload);
  };


  // --- Event Handlers ---
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (useMagicLink) {
        await signInWithMagicLink();
      } else {
        await signInWithEmailPassword();
      }
    } catch (err) {
      setError((err as Error).message || "Check your details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("You must agree to the terms to apply.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await submitInvite();
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderSignInForm = () => (
    <form onSubmit={handleSignInSubmit} className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="you@creator.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
        icon={<AtSignIcon className="w-4 h-4" />}
      />
      {!useMagicLink && (
        <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            icon={<LockIcon className="w-4 h-4" />}
        />
      )}
      <div className="flex items-center justify-between mt-2">
        <label htmlFor="magic-link-toggle" className="flex items-center gap-2 text-sm text-[#d9d9e3]/60 cursor-pointer">
          <input 
            type="checkbox" 
            id="magic-link-toggle"
            checked={useMagicLink}
            onChange={(e) => setUseMagicLink(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-[#b48cff] focus:ring-[#b48cff]/50"
          />
          Use Magic Link
        </label>
      </div>
      
      <hr className="border-t border-white/10 my-2" />

      <div className="flex flex-col items-center gap-2 w-full">
        <label htmlFor="vip-code" className="text-xs font-bold uppercase tracking-[0.3em] bg-gradient-to-br from-[#b3f2ff] via-[#b48cff] to-[#f5cf7a] bg-clip-text text-transparent">
            VIP
        </label>
        <Input
            id="vip-code"
            label="Ambassador/Early Access Entrance"
            type="text"
            placeholder="Ambassador/Early Access Entrance"
            value={vipCode}
            onChange={(e) => setVipCode(e.target.value)}
            disabled={isLoading}
            className="text-center"
        />
      </div>


      <button 
        type="submit" 
        disabled={isLoading}
        className="relative overflow-hidden mt-4 w-full flex items-center justify-center font-bold text-black bg-gradient-to-br from-[#b3f2ff] via-[#b48cff] to-[#f5cf7a] rounded-lg py-3 px-6 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed holographic-shine"
      >
        {isLoading ? 'Authenticating...' : (useMagicLink ? 'Send Magic Link' : 'Access Lounge')}
      </button>
    </form>
  );

  const renderRequestInviteForm = () => (
    <form onSubmit={handleInviteSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input id="name" label="Full Name" type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required disabled={isLoading} icon={<UserIcon className="w-4 h-4" />} />
          <Input id="instagram" label="Instagram Handle" type="text" placeholder="@handle" value={instagram} onChange={e => setInstagram(e.target.value)} required disabled={isLoading} icon={<AtSignIcon className="w-4 h-4" />} />
        </div>
        <Input id="invite-email" label="Email Address" type="email" placeholder="Contact Email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} required disabled={isLoading} icon={<AtSignIcon className="w-4 h-4" />} />
        <Input id="portfolio" label="Portfolio or Linktree" type="url" placeholder="https://linktr.ee/you" value={portfolio} onChange={e => setPortfolio(e.target.value)} required disabled={isLoading} icon={<svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>} />
        <Input id="country" label="Country" type="text" placeholder="Your Country" value={country} onChange={e => setCountry(e.target.value)} required disabled={isLoading} icon={<svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>} />
        
        <div className="mt-2">
            <label htmlFor="terms-agree" className="flex items-start gap-3 text-sm text-[#d9d9e3]/60 cursor-pointer">
                <input 
                    type="checkbox" 
                    id="terms-agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 mt-0.5 shrink-0 rounded border-white/20 bg-white/10 text-[#b48cff] focus:ring-[#b48cff]/50"
                />
                <span>I confirm I am 18+ and agree to the <a href="#" className="underline hover:text-white">Terms</a>.</span>
            </label>
        </div>

        <button type="submit" disabled={isLoading} className="relative overflow-hidden mt-4 w-full flex items-center justify-center font-bold text-black bg-gradient-to-br from-[#b3f2ff] via-[#b48cff] to-[#f5cf7a] rounded-lg py-3 px-6 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed holographic-shine">
          {isLoading ? 'Submitting...' : 'Apply for Access'}
        </button>
    </form>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full p-4 font-sans text-[#d9d9e3] isolate">
      <BackgroundEffects />
      
      {/* Auth Card */}
      <div className="w-full max-w-md sm:max-w-[420px] shadow-2xl shadow-[#b48cff]/20 rounded-2xl animate-fade-in-scale">
        <div className="relative p-[1.5px] bg-gradient-to-br from-[#b3f2ff] via-[#b48cff] to-[#f5cf7a] rounded-2xl">
          <div className="relative bg-[#1a1b1e]/80 backdrop-blur-xl rounded-[15px] p-8 sm:p-10">
            {/* Inner Sheen */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[15px] pointer-events-none"></div>

            {/* Header */}
            <header className="relative z-10 flex flex-col items-center text-center mb-8">
              <CabanaCLogo className="w-12 h-12 mb-4" />
              <h1 className="text-2xl font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-br from-white to-[#d9d9e3]">
                CABANA VIP
              </h1>
              <p className="text-sm text-[#d9d9e3]/60 mt-1">
                Invitation-only access for creators.
              </p>
            </header>

            {/* Tabs */}
            <nav className="relative z-10 grid grid-cols-2 gap-2 bg-black/30 p-1 rounded-lg mb-8">
              <button onClick={() => setAuthMode(AuthMode.SignIn)} className={`py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-300 ${authMode === AuthMode.SignIn ? 'bg-white/10 text-white' : 'text-[#d9d9e3]/50 hover:bg-white/5'}`}>Sign In</button>
              <button onClick={() => setAuthMode(AuthMode.RequestInvite)} className={`py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-300 ${authMode === AuthMode.RequestInvite ? 'bg-white/10 text-white' : 'text-[#d9d9e3]/50 hover:bg-white/5'}`}>Request Invite</button>
            </nav>

            {/* Form Area */}
            <div className="relative z-10">
              {authMode === AuthMode.SignIn ? renderSignInForm() : renderRequestInviteForm()}
            </div>
            
            {error && <p className="relative z-10 mt-4 text-center text-sm text-red-400">{error}</p>}

            {/* Trust Footer */}
            <footer className="relative z-10 mt-8 text-center text-xs text-[#d9d9e3]/40">
                <div className="flex items-center justify-center gap-2">
                    <LockIcon className="w-3 h-3" />
                    <span>Secure &bull; Encrypted</span>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
                    <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white/50 transition-colors">DMCA</a>
                </div>
            </footer>
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default VipAuthPage;
