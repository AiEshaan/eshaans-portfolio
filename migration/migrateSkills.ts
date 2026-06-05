import skillsData from "../public/assets/skills/skills.json";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

async function runSkillsMigration() {
  console.log("Starting Phase 12.2: Skills Content Migration...");
  console.log(`Loaded ${skillsData.length} skills from local config.`);

  const colRef = collection(db, "skills");

  for (const skill of skillsData) {
    const docId = skill.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const docRef = doc(colRef, docId);

    console.log(`Migrating skill: "${skill.category}" -> Document ID: "${docId}"`);

    const skillDocData = {
      ...skill,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await setDoc(docRef, skillDocData);
      console.log(`✅ Successfully migrated: "${skill.category}"`);
    } catch (error) {
      console.error(`❌ Failed to migrate "${skill.category}":`, error);
    }
  }

  console.log("Skills Migration complete!");
  process.exit(0);
}

runSkillsMigration().catch((err) => {
  console.error("Skills Migration fatal error:", err);
  process.exit(1);
});
