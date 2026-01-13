
import { BackButton } from '@/components/back-to-home-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Script from 'next/script';

export default function DisclaimerPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-0" data-ai-id="disclaimer-page-container">
      <BackButton />
      <Card data-ai-id="disclaimer-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary" data-ai-id="disclaimer-heading">Disclaimer</CardTitle>
           <p className="text-sm text-muted-foreground" data-ai-id="disclaimer-last-updated">Last updated: July 26, 2024</p>
        </CardHeader>
        <CardContent>
            <article className="space-y-6 prose dark:prose-invert max-w-none" data-ai-id="disclaimer-article">

                <p>The information provided by vtuadda ("we," "us," or "our") on https://vtuadda.com (the "Site") is for general informational and educational purposes only. All information on the Site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>

                <section>
                    <h2 className="text-2xl font-semibold">Interpretation and Definitions</h2>
                    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Company</strong> (referred to as either “the Company”, “We”, “Us” or “Our” in this Disclaimer) refers to vtuadda.</li>
                        <li><strong>Service</strong> refers to the Website.</li>
                        <li><strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                        <li><strong>Website</strong> refers to vtuadda, accessible from https://vtuadda.com</li>
                    </ul>
                </section>
                
                <section data-ai-id="disclaimer-section-unofficial">
                    <h2 className="text-2xl font-semibold" data-ai-id="disclaimer-heading-unofficial">Not an Official University Site</h2>
                    <p data-ai-id="disclaimer-text-unofficial">vtuadda is an independent, student-created platform. It is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Visvesvaraya Technological University (VTU) or any of its subsidiaries or affiliates. The official VTU website can be found at vtu.ac.in. The name "VTU" is used for identification purposes only, to describe the subject matter of the resources provided.</p>
                </section>

                <section data-ai-id="disclaimer-section-educational">
                    <h2 className="text-2xl font-semibold" data-ai-id="disclaimer-heading-educational">Educational Content & Fair Use</h2>
                    <p data-ai-id="disclaimer-text-educational">The study materials, notes, question papers, and other resources available on this website are intended for educational and reference purposes only. They are not a substitute for professional academic advice or official course materials. We may use copyrighted material which has not always been specifically authorized by the copyright owner, believing this constitutes a “fair use” for purposes such as teaching, scholarship, or research. If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.</p>
                </section>
                
                <section data-ai-id="disclaimer-section-links">
                    <h2 className="text-2xl font-semibold" data-ai-id="disclaimer-heading-links">External Links Disclaimer</h2>
                    <p data-ai-id="disclaimer-text-links">The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company. Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold">Errors and Omissions Disclaimer</h2>
                    <p>The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to ensure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service. The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold">Views Expressed Disclaimer</h2>
                    <p>The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company. Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment. The Company is not liable for any comment published by users and reserves the right to delete any comment for any reason whatsoever.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold">No Responsibility & "Use at Your Own Risk" Disclaimer</h2>
                    <p>The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional advisers. In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.</p>
                    <p>All information in the Service is provided “as is”, with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied. The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.</p>
                </section>
                
                <section>
                    <h2 className="text-2xl font-semibold">Contact Us</h2>
                    <p>If you have any questions about this disclaimer, You can contact us:</p>
                     <ul className="list-disc pl-6 space-y-2">
                        <li>By email: thevtuadda@gmail.com</li>
                        <li>By visiting our contact section: <a href="/#contact" className="text-primary hover:underline">vtuadda.com/#contact</a></li>
                    </ul>
                </section>
            </article>
        </CardContent>
      </Card>
    </div>
  );
}
