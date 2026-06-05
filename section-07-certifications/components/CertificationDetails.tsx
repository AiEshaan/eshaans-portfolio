"use client";

import React from "react";
import { Certification } from "../../types/Certification";

interface CertificationDetailsProps {
  selectedCert: string | null;
  onClose: () => void;
  certifications: Certification[];
}

export function CertificationDetails({ selectedCert, onClose, certifications }: CertificationDetailsProps) {
  if (!selectedCert) return null;

  const data = certifications.find((cert) => cert.title === selectedCert);
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-black/95 backdrop-blur-md transition-opacity duration-500 animate-fade-in pointer-events-auto">
      
      {/* Top Bar HUD */}
      <div className="flex justify-between items-start w-full">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
            Credential Record
          </span>
          <h2 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            {data.title}
          </h2>
          <p className="text-sm text-zinc-400 font-mono mt-1">
            Issued by {data.issuer} {"//"} {data.date}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Return to Certification Archive"
          className="px-4 py-2 text-[10px] text-zinc-300 font-mono uppercase tracking-widest border border-zinc-700 rounded-full hover:bg-zinc-800 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-400"
        >
          [ Return to Archive ]
        </button>
      </div>

      {/* Main Core Cert Details */}
      <div className="flex flex-col max-w-2xl my-auto text-left">
        <div className="mb-6">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Verification Registry</span>
          <p className="text-sm font-light text-zinc-300 font-mono mt-1">ID: {data.credentialId}</p>
        </div>

        <div className="space-y-4">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block">Verified Skills & Tools</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.skillsVerified.map((skill, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                <p className="text-sm font-light text-zinc-400">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-3 text-[10px] text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all"
          >
            [ View PDF Certificate ]
          </a>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end w-full mt-auto">
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Chapter 07 // Certification Archive
        </div>
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Status: Authenticated Log
        </div>
      </div>

    </div>
  );
}

export default CertificationDetails;
