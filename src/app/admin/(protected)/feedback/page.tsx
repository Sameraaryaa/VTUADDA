
"use client";

import { useSubjectStore } from "@/lib/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Feedback } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
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
import { cn } from "@/lib/utils";
import { ClientOnly } from "@/components/client-only";

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-5 h-5",
                        i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"
                    )}
                />
            ))}
        </div>
    )
}

export default function ManageFeedbackPage() {
  const { feedback, deleteFeedback } = useSubjectStore();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
        await deleteFeedback(id);
        toast({
            title: "Feedback Deleted",
            description: "The feedback entry has been permanently deleted.",
        });
    } catch (e) {
        toast({ title: "Error", description: "Could not delete the feedback.", variant: "destructive" });
    }
  }

  const safeFormatDate = (date: any) => {
    if (!date || typeof date.seconds !== 'number') return 'N/A';
    try {
      return formatDistanceToNow(new Date(date.seconds * 1000), { addSuffix: true });
    } catch {
      return 'Invalid Date';
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Feedback</CardTitle>
          <CardDescription>
            Review and manage feedback submitted by users.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {feedback.length > 0 ? (
                <div className="space-y-4">
                    {feedback.map((item) => (
                        <Card key={item.id} className="bg-muted/40">
                           <CardHeader>
                               <div className="flex items-center justify-between">
                                    <StarRating rating={item.rating} />
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action will permanently delete this feedback. It cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(item.id)}>Confirm Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                               </div>
                           </CardHeader>
                            <CardContent>
                                <p className="text-base text-foreground">{item.feedback}</p>
                            </CardContent>
                            <CardFooter>
                                <ClientOnly>
                                    <p className="text-xs text-muted-foreground">
                                        Submitted {safeFormatDate(item.createdAt)}
                                    </p>
                                </ClientOnly>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                 <div className="h-24 text-center flex items-center justify-center text-muted-foreground">
                    No feedback has been submitted yet.
                 </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
