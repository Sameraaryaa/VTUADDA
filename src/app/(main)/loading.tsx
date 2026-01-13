
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)] w-full">
        <div className="flex flex-col items-center gap-6">
             <div className="flex items-center justify-center space-x-2">
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse-fast"></div>
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse-fast [animation-delay:0.2s]"></div>
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse-fast [animation-delay:0.4s]"></div>
            </div>
            <p className="text-lg font-semibold text-muted-foreground">Loading Resources...</p>
        </div>
    </div>
  );
}
