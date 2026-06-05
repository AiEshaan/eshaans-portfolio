import { contactManifest } from "../section-08-contact/data/contact-manifest";
import { db } from "../firebase/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";

async function verifyContactMigration() {
  console.log("Starting Phase 12.6: Contact Migration Verification...");

  try {
    const colRef = collection(db, "contact");
    const snapshot = await getDocs(colRef);
    const firestoreContacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Array<DocumentData & { id: string }>;

    console.log(`Firestore has ${firestoreContacts.length} documents in 'contact' collection.`);

    const expectedChannels = [
      {
        id: "contact-email",
        type: "email",
        title: "Mail app",
        value: contactManifest.email,
        url: `mailto:${contactManifest.email}`,
        icon: "Mail",
        displayOrder: 1
      },
      {
        id: "contact-github",
        type: "github",
        title: "GitHub Hub",
        value: "AiEshaan",
        url: contactManifest.github,
        icon: "Github",
        displayOrder: 2
      },
      {
        id: "contact-linkedin",
        type: "linkedin",
        title: "LinkedIn net",
        value: "eshaanpm",
        url: contactManifest.linkedin,
        icon: "Linkedin",
        displayOrder: 3
      },
      {
        id: "contact-resume",
        type: "resume",
        title: "Resume Reader",
        value: "Eshaan's Resume",
        url: contactManifest.resumeUrl,
        icon: "FileText",
        displayOrder: 4
      }
    ];

    let successCount = 0;
    let failCount = 0;

    for (const expected of expectedChannels) {
      const match = firestoreContacts.find((f) => f.id === expected.id);

      if (match) {
        console.log(`\n🔍 Verifying "${expected.title}":`);
        console.log(`  - Match Found (ID: ${match.id})`);

        const checks = [
          { field: "type", ok: match.type === expected.type },
          { field: "title", ok: match.title === expected.title },
          { field: "value", ok: match.value === expected.value },
          { field: "url", ok: match.url === expected.url },
          { field: "icon", ok: match.icon === expected.icon },
          { field: "displayOrder", ok: Number(match.displayOrder) === expected.displayOrder },
          { field: "status", ok: match.status === "published" },
          { field: "version", ok: Number(match.version) === 1 }
        ];

        let itemOk = true;
        for (const check of checks) {
          if (!check.ok) {
            console.warn(`  ⚠️ Field mismatch: "${check.field}" (Firestore: "${match[check.field]}", Expected: "${(expected as Record<string, unknown>)[check.field]}")`);
            itemOk = false;
          }
        }

        if (expected.type === "github") {
          const reposOk = Array.isArray(match.githubRepos) && 
                            match.githubRepos.length === contactManifest.githubRepos.length &&
                             match.githubRepos.every((r: Record<string, unknown>, idx: number) => r.name === contactManifest.githubRepos[idx].name);
          if (!reposOk) {
            console.warn("  ⚠️ githubRepos mismatch");
            itemOk = false;
          }
        }

        if (expected.type === "linkedin") {
          const summaryOk = match.linkedinSummary === contactManifest.linkedinSummary;
          if (!summaryOk) {
            console.warn("  ⚠️ linkedinSummary mismatch");
            itemOk = false;
          }
        }

        if (itemOk) {
          console.log(`  ✅ Verification PASSED`);
          successCount++;
        } else {
          console.error(`  ❌ Verification FAILED due to field mismatches`);
          failCount++;
        }
      } else {
        console.error(`❌ Verification FAILED: "${expected.title}" (ID: ${expected.id}) not found in Firestore!`);
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

verifyContactMigration().catch((err) => {
  console.error("Verification fatal error:", err);
  process.exit(1);
});
