
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubjectStore } from "@/lib/store";
import type { Campaign } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

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
import { PlusCircle, Edit, Trash2, Save, BadgeCheck, BadgeAlert } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const campaignSchema = z.object({
  title: z.string().min(3, "Title is required."),
  message: z.string().min(10, "Message is required."),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  isActive: z.boolean().default(true),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

function CampaignForm({ campaign, onFinished }: { campaign?: Campaign, onFinished: () => void }) {
  const { toast } = useToast();
  const { addCampaign, updateCampaign } = useSubjectStore();
  const isEditing = !!campaign;

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: isEditing ? { ...campaign } : {
      title: '',
      message: '',
      ctaText: '',
      ctaLink: '',
      isActive: true,
    },
  });

  const onSubmit = async (data: CampaignFormValues) => {
    try {
      if (isEditing && campaign) {
        await updateCampaign(campaign.id, data);
        toast({ title: "Campaign Updated" });
      } else {
        await addCampaign(data);
        toast({ title: "Campaign Added" });
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
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="e.g., New Feature Alert!" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl><Textarea placeholder="Describe the announcement..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ctaText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CTA Text (Optional)</FormLabel>
                  <FormControl><Input placeholder="e.g., Learn More" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ctaLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CTA Link (Optional)</FormLabel>
                  <FormControl><Input placeholder="e.g., /new-feature" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
         <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Activate Campaign</FormLabel>
                    <FormDescription>
                      If active, this campaign will be visible to users.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        <DialogFooter>
            <Button type="button" variant="ghost" onClick={onFinished}>Cancel</Button>
            <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Save Changes" : "Create Campaign"}
            </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


export default function ManageCampaignsPage() {
  const { campaigns, isLoading, deleteCampaign } = useSubjectStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>(undefined);
  const { toast } = useToast();

  const handleOpenDialog = (campaign?: Campaign) => {
    setEditingCampaign(campaign);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
      setDialogOpen(false);
      setEditingCampaign(undefined);
  }

  const handleDelete = async (id: string, title: string) => {
    try {
        await deleteCampaign(id);
        toast({ title: "Campaign Deleted", description: `"${title}" was deleted.` });
    } catch(e) {
        toast({ title: "Error deleting campaign", variant: "destructive"});
    }
  }
  
  const safeFormatDate = (date: any) => {
    if (!date || typeof date.seconds !== 'number') return 'N/A';
    try {
      return format(new Date(date.seconds * 1000), 'MMM dd, yyyy');
    } catch {
      return 'Invalid Date';
    }
  }

  return (
    <div className="space-y-6">
      <Dialog open={dialogOpen} onOpenChange={(isOpen) => { if (!isOpen) handleCloseDialog(); else setDialogOpen(true);}}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Campaigns</CardTitle>
              <CardDescription>
                Create and manage site-wide announcements.
              </CardDescription>
            </div>
             <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Campaign
                </Button>
            </DialogTrigger>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-6 w-3/4" /></TableCell>
                         <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                         <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : campaigns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No campaigns found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                            <p className="font-bold">{campaign.title}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-xs">{campaign.message}</p>
                        </TableCell>
                        <TableCell>
                            <Badge variant={campaign.isActive ? "default" : "secondary"}>
                                {campaign.isActive ? <BadgeCheck className="mr-1 h-3 w-3"/> : <BadgeAlert className="mr-1 h-3 w-3" />}
                                {campaign.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </TableCell>
                        <TableCell>{safeFormatDate(campaign.createdAt)}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="icon" onClick={() => handleOpenDialog(campaign)}>
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
                                                This will permanently delete the campaign "{campaign.title}". This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(campaign.id, campaign.title)}>Delete</AlertDialogAction>
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
            <DialogTitle>{editingCampaign ? 'Edit Campaign' : 'Add New Campaign'}</DialogTitle>
            <DialogDescription>
                Fill in the details for the campaign below.
            </DialogDescription>
            </DialogHeader>
            <CampaignForm campaign={editingCampaign} onFinished={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
