export type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

/**
 * Single source of truth for the home page FAQ content: rendered by
 * `components/FAQSection.tsx` and emitted as FAQPage JSON-LD by
 * `app/layout.tsx`, so the two can never disagree.
 */
export const HOME_FAQS: FaqItem[] = [
    {
      question: "What is NEET UG?",
      answer:
        "NEET UG (National Eligibility cum Entrance Test - Undergraduate) is a national-level medical entrance exam conducted in India for admission to MBBS, BDS, and other undergraduate medical courses.",
      category: "General"
    },
    {
      question: "What is the eligibility criteria for NEET UG?",
      answer:
        "Candidates must have completed 17 years of age and passed 10+2 with Physics, Chemistry, Biology, and English.",
      category: "Eligibility"
    },
    {
      question: "How many times can I attempt NEET UG?",
      answer:
        "There is no limit on the number of attempts for NEET UG.",
      category: "Exam Rules"
    },
    {
      question: "What is NEET UG exam pattern?",
      answer:
        "NEET UG consists of Physics, Chemistry, and Biology with multiple-choice questions.",
      category: "Exam Pattern"
    },
    {
      question: "How are NEET UG seats allotted?",
      answer:
        "Seats are allotted through AIQ, State Quota, and other counseling processes.",
      category: "Admission Process"
    },
    {
      question: "What documents are required for MBBS admission?",
      answer:
        "10th & 12th mark sheets, NEET scorecard, ID proof, photographs, and certificates are required.",
      category: "Documentation"
    },
    {
      question: "Can I get MBBS admission without NEET UG?",
      answer:
        "NEET UG is mandatory for most MBBS admissions in India.",
      category: "Admission Process"
    },
    {
      question: "What is the minimum NEET score required?",
      answer:
        "Cutoff depends on category and college type.",
      category: "Scoring"
    }
];
