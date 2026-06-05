import skillsData from "../public/assets/skills/skills.json";
import { db } from "../firebase/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";

async function verifySkillsMigration() {
  console.log("Starting Phase 12.2: Skills Migration Verification...");

  try {
    const colRef = collection(db, "skills");
    const snapshot = await getDocs(colRef);
    const firestoreSkills = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Array<DocumentData & { id: string }>;

    console.log(`Firestore has ${firestoreSkills.length} documents in 'skills' collection.`);
    console.log(`Local backup has ${skillsData.length} entries.`);

    let successCount = 0;
    let failCount = 0;

    for (const local of skillsData) {
      const match = firestoreSkills.find(
        (f) => (f.category as string).toLowerCase() === local.category.toLowerCase()
      );

      if (match) {
        console.log(`\n🔍 Verifying "${local.category}":`);
        console.log(`  - Match Found (ID: ${match.id})`);
        
        // Check core fields
        const checks = [
          { field: "category", ok: match.category === local.category },
          { field: "icon", ok: match.icon === local.icon },
          { field: "order", ok: Number(match.order) === Number(local.order) }
        ];

        let itemOk = true;
        for (const check of checks) {
          if (!check.ok) {
            console.warn(`  ⚠️ Field mismatch: "${check.field}" (Firestore: "${match[check.field]}", Local: "${(local as unknown as Record<string, unknown>)[check.field]}")`);
            itemOk = false;
          }
        }

        // Check tools array
        const toolsOk = Array.isArray(match.tools) && 
                        match.tools.length === local.tools.length && 
                        match.tools.every((t: string) => local.tools.includes(t));
        
        if (!toolsOk) {
          console.warn(`  ⚠️ Tools mismatch. Firestore: ${JSON.stringify(match.tools)}, Local: ${JSON.stringify(local.tools)}`);
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
        console.error(`❌ Verification FAILED: "${local.category}" not found in Firestore!`);
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

verifySkillsMigration().catch((err) => {
  console.error("Verification fatal error:", err);
  process.exit(1);
});
