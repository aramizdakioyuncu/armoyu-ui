'use client';
import React, { useEffect, useRef } from 'react';

interface ArmoyuPlayerProps {
  source: {
    type: 'video' | 'audio';
    sources: { src: string; type?: string }[];
  };
  options?: any;
  className?: string;
}

/**
 * A robust wrapper for the Plyr media player.
 * Bypasses plyr-react to avoid ESM/CJS interop issues (e.g., "f is not a constructor").
 */
export function ArmoyuPlayer({ source, options, className }: ArmoyuPlayerProps) {
  const elementRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    let isMounted = true;

    async function initPlyr() {
      try {
        if (typeof window === 'undefined') return;
        
        let Plyr;
        try {
          // Use require for more reliable CJS/UMD interop in some Next.js versions
          const mod = require('plyr');
          Plyr = mod.default || mod;
          
          if (typeof Plyr !== 'function' && Plyr.default) {
            Plyr = Plyr.default;
          }
        } catch (e) {
          // Fallback to dynamic import if require fails
          const mod = await import('plyr');
          Plyr = mod.default || mod;
          if (typeof Plyr !== 'function' && (Plyr as any).default) {
            Plyr = (Plyr as any).default;
          }
        }

        // Final validation
        if (typeof Plyr !== 'function') {
          throw new Error('Plyr constructor not found');
        }
        
        if (!isMounted || !elementRef.current) return;

        // Initialize if not already initialized
        if (!playerRef.current) {
          playerRef.current = new Plyr(elementRef.current, {
            ...options,
            // Default options if not provided
            hideControls: options?.hideControls ?? true,
            resetOnEnd: options?.resetOnEnd ?? true,
          });
        }

        // Set source
        if (playerRef.current && source) {
          playerRef.current.source = source;
        }
      } catch (error) {
        console.error('[ArmoyuPlayer] Failed to initialize Plyr:', error);
      }
    }

    initPlyr();

    return () => {
      isMounted = false;
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [source, options]);

  if (source.type === 'audio') {
    return <audio ref={elementRef as any} className={`plyr-react plyr ${className || ''}`} />;
  }

  return <video ref={elementRef as any} className={`plyr-react plyr ${className || ''}`} />;
}
