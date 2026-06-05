export interface CertificationData {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  pdfUrl: string;
  skillsVerified: string[];
}

export const certificationsManifest: CertificationData[] = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2023",
    credentialId: "GDA-109283",
    pdfUrl: "/assets/certifications/google-data-analytics.pdf",
    skillsVerified: ["Data Cleaning", "Data Visualization", "R Programming", "SQL", "Tableau"]
  },
  {
    title: "Google Business Intelligence Professional Certificate",
    issuer: "Google",
    date: "2023",
    credentialId: "GBI-481029",
    pdfUrl: "/assets/certifications/google-business-intelligence.pdf",
    skillsVerified: ["Data Modeling", "ETL Pipelines", "BigQuery", "Data Reporting", "Dashboard Design"]
  },
  {
    title: "IBM AI Product Manager Professional Certificate",
    issuer: "IBM",
    date: "2024",
    credentialId: "IBM-AI-9021",
    pdfUrl: "/assets/certifications/ibm-ai-product-manager.pdf",
    skillsVerified: ["AI Lifecycle", "ML Model Evaluation", "AI Ethics", "AI Prototyping", "Product Strategy"]
  },
  {
    title: "GitHub Foundations",
    issuer: "GitHub",
    date: "2024",
    credentialId: "GH-FND-8821",
    pdfUrl: "/assets/certifications/github-foundations.pdf",
    skillsVerified: ["Git Version Control", "GitHub Actions", "Collaborative Workflows", "Issue Tracking"]
  }
];
