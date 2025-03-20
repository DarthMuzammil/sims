'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SwordScene = dynamic(() => import('./SwordScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white text-2xl">Loading Swords...</div>
    </div>
  )
});

export default function ClientSwordScene() {
  return (
    <div className="w-full h-full bg-transparent">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-2xl">Loading Swords...</div>
        </div>
      }>
        <SwordScene />
      </Suspense>
    </div>
  );
} 