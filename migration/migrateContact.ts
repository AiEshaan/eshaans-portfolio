import { contactManifest } from "../section-08-contact/data/contact-manifest";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

async function runContactMigration() {
  console.log("Starting Phase 12.6: Contact Content Migration...");

  const colRef = collection(db, "contact");

  const contactChannels = [
    {
      id: "contact-email",
      type: "email",
      title: "Mail app",
      value: contactManifest.email,
      url: `mailto:${contactManifest.email}`,
      icon: "Mail",
      displayOrder: 1,
      status: "published",
      version: 1
    },
    {
      id: "contact-github",
      type: "github",
      title: "GitHub Hub",
      value: "AiEshaan",
      url: contactManifest.github,
      icon: "Github",
      displayOrder: 2,
      status: "published",
      version: 1,
      githubRepos: contactManifest.githubRepos
    },
    {
      id: "contact-linkedin",
      type: "linkedin",
      title: "LinkedIn net",
      value: "eshaanpm",
      url: contactManifest.linkedin,
      icon: "Linkedin",
      displayOrder: 3,
      status: "published",
      version: 1,
      linkedinSummary: contactManifest.linkedinSummary
    },
    {
      id: "contact-resume",
      type: "resume",
      title: "Resume Reader",
      value: "Eshaan's Resume",
      url: contactManifest.resumeUrl,
      icon: "FileText",
      displayOrder: 4,
      status: "published",
      version: 1
    }
  ];

  for (const channel of contactChannels) {
    const docRef = doc(colRef, channel.id);
    console.log(`Migrating contact channel: "${channel.title}" -> Document ID: "${channel.id}"`);

    const channelDocData = {
      ...channel,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await setDoc(docRef, channelDocData);
      console.log(`✅ Successfully migrated: "${channel.title}"`);
    } catch (error) {
      console.error(`❌ Failed to migrate "${channel.title}":`, error);
    }
  }

  console.log("Contact Migration complete!");
  process.exit(0);
}

runContactMigration().catch((err) => {
  console.error("Contact Migration fatal error:", err);
  process.exit(1);
});
