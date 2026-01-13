
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubjectStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import type { LinkCategory } from "@/lib/types";

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Save, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const quickLinkSchema = z.object({
  text: z.string().min(1, "Link text is required."),
  url: z.string().min(1, "URL cannot be empty."),
  external: z.boolean().default(false),
});

const linkCategorySchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Category title is required."),
  order: z.number(),
  links: z.array(quickLinkSchema),
});

const quickLinksFormSchema = z.object({
  categories: z.array(linkCategorySchema),
});

type QuickLinksFormValues = z.infer<typeof quickLinksFormSchema>;

// A new component to properly encapsulate the nested useFieldArray hook
function LinkCategoryItem({ categoryIndex, control, register }: { categoryIndex: number; control: any; register: any }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `categories.${categoryIndex}.links`,
  });

  return (
    <div className="space-y-6">
      <FormField
          control={control}
          name={`categories.${categoryIndex}.title`}
          render={({ field }) => (
          <FormItem>
              <FormLabel>Category Title</FormLabel>
              <FormControl>
              <Input {...field} />
              </FormControl>
              <FormMessage />
          </FormItem>
          )}
      />
      {fields.map((linkField, linkIndex) => (
          <div key={linkField.id} className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 items-start p-3 border rounded-md relative bg-muted/50">
              <div className="col-span-12 md:col-span-4">
                  <FormField
                      control={control}
                      name={`categories.${categoryIndex}.links.${linkIndex}.text`}
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className="text-xs">Link Text</FormLabel>
                              <FormControl><Input placeholder="e.g. VTU Results" {...field} /></FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
              <div className="col-span-12 md:col-span-5">
                  <FormField
                      control={control}
                      name={`categories.${categoryIndex}.links.${linkIndex}.url`}
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className="text-xs">URL</FormLabel>
                              <FormControl><Input placeholder="https://" {...field} /></FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
                <div className="col-span-12 md:col-span-2">
                  <FormField
                      control={control}
                      name={`categories.${categoryIndex}.links.${linkIndex}.external`}
                      render={({field}) => (
                          <FormItem className="flex flex-col">
                              <FormLabel className="text-xs">External Link?</FormLabel>
                              <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                          </FormItem>
                      )}
                  />
              </div>
              <div className="col-span-12 md:col-span-1 flex items-center justify-end h-full pt-4">
                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(linkIndex)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4"/>
                  </Button>
              </div>
          </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append({ text: "", url: "", external: false })}>
          <Plus className="mr-2 h-4 w-4"/> Add Link
      </Button>
    </div>
  );
}


export default function ManageQuickLinksPage() {
  const { toast } = useToast();
  const { linkCategories, updateLinkCategory } = useSubjectStore();

  const form = useForm<QuickLinksFormValues>({
    resolver: zodResolver(quickLinksFormSchema),
    values: {
      categories: linkCategories || [],
    },
  });

  const { fields: categoryFields } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const onSubmit = async (data: QuickLinksFormValues) => {
    try {
      await Promise.all(data.categories.map(async (category) => {
        const { id, ...categoryData } = category;
        categoryData.links = categoryData.links.filter(link => link.text.trim() !== '' && link.url.trim() !== '');
        await updateLinkCategory(id, categoryData);
      }));
      toast({
        title: "Quick Links Updated",
        description: "All changes to the footer links have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the quick links.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Quick Links</CardTitle>
          <CardDescription>
            Edit the link categories and individual links that appear in the site footer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Accordion
                type="multiple"
                defaultValue={categoryFields.map((field) => `category-${field.id}`)}
                className="w-full space-y-4"
              >
                {categoryFields.map((categoryField, categoryIndex) => (
                    <AccordionItem key={categoryField.id} value={`category-${categoryField.id}`} className="border rounded-xl bg-background">
                        <AccordionTrigger className="hover:no-underline px-4 py-3 text-lg font-semibold">
                            {form.watch(`categories.${categoryIndex}.title`)}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-4 border-t">
                            <LinkCategoryItem
                              categoryIndex={categoryIndex}
                              control={form.control}
                              register={form.register}
                            />
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
