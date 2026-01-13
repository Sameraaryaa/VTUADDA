
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { type Metadata } from 'next';
import { BackButton } from "@/components/back-to-home-button";
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Find answers to common questions about vtuadda, including how to download materials, use the calculators, and contribute to the community.',
};

const faqs = [
    {
        question: "What is vtuadda.com?",
        answer: "vtuadda.com is an online platform providing study materials for VTU (Visvesvaraya Technological University) students. We offer notes, model papers, previous year question papers, question banks, lab programs, and other academic resources to help you prepare for exams."
    },
    {
        question: "What kind of study materials do you provide?",
        answer: "We provide a variety of study materials such as: lecture notes, model question papers, previous year question papers, question banks, lab programs and more!"
    },
    {
        question: "Do I need to log in or sign up to access study materials?",
        answer: "No, all study materials on vtuadda.com are completely free, and you do not need to log in or sign up to access or download any resources."
    },
    {
        question: "How can I download the study materials?",
        answer: "You can freely download the study materials directly from our website. Simply visit the respective section, choose the material you need, and download it in PDF format."
    },
    {
        question: "Is there any fee for accessing the study materials?",
        answer: "No, all the study materials available on vtuadda.com are 100% free of charge. You can access and download them without any cost."
    },
    {
        question: "What is the SGPA calculator?",
        answer: "The SGPA (Semester Grade Point Average) calculator allows you to calculate your SGPA for a specific semester based on your exam grades. Simply enter your subject marks and the calculator will compute your SGPA for you."
    },
    {
        question: "What is the CGPA calculator?",
        answer: "The CGPA (Cumulative Grade Point Average) calculator helps you calculate your overall academic performance, including all semesters. You simply enter your SGPA for each semester and it will give you your cumulative CGPA."
    },
    {
        question: "How do I use the SGPA and CGPA calculators?",
        answer: "To calculate your SGPA, simply enter the marks you have received for each subject. The calculator will automatically compute your SGPA based on your marks and the credit points assigned to each subject. To calculate your CGPA, enter your SGPA for each semester, and the tool will compute your cumulative CGPA for all semesters."
    },
    {
        question: "Are the SGPA/CGPA calculators accurate?",
        answer: "Yes, our SGPA/CGPA calculators follow the official VTU grading system, ensuring accurate results based on the latest standards."
    },
    {
        question: "What is the advanced search functionality?",
        answer: "Our advanced search feature lets you quickly search for subjects and study materials. You only need to enter the subject name (at least 2 letters), and the search results will display live without redirecting you to another page, making it faster and more efficient."
    },
    {
        question: "How do I use the advanced search?",
        answer: "Simply type at least two letters of the subject name in the search bar. The system will dynamically filter and display relevant results for study materials related to that subject in real-time, without redirecting you to another page. This feature makes it fast and easy to find the materials you need!"
    },
    {
        question: "Can I find my course’s study materials?",
        answer: "Yes, you can easily find study materials relevant to your course. Use the advanced search or browse through the subject-specific sections to find the material you need."
    },
    {
        question: "How often are the study materials updated?",
        answer: "We regularly update our study materials to match the latest VTU syllabus, model papers, and previous year question papers. We strive to provide the most up-to-date and relevant resources for VTU students."
    },
    {
        question: "Do you provide lab programs or practical resources?",
        answer: "Yes, we offer a range of free lab programs and practical resources to assist with hands-on learning and exam preparation."
    },
    {
        question: "Can I contribute or upload my own study materials?",
        answer: "Yes! We now offer an option for users to upload their own study materials such as notes, model papers, and other academic resources. Once submitted, our admin team will verify the materials to ensure their quality and relevance. Once verified, the materials will be published on the site for other students to access and download."
    },
    {
        question: "Do you offer any resources for competitive exams?",
        answer: "While our primary focus is on VTU-related resources, some of our materials like model papers and question banks may be useful for competitive exams that follow similar academic patterns."
    },
    {
        question: "How can I contact you for support?",
        answer: "You can easily reach us through the contact form on our website or email us at thevtuadda@gmail.com. Our team will be happy to assist you with any queries or issues."
    },
    {
        question: "Is there a mobile app for vtuadda.com?",
        answer: "Currently, we don’t offer a dedicated mobile app, but our website is a fully responsive Progressive Web App (PWA) that works seamlessly on mobile devices. You can add it to your home screen for an app-like experience."
    },
    {
        question: "Can I share VTU study materials with my friends?",
        answer: "Yes, you can freely share links to the study materials on vtuadda.com with your friends and peers. We encourage sharing so that more students benefit from our free resources."
    },
    {
        question: "Do you provide solutions to previous year question papers?",
        answer: "Yes, we provide solutions to some of the previous year question papers, depending on availability. Our goal is to help you understand the approach to solving these questions."
    },
    {
        question: "Can I request specific study materials?",
        answer: "Yes, you can request specific study materials by contacting us through our support page. We are continuously working to expand our resources and will do our best to accommodate your requests."
    },
    {
        question: "Are your study materials available for all VTU branches?",
        answer: "Currently, we offer study materials for a wide range of VTU branches, including Computer Science, Information Science, AI & ML, Electronics & Communication, Mechanical, and more. We are continuously working to expand our library and plan to include materials for other branches as well."
    },
    {
        question: "Are the model papers aligned with the VTU exam pattern?",
        answer: "Absolutely! Our model papers are designed to reflect the latest VTU exam patterns, including question types, number of questions, and time limits."
    },
    {
        question: "Can I use your study materials for group study?",
        answer: "Yes! Our materials are intended for both individual and group study. Feel free to share and use them in your study groups to maximize learning."
    },
    {
        question: "How can I stay updated on new study material releases?",
        answer: "You can stay updated by following us on social media like WhatsApp and Telegram. We’ll keep you posted on new materials and updates."
    },
    {
        question: "How do I know if a study material is applicable to my syllabus?",
        answer: "All our study materials are categorized by subject and course. You can check the description of each material to verify if it corresponds with your syllabus. Additionally, our advanced search tool will help you find materials relevant to your subject."
    },
    {
        question: "What should I do if I face issues while downloading materials?",
        answer: "If you encounter any issues while downloading, try refreshing the page or clearing your browser cache. If the issue persists, please contact us at thevtuadda@gmail.com and we’ll assist you in resolving it."
    },
    {
        question: "Can I get personalized tutoring or mentoring through vtuadda?",
        answer: "Currently, vtuadda.com does not offer personalized tutoring or mentoring services. However, our study materials are comprehensive and designed to help you prepare independently for your exams."
    },
     {
        question: "Why can't I access a file? It says 'too many users have viewed or downloaded'.",
        answer: "This application uses Google Drive to store and share study materials. To prevent abuse and ensure stability, Google Drive has limits on how many people can view or download a single file within a 24-hour period. If a file becomes very popular very quickly (for example, right before an exam), it might hit this limit. This is a temporary restriction from Google's side. The best course of action is to try again after some time, usually within 24 hours, as the limit resets."
    }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
};

