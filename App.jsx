import React, { useState, useEffect } from "react";
import { 
  Shield, AlertTriangle, CheckCircle, FileText, Zap, ChevronRight, 
  Search, Eye, Clock, BarChart3, Lock, Users, Upload, RefreshCw, 
  Check, X, AlertCircle, ArrowUpRight, Cpu, Layers, Sparkles, 
  HelpCircle, Database, GitBranch, History, Terminal, ChevronDown, Filter
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";

// ==========================================
// MOCK DATA & STATE DEFINITIONS
// ==========================================

const INITIAL_SUBMISSIONS = [
  {
    id: "SUB-8092",
    title: "Q4 QuantumCore Platform Launch Press Release",
    campaign: "Enterprise Q4 2026",
    contentType: "Press Release",
    author: "Rahul V.",
    role: "Content Lead",
    status: "Awaiting Human Approval",
    createdAt: "2026-10-24 09:15 AM",
    targetAudience: "Enterprise CTOs and System Architects",
    intendedPurpose: "Announce new 2x throughput benchmark while maintaining strict brand reliability standard.",
    desiredCTA: "Schedule a high-performance cluster trial today.",
    draftText: `BrandSentinal AI announces the breakthrough launch of QuantumCore 2.0. Operating guaranteed 2x faster than all industry competitors without exception, our proprietary neural engine delivers 100% defect-free brand governance. Tested across over 500 enterprise customers, QuantumCore provides total automated safety without requiring any human review.`,
    findingsCount: { critical: 2, warning: 1, info: 1 },
    findings: [
      {
        id: "FIND-101",
        layer: "Layer 4: Claim Verification",
        category: "Unsupported Superlative",
        severity: "Critical",
        ruleId: "CLAIM-REF-882",
        citation: "Claims Ledger Entry #882 (Stale - Expired Oct 1, 2026)",
        confidence: "98%",
        status: "Contradicted",
        explanation: "The claim 'guaranteed 2x faster than all industry competitors without exception' lacks active supporting evidence in the Claims Ledger. Supporting benchmark reference expired on October 1, 2026.",
        originalSnippet: "guaranteed 2x faster than all industry competitors without exception",
        suggestedFix: "delivers significantly enhanced throughput verified in internal benchmark tests",
        actionTaken: null
      },
      {
        id: "FIND-102",
        layer: "Layer 1: Rules Engine",
        category: "Policy Violation",
        severity: "Critical",
        ruleId: "RULE-GOV-005",
        citation: "Brand Guidelines v3.2 - Section 2.1 (Human Oversight Policy)",
        confidence: "100%",
        status: "Contradicted",
        explanation: "Stating 'without requiring any human review' directly violates Mandatory Principle 5: 'AI automates analysis; an authorised human reviewer retains final approval.'",
        originalSnippet: "without requiring any human review",
        suggestedFix: "backed by automated AI scanning alongside final human review validation",
        actionTaken: null
      },
      {
        id: "FIND-103",
        layer: "Layer 3: Tone & Messaging",
        category: "Absolute Guarantee",
        severity: "Warning",
        ruleId: "RULE-TONE-014",
        citation: "Brand Guidelines v3.2 - Section 4.8 (Promotional Tone)",
        confidence: "89%",
        status: "Needs Human Judgment",
        explanation: "Promising '100% defect-free' introduces absolute guarantees prohibited under enterprise risk policies.",
        originalSnippet: "100% defect-free",
        suggestedFix: "high-accuracy, verifiable",
        actionTaken: null
      }
    ]
  },
  {
    id: "SUB-8093",
    title: "APAC Product Expansion Email Campaign",
    campaign: "Global Expansion",
    contentType: "Email Copy",
    author: "Ananya S.",
    role: "Marketing Manager",
    status: "Review Ready",
    createdAt: "2026-10-23 04:30 PM",
    targetAudience: "Regional Marketing Directors",
    intendedPurpose: "Introduce localized compliance templates.",
    desiredCTA: "Explore localized guidelines.",
    draftText: `Ensure your brand messages stay compliant with local regulation. BrandSentinal AI provides localized rule checking across all Asian markets.`,
    findingsCount: { critical: 0, warning: 1, info: 1 },
    findings: []
  }
];

const INITIAL_CLAIMS = [
  {
    id: "CLAIM-REF-882",
    statement: "QuantumCore architecture processes natural language rules in under 12ms.",
    source: "Technical Benchmark Whitepaper v2.1",
    owner: "Engineering QA",
    status: "Stale",
    validFrom: "2026-01-01",
    validUntil: "2026-10-01",
    approvedBy: "Chief Tech Officer"
  },
  {
    id: "CLAIM-REF-901",
    statement: "Reduces manual brand compliance review turnaround time by up to 60%.",
    source: "Q2 Enterprise Customer Survey",
    owner: "Product Marketing",
    status: "Supported",
    validFrom: "2026-06-01",
    validUntil: "2027-06-01",
    approvedBy: "Head of Marketing"
  },
  {
    id: "CLAIM-REF-905",
    statement: "100% guaranteed zero human error in text auditing.",
    source: "Unverified Marketing Draft",
    owner: "External Agency",
    status: "Contradicted",
    validFrom: "2026-05-01",
    validUntil: "2026-09-01",
    approvedBy: "Rejected by Legal"
  },
  {
    id: "CLAIM-REF-912",
    statement: "Supports real-time multilingual text parsing across 14 languages.",
    source: "Product Release Notes 4.1",
    owner: "Localization Team",
    status: "Supported",
    validFrom: "2026-08-15",
    validUntil: "2027-08-15",
    approvedBy: "Localization Lead"
  }
];

const AUDIT_LOGS = [
  {
    id: "AUD-9901",
    timestamp: "2026-10-24 09:15:12 IST",
    actor: "Rahul V. (Creator)",
    action: "SUBMISSION_CREATED",
    details: "Created submission SUB-8092 with 3 extracted intent attributes.",
    hash: "sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  {
    id: "AUD-9902",
    timestamp: "2026-10-24 09:15:15 IST",
    actor: "BrandSentinal Pipeline v2.4",
    action: "PIPELINE_EXECUTED",
    details: "Layer 1 (Deterministic Rules) & Layer 4 (Claims Ledger) raised 3 total findings.",
    hash: "sha256-8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4"
  },
  {
    id: "AUD-9903",
    timestamp: "2026-10-24 09:30:22 IST",
    actor: "Admin Gatekeeper",
    action: "RULE_CONFIRMED",
    details: "Administrator confirmed extracted rule RULE-GOV-005 from Guideline PDF v3.2.",
    hash: "sha256-5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
  }
];

const ANALYTICS_VIOLATIONS = [
  { category: "Unsupported Claims", count: 42 },
  { category: "Terminology Violations", count: 28 },
  { category: "Absolute Guarantees", count: 19 },
  { category: "Stale Data Citations", count: 14 },
  { category: "Tone Inconsistencies", count: 9 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("landing");
  const [currentRole, setCurrentRole] = useState("Creator");
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState(INITIAL_SUBMISSIONS[0]);
  const [claims, setClaims] = useState(INITIAL_CLAIMS);
  const [auditLogs, setAuditLogs] = useState(AUDIT_LOGS);

  // New Submission Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCampaign, setNewCampaign] = useState("");
  const [newAudience, setNewAudience] = useState("");
  const [newPurpose, setNewPurpose] = useState("");
  const [newCTA, setNewCTA] = useState("");
  const [newDraftText, setNewDraftText] = useState("");

  // Ingestion State
  const [ingestStatus, setIngestStatus] = useState("idle");

  const handleCreateSubmission = (e) => {
    e.preventDefault();
    const newSub = {
      id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle || "Untitled Marketing Campaign",
      campaign: newCampaign || "General Campaign",
      contentType: "Text Draft",
      author: "Rahul V.",
      role: currentRole,
      status: "Review Ready",
      createdAt: new Date().toLocaleString(),
      targetAudience: newAudience || "General Enterprise Audience",
      intendedPurpose: newPurpose || "Brand Promotion",
      desiredCTA: newCTA || "Learn More",
      draftText: newDraftText,
      findingsCount: { critical: 1, warning: 1, info: 0 },
      findings: [
        {
          id: "FIND-201",
          layer: "Layer 4: Claim Verification",
          category: "Unsupported Claim",
          severity: "Critical",
          ruleId: "CLAIM-REF-905",
          citation: "Claims Ledger Entry #905",
          confidence: "95%",
          status: "Unsupported",
          explanation: "Automated scan detected unverified performance statements lacking active ledger validation.",
          originalSnippet: newDraftText.slice(0, 45) + "...",
          suggestedFix: "verifiable benchmark data",
          actionTaken: null
        }
      ]
    };
    setSubmissions([newSub, ...submissions]);
    setSelectedSubmission(newSub);
    setActiveTab("submissions");
    // Clear inputs
    setNewTitle(""); setNewCampaign(""); setNewAudience(""); setNewPurpose(""); setNewCTA(""); setNewDraftText("");
  };

  const handleApplyFix = (findingId, fixText) => {
    const updatedFindings = selectedSubmission.findings.map(f => {
      if (f.id === findingId) return { ...f, actionTaken: "Applied" };
      return f;
    });
    const updatedSub = {
      ...selectedSubmission,
      draftText: selectedSubmission.draftText.replace(
        selectedSubmission.findings.find(f => f.id === findingId).originalSnippet,
        fixText
      ),
      findings: updatedFindings
    };
    setSelectedSubmission(updatedSub);
    setSubmissions(submissions.map(s => s.id === updatedSub.id ? updatedSub : s));
  };

  const handleDispute = (findingId) => {
    const updatedFindings = selectedSubmission.findings.map(f => {
      if (f.id === findingId) return { ...f, actionTaken: "Disputed" };
      return f;
    });
    const updatedSub = { ...selectedSubmission, findings: updatedFindings };
    setSelectedSubmission(updatedSub);
    setSubmissions(submissions.map(s => s.id === updatedSub.id ? updatedSub : s));
  };

  const handleApproveSubmission = () => {
    const updatedSub = { ...selectedSubmission, status: "Approved" };
    setSelectedSubmission(updatedSub);
    setSubmissions(submissions.map(s => s.id === updatedSub.id ? updatedSub : s));
    
    // Append to Audit Trail
    const newLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString() + " IST",
      actor: `${currentRole} User`,
      action: "SUBMISSION_APPROVED",
      details: `Approved submission ${selectedSubmission.id} following governance review.`,
      hash: `sha256-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* ========================================== */}
      {/* GLOBAL HEADER & ROLE SWITCHER DOCK        */}
      {/* ========================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#080B12]/90 backdrop-blur-xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div 
            onClick={() => setActiveTab("landing")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-[#080B12] rounded-[11px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                BrandSentinal <span className="text-indigo-400 font-mono text-sm uppercase px-1.5 py-0.5 rounded border border-indigo-500/30 bg-indigo-500/10">AI</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium">Enterprise Governance Engine</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "submissions", label: "Review Workspace", icon: FileText },
              { id: "claims", label: "Claims Ledger", icon: Database },
              { id: "guidelines", label: "Guideline Ingestion", icon: Upload },
              { id: "insights", label: "Governance Insights", icon: Cpu },
              { id: "audit", label: "Audit Ledger", icon: Lock },
              { id: "proof", label: "Proof & Architecture", icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all ${
                    isActive 
                      ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-inner" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ROLE SELECTOR DOCK */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-1 flex items-center space-x-1 text-xs">
            <span className="text-slate-400 px-2 font-mono text-[10px] uppercase">Persona:</span>
            {["Creator", "Brand Manager", "Authorised Reviewer", "Administrator"].map((role) => (
              <button
                key={role}
                onClick={() => setCurrentRole(role)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  currentRole === role 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setActiveTab("new-submission")}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>New Submission</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER CONTENT ROUTER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">

        {/* ========================================== */}
        {/* VIEW 1: LANDING PAGE                      */}
        {/* ========================================== */}
        {activeTab === "landing" && (
          <div className="space-y-16 py-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Deterministic First • RAG Grounded • Human Approved</span>
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight text-white leading-tight">
                Your Brand. Your Rules.<br />
                <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  AI-Powered Governance Desk.
                </span>
              </h1>
              <p className="text-lg text-slate-400 font-normal">
                Flag It. Explain It. Cite It. Let a Person Decide.
              </p>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <button 
                  onClick={() => setActiveTab("submissions")}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-xl shadow-indigo-600/30 flex items-center space-x-2 transition-all"
                >
                  <span>Open Review Desk</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab("new-submission")}
                  className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  Try Demo Submission
                </button>
              </div>
            </div>

            {/* PIPELINE WORKFLOW PREVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "1. Guideline RAG Ingestion", desc: "Transforms static PDF brand books into structured rules & vector indices.", icon: Upload },
                { title: "2. Claims Ledger Verification", desc: "Validates statements against approved, dated enterprise facts.", icon: Database },
                { title: "3. Intent-Preserving Fixes", desc: "AI proposes corrections while keeping original author intent intact.", icon: Zap },
                { title: "4. Human Gatekeeper", desc: "Final publishing decisions strictly require human approval.", icon: Lock }
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 hover:border-indigo-500/40 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-white text-base mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 2: DASHBOARD                          */}
        {/* ========================================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Brand Governance Dashboard</h2>
                <p className="text-xs text-slate-400">Real-time oversight across content submissions and rule compliance.</p>
              </div>
              <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                Active Tenant: <span className="text-indigo-400 font-semibold">Global Enterprise Corp</span>
              </div>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Total Submissions", val: "142", sub: "+12 this week", color: "text-blue-400" },
                { label: "Awaiting Approval", val: submissions.filter(s => s.status.includes("Awaiting")).length, sub: "High priority", color: "text-amber-400" },
                { label: "Approved Releases", val: submissions.filter(s => s.status === "Approved").length, sub: "100% human verified", color: "text-emerald-400" },
                { label: "Active Claims in Ledger", val: claims.length, sub: "1 Stale claim flag", color: "text-purple-400" }
              ].map((m, i) => (
                <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">{m.label}</span>
                  <div className={`text-2xl font-bold ${m.color} my-1`}>{m.val}</div>
                  <span className="text-[10px] text-slate-500">{m.sub}</span>
                </div>
              ))}
            </div>

            {/* SUBMISSIONS TABLE */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-semibold text-sm text-white">Recent Submissions Queue</h3>
                <button onClick={() => setActiveTab("submissions")} className="text-xs text-indigo-400 hover:underline">View All Workspace</button>
              </div>
              <div className="divide-y divide-slate-800">
                {submissions.map((sub) => (
                  <div 
                    key={sub.id}
                    onClick={() => { setSelectedSubmission(sub); setActiveTab("submissions"); }}
                    className="p-4 hover:bg-slate-800/40 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-slate-400">{sub.id}</span>
                        <span className="text-sm font-semibold text-white hover:text-indigo-300">{sub.title}</span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center space-x-3">
                        <span>Campaign: {sub.campaign}</span>
                        <span>•</span>
                        <span>By: {sub.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        sub.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        sub.status.includes("Awaiting") ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                        "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {sub.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 3: 3-COLUMN REVIEW WORKSPACE         */}
        {/* ========================================== */}
        {activeTab === "submissions" && selectedSubmission && (
          <div className="space-y-4">
            {/* SUBMISSION HEADER */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
                    {selectedSubmission.id}
                  </span>
                  <h2 className="text-xl font-bold text-white">{selectedSubmission.title}</h2>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    selectedSubmission.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {selectedSubmission.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Campaign: <span className="text-slate-200">{selectedSubmission.campaign}</span> | Submitted: {selectedSubmission.createdAt}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center space-x-3">
                {(currentRole === "Authorised Reviewer" || currentRole === "Brand Manager") && (
                  <button 
                    onClick={handleApproveSubmission}
                    disabled={selectedSubmission.status === "Approved"}
                    className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-600/20"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{selectedSubmission.status === "Approved" ? "Approved" : "Approve Content"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 3-COLUMN WORKSPACE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* LEFT COLUMN: INTENT & WORKFLOW STEPPER */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                    <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Preserved Author Intent</span>
                  </h3>
                  <div className="text-xs space-y-2">
                    <div>
                      <span className="text-slate-500 block">Target Audience:</span>
                      <span className="text-slate-200 font-medium">{selectedSubmission.targetAudience}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Intended Purpose:</span>
                      <span className="text-slate-200">{selectedSubmission.intendedPurpose}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Desired Call To Action:</span>
                      <span className="text-indigo-300 font-mono bg-indigo-950/40 p-1.5 rounded border border-indigo-800/40 block mt-1">
                        {selectedSubmission.desiredCTA}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Review Routing Workflow</h3>
                  <div className="space-y-2 text-xs">
                    {[
                      { title: "Layer 1: Rules Check", done: true },
                      { title: "Layer 2: Accessibility OCR", done: true },
                      { title: "Layer 3: RAG Tone Audit", done: true },
                      { title: "Layer 4: Claims Ledger", done: true },
                      { title: "Human Gatekeeper Approval", done: selectedSubmission.status === "Approved" }
                    ].map((st, idx) => (
                      <div key={idx} className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/50 last:border-none">
                        <span>{st.title}</span>
                        {st.done ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: DRAFT TEXT EDITOR WITH HIGHLIGHTS */}
              <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Submitted Text Content</h3>
                    <span className="text-[10px] text-slate-500 font-mono">Live Interactive Inspector</span>
                  </div>
                  
                  <div className="bg-[#0D111A] border border-slate-800 rounded-lg p-4 font-sans text-sm text-slate-200 leading-relaxed min-h-[220px]">
                    {selectedSubmission.draftText}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-lg text-xs text-indigo-300 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>AI Suggestions will preserve purpose & Call To Action without overriding original intent.</span>
                </div>
              </div>

              {/* RIGHT COLUMN: FINDINGS & FIX GENERATOR */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Governance Findings ({selectedSubmission.findings.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {selectedSubmission.findings.map((finding) => (
                    <div key={finding.id} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-indigo-400 block">{finding.layer}</span>
                          <h4 className="text-sm font-semibold text-white">{finding.category}</h4>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          finding.severity === "Critical" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" :
                          "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}>
                          {finding.severity}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-2.5 rounded border border-slate-800/80">
                        {finding.explanation}
                      </p>

                      <div className="text-[11px] text-slate-400 space-y-1">
                        <span className="block font-medium text-slate-500">Citation Evidence:</span>
                        <span className="text-indigo-300 underline font-mono block">{finding.citation}</span>
                      </div>

                      {/* INTENT FIX GENERATOR ACTION */}
                      <div className="bg-indigo-950/30 border border-indigo-800/40 p-3 rounded-lg space-y-2">
                        <span className="text-[10px] font-bold text-indigo-300 uppercase block">Intent-Preserving Correction</span>
                        <div className="text-xs text-emerald-300 font-mono bg-emerald-950/40 p-2 rounded border border-emerald-800/30">
                          "{finding.suggestedFix}"
                        </div>

                        {finding.actionTaken ? (
                          <div className="text-xs text-emerald-400 font-semibold flex items-center space-x-1 pt-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Action Recorded: {finding.actionTaken}</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 pt-1">
                            <button 
                              onClick={() => handleApplyFix(finding.id, finding.suggestedFix)}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors"
                            >
                              Apply Suggestion
                            </button>
                            <button 
                              onClick={() => handleDispute(finding.id)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] px-2.5 py-1 rounded transition-colors"
                            >
                              Dispute
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 4: CLAIMS LEDGER                      */}
        {/* ========================================== */}
        {activeTab === "claims" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Claims Ledger & Approved Facts</h2>
                <p className="text-xs text-slate-400">Single source of truth for validated corporate facts and claims.</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
              <div className="divide-y divide-slate-800">
                {claims.map((claim) => (
                  <div key={claim.id} className="p-4 hover:bg-slate-800/30 transition-colors flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs text-indigo-400">{claim.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                          claim.status === "Supported" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                          claim.status === "Stale" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                          "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                          {claim.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white">{claim.statement}</p>
                      <div className="text-xs text-slate-400 flex items-center space-x-4">
                        <span>Source: {claim.source}</span>
                        <span>•</span>
                        <span>Owner: {claim.owner}</span>
                      </div>
                    </div>

                    <div className="text-right text-xs text-slate-400 space-y-1 font-mono">
                      <div>Valid: {claim.validFrom} to {claim.validUntil}</div>
                      <div className="text-slate-500">Approved by: {claim.approvedBy}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 5: GUIDELINE INGESTION & HUMAN GATE   */}
        {/* ========================================== */}
        {activeTab === "guidelines" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Guideline RAG Ingestion Workbench</h2>
              <p className="text-xs text-slate-400">Upload PDF brand books to extract vectors and submit to Admin Confirmation Gatekeeper.</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Upload Brand Book Document (PDF, DOCX)</h3>
                <p className="text-xs text-slate-400 mt-1">Chunking, embedding, and rule proposal run automatically.</p>
              </div>

              {ingestStatus === "idle" && (
                <button 
                  onClick={() => {
                    setIngestStatus("processing");
                    setTimeout(() => setIngestStatus("gatekeeper"), 1500);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all"
                >
                  Simulate Document Upload
                </button>
              )}

              {ingestStatus === "processing" && (
                <div className="flex items-center justify-center space-x-2 text-indigo-400 text-xs font-mono">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Parsing passages $\rightarrow$ Generating pgvector Embeddings...</span>
                </div>
              )}

              {ingestStatus === "gatekeeper" && (
                <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-4 text-left max-w-xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-indigo-300 uppercase block">Admin Confirmation Gatekeeper</span>
                  <p className="text-xs text-slate-300">Proposed Rule extracted from Section 2.1:</p>
                  <div className="bg-slate-900 p-3 rounded text-xs text-indigo-200 font-mono">
                    "All promotional statements regarding processing speeds must reference active benchmark dates."
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => { setIngestStatus("idle"); alert("Rule confirmed & committed to database!"); }}
                      className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded font-semibold"
                    >
                      Confirm Rule
                    </button>
                    <button 
                      onClick={() => setIngestStatus("idle")}
                      className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 6: GOVERNANCE INSIGHTS ANALYTICS      */}
        {/* ========================================== */}
        {activeTab === "insights" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Governance Insights & Analytics</h2>
              <p className="text-xs text-slate-400">Violation distribution and compliance trends.</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Top Violation Categories</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ANALYTICS_VIOLATIONS}>
                    <XAxis dataKey="category" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 7: AUDIT LEDGER                       */}
        {/* ========================================== */}
        {activeTab === "audit" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Append-Only Cryptographic Audit Trail</h2>
              <p className="text-xs text-slate-400">Immutable SHA-256 event log for compliance verification.</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
              <div className="divide-y divide-slate-800">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 space-y-1 font-mono text-xs">
                    <div className="flex items-center justify-between text-indigo-400">
                      <span>{log.id} • {log.action}</span>
                      <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-300 font-sans">{log.details}</p>
                    <div className="text-[10px] text-slate-500 truncate">Hash: {log.hash}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 8: PROOF & ARCHITECTURE               */}
        {/* ========================================== */}
        {activeTab === "proof" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Round 2 Proof & Technical Architecture</h2>
              <p className="text-xs text-slate-400">Hackathon deliverable validation and target stack alignment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="font-semibold text-white text-sm">Target Architecture Stack</h3>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                  <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS, Recharts</li>
                  <li><strong>Backend:</strong> FastAPI (Python), Pydantic validation</li>
                  <li><strong>Database:</strong> PostgreSQL with pgvector embeddings</li>
                  <li><strong>AI Layer:</strong> RAG retrieval grounded in approved brand rules</li>
                </ul>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="font-semibold text-white text-sm">Mandatory Design Guarantees</h3>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                  <li><strong>Cite or Stay Silent:</strong> Zero fabricated citations.</li>
                  <li><strong>Human Approval Gate:</strong> AI never auto-approves content.</li>
                  <li><strong>Intent Preservation:</strong> Suggestions safeguard original CTA and purpose.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 9: NEW SUBMISSION WIZARD             */}
        {/* ========================================== */}
        {activeTab === "new-submission" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Create New Governance Submission</h2>
              <p className="text-xs text-slate-400">Provide campaign context and text draft for automated AI scanning.</p>
            </div>

            <form onSubmit={handleCreateSubmission} className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Submission Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Q4 Cloud Product Announcement"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Campaign Name</label>
                  <input 
                    type="text" 
                    placeholder="Q4 Enterprise"
                    value={newCampaign}
                    onChange={(e) => setNewCampaign(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Audience</label>
                  <input 
                    type="text" 
                    placeholder="Enterprise CTOs"
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Intended Purpose</label>
                  <input 
                    type="text" 
                    placeholder="Promote benchmark performance"
                    value={newPurpose}
                    onChange={(e) => setNewPurpose(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Desired Call To Action (CTA)</label>
                  <input 
                    type="text" 
                    placeholder="Schedule trial today"
                    value={newCTA}
                    onChange={(e) => setNewCTA(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Content Text Draft</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Paste marketing copy or press release draft here..."
                  value={newDraftText}
                  onChange={(e) => setNewDraftText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-indigo-600/30"
              >
                Run Multi-Layer Governance Audit
              </button>
            </form>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#080B12] px-6 py-4 text-center text-xs text-slate-500">
        BrandSentinal AI • Enterprise Brand-Governance Review Desk • Round 2 Master Build
      </footer>
    </div>
  );
}

