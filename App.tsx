
import React from 'react';
import VipAuthPage from './components/VipAuthPage';

/**
 * This is an example usage of the VipAuthPage component,
 * simulating how it would be used in a Next.js App Router page.
 * E.g., in `app/vip/page.tsx`
 */
export default function App() {
  const handleSignedIn = (user: { email: string }) => {
    // In a real app, you'd redirect the user or update the app state
    console.log('Signed In:', user);
    alert(`Welcome, ${user.email}!`);
  };

  const handleInviteRequested = (data: unknown) => {
    // In a real app, you'd show a confirmation message
    console.log('Invite Requested:', data);
    alert('Thank you for your application! We will review it shortly.');
  };

  return (
    <main className="w-full min-h-screen bg-[#121316]">
      <VipAuthPage
        onSignedIn={handleSignedIn}
        onInviteRequested={handleInviteRequested}
      />
    </main>
  );
}
