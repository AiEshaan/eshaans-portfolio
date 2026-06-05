import { db } from "../firebase/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

// Local imports
import skillsData from "../public/assets/skills/skills.json";
import { experienceManifest } from "../section-04-experience/data/experience-manifest";
import { educationManifest } from "../section-06-education/data/education-manifest";
import { certificationsManifest } from "../section-07-certifications/data/certifications-manifest";
import { contactManifest } from "../section-08-contact/data/contact-manifest";

async function runRemainingMigrations() {
  console.log("Starting Remaining Content Migration (Phases 12.2 - 12.6)...");

  // 1. Migrate Skills (Phase 12.2)
  console.log("\n--- Migrating Skills ---");
  const skillsCol = collection(db, "skills");
  for (const skill of skillsData) {
    const docId = skill.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const docRef = doc(skillsCol, docId);
    console.log(`Migrating Skill: "${skill.category}" -> ID: "${docId}"`);
    await setDoc(docRef, {
      ...skill,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
  console.log("✅ Skills migration finished.");

  // 2. Migrate Experience (Phase 12.3)
  console.log("\n--- Migrating Experience ---");
  const expCol = collection(db, "experiences");
  for (const exp of experienceManifest) {
    const docId = exp.company.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const docRef = doc(expCol, docId);
    console.log(`Migrating Experience: "${exp.company}" -> ID: "${docId}"`);
    await setDoc(docRef, {
      ...exp,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
  console.log("✅ Experience migration finished.");

  // 3. Migrate Education (Phase 12.4)
  console.log("\n--- Migrating Education ---");
  const eduCol = collection(db, "education");
  for (const edu of educationManifest) {
    const docId = edu.institution.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const docRef = doc(eduCol, docId);
    console.log(`Migrating Education: "${edu.institution}" -> ID: "${docId}"`);
    await setDoc(docRef, {
      ...edu,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
  console.log("✅ Education migration finished.");

  // 4. Migrate Certifications (Phase 12.5)
  console.log("\n--- Migrating Certifications ---");
  const certCol = collection(db, "certifications");
  for (const cert of certificationsManifest) {
    const docId = cert.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const docRef = doc(certCol, docId);
    console.log(`Migrating Certification: "${cert.title}" -> ID: "${docId}"`);
    await setDoc(docRef, {
      ...cert,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
  console.log("✅ Certifications migration finished.");

  // 5. Migrate Contact (Phase 12.6)
  console.log("\n--- Migrating Contact ---");
  const contactRef = doc(db, "contact", "profile");
  console.log(`Migrating Contact Profile -> ID: "profile"`);
  await setDoc(contactRef, {
    ...contactManifest,
    updatedAt: serverTimestamp()
  });
  console.log("✅ Contact Profile migration finished.");

  console.log("\n🎉 All migrations completed successfully!");
  process.exit(0);
}

runRemainingMigrations().catch((err) => {
  console.error("Fatal error during migration:", err);
  process.exit(1);
});
