
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubjectStore } from "@/lib/store";
import type { Author } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Save } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const authorFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required."),
  role: z.string().min(1, "Role is required."),
  imageUrl: z.string().url("Please enter a valid image URL."),
  bio: z.string().min(10, "Bio should be at least 10 characters long."),
  socials: z.object({
    linkedin: z.string().url().or(z.literal("")),
    github: z.string().url().or(z.literal("")),
    email: z.string().email().or(z.literal("")),
  }),
  dataAiHint: z.string().optional(),
});

const authorsSchema = z.object({
  authors: z.array(authorFormSchema),
});

type AuthorsFormValues = z.infer<typeof authorsSchema>;

export default function ManageAuthorsPage() {
  const { toast } = useToast();
  const { authors, updateAuthor } = useSubjectStore();

  const form = useForm<AuthorsFormValues>({
    resolver: zodResolver(authorsSchema),
    defaultValues: {
      authors: [],
    },
  });

  useEffect(() => {
    if (authors.length > 0) {
      form.reset({ authors });
    }
  }, [authors, form]);

  const { fields } = useFieldArray({
    control: form.control,
    name: "authors",
  });

  const onSubmit = async (data: AuthorsFormValues) => {
    try {
      await Promise.all(data.authors.map((author) => {
        return updateAuthor(author.id, author);
      }));
      toast({
        title: "Authors Updated",
        description: "All author details have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the author details.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Authors</CardTitle>
          <CardDescription>
            Edit the profiles for the authors of vtuadda. Changes are saved for all authors at once.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Accordion
                type="multiple"
                defaultValue={fields.map((field) => `author-${field.id}`)}
                className="w-full space-y-4"
              >
                {fields.map((field, index) => (
                  <AccordionItem key={field.id} value={`author-${field.id}`} className="border rounded-xl bg-background">
                    <AccordionTrigger className="hover:no-underline px-4 py-3">
                      <div className="flex items-center gap-4">
                        <Image
                            src={form.watch(`authors.${index}.imageUrl`)}
                            alt={`Photo of ${field.name}`}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-lg">{field.name}</p>
                            <p className="text-sm text-muted-foreground">{field.role}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-4 border-t">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name={`authors.${index}.name`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`authors.${index}.role`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role / Department</FormLabel>
                                    <FormControl>
                                    <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name={`authors.${index}.imageUrl`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                <Input placeholder="https://..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`authors.${index}.bio`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                <Textarea className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <h4 className="font-semibold text-md">Social Links</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <FormField
                                control={form.control}
                                name={`authors.${index}.socials.linkedin`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LinkedIn URL</FormLabel>
                                    <FormControl>
                                    <Input placeholder="#" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`authors.${index}.socials.github`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GitHub URL</FormLabel>
                                    <FormControl>
                                    <Input placeholder="#" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`authors.${index}.socials.email`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                    <Input placeholder="mailto:..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="flex justify-end mt-8">
                <Button type="submit" size="lg">
                    <Save className="mr-2 h-4 w-4"/>
                    Save All Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
