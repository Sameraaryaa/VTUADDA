
"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubjectStore } from "@/lib/store";
import type { Textbook } from "@/lib/types";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, Save, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const textbookSchema = z.object({
  title: z.string().min(1, "Title is required."),
  author: z.string().min(1, "Author is required."),
  downloadUrl: z.string().url("Please enter a valid URL."),
  // The 'name' and 'url' fields are for compatibility with Note type.
  // We can derive them from title and downloadUrl.
});

type TextbookFormValues = z.infer<typeof textbookSchema>;

function TextbookForm({ textbook, onFinished }: { textbook?: Textbook, onFinished: () => void }) {
  const { toast } = useToast();
  const { addTextbook, updateTextbook } = useSubjectStore();
  const isEditing = !!textbook;

  const form = useForm<TextbookFormValues>({
    resolver: zodResolver(textbookSchema),
    defaultValues: isEditing ? {
      title: textbook.title,
      author: textbook.author,
      downloadUrl: textbook.downloadUrl,
    } : {
      title: '',
      author: '',
      downloadUrl: '',
    },
  });

  const onSubmit = async (data: TextbookFormValues) => {
    try {
      const textbookData = {
        ...data,
        name: data.title, // For Note compatibility
        url: data.downloadUrl, // For Note compatibility
      };

      if (isEditing && textbook) {
        await updateTextbook(textbook.id, textbookData);
        toast({ title: "Textbook Updated", description: "The textbook has been saved." });
      } else {
        await addTextbook(textbookData);
        toast({ title: "Textbook Added", description: "The new textbook has been created." });
      }
      onFinished();
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "An error occurred.", variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl><Input placeholder="e.g., Higher Engineering Mathematics" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author(s)</FormLabel>
              <FormControl><Input placeholder="e.g., B.S. Grewal" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="downloadUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Download URL</FormLabel>
              <FormControl><Input placeholder="https://..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
            <Button type="button" variant="ghost" onClick={onFinished}>Cancel</Button>
            <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Save Changes" : "Create Textbook"}
            </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


export default function ManageTextbooksPage() {
  const { textbooks, isLoading, deleteTextbook } = useSubjectStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTextbook, setEditingTextbook] = useState<Textbook | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleOpenDialog = (textbook?: Textbook) => {
    setEditingTextbook(textbook);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
      setDialogOpen(false);
      setEditingTextbook(undefined);
  }

  const handleDelete = async (id: string, title: string) => {
    try {
        await deleteTextbook(id);
        toast({ title: "Textbook Deleted", description: `"${title}" was deleted.` });
    } catch(e) {
        toast({ title: "Error deleting textbook", variant: "destructive"});
    }
  }
  
  const filteredTextbooks = useMemo(() => {
    if (!searchTerm) {
        return textbooks;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return textbooks.filter(t =>
        t.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        t.author.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [textbooks, searchTerm]);

  return (
    <div className="space-y-6">
      <Dialog open={dialogOpen} onOpenChange={(isOpen) => { if (!isOpen) handleCloseDialog(); else setDialogOpen(true);}}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Textbooks</CardTitle>
              <CardDescription>
                Add, edit, or delete textbooks in the main library collection.
              </CardDescription>
            </div>
             <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Textbook
                </Button>
            </DialogTrigger>
          </CardHeader>
          <CardContent>
             <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-full sm:w-[300px]"
                    />
                </div>
            </div>
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-6 w-3/4" /></TableCell>
                         <TableCell><Skeleton className="h-6 w-1/2" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredTextbooks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        {searchTerm ? `No textbooks found for "${searchTerm}".` : "No textbooks found in the library."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTextbooks.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell className="font-bold">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="icon" onClick={() => handleOpenDialog(book)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently delete the textbook "{book.title}". This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(book.id, book.title)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
         <DialogContent className="sm:max-w-xl">
            <DialogHeader>
            <DialogTitle>{editingTextbook ? 'Edit Textbook' : 'Add New Textbook'}</DialogTitle>
            <DialogDescription>
                Fill in the details for the textbook below.
            </DialogDescription>
            </DialogHeader>
            <TextbookForm textbook={editingTextbook} onFinished={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
