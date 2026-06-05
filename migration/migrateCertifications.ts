import { certificationsManifest } from "../section-07-certifications/data/certifications-manifest";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

async function runCertificationsMigration() {
  console.log("Starting Phase 12.5: Certifications Content Migration...");
  console.log(`Loaded ${certificationsManifest.length} certifications from local config.`);

  const colRef = collection(db, "certifications");

  for (let i = 0; i < certificationsManifest.length; i++) {
    const cert = certificationsManifest[i];
    const docId = cert.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const docRef = doc(colRef, docId);

    console.log(`Migrating certification: "${cert.title}" -> Document ID: "${docId}"`);

    const certDocData = {
      ...cert,
      issueDate: cert.date,
      skills: cert.skillsVerified,
      pdf: cert.pdfUrl,
      badge: "",
      badgeUrl: "",
      verificationUrl: "",
      displayOrder: i + 1,
      status: "published",
      version: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await setDoc(docRef, certDocData);
      console.log(`✅ Successfully migrated: "${cert.title}"`);
    } catch (error) {
      console.error(`❌ Failed to migrate "${cert.title}":`, error);
    }
  }

  console.log("Certifications Migration complete!");
  process.exit(0);
}

runCertificationsMigration().catch((err) => {
  console.error("Certifications Migration fatal error:", err);
  process.exit(1);
});
