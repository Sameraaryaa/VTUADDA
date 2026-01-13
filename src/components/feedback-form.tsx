
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const feedbackSchema = z.object({
  feedback: z.string(),
  rating: z.number().min(1, "Please select a rating.").max(5),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
        feedback: "",
        rating: 0,
    }
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'An unexpected error occurred.');
      }

      toast({
        title: 'Thank you!',
        description: 'Your feedback has been submitted successfully.',
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Submission Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
     <section id="feedback" className="py-12 lg:py-20 bg-muted/50 dark:bg-card/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
            <CardHeader className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gradient">Share Your Feedback</h2>
                <CardDescription className="text-lg">
                    Have a question, suggestion, or want to contribute? We'd love to hear from you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-center block text-md">How would you rate your experience?</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center justify-center gap-2 py-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={cn(
                                                        "w-10 h-10 cursor-pointer transition-all duration-75 ease-in-out hover:scale-125",
                                                        field.value >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"
                                                    )}
                                                    onClick={() => field.onChange(star)}
                                                />
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-center" />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Tell us what you liked or where we can improve..."
                                        className="min-h-[120px]"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-center pt-2">
                            <Button type="submit" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Submit Feedback
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
