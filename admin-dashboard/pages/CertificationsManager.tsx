"use client";

import React, { useEffect, useState } from "react";
import { CertificationsService } from "../../firebase/firestore";
import { Certification } from "../../types/Certification";

export function CertificationsManager() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCerts() {
      try {
        const data = await CertificationsService.getAll();
        setCerts(data);
      } catch (e) {
        console.error("Error loading certifications: ", e);
      } finally {
        setLoading(false);
      }
    }
    loadCerts();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Database Collection
          </span>
          <h1 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            Certifications Manager
          </h1>
        </div>
        <button className="px-4 py-2 text-[10px] text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all cursor-pointer">
          [ Add Credential ]
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center min-h-[200px] items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Synchronizing certifications collection...
        </div>
      ) : (
        <div className="border border-zinc-800 bg-[#0c0c0d] rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Title</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Issuer</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Date</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">ID Reference</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certs.map((cert) => (
                <tr key={cert.id || cert.title} className="border-b border-zinc-900 hover:bg-zinc-900/30 transition-all">
                  <td className="p-4 text-xs text-zinc-200 font-medium">{cert.title}</td>
                  <td className="p-4 text-xs text-zinc-400">{cert.issuer}</td>
                  <td className="p-4 text-xs font-mono text-zinc-400">{cert.date}</td>
                  <td className="p-4 text-xs font-mono text-zinc-400">{cert.credentialId}</td>
                  <td className="p-4 text-xs font-mono text-zinc-400 flex gap-4">
                    <button className="hover:text-zinc-100 transition-all cursor-pointer">[ Edit ]</button>
                    <button className="hover:text-red-400 transition-all cursor-pointer">[ Delete ]</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default CertificationsManager;
