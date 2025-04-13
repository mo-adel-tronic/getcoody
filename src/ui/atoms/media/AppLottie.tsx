"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader } from 'lucide-react';

const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), {
  ssr: false,
});

interface LottieProps {
    src: string;
    width?: string
}

const AppLottie: React.FC<LottieProps> = React.memo(({ src, width='w-[400px]' }:LottieProps) => {
    const [isInView, setIsInView] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const playerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    } else {
                        setIsInView(false);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentRef = playerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div ref={playerRef} className='relative'>
            {isLoading && <Loader />}
            {isInView && src ? (
                <Player
                    speed={0.6}
                    src={src}
                    className={`player ${width}`}
                    background="transparent"
                    autoplay
                    loop
                    onEvent={(event) => {
                        if (event === 'load') {
                            setIsLoading(false);
                        }
                    }}
                />
            ) : null}
        </div>
    );
});

AppLottie.displayName = 'Lottie';

export default AppLottie;