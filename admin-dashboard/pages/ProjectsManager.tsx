"use client";

import React, { useEffect, useState } from "react";
import { ProjectsService } from "../../firebase/firestore";
import { StorageService } from "../../firebase/storage";
import { Project } from "../../types/Project";

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form/Editor states
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  
  // File upload progress states
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await ProjectsService.getAll();
      setProjects(data);
    } catch (e) {
      console.error("Error loading projects: ", e);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setCurrentProject({
      title: "",
      tagline: "",
      status: "draft",
      category: "",
      description: "",
      problemSolved: "",
      techStack: [],
      toolsUsed: [],
      keyFeatures: [],
      thumbnail: "",
      gallery: [],
      architectureDiagram: "",
      videoDemo: "",
      github: "",
      liveDemo: "",
      featured: false,
      displayOrder: projects.length + 1
    });
    setUploadProgress({});
    setIsEditing(true);
  };

  const handleOpenEdit = (project: Project) => {
    setCurrentProject({ ...project });
    setUploadProgress({});
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;
    try {
      await ProjectsService.delete(id);
      await loadProjects();
    } catch (e) {
      console.error("Delete failed: ", e);
      alert("Error deleting project.");
    }
  };

  const handleToggleStatus = async (project: Project) => {
    if (!project.id) return;
    const newStatus = project.status === "published" ? "draft" : "published";
    try {
      await ProjectsService.update(project.id, { status: newStatus });
      await loadProjects();
    } catch (e) {
      console.error("Status update failed: ", e);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Project) => {
    const file = e.target.files?.[0];
    if (!file || !currentProject) return;

    setUploadingField(fieldName);
    const path = `projects/${Date.now()}_${file.name}`;
    
    try {
      const url = await StorageService.uploadFile(path, file, (progress) => {
        setUploadProgress((prev) => ({ ...prev, [fieldName]: Math.round(progress) }));
      });
      
      setCurrentProject((prev) => {
        if (!prev) return prev;
        if (fieldName === "gallery") {
          return { ...prev, gallery: [...(prev.gallery || []), url] };
        }
        return { ...prev, [fieldName]: url };
      });
    } catch (err) {
      console.error("Upload error: ", err);
      alert("Upload failed.");
    } finally {
      setUploadingField(null);
    }
  };

  const handleRemoveGalleryImage = (idxToRemove: number) => {
    setCurrentProject((prev) => {
      if (!prev) return prev;
      const gallery = (prev.gallery || []).filter((_, idx) => idx !== idxToRemove);
      return { ...prev, gallery };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject || saving) return;
    setSaving(true);

    try {
      const pData = {
        title: currentProject.title || "Untitled Project",
        tagline: currentProject.tagline || "",
        status: currentProject.status || "draft",
        category: currentProject.category || "",
        description: currentProject.description || "",
        problemSolved: currentProject.problemSolved || "",
        techStack: Array.isArray(currentProject.techStack) ? currentProject.techStack : [],
        toolsUsed: Array.isArray(currentProject.toolsUsed) ? currentProject.toolsUsed : [],
        keyFeatures: Array.isArray(currentProject.keyFeatures) ? currentProject.keyFeatures : [],
        thumbnail: currentProject.thumbnail || "",
        gallery: currentProject.gallery || [],
        architectureDiagram: currentProject.architectureDiagram || "",
        videoDemo: currentProject.videoDemo || "",
        github: currentProject.github || "",
        liveDemo: currentProject.liveDemo || "",
        featured: !!currentProject.featured,
        displayOrder: Number(currentProject.displayOrder) || 1
      };

      if (currentProject.id && !currentProject.id.startsWith("local-")) {
        await ProjectsService.update(currentProject.id, pData);
      } else {
        await ProjectsService.create(pData);
      }
      setIsEditing(false);
      setCurrentProject(null);
      await loadProjects();
    } catch (err) {
      console.error("Save failed: ", err);
      alert("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Database Collection
          </span>
          <h1 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            Projects Manager
          </h1>
        </div>
        {!isEditing && (
          <button 
            onClick={handleOpenCreate}
            className="px-4 py-2 text-[10px] text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all cursor-pointer font-medium"
          >
            [ Add New Project ]
          </button>
        )}
      </div>

      {/* LIST VIEW */}
      {!isEditing && (
        <>
          {loading ? (
            <div className="flex justify-center min-h-[200px] items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Synchronizing projects collection...
            </div>
          ) : (
            <div className="border border-zinc-800 bg-[#0c0c0d] rounded overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Order</th>
                    <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Title</th>
                    <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Category</th>
                    <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Status</th>
                    <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Featured</th>
                    <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((proj) => (
                    <tr key={proj.id || proj.title} className="border-b border-zinc-900 hover:bg-zinc-900/30 transition-all">
                      <td className="p-4 text-xs font-mono text-zinc-500">{proj.displayOrder}</td>
                      <td className="p-4 text-xs text-zinc-200 font-medium">{proj.title}</td>
                      <td className="p-4 text-xs text-zinc-400">{proj.category}</td>
                      <td className="p-4 text-xs font-mono">
                        <button
                          onClick={() => handleToggleStatus(proj)}
                          className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-medium cursor-pointer ${
                            proj.status === "published"
                              ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900"
                              : "bg-zinc-800 text-zinc-500"
                          }`}
                        >
                          {proj.status}
                        </button>
                      </td>
                      <td className="p-4 text-xs font-mono text-zinc-400">
                        {proj.featured ? "★ Yes" : "No"}
                      </td>
                      <td className="p-4 text-xs font-mono text-zinc-400 flex gap-4">
                        <button 
                          onClick={() => handleOpenEdit(proj)}
                          className="hover:text-zinc-100 transition-all cursor-pointer"
                        >
                          [ Edit ]
                        </button>
                        <button 
                          onClick={() => proj.id && handleDelete(proj.id)}
                          className="hover:text-red-400 transition-all cursor-pointer"
                        >
                          [ Delete ]
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* EDITOR FORM VIEW */}
      {isEditing && currentProject && (
        <form onSubmit={handleSave} className="border border-zinc-800 bg-[#0c0c0d] p-8 rounded flex flex-col gap-6 max-w-3xl">
          <div className="flex justify-between items-center border-b border-zinc-850 pb-4">
            <h3 className="text-sm font-semibold tracking-widest text-zinc-100 uppercase">
              {currentProject.id ? "[ Edit Project Details ]" : "[ Create New Project ]"}
            </h3>
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              [ Cancel ]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Meta fields */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Project Title</label>
              <input
                type="text"
                value={currentProject.title || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                required
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Tagline</label>
              <input
                type="text"
                value={currentProject.tagline || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, tagline: e.target.value })}
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Category</label>
              <input
                type="text"
                value={currentProject.category || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all"
                placeholder="e.g. Machine Learning, Android App"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Display Order</label>
              <input
                type="number"
                value={currentProject.displayOrder || 1}
                onChange={(e) => setCurrentProject({ ...currentProject, displayOrder: parseInt(e.target.value) || 1 })}
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">GitHub URL</label>
              <input
                type="url"
                value={currentProject.github || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Live Demo URL</label>
              <input
                type="url"
                value={currentProject.liveDemo || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, liveDemo: e.target.value })}
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all"
              />
            </div>

            {/* Toggle fields */}
            <div className="flex gap-8 items-center pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={!!currentProject.featured}
                  onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                  className="w-3.5 h-3.5 border border-zinc-800 rounded bg-[#111112]"
                />
                <label htmlFor="featured" className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider cursor-pointer">
                  Featured Project
                </label>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={currentProject.status || "draft"}
                  onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                  className="bg-[#111112] border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
                  Publishing Status
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={currentProject.techStack?.join(", ") || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, techStack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all"
                placeholder="React, Three.js, TailwindCSS"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Tools & Frameworks (comma separated)</label>
              <input
                type="text"
                value={currentProject.toolsUsed?.join(", ") || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, toolsUsed: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all"
                placeholder="Figma, Git, npm"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Description</label>
              <textarea
                value={currentProject.description || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                rows={3}
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Problem Solved</label>
              <textarea
                value={currentProject.problemSolved || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, problemSolved: e.target.value })}
                rows={2}
                className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all resize-none"
              />
            </div>

            {/* Storage Media uploads */}
            <div className="border border-zinc-800 p-4 rounded bg-[#080808] flex flex-col gap-4">
              <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Thumbnail Asset</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "thumbnail")}
                className="text-xs text-zinc-500 font-mono"
              />
              {uploadingField === "thumbnail" && (
                <div className="text-[9px] text-zinc-400 font-mono">Uploading: {uploadProgress["thumbnail"]}%</div>
              )}
              {currentProject.thumbnail && (
                <div className="text-[10px] text-emerald-400 font-mono truncate">File Linked: {currentProject.thumbnail}</div>
              )}
            </div>

            <div className="border border-zinc-800 p-4 rounded bg-[#080808] flex flex-col gap-4">
              <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Architecture Diagram</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "architectureDiagram")}
                className="text-xs text-zinc-500 font-mono"
              />
              {uploadingField === "architectureDiagram" && (
                <div className="text-[9px] text-zinc-400 font-mono">Uploading: {uploadProgress["architectureDiagram"]}%</div>
              )}
              {currentProject.architectureDiagram && (
                <div className="text-[10px] text-emerald-400 font-mono truncate">File Linked: {currentProject.architectureDiagram}</div>
              )}
            </div>

            <div className="border border-zinc-800 p-4 rounded bg-[#080808] flex flex-col gap-4">
              <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Demo Video Asset</span>
              <input 
                type="file" 
                accept="video/*"
                onChange={(e) => handleFileUpload(e, "videoDemo")}
                className="text-xs text-zinc-500 font-mono"
              />
              {uploadingField === "videoDemo" && (
                <div className="text-[9px] text-zinc-400 font-mono">Uploading: {uploadProgress["videoDemo"]}%</div>
              )}
              {currentProject.videoDemo && (
                <div className="text-[10px] text-emerald-400 font-mono truncate">File Linked: {currentProject.videoDemo}</div>
              )}
            </div>

            {/* Gallery Uploads */}
            <div className="border border-zinc-800 p-4 rounded bg-[#080808] flex flex-col gap-4 md:col-span-2">
              <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">Gallery Images Collection</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "gallery")}
                className="text-xs text-zinc-500 font-mono"
              />
              {uploadingField === "gallery" && (
                <div className="text-[9px] text-zinc-400 font-mono">Uploading Image: {uploadProgress["gallery"]}%</div>
              )}
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {(currentProject.gallery || []).map((img, index) => (
                  <div key={index} className="border border-zinc-800 p-2 rounded bg-zinc-900 flex justify-between items-center">
                    <span className="text-[9px] text-zinc-400 truncate w-32">{img}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="text-red-400 hover:text-red-300 font-mono text-[9px] cursor-pointer"
                    >
                      [ Remove ]
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full mt-4 py-2.5 text-xs text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all disabled:opacity-50 cursor-pointer font-semibold"
          >
            {saving ? "Saving Changes..." : "[ Save Project ]"}
          </button>
        </form>
      )}

    </div>
  );
}
export default ProjectsManager;
