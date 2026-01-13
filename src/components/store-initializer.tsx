
"use client";

import { useSubjectStore } from "@/lib/store";
import type { Subject, Author, Branch, LinkCategory, LabResource, Textbook, Campaign } from '@/lib/types';
import { useRef } from "react";

interface StoreInitializerProps {
  subjects?: Subject[];
  authors?: Author[];
  branches?: Record<string, Branch>;
  linkCategories?: LinkCategory[];
  schemes?: string[];
  textbooks?: Textbook[];
  labs?: LabResource[];
  campaigns?: Campaign[];
}

export function StoreInitializer({ ...props }: StoreInitializerProps) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useSubjectStore.setState({ ...props, isLoading: false });
    initialized.current = true;
  }
  return null;
}
