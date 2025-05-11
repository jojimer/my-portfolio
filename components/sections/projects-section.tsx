"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/lib/config/projects';

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const featuredProjects = projects.length >= 6 ? projects.slice(0, 6) : projects.slice(0, 3);

  return (
    <section id="projects" className="min-h-[100dvh] bg-background py-24 md:py-20 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Featured Projects</h2>
          <Separator className="mb-12 bg-primary/30" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group"
              >
                <Card className="h-full flex flex-col bg-black/30 backdrop-blur-sm border-primary/10 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                      animate={{ 
                        scale: hoveredProject === index ? 1.05 : 1
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center p-6">
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  
                  <CardContent className="flex-grow pt-6">
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span 
                          key={tech} 
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 group hover:bg-primary/5"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="mr-2 h-4 w-4 group-hover:text-primary" />
                      <span className="group-hover:text-primary">Source</span>
                    </Button>
                    <Link href={`/projects/${project.slug}`} className="flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group hover:bg-primary/5"
                      >
                        Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {projects.length > featuredProjects.length && (
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link href="/projects">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/40 hover:bg-primary/5 group"
                >
                  View All Projects
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}