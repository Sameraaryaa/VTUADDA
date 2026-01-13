
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Check, X, UserCheck, UserX, File as FileIcon } from "lucide-react";
import { format } from "date-fns";
import type { Contribution } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ResourceLink } from "@/components/resource-viewer";
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
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const StatusBadge = ({ status }: { status: Contribution['status'] }) => {
    const statusConfig = {
        pending: { variant: 'secondary', text: 'Pending' },
        approved: { variant: 'default', text: 'Approved', className: 'bg-green-600 hover:bg-green-700'},
        rejected: { variant: 'destructive', text: 'Rejected' },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
        <Badge variant={config.variant as any} className={cn(config.className)}>
            {config.text}
        </Badge>
    );
}

export default function ManageContributionsPage() {
  const { contributions, updateContributionStatus, deleteContribution } = useSubjectStore();
  const { toast } = useToast();

  const handleStatusUpdate = async (id: string, status: Contribution['status']) => {
    try {
        await updateContributionStatus(id, status);
        toast({
            title: "Status Updated",
            description: `The contribution has been ${status}.`
        });
    } catch (e) {
        toast({ title: "Error", description: "Could not update the status.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
        await deleteContribution(id);
        toast({
            title: "Contribution Deleted",
            description: "The contribution has been permanently deleted.",
        });
    } catch (e) {
        toast({ title: "Error", description: "Could not delete the contribution.", variant: "destructive" });
    }
  }

  const safeFormatDate = (date: any) => {
    if (!date || typeof date.seconds !== 'number') return 'N/A';
    try {
      return format(new Date(date.seconds * 1000), 'MMM dd, yyyy, hh:mm a');
    } catch {
      return 'Invalid Date';
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Contributions</CardTitle>
          <CardDescription>
            Review, approve, or reject user-submitted materials. There are currently {contributions.length} submissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {contributions.length > 0 ? (
                 <div className="space-y-4">
                    {contributions.map((item) => (
                        <Card key={item.id} className="bg-muted/30">
                            <CardHeader className="flex flex-row items-start justify-between gap-4">
                                <div className="flex-1">
                                    <CardTitle className="text-xl">{item.subjectName}</CardTitle>
                                    <div className="text-sm text-muted-foreground font-code">{item.subjectCode}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                     <StatusBadge status={item.status} />
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(item.id, 'approved')}>
                                                <Check className="mr-2 h-4 w-4 text-green-500"/>
                                                Approve
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(item.id, 'rejected')}>
                                                <X className="mr-2 h-4 w-4 text-orange-500" />
                                                Reject
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4"/>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action will permanently delete this contribution. It cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(item.id)}>Confirm Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="font-semibold">Scheme</p>
                                        <p className="text-muted-foreground">{item.scheme}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Branch</p>
                                        <p className="text-muted-foreground">{item.branch}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Semester</p>
                                        <p className="text-muted-foreground">Sem {item.semester}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Module</p>
                                        <p className="text-muted-foreground">{item.module}</p>
                                    </div>
                               </div>
                               <Separator />
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                         <p className="font-semibold">Contributor</p>
                                         <div className="flex items-center gap-2 text-muted-foreground">
                                             <p>{item.name} ({item.email})</p>
                                             <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        {item.showCredit ? <UserCheck className="w-4 h-4 text-green-500"/> : <UserX className="w-4 h-4 text-red-500"/>}
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{item.showCredit ? "Agreed to be credited." : "Wishes to remain anonymous."}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                         </div>
                                    </div>
                                     <div>
                                        <p className="font-semibold">Submitted On</p>
                                        <p className="text-muted-foreground">{safeFormatDate(item.createdAt)}</p>
                                    </div>
                               </div>
                            </CardContent>
                             <CardFooter className="flex items-center justify-between bg-muted/50 p-3">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <FileIcon className="w-4 h-4"/>
                                    <span>{item.resourceType || 'note'}</span>
                                </div>
                                <ResourceLink name="View File" url={item.fileUrl} />
                            </CardFooter>
                        </Card>
                    ))}
                 </div>
            ) : (
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                    No new contributions to review.
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

    