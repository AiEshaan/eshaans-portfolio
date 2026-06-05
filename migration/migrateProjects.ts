import { projectManifest } from "../section-03-projects/data/project-manifest";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

async function runMigration() {
  console.log("Starting Phase 12.1: Projects Content Migration...");
  console.log(`Loaded ${projectManifest.length} projects from local manifest.`);

  const projectsCol = collection(db, "projects");

  for (const project of projectManifest) {
    // Generate a clean document ID from the title
    const docId = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const docRef = doc(projectsCol, docId);

    console.log(`Migrating: "${project.title}" -> Document ID: "${docId}"`);

    const projectDocData = {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await setDoc(docRef, projectDocData);
      console.log(`✅ Successfully migrated: "${project.title}"`);
    } catch (error) {
      console.error(`❌ Failed to migrate "${project.title}":`, error);
    }
  }

  console.log("Migration complete!");
  process.exit(0);
}

runMigration().catch((err) => {
  console.error("Migration fatal error:", err);
  process.exit(1);
});
