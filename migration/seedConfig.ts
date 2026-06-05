import { db } from "../firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

async function seedConfig() {
  console.log("Seeding portfolioConfig settings to Firestore...");
  const docRef = doc(db, "settings", "portfolioConfig");

  const config = {
    projectsEnabled: true,
    experienceEnabled: true,
    skillsEnabled: true,
    educationEnabled: true,
    certificationsEnabled: true,
    contactEnabled: true,
    maintenanceMode: false,
    lastUpdated: serverTimestamp()
  };

  try {
    await setDoc(docRef, config);
    console.log("✅ Successfully seeded portfolioConfig settings!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed portfolioConfig:", error);
    process.exit(1);
  }
}

seedConfig();
