"use client";

import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Code2, Gamepad2, Music, Sparkles, Cog as Yoga, Zap } from 'lucide-react';
import { useState } from 'react';

export function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="about" className="min-h-[100dvh] bg-background py-24 md:py-20 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column - Avatar and Tech Stack */}
          <motion.div 
            className="lg:col-span-4 flex flex-col items-center justify-start gap-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="lg:sticky lg:top-32 flex flex-col items-center gap-8 w-full">
              <motion.div 
                className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl shadow-primary/10 cursor-pointer"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={isHovered ? "/me-bassing.jpg" : "/me-working.jpg"}
                  alt="Joji"
                  className="object-cover w-full h-full"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
              
              <div className="w-full space-y-6 bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
                <h3 className="text-xl font-bold text-primary">Technical Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-chart-1" />
                    <span>React / Next.js / TypeScript</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-chart-2" />
                    <span>Tailwind CSS / Framer Motion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gamepad2 className="h-5 w-5 text-chart-3" />
                    <span>Framer Motion / Lottie</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code2 className="h-5 w-5 text-chart-4" />
                    <span>Firebase / Supabase / Node.js</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - About Content */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary flex items-center gap-3">
              About Me
            </h2>
            <Separator className="mb-8 bg-primary/30" />
            
            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-lg leading-relaxed">
                Hi, I'm <span className="text-primary font-bold">Joji</span>—a Fullstack Web Developer 
                passionate about building modern, scalable, and interactive web applications. I specialize in 
                <span className="text-primary font-semibold"> React</span>, 
                <span className="text-primary font-semibold"> Next.js</span>, 
                <span className="text-primary font-semibold"> TypeScript</span>, and tools like 
                <span className="text-primary font-semibold"> Tailwind CSS</span> and 
                <span className="text-primary font-semibold"> Firebase</span> to create seamless digital 
                experiences that balance performance and visual polish.
              </p>
              
              <p className="text-lg leading-relaxed">
                Whether developing single-page apps or fully integrated platforms, I focus on clarity in code, 
                thoughtful UX, and clean, maintainable architecture.
              </p>
              
              <div className="hidden md:block bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-primary/10 my-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Beyond Code</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Music className="h-5 w-5 text-chart-1" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary/90 mb-2">Music</h4>
                      <p className="text-sm leading-relaxed">
                        As a musician, I understand rhythm, flow, and storytelling—skills that naturally 
                        inform my approach to UI and interaction design.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Yoga className="h-5 w-5 text-chart-2" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary/90 mb-2">Meditation</h4>
                      <p className="text-sm leading-relaxed">
                        My yoga meditation practice supports a calm, focused mindset that helps me stay present, 
                        thoughtful, and resilient in fast-moving dev environments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xl font-semibold text-primary">
                I'm always looking to collaborate on meaningful, forward-thinking projects. 
                Let's connect and build something exceptional.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}