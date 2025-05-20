"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/lib/config/projects';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
              Projects Portfolio
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore my latest work and side projects
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full flex flex-col bg-card overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  </div>
                </Link>

                <CardHeader className="relative">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">
                      {project.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-primary/5 text-primary border border-primary/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/5 text-primary border border-primary/10">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 group/btn hover:bg-primary/5"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4 group-hover/btn:text-primary" />
                    <span className="group-hover/btn:text-primary">Code</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 group/btn hover:bg-primary/5"
                    onClick={() => window.open(`/projects/${project.slug}/demo`, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:text-primary" />
                    <span className="group-hover/btn:text-primary">Demo</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
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