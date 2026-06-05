import { db } from "../firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Local imports
import skillsData from "../public/assets/skills/skills.json";
import { experienceManifest } from "../section-04-experience/data/experience-manifest";
import { educationManifest } from "../section-06-education/data/education-manifest";
import { certificationsManifest } from "../section-07-certifications/data/certifications-manifest";
import { contactManifest } from "../section-08-contact/data/contact-manifest";

async function verifyAll() {
  console.log("Starting verification of remaining Firestore collections...");
  let checksPassed = 0;
  let checksFailed = 0;

  // 1. Verify Skills
  console.log("\n🔍 Verifying Skills...");
  const skillsCol = collection(db, "skills");
  const skillsSnap = await getDocs(skillsCol);
  const skillsDb = skillsSnap.docs.map(d => d.data());
  console.log(`  - Local has ${skillsData.length} entries, Firestore has ${skillsDb.length} documents.`);
  if (skillsDb.length >= skillsData.length) {
    console.log("  ✅ Skills count verification PASSED");
    checksPassed++;
  } else {
    console.error("  ❌ Skills count verification FAILED");
    checksFailed++;
  }

  // 2. Verify Experience
  console.log("\n🔍 Verifying Experience...");
  const expCol = collection(db, "experiences");
  const expSnap = await getDocs(expCol);
  const expDb = expSnap.docs.map(d => d.data());
  console.log(`  - Local has ${experienceManifest.length} entries, Firestore has ${expDb.length} documents.`);
  if (expDb.length >= experienceManifest.length) {
    console.log("  ✅ Experience count verification PASSED");
    checksPassed++;
  } else {
    console.error("  ❌ Experience count verification FAILED");
    checksFailed++;
  }

  // 3. Verify Education
  console.log("\n🔍 Verifying Education...");
  const eduCol = collection(db, "education");
  const eduSnap = await getDocs(eduCol);
  const eduDb = eduSnap.docs.map(d => d.data());
  console.log(`  - Local has ${educationManifest.length} entries, Firestore has ${eduDb.length} documents.`);
  if (eduDb.length >= educationManifest.length) {
    console.log("  ✅ Education count verification PASSED");
    checksPassed++;
  } else {
    console.error("  ❌ Education count verification FAILED");
    checksFailed++;
  }

  // 4. Verify Certifications
  console.log("\n🔍 Verifying Certifications...");
  const certCol = collection(db, "certifications");
  const certSnap = await getDocs(certCol);
  const certDb = certSnap.docs.map(d => d.data());
  console.log(`  - Local has ${certificationsManifest.length} entries, Firestore has ${certDb.length} documents.`);
  if (certDb.length >= certificationsManifest.length) {
    console.log("  ✅ Certifications count verification PASSED");
    checksPassed++;
  } else {
    console.error("  ❌ Certifications count verification FAILED");
    checksFailed++;
  }

  // 5. Verify Contact Profile
  console.log("\n🔍 Verifying Contact Profile...");
  const contactDocRef = doc(db, "contact", "profile");
  const contactSnap = await getDoc(contactDocRef);
  if (contactSnap.exists()) {
    const contactDb = contactSnap.data();
    console.log(`  - Firestore Contact profile exists.`);
    if (contactDb.email === contactManifest.email && contactDb.github === contactManifest.github) {
      console.log("  ✅ Contact data validation PASSED");
      checksPassed++;
    } else {
      console.error("  ❌ Contact data validation FAILED (email or github mismatch)");
      checksFailed++;
    }
  } else {
    console.error("  ❌ Contact profile document not found in Firestore!");
    checksFailed++;
  }

  console.log("\n------------------------------------------------");
  console.log(`Verification Summary:`);
  console.log(`  - Passed: ${checksPassed}`);
  console.log(`  - Failed: ${checksFailed}`);
  console.log("------------------------------------------------");

  if (checksFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

verifyAll().catch((err) => {
  console.error("Verification fatal error:", err);
  process.exit(1);
});
