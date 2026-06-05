import { projectManifest } from "../section-03-projects/data/project-manifest";
import { db } from "../firebase/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";

async function verifyMigration() {
  console.log("Starting Phase 12.1: Projects Migration Verification...");
  
  try {
    const projectsCol = collection(db, "projects");
    const snapshot = await getDocs(projectsCol);
    const firestoreProjects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Array<DocumentData & { id: string }>;

    console.log(`Firestore has ${firestoreProjects.length} documents in the 'projects' collection.`);
    console.log(`Local manifest has ${projectManifest.length} entries.`);

    let successCount = 0;
    let failCount = 0;

    for (const local of projectManifest) {
      const match = firestoreProjects.find(
        (f) => (f.title as string).toLowerCase() === local.title.toLowerCase()
      );

      if (match) {
        console.log(`\n🔍 Verifying "${local.title}":`);
        console.log(`  - Match Found (ID: ${match.id})`);
        
        // Check core fields
        const checks = [
          { field: "title", ok: match.title === local.title },
          { field: "tagline", ok: match.tagline === local.tagline },
          { field: "category", ok: match.category === local.category },
          { field: "featured", ok: match.featured === local.featured },
          { field: "displayOrder", ok: Number(match.displayOrder) === Number(local.displayOrder) }
        ];

        let itemOk = true;
        for (const check of checks) {
          if (!check.ok) {
            console.warn(`  ⚠️ Field mismatch: "${check.field}" (Firestore: "${match[check.field]}", Local: "${(local as unknown as Record<string, unknown>)[check.field]}")`);
            itemOk = false;
          }
        }

        if (itemOk) {
          console.log(`  ✅ Field verification PASSED`);
          successCount++;
        } else {
          console.error(`  ❌ Verification FAILED due to field mismatches`);
          failCount++;
        }
      } else {
        console.error(`❌ Verification FAILED: "${local.title}" not found in Firestore!`);
        failCount++;
      }
    }

    console.log("\n------------------------------------------------");
    console.log(`Verification Summary:`);
    console.log(`  - Passed: ${successCount}`);
    console.log(`  - Failed: ${failCount}`);
    console.log("------------------------------------------------");

    if (failCount > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error("Verification fatal error:", err);
    process.exit(1);
  }
}

verifyMigration().catch((err) => {
  console.error("Verification run fatal error:", err);
  process.exit(1);
});
