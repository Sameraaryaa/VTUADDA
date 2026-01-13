import { QuickLinksFooter } from "@/components/quick-links-footer";
import MainLayoutClient from "./main-layout-client";
import { getInitialData } from "@/lib/server-fetch";
import { ClientLayout } from "@/components/client-layout";
import { StoreInitializer } from "@/components/store-initializer";

// This is now the primary data-fetching layout for the main application.
export default async function MainLayout({ children }: { children: React.ReactNode }) {
  // Fetch all necessary data for the app here, once.
  // This includes data previously fetched on the homepage.
  const { linkCategories, subjects, branches, schemes } = await getInitialData();

  return (
    <>
      {/* Initialize the store with all the data the client components will need. */}
      <StoreInitializer 
        linkCategories={linkCategories} 
        subjects={subjects}
        branches={branches}
        schemes={schemes}
      />
      <MainLayoutClient>
        {children}
      </MainLayoutClient>
      <QuickLinksFooter />
      <ClientLayout />
    </>
  );
}
