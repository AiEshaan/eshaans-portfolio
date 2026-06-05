import { experienceManifest } from "../section-04-experience/data/experience-manifest";
import { db } from "../firebase/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";

async function verifyExperiencesMigration() {
  console.log("Starting Phase 12.3: Experience Migration Verification...");

  try {
    const colRef = collection(db, "experiences");
    const snapshot = await getDocs(colRef);
    const firestoreExps = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Array<DocumentData & { id: string }>;

    console.log(`Firestore has ${firestoreExps.length} documents in 'experiences' collection.`);
    console.log(`Local backup has ${experienceManifest.length} entries.`);

    let successCount = 0;
    let failCount = 0;

    for (const local of experienceManifest) {
      const match = firestoreExps.find(
        (f) => (f.company as string).toLowerCase() === local.company.toLowerCase()
      );

      if (match) {
        console.log(`\n🔍 Verifying "${local.company}":`);
        console.log(`  - Match Found (ID: ${match.id})`);
        
        // Check core fields
        const checks = [
          { field: "company", ok: match.company === local.company },
          { field: "role", ok: match.role === local.role },
          { field: "duration", ok: match.duration === local.duration },
          { field: "description", ok: match.description === local.description },
          { field: "order", ok: Number(match.order) === Number(local.order) },
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

        // Check achievements array
        const achievementsOk = Array.isArray(match.achievements) && 
                              match.achievements.length === local.achievements.length && 
                              match.achievements.every((t: string) => local.achievements.includes(t));
        
        if (!achievementsOk) {
          console.warn(`  ⚠️ Achievements mismatch. Firestore: ${JSON.stringify(match.achievements)}, Local: ${JSON.stringify(local.achievements)}`);
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
        console.error(`❌ Verification FAILED: "${local.company}" not found in Firestore!`);
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

verifyExperiencesMigration().catch((err) => {
  console.error("Verification fatal error:", err);
  process.exit(1);
});
