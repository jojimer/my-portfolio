"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from 'embla-carousel';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionCarouselProps = {
  children: React.ReactNode[];
  className?: string;
  options?: EmblaOptionsType;
};

export function SectionCarousel({
  children,
  className,
  options = { axis: "y", dragFree: true }
}: SectionCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    watchDrag: false,
    duration: 60,
    // easing: (t: number) => {
    //   return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    // }
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).emblaApi = emblaApi;
    }
  }, [emblaApi]);

  const scrollTo = React.useCallback((index: number) => {
    if (isTransitioning || isMobile) return;
    setIsTransitioning(true);
    emblaApi?.scrollTo(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [emblaApi, isTransitioning, isMobile]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    let scrollTimeout: NodeJS.Timeout;
    const handleWheel = (event: WheelEvent) => {
      if (isMobile) return;
      event.preventDefault();
      if (isTransitioning) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (event.deltaY > 0 && canScrollNext) {
          setIsTransitioning(true);
          emblaApi.scrollNext();
          setTimeout(() => setIsTransitioning(false), 800);
        } else if (event.deltaY < 0 && canScrollPrev) {
          setIsTransitioning(true);
          emblaApi.scrollPrev();
          setTimeout(() => setIsTransitioning(false), 800);
        }
      }, 50);
    };

    const rootNode = emblaApi.rootNode();
    rootNode.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      rootNode.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [emblaApi, onSelect, canScrollNext, canScrollPrev, isTransitioning, isMobile]);

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "overflow-hidden",
        isMobile ? "h-auto" : "h-screen"
      )} ref={emblaRef}>
        <div className={cn(
          "flex flex-col transition-transform duration-800 ease-out",
          isMobile ? "h-auto" : "h-full"
        )}>
          {children.map((child, index) => (
            <motion.div
              key={index}
              className={cn(
                "flex-[0_0_100%] min-w-0 relative",
                isMobile ? "min-h-[100svh]" : "h-screen"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      </div>
      
      {!isMobile && (
        <>
          <motion.div 
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {children.map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  id={`btn${index}`}
                  variant={selectedIndex === index ? "default" : "outline"}
                  size="icon"
                  className={cn(
                    "h-3 w-3 rounded-full p-0 border-2 border-primary/50 transition-all duration-500",
                    selectedIndex === index && "scale-125 bg-primary border-primary shadow-md shadow-primary/25",
                    selectedIndex !== index && "bg-background/50 backdrop-blur-sm hover:bg-primary/20",
                    isTransitioning && "pointer-events-none"
                  )}
                  onClick={() => scrollTo(index)}
                  disabled={isTransitioning}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="fixed left-8 top-1/2 -translate-y-1/2 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex flex-col gap-2 items-center">
              <div className="h-16 w-[1px] bg-primary/20 rounded-full" />
              <span className="text-xs font-medium rotate-90 origin-center translate-y-6">
                SCROLL
              </span>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}