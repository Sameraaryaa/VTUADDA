
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/back-to-home-button";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'How to Calculate VTU SGPA and CGPA: A Step-by-Step Guide',
  description: 'Learn the official VTU formulas and methods to accurately calculate your Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA). Understand credits, grade points, and how to use our calculators.',
};

export default function SgpaCgpaGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-0">
      <BackButton />
      <article className="prose lg:prose-xl dark:prose-invert">
        <h1 className="text-gradient">A Complete Guide to Calculating VTU SGPA & CGPA</h1>
        <p className="lead">
          Understanding how your Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA) are calculated is crucial for every VTU student. This guide breaks down the formulas, terms, and steps involved to help you track your academic performance accurately.
        </p>
        
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>What is SGPA?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>SGPA stands for <strong>Semester Grade Point Average</strong>. It is a measure of your academic performance in a single semester. It's calculated by taking the weighted average of the grade points you've earned in all the subjects of that semester, based on the credits assigned to each subject. It provides a clear snapshot of how you performed in your most recent exams.</p>
          </CardContent>
        </Card>

        <section>
          <h2>The Official VTU SGPA Calculation Formula</h2>
          <p>The formula provided by Visvesvaraya Technological University for calculating SGPA is as follows:</p>
          <div className="p-4 bg-muted rounded-lg text-center font-mono text-sm sm:text-base">
            SGPA (Si) = Σ (Ci × Gi) / Σ Ci
          </div>
          <p>Let's break down what each part of this formula means:</p>
          <ul className="mt-4">
            <li><strong>Si</strong> is the SGPA for the i-th semester (e.g., your 3rd-semester SGPA).</li>
            <li><strong>Ci</strong> is the number of credits for the i-th course/subject. You can find the credits for each subject in your syllabus.</li>
            <li><strong>Gi</strong> is the grade point you obtained in that i-th course/subject. This is determined by the marks you score.</li>
            <li><strong>Σ</strong> (Sigma) is a mathematical symbol for summation. It means you have to do the calculation for each subject and then add them all together.</li>
          </ul>
          <p>In simple terms, for each subject, you multiply its credits by the grade points you scored. You sum up these values for all subjects in the semester. Finally, you divide this total sum by the total number of credits for that semester.</p>
        </section>

        <section>
          <h2>VTU Grading System & Corresponding Grade Points</h2>
          <p>To use the SGPA formula, you first need to convert the marks you've scored in each subject into their corresponding Grade Points (Gi). VTU uses the following table for its grading system:</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Marks Range (%)</th>
                  <th>Grade</th>
                  <th>Level</th>
                  <th>Grade Point (Gi)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>90-100</td><td>O</td><td>Outstanding</td><td>10</td></tr>
                <tr><td>80-89</td><td>A+</td><td>Excellent</td><td>9</td></tr>
                <tr><td>70-79</td><td>A</td><td>Very Good</td><td>8</td></tr>
                <tr><td>60-69</td><td>B+</td><td>Good</td><td>7</td></tr>
                <tr><td>55-59</td><td>B</td><td>Above Average</td><td>6</td></tr>
                <tr><td>50-54</td><td>C</td><td>Average</td><td>5</td></tr>
                <tr><td>40-49</td><td>P</td><td>Pass</td><td>4</td></tr>
                <tr><td>&lt; 40</td><td>F</td><td>Fail</td><td>0</td></tr>
                <tr><td colSpan={4} className="text-center">Absent</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Understanding CGPA</CardTitle>
          </CardHeader>
          <CardContent>
            <p>CGPA, or <strong>Cumulative Grade Point Average</strong>, represents your overall academic performance across all the semesters you have completed so far. It provides a holistic view of your academic journey and is often the first metric recruiters look at. It is calculated as the weighted average of your SGPAs from each semester.</p>
          </CardContent>
        </Card>

         <section>
          <h2>The Official VTU CGPA Calculation Formula</h2>
          <p>The official formula for calculating CGPA at the end of your engineering program is:</p>
          <div className="p-4 bg-muted rounded-lg text-center font-mono text-sm sm:text-base">
            CGPA = Σ (Total Credits of Semester × SGPA of Semester) / Σ (Total Credits of all Semesters)
          </div>
          <p>
            For a simpler approach, which gives a very close approximation, you can take the simple average of all your SGPAs. For example, after completing 4 semesters, your approximate CGPA would be:
          </p>
          <div className="p-4 bg-muted rounded-lg text-center font-mono text-sm sm:text-base">
            Approx. CGPA = (Sem1 SGPA + Sem2 SGPA + Sem3 SGPA + Sem4 SGPA) / 4
          </div>
        </section>

        <section>
          <h2>How to Convert CGPA to Percentage?</h2>
          <p>Many companies and universities ask for your aggregate percentage instead of CGPA. VTU provides a standardized, official formula for this conversion:</p>
          <div className="p-4 bg-muted rounded-lg text-center font-mono text-sm sm:text-base">
            Equivalent Percentage = [CGPA - 0.75] × 10
          </div>
          <p>This is the only formula you should use for official purposes. For example, if your final CGPA is 8.5, your equivalent percentage would be [8.5 - 0.75] × 10 = 77.5%.</p>
        </section>
        
        <section>
          <h2>Frequently Asked Questions (FAQ)</h2>
            <h3 className="!mt-4">1. Do backlog subjects affect my SGPA?</h3>
            <p>When you fail a subject, you get 0 grade points for it. This is included in your SGPA calculation for that semester, which significantly lowers your score. When you clear the backlog, the new grade is used to recalculate your CGPA, but the original SGPA for that semester remains unchanged on your mark sheet.</p>
            
            <h3 className="!mt-4">2. Are the rules different for the 2018, 2021, and 2022 schemes?</h3>
            <p>The core formula for calculating SGPA and CGPA has remained consistent across recent VTU schemes. The main differences lie in the credit distribution and subject codes for each scheme, which is why it's important to use a calculator that is specific to your scheme.</p>
            
            <h3 className="!mt-4">3. Why is it important to maintain a good CGPA?</h3>
            <p>A good CGPA (typically 7.5 or above) is often the minimum eligibility criteria for campus placements at major IT companies. It also plays a crucial role if you plan to apply for higher studies (M.Tech, MS, MBA) abroad or in top Indian universities.</p>
            
            <h3 className="!mt-4">4. Can I use your website's calculator for official purposes?</h3>
            <p>Our calculators are designed to be highly accurate based on VTU's official formulas. However, they should be used for estimation and personal tracking. Always refer to your official VTU mark sheets for final, official scores.</p>
        </section>
        
        <section>
            <h2>Conclusion: Take Control of Your Grades</h2>
            <p>Understanding how your SGPA and CGPA are calculated empowers you to set academic goals and track your progress effectively. Instead of doing these complex calculations manually, you can use our simple and accurate tools to find your SGPA and CGPA in seconds.</p>
            <p>
                <Link href="/calculator" className="text-primary font-bold hover:underline">Go to the VTU SGPA/CGPA Calculator &rarr;</Link>
            </p>
        </section>
      </article>
    </div>
  );
}
