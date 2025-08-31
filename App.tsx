import React from 'react';
import PublicProfilePage from './components/PublicProfilePage';

/**
 * The main application component.
 * It renders the public-facing creator profile page.
 */
export default function App() {
  return (
    <main className="w-full min-h-screen bg-[--background-dark]">
      {/* 
        This simulates the routing to a creator's page, 
        e.g., fansworld.io/ava 
      */}
      <PublicProfilePage username="ava" />
    </main>
  );
}