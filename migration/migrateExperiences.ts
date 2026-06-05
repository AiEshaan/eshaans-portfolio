import { experienceManifest } from "../section-04-experience/data/experience-manifest";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

async function runExperiencesMigration() {
  console.log("Starting Phase 12.3: Experience Content Migration...");
  console.log(`Loaded ${experienceManifest.length} experiences from local config.`);

  const colRef = collection(db, "experiences");

  for (const exp of experienceManifest) {
    const docId = exp.company.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const docRef = doc(colRef, docId);

    console.log(`Migrating experience: "${exp.company}" -> Document ID: "${docId}"`);

    const expDocData = {
      ...exp,
      status: "published",
      version: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await setDoc(docRef, expDocData);
      console.log(`✅ Successfully migrated: "${exp.company}"`);
    } catch (error) {
      console.error(`❌ Failed to migrate "${exp.company}":`, error);
    }
  }

  console.log("Experience Migration complete!");
  process.exit(0);
}

runExperiencesMigration().catch((err) => {
  console.error("Experience Migration fatal error:", err);
  process.exit(1);
});
