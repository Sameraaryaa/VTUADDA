
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/back-to-home-button";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'VTU Revaluation, Photocopy, and Challenge Revaluation Explained',
  description: 'A complete guide on the VTU revaluation process. Understand the difference between Photocopy, Revaluation, and Challenge Revaluation, including fees, application steps, and important rules.',
};

export default function VtuRevaluationGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-0">
      <BackButton />
      <article className="prose lg:prose-xl dark:prose-invert">
        <h1 className="text-gradient">VTU Revaluation: Your Complete Guide</h1>
        <p className="lead">
          Disappointed with your VTU results? The revaluation process offers a second chance. This guide explains the different options available—Photocopy, Revaluation, and Challenge Revaluation—so you can make an informed decision.
        </p>

        <section>
          <h2>Step 1: Applying for a Photocopy of Your Answer Script</h2>
          <p>This is the first and most crucial step. Before you can apply for revaluation, you **must** apply for a scanned copy (photocopy) of your answer script.</p>
          <ul className="mt-4">
            <li><strong>Why is it important?</strong> It allows you to review your paper, understand where you lost marks, and decide if revaluation is worth it.</li>
            <li><strong>How to Apply:</strong> Applications are made online through the VTU results portal (<Link href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer">results.vtu.ac.in</Link>).</li>
            <li><strong>Fee:</strong> There is a nominal fee per subject for the photocopy.</li>
            <li><strong>Process:</strong> After successful payment, VTU will upload a PDF of your answer script to your student portal within a few days.</li>
          </ul>
        </section>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Step 2: The Revaluation Process</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Once you have reviewed your photocopy, you can decide whether to apply for revaluation. In this process, your answer script is evaluated by a different examiner.</p>
            <h3 className="text-lg font-bold mt-4">The 15-Mark Rule</h3>
            <p>This is the most critical rule in VTU revaluation. A change in your marks will only be considered if:</p>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              The difference between your original marks and the revaluation marks is **more than 15 marks**.
            </blockquote>
            <p>
              If the difference is 15 or less, your original marks will be retained. If the difference is 16 or more, the **average** of the two scores will be awarded as your new marks.
            </p>
            <h3 className="text-lg font-bold mt-4">Application and Fees</h3>
            <p>The application is also done online. There is a separate, higher fee for revaluation per subject. This fee is non-refundable, regardless of the outcome.</p>
          </CardContent>
        </Card>

        <section>
          <h2>What is Challenge Revaluation?</h2>
          <p>Challenge Revaluation is a more serious and expensive option. It is for students who are extremely confident that there has been a major error in the evaluation of their paper.</p>
          <ul>
            <li><strong>Process:</strong> In this case, your paper is evaluated by a panel of senior examiners.</li>
            <li><strong>High Stakes:</strong> The fee for challenge revaluation is significantly higher (often upwards of ₹5,000 per subject).</li>
            <li><strong>Refund Policy:</strong> A portion of the fee may be refunded, but only if there is a substantial change in marks, proving a gross error in the initial evaluations. The exact refund conditions are specified in the VTU notification.</li>
            <li><strong>When to Consider It:</strong> Only consider this if you have thoroughly reviewed your photocopy and believe there is a clear and significant error, such as entire sections being left unevaluated.</li>
          </ul>
        </section>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Important Things to Remember</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p><strong>1. Deadlines are Strict:</strong> VTU announces very tight deadlines for applying for photocopy and revaluation. Miss them, and you lose your chance.</p>
            <p><strong>2. Photocopy is Mandatory:</strong> You cannot apply for revaluation without first applying for the photocopy.</p>
            <p><strong>3. No Guarantees:</strong> Revaluation does not guarantee an increase in marks. In some cases, marks can even decrease (though your final score will not go below the original if the change is not significant).</p>
            <p><strong>4. Check Official Notifications:</strong> Always refer to the official VTU circulars for the exact fees, dates, and rules for your specific examination cycle, as they can sometimes change.</p>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
