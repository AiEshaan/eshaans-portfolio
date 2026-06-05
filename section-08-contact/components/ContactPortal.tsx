"use client";

import React, { useState } from "react";
import { ContactTab } from "../hooks/useContactNavigation";
import { ContactChannel } from "../../types/Contact";
import { AnalyticsTracker } from "../../firebase/analytics";

interface ContactPortalProps {
  activeTab: ContactTab;
  onCloseApp: () => void;
  scrollProgress: number;
  contactChannels: ContactChannel[];
}

export function ContactPortal({ activeTab, onCloseApp, scrollProgress, contactChannels }: ContactPortalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isVisible = scrollProgress >= 0.88;
  if (!isVisible) return null;

  const emailChannel = contactChannels.find((c) => c.type === "email");
  const githubChannel = contactChannels.find((c) => c.type === "github");
  const linkedinChannel = contactChannels.find((c) => c.type === "linkedin");
  const resumeChannel = contactChannels.find((c) => c.type === "resume");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API contact message send
    setFormSubmitted(true);
    AnalyticsTracker.logPortfolioEvent("email_click", emailChannel?.value || "contact-form");
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setFormSubmitted(false);
    onCloseApp();
  };

  // Render overlay elements depending on active app state
  return (
    <div className={`fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-black/95 backdrop-blur-md transition-all duration-500 pointer-events-auto ${activeTab === "Home" ? "bg-opacity-0 backdrop-blur-0 pointer-events-none" : "bg-opacity-95"}`}>
      
      {/* 1. Header showing Active App Context */}
      {activeTab !== "Home" && (
        <div className="flex justify-between items-start w-full">
          <div>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              Tablet OS // Application
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
              {activeTab} App
            </h2>
          </div>
          <button
            onClick={onCloseApp}
            className="px-4 py-2 text-[10px] text-zinc-300 font-mono uppercase tracking-widest border border-zinc-700 rounded-full hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
          >
            [ Return to Home ]
          </button>
        </div>
      )}

      {/* 2. Application Viewports */}
      <div className="flex flex-col max-w-2xl my-auto text-left w-full mx-auto">
        
        {/* EMAIL COMPOSER APP */}
        {activeTab === "Email" && (
          <div className="w-full">
            {formSubmitted ? (
              <div className="space-y-4 text-center py-8">
                <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider block">Status: Message Dispatched</span>
                <p className="text-xl font-light text-zinc-100">Thank you. Connection established.</p>
                <button
                  onClick={handleResetForm}
                  className="mt-4 px-4 py-2 text-[10px] text-zinc-900 bg-zinc-100 uppercase font-mono tracking-widest rounded hover:bg-white transition-all cursor-pointer"
                >
                  [ Done ]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                    placeholder="E.g., John Doe"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                    placeholder="E.g., john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 resize-none"
                    placeholder="Let's build something meaningful..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 text-[10px] text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all cursor-pointer"
                >
                  [ Send Message ]
                </button>
              </form>
            )}
          </div>
        )}

        {/* GITHUB HUB APP */}
        {activeTab === "GitHub" && (
          <div className="space-y-6">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Active Repositories</span>
            <div className="space-y-4">
              {(githubChannel?.githubRepos || []).map((repo, i) => (
                <a
                  key={i}
                  href={`${githubChannel?.url || ""}/${repo.name}`}
                  onClick={() => AnalyticsTracker.logPortfolioEvent("github_click", repo.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-zinc-900 bg-zinc-950/40 rounded-lg hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-light text-zinc-200">{repo.name}</h3>
                    <span className="text-[10px] text-zinc-500 font-mono">★ {repo.stars}</span>
                  </div>
                  <p className="text-sm text-zinc-400 font-light mt-1">{repo.desc}</p>
                </a>
              ))}
            </div>
            <div className="pt-4">
              <a
                href={githubChannel?.url || ""}
                onClick={() => AnalyticsTracker.logPortfolioEvent("github_click", "profile")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-zinc-300 font-mono uppercase tracking-widest hover:text-white"
              >
                [ View Full GitHub Profile → ]
              </a>
            </div>
          </div>
        )}

        {/* LINKEDIN APP */}
        {activeTab === "LinkedIn" && (
          <div className="space-y-6">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Profile Summary</span>
            <p className="text-lg font-light text-zinc-300 leading-relaxed">
              {linkedinChannel?.linkedinSummary || ""}
            </p>
            <div className="pt-6">
              <a
                href={linkedinChannel?.url || ""}
                onClick={() => AnalyticsTracker.logPortfolioEvent("linkedin_click", "profile")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-3 text-[10px] text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all cursor-pointer"
              >
                [ Connect on LinkedIn ]
              </a>
            </div>
          </div>
        )}

        {/* RESUME APP */}
        {activeTab === "Resume" && (
          <div className="space-y-6 text-center py-8">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block">Archived Resume</span>
            <p className="text-lg font-light text-zinc-300">
              Download the comprehensive review of my experience, coursework, and technical skills.
            </p>
            <div className="pt-6">
              <a
                href={resumeChannel?.url || ""}
                download
                onClick={() => AnalyticsTracker.logPortfolioEvent("resume_download", "pdf")}
                className="inline-block px-5 py-3 text-[10px] text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all cursor-pointer"
              >
                [ Download Resume PDF ]
              </a>
            </div>
          </div>
        )}

      </div>

      {/* 3. Bottom HUD showing operating details */}
      {activeTab !== "Home" && (
        <div className="flex justify-between items-end w-full mt-auto">
          <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Chapter 08 // Contact Portal
          </div>
          <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Connection: Secure HTTPS
          </div>
        </div>
      )}

    </div>
  );
}

export default ContactPortal;
