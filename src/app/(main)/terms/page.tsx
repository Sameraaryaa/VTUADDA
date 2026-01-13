
import { BackButton } from '@/components/back-to-home-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Script from 'next/script';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-0" data-ai-id="terms-page-container">
      <BackButton />
      <Card data-ai-id="terms-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary" data-ai-id="terms-heading">Terms and Conditions</CardTitle>
          <p className="text-sm text-muted-foreground" data-ai-id="terms-effective-date">Last updated: NOV 9, 2025</p>
        </CardHeader>
        <CardContent>
          <article className="space-y-6 prose dark:prose-invert max-w-none" data-ai-id="terms-article">
            <p>Please read these terms and conditions carefully before using Our Service.</p>
            
            <section>
                <h2 className="text-2xl font-semibold">Interpretation and Definitions</h2>
                <h3 className="text-xl font-semibold mt-4">Interpretation</h3>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <h3 className="text-xl font-semibold mt-4">Definitions</h3>
                <p>For the purposes of these Terms and Conditions:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party.</li>
                    <li><strong>Company</strong> (referred to as either “the Company”, “We”, “Us” or “Our” in this Agreement) refers to vtuadda.</li>
                    <li><strong>Country</strong> refers to: Karnataka, India.</li>
                    <li><strong>Service</strong> refers to the Website.</li>
                    <li><strong>Terms and Conditions</strong> (also referred as “Terms”) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
                    <li><strong>Website</strong> refers to vtuadda, accessible from https://vtuadda.com</li>
                    <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Acknowledgment</h2>
                <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
                <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Please read Our Privacy Policy carefully before using Our Service.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Links to Other Websites</h2>
                <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company. The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Termination</h2>
                <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions. Upon termination, Your right to use the Service will cease immediately.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
                <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service).</p>
            </section>
            
            <section>
                <h2 className="text-2xl font-semibold">“AS IS” and “AS AVAILABLE” Disclaimer</h2>
                <p>The Service is provided to You “AS IS” and “AS AVAILABLE” and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Governing Law</h2>
                <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Service may also be subject to other local, state, national, or international laws.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Disputes Resolution</h2>
                <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Changes to These Terms and Conditions</h2>
                <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By email: thevtuadda@gmail.com</li>
                <li>By visiting this page on our website: <a href="/contact" className="text-primary hover:underline">https://vtuadda.com/contact</a></li>
              </ul>
            </section>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
