
import { SgpaCalculator } from "@/components/sgpa-calculator";
import { CgpaCalculator } from "@/components/cgpa-calculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackButton } from "@/components/back-to-home-button";
import { ClientOnly } from "@/components/client-only";
import Script from "next/script";

export default function CalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
        <BackButton />
        <div className="text-center animate-slide-in-from-top" data-ai-id="calculator-header">
            <h1 className="text-3xl font-headline font-bold tracking-tight text-gradient" data-ai-id="calculator-heading">Calculators</h1>
            <p className="text-muted-foreground mt-2" data-ai-id="calculator-subheading">
            Tools to help you calculate your academic performance.
            </p>
        </div>
        <Tabs defaultValue="sgpa" className="animate-fade-in-up" data-ai-id="calculator-tabs">
            <TabsList className="grid w-full grid-cols-2" data-ai-id="calculator-tabs-list">
            <TabsTrigger value="sgpa" data-ai-id="sgpa-tab-trigger">SGPA Calculator</TabsTrigger>
            <TabsTrigger value="cgpa" data-ai-id="cgpa-tab-trigger">CGPA Calculator</TabsTrigger>
            </TabsList>
            <TabsContent value="sgpa" className="mt-4" data-ai-id="sgpa-tab-content">
            <ClientOnly>
                <SgpaCalculator />
            </ClientOnly>
            </TabsContent>
            <TabsContent value="cgpa" className="mt-4" data-ai-id="cgpa-tab-content">
            <ClientOnly>
                <CgpaCalculator />
            </ClientOnly>
            </TabsContent>
        </Tabs>
    </div>
  );
}

    