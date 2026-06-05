import { certificationsManifest } from "../section-07-certifications/data/certifications-manifest";
import { db } from "../firebase/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";

async function verifyCertificationsMigration() {
  console.log("Starting Phase 12.5: Certifications Migration Verification...");

  try {
    const colRef = collection(db, "certifications");
    const snapshot = await getDocs(colRef);
    const firestoreCerts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Array<DocumentData & { id: string }>;

    console.log(`Firestore has ${firestoreCerts.length} documents in 'certifications' collection.`);
    console.log(`Local backup has ${certificationsManifest.length} entries.`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < certificationsManifest.length; i++) {
      const local = certificationsManifest[i];
      const match = firestoreCerts.find(
        (f) => (f.title as string).toLowerCase() === local.title.toLowerCase()
      );

      if (match) {
        console.log(`\n🔍 Verifying "${local.title}":`);
        console.log(`  - Match Found (ID: ${match.id})`);
        
        // Check core fields
        const checks = [
          { field: "title", ok: match.title === local.title },
          { field: "issuer", ok: match.issuer === local.issuer },
          { field: "date", ok: match.date === local.date },
          { field: "issueDate", ok: match.issueDate === local.date },
          { field: "credentialId", ok: match.credentialId === local.credentialId },
          { field: "pdfUrl", ok: match.pdfUrl === local.pdfUrl },
          { field: "pdf", ok: match.pdf === local.pdfUrl },
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

        // Check skillsVerified array
        const skillsVerifiedOk = Array.isArray(match.skillsVerified) && 
                              match.skillsVerified.length === local.skillsVerified.length && 
                              match.skillsVerified.every((t: string) => local.skillsVerified.includes(t));
        
        if (!skillsVerifiedOk) {
          console.warn(`  ⚠️ skillsVerified mismatch. Firestore: ${JSON.stringify(match.skillsVerified)}, Local: ${JSON.stringify(local.skillsVerified)}`);
          itemOk = false;
        }

        // Check skills array
        const skillsOk = Array.isArray(match.skills) && 
                        match.skills.length === local.skillsVerified.length && 
                        match.skills.every((t: string) => local.skillsVerified.includes(t));
        
        if (!skillsOk) {
          console.warn(`  ⚠️ skills mismatch. Firestore: ${JSON.stringify(match.skills)}, Local: ${JSON.stringify(local.skillsVerified)}`);
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

verifyCertificationsMigration().catch((err) => {
  console.error("Verification fatal error:", err);
  process.exit(1);
});
