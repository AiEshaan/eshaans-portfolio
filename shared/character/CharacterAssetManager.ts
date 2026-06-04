import { characterReferences, CharacterAssetRegistry } from "./CharacterReferences";
import { CharacterAttachmentState } from "./CharacterProps";

export class CharacterAssetManager {
  /**
   * Retrieves the current asset path registry.
   */
  static getReferences(): CharacterAssetRegistry {
    return characterReferences;
  }

  /**
   * Checks if a real 3D GLB model path is registered and ready.
   */
  static is3DModelAvailable(): boolean {
    return characterReferences.glbModelPath !== null;
  }

  /**
   * Returns relative offsets (hotspots) on the character mesh for attachments.
   * Useful to snap R3F sub-systems (pocket doors, ID badges, tablet meshes) dynamically.
   */
  static getHotspotOffset(
    type: "idCard" | "pocket" | "vault" | "palm" | "tablet"
  ): [number, number, number] {
    switch (type) {
      case "idCard":
        // Lower neck / chest center lanyard hang position
        return [0.0, 0.65, 0.15];
      case "pocket":
        // Left chest pocket region
        return [-0.28, -0.4, 0.51];
      case "vault":
        // Middle zipper region
        return [0.0, 0.2, 0.52];
      case "palm":
        // Left hand open palm region
        return [0.35, -0.1, 0.4];
      case "tablet":
        // Front center interactive handheld zone
        return [0.0, -0.3, 0.7];
      default:
        return [0, 0, 0];
    }
  }

  /**
   * Evaluates attachment active status based on the current scroll step progression.
   */
  static getAttachmentsForProgress(scrollProgress: number): CharacterAttachmentState {
    return {
      idCardAttached: scrollProgress >= 0.7 && scrollProgress < 0.85,
      projectPocketAttached: scrollProgress >= 0.82 && scrollProgress < 0.98,
      experienceVaultAttached: scrollProgress >= 0.45 && scrollProgress < 0.6,
      contactTabletAttached: scrollProgress >= 0.92
    };
  }
}
