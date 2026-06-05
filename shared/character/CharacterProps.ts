
export interface CharacterAttachmentState {
  idCardAttached: boolean;
  projectPocketAttached: boolean;
  experienceVaultAttached: boolean;
  contactTabletAttached: boolean;
}

export interface CharacterTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface CharacterStateProps {
  attachments: CharacterAttachmentState;
  transform: CharacterTransform;
  lookAt: [number, number, number] | null;
  idleSpeed: number;
}
