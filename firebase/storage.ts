import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export const StorageService = {
  /**
   * Uploads a file to Firebase Storage under a designated path.
   * Returns the public download URL of the uploaded asset.
   */
  async uploadFile(path: string, file: File, onProgress?: (pct: number) => void): Promise<string> {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  },

  /**
   * Deletes an asset located at the given storage URL.
   */
  async deleteFileByUrl(url: string): Promise<void> {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  }
};
