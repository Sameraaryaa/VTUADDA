
"use client";

import { MoreVertical, Plus, History, Download, Bookmark, Share2, Info, Settings, Search, Menu, Home, ArrowRight, FilePlus2, HardDriveDownload } from 'lucide-react';

const DropdownMenuItem = ({ icon, text, isHighlighted = false }: { icon: React.ReactNode, text: string, isHighlighted?: boolean }) => (
    <div className={`flex items-center gap-4 px-3 py-2.5 rounded-md ${isHighlighted ? 'ring-2 ring-blue-500 bg-blue-500/10' : ''}`}>
        <div className="w-5 h-5 text-gray-600 dark:text-gray-300">{icon}</div>
        <span className="text-sm text-gray-800 dark:text-gray-100">{text}</span>
    </div>
);

export function InstallGuideAndroid() {
    return (
        <div className="min-h-[420px]">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2.5 shadow-md w-full max-w-sm mx-auto">
                <div className="relative">
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-2 px-2 py-1.5 border-b border-gray-200 dark:border-gray-700">
                        <Home className="w-4 h-4 text-gray-500" />
                        <div className="flex-1 bg-gray-100 dark:bg-gray-700/50 rounded-full text-xs px-3 py-1 text-gray-600 dark:text-gray-300">
                            vtuadda.com
                        </div>
                        <div className="relative">
                            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            <div className="absolute top-0 right-0 -mr-1 -mt-1">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Simplified Website Content */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 h-56 opacity-50 blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10">
                                <img src="/icon.png" alt="vtuadda Logo" className="h-full w-full rounded-full object-cover" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Search className="w-5 h-5 text-gray-400" />
                                <Menu className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
                        </div>
                    </div>

                    {/* Dropdown Menu Overlay */}
                    <div className="absolute top-11 right-2 w-64 bg-gray-200/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-300 dark:border-gray-600 p-2 space-y-1 z-10">
                        <DropdownMenuItem icon={<Plus size={18} />} text="New tab" />
                        <DropdownMenuItem icon={<History size={18} />} text="History" />
                        <DropdownMenuItem icon={<Download size={18} />} text="Downloads" />
                        <DropdownMenuItem icon={<Bookmark size={18} />} text="Bookmarks" />
                        <DropdownMenuItem icon={<Share2 size={18} />} text="Share..." />
                        <div className="h-px bg-gray-300 dark:bg-gray-600 my-1"></div>
                        <DropdownMenuItem icon={<FilePlus2 size={18} />} text="Add to Home screen" isHighlighted={true} />
                        <DropdownMenuItem icon={<Info size={18} />} text="About" />
                        <div className="h-px bg-gray-300 dark:bg-gray-600 my-1"></div>
                        <DropdownMenuItem icon={<Settings size={18} />} text="Settings" />
                    </div>
                </div>
            </div>
        </div>
    );
}
