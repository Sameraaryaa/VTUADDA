
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const subject = encodeURIComponent(`Contact Form Submission from ${data.name}`);
      const body = encodeURIComponent(
        `You have received a new message from your website contact form.\n\n` +
        `Here are the details:\n\n` +
        `Name: ${data.name}\n\n` +
        `Email: ${data.email}\n\n` +
        `Message:\n${data.message}`
      );
      const mailtoLink = `mailto:thevtuadda@gmail.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;

      toast({
        title: "Redirecting to your email client",
        description: "Please complete and send the email from your default mail application.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Could not open email client: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 lg:py-20 bg-muted/50 dark:bg-card/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
            <CardHeader className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gradient">Contact Us</h2>
                <CardDescription className="text-lg">
                    We welcome your questions, suggestions, and feedback. Please use the form below to get in touch with our team. We do our best to respond to all inquiries as promptly as possible.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                            <Input placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Please enter your message here..."
                                className="min-h-[150px]"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="text-center">
                        <Button type="submit" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? "Opening..." : (
                                <>
                                    <Send className="mr-2 h-4 w-4" /> Send Message
                                </>
                            )}
                        </Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
