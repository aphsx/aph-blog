"use client";

import { useState } from "react";
import type { PostmanCase } from "@/lib/postman-parser";
import type { Locale } from "@/lib/locale";

interface PostmanPanelProps {
  label?: string;
  cases: PostmanCase[];
  locale?: Locale;
}

export default function PostmanPanel({ label, cases, locale = "th" }: PostmanPanelProps) {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const currentCase = cases[activeCaseIdx] || cases[0];

  // Request sub-tab: default to "body" if request has a body payload, else "params" if query params exist, else "headers"
  const defaultReqTab = currentCase?.hasBody
    ? "body"
    : currentCase?.queryParams.length > 0
    ? "params"
    : "headers";
  const [reqTab, setReqTab] = useState<"params" | "auth" | "headers" | "body">(defaultReqTab);

  // Response sub-tab
  const [resTab, setResTab] = useState<"body" | "headers">("body");
  const [resMode, setResMode] = useState<"pretty" | "raw">("pretty");

  // Interactive Send action
  const [isSending, setIsSending] = useState(false);
  const [sentFeedback, setSentFeedback] = useState(false);

  // Copy state
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentFeedback(true);
      setTimeout(() => setSentFeedback(false), 2000);
    }, 280);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1600);
  };

  // Generate cURL command
  const toCurl = (c: PostmanCase): string => {
    let cmd = `curl -X ${c.method} "${c.url}"`;
    for (const h of c.reqHeaders) {
      cmd += ` \\\n  -H "${h.key}: ${h.value}"`;
    }
    if (c.reqBodyRaw && c.method !== "GET") {
      cmd += ` \\\n  -d '${c.reqBodyRaw}'`;
    }
    return cmd;
  };

  const getMethodBadgeClass = (method: string) => {
    switch (method) {
      case "GET":
        return "text-[#0CBB52] bg-emerald-50 border-emerald-200";
      case "POST":
        return "text-[#FF6C37] bg-orange-50 border-orange-200";
      case "PUT":
        return "text-[#0284C7] bg-sky-50 border-sky-200";
      case "DELETE":
        return "text-[#EB2013] bg-rose-50 border-rose-200";
      default:
        return "text-purple-600 bg-purple-50 border-purple-200";
    }
  };

  const getMethodTextColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-[#0CBB52]";
      case "POST":
        return "text-[#FF6C37]";
      case "PUT":
        return "text-[#0284C7]";
      case "DELETE":
        return "text-[#EB2013]";
      default:
        return "text-purple-600";
    }
  };

  const isSuccessStatus = currentCase.statusCode >= 200 && currentCase.statusCode < 300;

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-md font-sans">
      {/* 1. Postman Window Top Header & Workspace Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#e2e8f0] bg-[#f8fafc] px-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {/* Postman Logo Mark */}
          <div className="flex items-center gap-1.5 pr-2 mr-1 border-r border-[#e2e8f0]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6C37] shadow-xs">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-3.09l4.5 2.6-1 1.73-3.5-1.24zm0-5.41V8h2v3.09l-2-.5zm-4 4.5l-3.5 1.24-1-1.73 4.5-2.6v3.09zm0-5.41l-2 .5V8h2v3.09z" />
              </svg>
            </span>
            <span className="text-[11px] font-bold tracking-wider text-slate-700">POSTMAN</span>
          </div>

          {/* Request Workspace Tabs */}
          {cases.map((c, idx) => {
            const isActive = idx === activeCaseIdx;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveCaseIdx(idx);
                  if (c.hasBody) setReqTab("body");
                  else if (c.queryParams.length > 0) setReqTab("params");
                  else setReqTab("headers");
                }}
                className={`flex items-center gap-2 rounded-t-md px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-slate-800 border-t-2 border-t-[#FF6C37] border-l border-r border-[#e2e8f0] shadow-xs"
                    : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-700"
                }`}
              >
                <span className={`font-mono text-[10px] font-bold ${getMethodTextColor(c.method)}`}>
                  {c.method}
                </span>
                <span className="max-w-[200px] truncate text-slate-700">{c.title || c.tabLabel}</span>
                {isActive && <span className="text-[10px] text-slate-400 hover:text-slate-600">×</span>}
              </button>
            );
          })}

          <span className="px-1 text-slate-400 text-sm font-light select-none">+</span>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2 pb-1.5">
          <button
            type="button"
            onClick={() => copyToClipboard(toCurl(currentCase), "curl")}
            title="Copy as cURL command"
            className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 shadow-xs hover:bg-slate-50 active:bg-slate-100 transition"
          >
            <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{copiedType === "curl" ? "Copied cURL ✓" : "Copy cURL"}</span>
          </button>
        </div>
      </div>

      {/* 2. Optional Label Banner */}
      {label && (
        <div className="bg-[#f1f5f9]/70 border-b border-[#e2e8f0] px-4 py-1.5 text-xs text-slate-600 flex items-center justify-between">
          <span className="font-medium text-slate-700 truncate">{label}</span>
          <span className="text-[10px] font-mono text-slate-400">HTTP/1.1 API Client</span>
        </div>
      )}

      {/* 3. The Iconic Postman Request URL Bar */}
      <div className="p-3 bg-white border-b border-[#e2e8f0]">
        <div className="flex items-center rounded-lg border border-slate-300 bg-white shadow-xs focus-within:border-[#097BED] focus-within:ring-1 focus-within:ring-[#097BED]">
          {/* Method selector */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-r border-slate-200 bg-slate-50/50 rounded-l-lg select-none">
            <span className={`font-mono text-xs font-bold ${getMethodTextColor(currentCase.method)}`}>
              {currentCase.method}
            </span>
            <span className="text-[9px] text-slate-400">▼</span>
          </div>

          {/* URL Input */}
          <div className="flex-1 overflow-x-auto px-3 py-2">
            <span className="font-mono text-xs font-medium text-slate-800 whitespace-nowrap select-all">
              {currentCase.url}
            </span>
          </div>

          {/* Signature Postman Blue "Send" Button */}
          <div className="p-1 pr-1.5">
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="flex items-center gap-1.5 rounded-md bg-[#097BED] hover:bg-[#0265D2] active:bg-[#0050A6] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer disabled:opacity-80"
            >
              {isSending ? (
                <svg className="w-3.5 h-3.5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
              <span>Send</span>
              <span className="text-[8px] pl-1 border-l border-blue-400/50">▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Request Configuration Tabs (Params, Auth, Headers, Body) */}
      <div className="bg-white">
        <div className="flex items-center gap-6 border-b border-[#e2e8f0] px-4 text-xs">
          <button
            type="button"
            onClick={() => setReqTab("params")}
            className={`py-2 font-medium transition-colors relative ${
              reqTab === "params"
                ? "text-[#097BED] border-b-2 border-b-[#097BED]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Params</span>
            {currentCase.queryParams.length > 0 && (
              <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.2 text-[10px] font-semibold text-slate-600 border border-slate-200">
                {currentCase.queryParams.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setReqTab("auth")}
            className={`py-2 font-medium transition-colors relative ${
              reqTab === "auth"
                ? "text-[#097BED] border-b-2 border-b-[#097BED]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Authorization
          </button>

          <button
            type="button"
            onClick={() => setReqTab("headers")}
            className={`py-2 font-medium transition-colors relative ${
              reqTab === "headers"
                ? "text-[#097BED] border-b-2 border-b-[#097BED]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Headers</span>
            {currentCase.reqHeaders.length > 0 && (
              <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.2 text-[10px] font-semibold text-slate-600 border border-slate-200">
                {currentCase.reqHeaders.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setReqTab("body")}
            className={`py-2 font-medium transition-colors flex items-center gap-1.5 relative ${
              reqTab === "body"
                ? "text-[#097BED] border-b-2 border-b-[#097BED]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Body</span>
            {currentCase.hasBody && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#0CBB52]" title="Active Body Content" />
            )}
          </button>
        </div>

        {/* Tab Content Area */}
        {reqTab === "body" && (
          <div>
            {/* Sub-bar under Body: raw, JSON */}
            <div className="flex items-center justify-between border-b border-[#f1f5f9] bg-[#f8fafc] px-4 py-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-medium text-slate-800">
                  <span className="h-2 w-2 rounded-full bg-[#097BED]" />
                  raw
                </span>
                <span className="text-slate-400">form-data</span>
                <span className="text-slate-400">x-www-form-urlencoded</span>
                <span className="text-slate-400">binary</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded border border-slate-200 bg-white px-2 py-0.5 font-medium text-slate-700 shadow-2xs">
                  JSON ▾
                </span>
                {currentCase.reqBodyRaw && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(currentCase.reqBodyRaw, "reqBody")}
                    className="text-slate-500 hover:text-slate-800 text-[11px] px-1.5 py-0.5 rounded hover:bg-slate-200/50"
                  >
                    {copiedType === "reqBody" ? "Copied ✓" : "Copy"}
                  </button>
                )}
              </div>
            </div>

            {/* Request Body Code Display */}
            {currentCase.hasBody ? (
              <div className="bg-white p-3.5 text-[0.85em] leading-relaxed overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!border-0">
                {currentCase.reqBodyHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: currentCase.reqBodyHtml }} />
                ) : (
                  <pre className="font-mono text-slate-800">{currentCase.reqBodyRaw}</pre>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 bg-white">
                This request does not have a body (GET requests send data via URL parameters).
              </div>
            )}
          </div>
        )}

        {reqTab === "headers" && (
          <div className="p-3 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                    <th className="w-8 pb-1.5 pl-2"></th>
                    <th className="pb-1.5 font-medium">Key</th>
                    <th className="pb-1.5 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {currentCase.reqHeaders.map((h, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 pl-2 text-slate-400">☑</td>
                      <td className="py-2 text-slate-800 font-medium">{h.key}</td>
                      <td className="py-2 text-slate-600">{h.value}</td>
                    </tr>
                  ))}
                  {currentCase.reqHeaders.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-slate-400 font-sans">
                        No custom headers set for this request.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reqTab === "params" && (
          <div className="p-3 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                    <th className="w-8 pb-1.5 pl-2"></th>
                    <th className="pb-1.5 font-medium">Key</th>
                    <th className="pb-1.5 font-medium">Value</th>
                    <th className="pb-1.5 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {currentCase.queryParams.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 pl-2 text-slate-400">☑</td>
                      <td className="py-2 text-slate-800 font-medium">{p.key}</td>
                      <td className="py-2 text-slate-600">{p.value}</td>
                      <td className="py-2 font-sans text-slate-400 text-[11px]">Query parameter</td>
                    </tr>
                  ))}
                  {currentCase.queryParams.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-slate-400 font-sans">
                        No query parameters in this URL.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reqTab === "auth" && (
          <div className="p-4 bg-white text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Type:</span>
              <span className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600">
                Inherit auth from parent / No Auth
              </span>
            </div>
            <p className="mt-2 text-slate-400 text-[11px]">
              This endpoint is public and does not require an Authorization Bearer token.
            </p>
          </div>
        )}
      </div>

      {/* 5. Postman Response Section */}
      <div className="border-t border-[#e2e8f0] bg-[#f8fafc]">
        {/* Response Top Bar: Tabs on left, Status / Time / Size on right */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#e2e8f0] px-4 py-2">
          {/* Response Tabs */}
          <div className="flex items-center gap-4 text-xs">
            <span className="font-bold text-slate-700 mr-1">Response</span>
            <button
              type="button"
              onClick={() => setResTab("body")}
              className={`py-1 font-medium transition ${
                resTab === "body"
                  ? "text-[#097BED] border-b-2 border-b-[#097BED]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Body
            </button>
            <button
              type="button"
              onClick={() => setResTab("headers")}
              className={`py-1 font-medium transition ${
                resTab === "headers"
                  ? "text-[#097BED] border-b-2 border-b-[#097BED]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>Headers</span>
              {currentCase.resHeaders.length > 0 && (
                <span className="ml-1 text-[10px] text-slate-400">({currentCase.resHeaders.length})</span>
              )}
            </button>
            <span className="text-slate-400">Cookies</span>
            <span className="text-slate-400">Test Results</span>
          </div>

          {/* Response Metrics (The iconic Postman Status Pill) */}
          <div className="flex items-center gap-3 text-xs">
            {/* Status Badge */}
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold border transition-all ${
                sentFeedback ? "scale-105" : ""
              } ${
                isSuccessStatus
                  ? "bg-emerald-50 border-emerald-300 text-[#0CBB52]"
                  : "bg-rose-50 border-rose-300 text-[#EB2013]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isSuccessStatus ? "bg-[#0CBB52]" : "bg-[#EB2013]"
                }`}
              />
              <span>Status: {currentCase.statusText}</span>
            </div>

            {/* Time */}
            <div className="font-mono text-[11px] text-slate-500">
              Time: <span className="font-medium text-slate-700">{currentCase.time}</span>
            </div>

            {/* Size */}
            <div className="font-mono text-[11px] text-slate-500">
              Size: <span className="font-medium text-slate-700">{currentCase.size}</span>
            </div>
          </div>
        </div>

        {/* Response Sub-bar: Pretty, Raw, JSON */}
        {resTab === "body" && (
          <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-white px-4 py-1.5 text-[11px]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setResMode("pretty")}
                className={`rounded px-2 py-0.5 font-medium transition ${
                  resMode === "pretty"
                    ? "bg-slate-200/80 text-slate-800"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Pretty
              </button>
              <button
                type="button"
                onClick={() => setResMode("raw")}
                className={`rounded px-2 py-0.5 font-medium transition ${
                  resMode === "raw"
                    ? "bg-slate-200/80 text-slate-800"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Raw
              </button>
              <span className="text-slate-400">Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded border border-slate-200 bg-white px-2 py-0.5 font-medium text-slate-600 shadow-2xs">
                JSON ▾
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(currentCase.resBodyRaw, "resBody")}
                className="text-slate-500 hover:text-slate-800 text-[11px] px-1.5 py-0.5 rounded hover:bg-slate-100"
              >
                {copiedType === "resBody" ? "Copied ✓" : "Copy"}
              </button>
            </div>
          </div>
        )}

        {/* Response Body Content */}
        {resTab === "body" && (
          <div className="bg-white p-3.5 text-[0.85em] leading-relaxed overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!border-0">
            {resMode === "pretty" && currentCase.resBodyHtml ? (
              <div dangerouslySetInnerHTML={{ __html: currentCase.resBodyHtml }} />
            ) : (
              <pre className="font-mono text-slate-800 whitespace-pre-wrap">
                {resMode === "raw" ? currentCase.resRaw : currentCase.resBodyRaw}
              </pre>
            )}
          </div>
        )}

        {resTab === "headers" && (
          <div className="p-3 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                    <th className="pb-1.5 pl-2 font-medium">Key</th>
                    <th className="pb-1.5 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {currentCase.resHeaders.map((h, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 pl-2 text-slate-800 font-medium">{h.key}</td>
                      <td className="py-2 text-slate-600">{h.value}</td>
                    </tr>
                  ))}
                  {currentCase.resHeaders.length === 0 && (
                    <tr>
                      <td colSpan={2} className="py-4 text-center text-slate-400 font-sans">
                        Content-Type: application/json; charset=utf-8
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
