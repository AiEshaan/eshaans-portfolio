export interface CharacterAssetRegistry {
  faceReference: string;
  bodyFront: string;
  bodyLeft: string;
  bodyRight: string;
  bodyBack: string;
  glbModelPath: string | null; // For future 3D GLB model integration
}

export const characterReferences: CharacterAssetRegistry = {
  faceReference: "/assets/references/face.png",
  bodyFront: "/assets/references/full-body/front.png",
  bodyLeft: "/assets/references/full-body/left.png",
  bodyRight: "/assets/references/full-body/right.png",
  bodyBack: "/assets/references/full-body/back.png",
  glbModelPath: null // E.g., "/assets/character/eshaan_avatar.glb"
};
