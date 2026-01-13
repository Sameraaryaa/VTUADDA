
"use client";

import { useEffect, useState } from 'react';
import { requestForToken } from "@/lib/firebase";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { ClientOnly } from './client-only';
import { useSubjectStore } from '@/lib/store';
import { InstallPromptDialog } from './install-prompt-dialog';
import { BuyMeACoffeeDialog } from './buy-me-a-coffee-dialog';

export function ClientLayout() {
  const { checkUnlockStatus } = useSubjectStore();

  useEffect(() => {
    // On initial load, check if the unlock status is still valid
    checkUnlockStatus();

    if (typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        // requestForToken(); // Temporarily disabled to avoid repeated prompts on every load
      }
    }
  }, [checkUnlockStatus]);


  return (
    <ClientOnly>
      <InstallPromptDialog />
      <MobileBottomNav />
      <BuyMeACoffeeDialog />
    </ClientOnly>
  );
}
