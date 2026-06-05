import { educationManifest } from "../section-06-education/data/education-manifest";
import { db } from "../firebase/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";

async function verifyEducationMigration() {
  console.log("Starting Phase 12.4: Education Migration Verification...");

  try {
    const colRef = collection(db, "education");
    const snapshot = await getDocs(colRef);
    const firestoreEdus = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Array<DocumentData & { id: string }>;

    console.log(`Firestore has ${firestoreEdus.length} documents in 'education' collection.`);
    console.log(`Local backup has ${educationManifest.length} entries.`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < educationManifest.length; i++) {
      const local = educationManifest[i];
      const match = firestoreEdus.find(
        (f) => (f.institution as string).toLowerCase() === local.institution.toLowerCase()
      );

      if (match) {
        console.log(`\n🔍 Verifying "${local.institution}":`);
        console.log(`  - Match Found (ID: ${match.id})`);
        
        // Check core fields
        const checks = [
          { field: "institution", ok: match.institution === local.institution },
          { field: "degree", ok: match.degree === local.degree },
          { field: "duration", ok: match.duration === local.duration },
          { field: "location", ok: match.location === local.location },
          { field: "performance", ok: match.performance === local.performance },
          { field: "displayOrder", ok: Number(match.displayOrder) === i + 1 },
          { field: "status", ok: match.status === "published" },
          { field: "version", ok: Number(match.version) === 1 }
        ];

        let itemOk = true;
        for (const check of checks) {
          if (!check.ok) {
            console.warn(`  ⚠️ Field mismatch: "${check.field}" (Firestore: "${match[check.field]}", Local: "${(local as unknown as Record<string, unknown>)[check.field]}")`);
            itemOk = false;
          }
        }

        // Check details array
        const detailsOk = Array.isArray(match.details) && 
                          match.details.length === local.details.length && 
                          match.details.every((t: string) => local.details.includes(t));
        
        if (!detailsOk) {
          console.warn(`  ⚠️ Details mismatch. Firestore: ${JSON.stringify(match.details)}, Local: ${JSON.stringify(local.details)}`);
          itemOk = false;
        }

        if (itemOk) {
          console.log(`  ✅ Verification PASSED`);
          successCount++;
        } else {
          console.error(`  ❌ Verification FAILED due to field mismatches`);
          failCount++;
        }
      } else {
        console.error(`❌ Verification FAILED: "${local.institution}" not found in Firestore!`);
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

verifyEducationMigration().catch((err) => {
  console.error("Verification fatal error:", err);
  process.exit(1);
});
