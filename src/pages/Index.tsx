import { Suspense, useState, lazy } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Events from '@/components/Events';
import WhyThiran from '@/components/WhyThiran';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import IntroLoader from '@/components/IntroLoader';
import CustomCursor from '@/components/CustomCursor';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load heavy 3D component
const StarField = lazy(() => import('@/components/StarField'));

// Loading fallback for 3D components
function LoadingFallback() {
  return (
    <div className="fixed inset-0 -z-10 bg-background">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-purple/20 rounded-full blur-[40px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cosmic-pink/15 rounded-full blur-[40px]" />
    </div>
  );
}

export default function Index() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Intro Loader */}
      {!introComplete && (
        <IntroLoader onComplete={() => setIntroComplete(true)} />
      )}

      <div className={`min-h-screen bg-background text-foreground overflow-x-hidden scrollbar-cosmic transition-opacity duration-500 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        {/* 3D Star Field Background with Error Boundary */}
        <ErrorBoundary fallback={<LoadingFallback />}>
          <Suspense fallback={<LoadingFallback />}>
            <StarField />
          </Suspense>
        </ErrorBoundary>

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          <Hero />
          <Events />
          <WhyThiran />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
