
import BrowseClientPage from "./browse-client-page";

// The homepage is now a lightweight Server Component.
// It no longer fetches data directly. Instead, it relies on the data
// pre-loaded by the MainLayout and initialized into the Zustand store.
export default async function BrowsePage() {
    return (
        <>
            {/* The client page will pull its data from the store, which is already populated. */}
            <BrowseClientPage />
        </>
    );
}
