"use client";

import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "GraphQL", "REST APIs", "Supabase", "Firebase"]
  },
  {
    name: "Tools & Practices",
    skills: ["Git", "CI/CD", "Jest", "Webpack", "Figma"]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-[100dvh] bg-background/95 py-24 md:py-20 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Skills & Expertise</h2>
            <Separator className="bg-primary/30" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
              >
                <Card className="h-full bg-black/30 backdrop-blur-sm border-primary/10 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-primary">{category.name}</h3>
                    <ul className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + skillIndex * 0.1, duration: 0.4 }}
                          className="flex items-center"
                        >
                          <div className="h-2 w-2 rounded-full bg-chart-1 mr-3"></div>
                          <span>{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-primary/10 mt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">My Learning Philosophy</h3>
            <p className="text-lg mb-4">
              The tech world never stands still, and neither do I. I believe in continuous learning
              and staying at the forefront of web development technologies and best practices.
            </p>
            <p className="text-lg">
              Currently exploring: WebGPU, Advanced 3D Web Graphics, and AI-assisted Development Tools.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}