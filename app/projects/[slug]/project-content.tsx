"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowLeft, Sparkles, Lightbulb, Target, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/config/projects';

const ProjectContent = ({ project }: { project: Project }) => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="h-[60vh] relative flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        <div className="absolute inset-0 bg-grid-white/10" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/projects">
              <Button variant="ghost" className="mb-8 hover:bg-background/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary/80 max-w-3xl">
              {project.longDescription}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
            onClick={() => window.open(`/projects/${project.slug}/demo`, '_blank')}
          >
            <ExternalLink className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            View Live Demo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group border-white text-white hover:bg-white hover:text-black"
            onClick={() => window.open(project.githubUrl, '_blank')}
          >
            <Github className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            View Source Code
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Project Gallery */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-chart-1">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative aspect-video overflow-hidden rounded-xl border border-chart-1/20"
                  >
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-chart-2">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-chart-2/5 border border-chart-2/20"
                  >
                    <Sparkles className="h-4 w-4 mt-1 text-chart-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Challenges and Solutions */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-chart-3">Challenges & Solutions</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-chart-3/5 border border-chart-3/20"
                  >
                    <div className="flex items-start gap-3">
                      <Target className="h-4 w-4 mt-1 text-chart-3 flex-shrink-0" />
                      <span>{challenge}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Technologies */}
            <div className="p-6 rounded-xl bg-chart-4/5 border border-chart-4/20">
              <h3 className="text-xl font-semibold mb-4 text-chart-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-sm bg-chart-4/10 text-chart-4 border border-chart-4/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Learnings */}
            <div className="p-6 rounded-xl bg-chart-5/5 border border-chart-5/20">
              <h3 className="text-xl font-semibold mb-4 text-chart-5">Key Learnings</h3>
              <div className="space-y-3">
                {project.learnings.map((learning, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Lightbulb className="h-4 w-4 mt-1 text-chart-5 flex-shrink-0" />
                    <span className="text-sm">{learning}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
            className="mt-16 text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-sm opacity-70">
              © {new Date().getFullYear()} jojimercastino.com All rights reserved. - Web App Developer | Bassist | Yoga Meditation Practitioner
            </p>
        </motion.div>
      </div>
    </main>
  );
}

export default ProjectContent;