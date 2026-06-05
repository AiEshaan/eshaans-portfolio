import { educationManifest } from "../section-06-education/data/education-manifest";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

async function runEducationMigration() {
  console.log("Starting Phase 12.4: Education Content Migration...");
  console.log(`Loaded ${educationManifest.length} education records from local config.`);

  const colRef = collection(db, "education");

  for (let i = 0; i < educationManifest.length; i++) {
    const edu = educationManifest[i];
    const docId = edu.institution.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const docRef = doc(colRef, docId);

    console.log(`Migrating education: "${edu.institution}" -> Document ID: "${docId}"`);

    const eduDocData = {
      ...edu,
      displayOrder: i + 1,
      status: "published",
      version: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await setDoc(docRef, eduDocData);
      console.log(`✅ Successfully migrated: "${edu.institution}"`);
    } catch (error) {
      console.error(`❌ Failed to migrate "${edu.institution}":`, error);
    }
  }

  console.log("Education Migration complete!");
  process.exit(0);
}

runEducationMigration().catch((err) => {
  console.error("Education Migration fatal error:", err);
  process.exit(1);
});