export default function FaqPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-0" data-ai-id="faq-page-container">
       <BackButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        data-ai-id="faq-schema-script"
      />
      <section className="text-center" data-ai-id="faq-header">
        <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-tight text-gradient" data-ai-id="faq-heading">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mt-2" data-ai-id="faq-subheading">
          Have a question? We've got answers. If you can't find what you're looking for, feel free to contact us.
        </p>
      </section>

      <Accordion type="single" collapsible className="w-full space-y-3" data-ai-id="faq-accordion">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl bg-card px-4" data-ai-id={`faq-item-${index}`}>
            <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline" data-ai-id={`faq-question-${index}`}>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground pt-2" data-ai-id={`faq-answer-${index}`}>
              <p>{faq.answer}</p>
              {(faq.question.includes("contribute") || faq.question.includes("request specific")) && (
                <p className="mt-2">
                  <Link href="/upload" className="font-semibold text-primary hover:underline" data-ai-id={`faq-contribution-link-${index}`}>
                    Go to the Contribution Page &rarr;
                  </Link>
                </p>
              )}
               {(faq.question.includes("contact") || faq.question.includes("issues")) && (
                <p className="mt-2">
                  <Link href="/#contact" className="font-semibold text-primary hover:underline" data-ai-id={`faq-contact-link-${index}`}>
                    Go to the Contact Form &rarr;
                  </Link>
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
