"use client";

import React, { useEffect, useState, useRef } from "react";
import { ResumeService } from "../../firebase/firestore";
import { StorageService } from "../../firebase/storage";
import { ResumeData } from "../../types/Resume";

export function ResumeManager() {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadResumes() {
    setLoading(true);
    try {
      const data = await ResumeService.getResumes();
      setResumes(data);
    } catch (e) {
      console.error("Error loading resumes: ", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResumes();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload to Storage
      const path = `resumes/${Date.now()}_${file.name}`;
      const url = await StorageService.uploadFile(path, file, (pct) => {
        setUploadProgress(pct);
      });

      // 2. Add to Firestore
      const newResume: Omit<ResumeData, "id"> = {
        name: file.name.replace(".pdf", ""),
        url,
        isActive: resumes.length === 0, // Make active if it's the first one
        status: "published",
        version: resumes.length + 1,
        updatedAt: null // set by serverTimestamp in service
      };

      await ResumeService.addResume(newResume);
      
      // 3. Reload
      await loadResumes();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Check console.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSetActive = async (id: string) => {
    try {
      setLoading(true);
      await ResumeService.setActiveResume(id);
      await loadResumes();
    } catch (e) {
      console.error("Failed to set active resume", e);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      setLoading(true);
      // Try to delete from storage as well
      try {
        await StorageService.deleteFileByUrl(url);
      } catch (storageErr) {
        console.warn("Could not delete from storage (might not exist)", storageErr);
      }
      await ResumeService.deleteResume(id);
      await loadResumes();
    } catch (e) {
      console.error("Failed to delete", e);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Database Collection
          </span>
          <h1 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            Resume Manager
          </h1>
        </div>
        
        <div>
          <input 
            type="file" 
            accept="application/pdf" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 text-[10px] text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all cursor-pointer disabled:opacity-50"
          >
            {uploading ? `[ Uploading ${Math.round(uploadProgress)}% ]` : "[ Upload PDF ]"}
          </button>
        </div>
      </div>

      {loading && !uploading ? (
        <div className="flex justify-center min-h-[200px] items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Synchronizing resumes collection...
        </div>
      ) : (
        <div className="border border-zinc-800 bg-[#0c0c0d] rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Status</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Name</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Version</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-500 font-mono text-xs">
                    No resumes uploaded.
                  </td>
                </tr>
              ) : (
                resumes.map((resume) => (
                  <tr key={resume.id} className="border-b border-zinc-900 hover:bg-zinc-900/30 transition-all">
                    <td className="p-4 text-xs font-mono">
                      {resume.isActive ? (
                        <span className="text-green-400">● ACTIVE</span>
                      ) : (
                        <span className="text-zinc-500">○ INACTIVE</span>
                      )}
                    </td>
                    <td className="p-4 text-xs text-zinc-200 font-medium">{resume.name}</td>
                    <td className="p-4 text-xs font-mono text-zinc-400">v{resume.version}</td>
                    <td className="p-4 text-xs font-mono text-zinc-400 flex gap-4">
                      {!resume.isActive && (
                        <button 
                          onClick={() => handleSetActive(resume.id!)}
                          className="text-zinc-400 hover:text-green-400 transition-all cursor-pointer"
                        >
                          [ Set Active ]
                        </button>
                      )}
                      <a 
                        href={resume.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:text-zinc-100 transition-all"
                      >
                        [ View ]
                      </a>
                      <button 
                        onClick={() => handleDelete(resume.id!, resume.url)}
                        className="hover:text-red-400 transition-all cursor-pointer"
                      >
                        [ Delete ]
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ResumeManager;
