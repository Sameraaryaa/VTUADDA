
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Eye, HardDriveDownload, FolderOpen, Info } from "lucide-react";

interface ResourceViewerDialogProps {
  trigger: React.ReactNode;
  title: string;
  embedUrl: string;
}

export function ResourceViewerDialog({ trigger, title, embedUrl }: ResourceViewerDialogProps) {
  return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-w-4xl w-full h-full max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-4 border-b flex-shrink-0">
            <DialogTitle className="truncate">{title}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow h-full">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allow="fullscreen"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
  );
}

interface ResourceLinkProps {
  name: string;
  url: string;
  isPyq?: boolean;
}

const getDriveFileId = (url: string): string | null => {
    if (!url || typeof url !== 'string') return null;
    const regex = /(?:file\/d\/|uc\?id=|open\?id=)([-\w]{25,})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export function ResourceLink({ name, url, isPyq = false }: ResourceLinkProps) {
    const isFolderLink = url.includes("/drive/folders/");
    const isFile = !isFolderLink;

    const driveFileId = getDriveFileId(url);
    const downloadUrl = driveFileId ? `https://drive.google.com/uc?export=download&id=${driveFileId}` : url;
    const embedUrl = driveFileId ? `https://drive.google.com/file/d/${driveFileId}/preview` : url;

    const handleDownloadClick = () => {
        // Pop-under logic is removed
    }

    if (isFolderLink) {
        return (
             <Button asChild variant="default" size="sm">
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <FolderOpen className="mr-2 h-4 w-4" /> Open Folder
                </a>
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2 self-end sm:self-center">
            {!isPyq && (
                <ResourceViewerDialog
                    title={name}
                    embedUrl={embedUrl}
                    trigger={
                        <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" /> View
                        </Button>
                    }
                />
            )}
            <Button asChild variant="default" size="sm">
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer" download={name} onClick={handleDownloadClick}>
                    <HardDriveDownload className="mr-2 h-4 w-4" /> Download
                </a>
            </Button>
        </div>
    );
}

    