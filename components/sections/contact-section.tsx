"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Mail, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getStatus } from '@/lib/config/status';

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const status = getStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        });
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="min-h-[100dvh] bg-background/95 py-24 md:py-20 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Get In Touch</h2>
          <Separator className="mb-12 bg-primary/30" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">
                Have a project in mind or want to discuss a potential collaboration?
                I'm always interested in new challenges and opportunities.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Connect Me</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-12 w-12 border-primary/30"
                    onClick={() => window.location.href = 'mailto:jojimerc@gmail.com'}
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-12 w-12 border-primary/30"
                    onClick={() => window.open('https://github.com/jojimer', '_blank')}
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">Current Status</h3>
                <p className="mb-2 flex items-center">
                  <span className={`inline-block h-3 w-3 rounded-full ${status.color} mr-2`}></span>
                  <span>{status.text}</span>
                </p>
                <p className="text-sm opacity-80">
                  {status.subtext}
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-black/30 backdrop-blur-sm border-primary/10 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-background/50 border-primary/30 focus-visible:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-background/50 border-primary/30 focus-visible:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={4}
                      required
                      className="bg-background/50 border-primary/30 focus-visible:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </motion.div>
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
        </motion.div>
      </div>
    </section>
  );
}