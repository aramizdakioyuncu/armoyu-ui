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
        
        // Dynamic import of Plyr. In an ESM build, this is very reliable.
        const mod = await import('plyr');
        let Plyr: any = mod.default || (mod as any);
        
        // Handle double-wrapping if it occurs
        if (typeof Plyr !== 'function' && Plyr && Plyr.default) {
          Plyr = Plyr.default;
        }

        // Search for constructor in common named exports if default is missing
        if (typeof Plyr !== 'function' && mod && (mod as any).Plyr) {
          Plyr = (mod as any).Plyr;
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
