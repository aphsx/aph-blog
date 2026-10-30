"use client";

import { useState } from "react";

export type QuizOption = {
  text: string;
  isCorrect: boolean;
  explain?: string;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
  explain?: string;
};

export default function InteractiveQuiz({
  questions,
}: {
  questions: QuizQuestion[];
}) {
  // Store selected index for each question: questionIdx -> selectedOptionIdx
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleSelect = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  return (
    <div className="my-6 space-y-6">
      {questions.map((q, qIdx) => {
        const selectedIdx = selectedAnswers[qIdx];
        const hasSelected = selectedIdx !== undefined;
        const selectedOpt = hasSelected ? q.options[selectedIdx] : null;

        return (
          <div
            key={qIdx}
            className="overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-200"
          >
            {/* Header / Question Title */}
            <div className="border-b border-border/60 bg-surface-soft/60 px-5 py-3.5">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary">
                  Q{qIdx + 1}
                </span>
                <span className="font-semibold text-slate-800 leading-snug">
                  {q.question}
                </span>
              </div>
            </div>

            {/* Options List */}
            <div className="p-4 space-y-2.5">
              {q.options.map((opt, optIdx) => {
                const isSelected = selectedIdx === optIdx;
                const isCorrect = opt.isCorrect;

                // Status styling after user has selected an option
                let containerClass =
                  "border-border/70 hover:border-primary/50 hover:bg-primary-soft/10 text-slate-700";
                let badgeClass =
                  "border-border/80 bg-surface-soft/80 text-muted group-hover:border-primary/50 group-hover:text-primary";

                if (hasSelected) {
                  if (isSelected) {
                    if (isCorrect) {
                      // Selected and Correct -> Vibrant Green
                      containerClass =
                        "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium shadow-xs";
                      badgeClass = "border-emerald-500 bg-emerald-600 text-white font-bold";
                    } else {
                      // Selected and Wrong -> Crimson Red
                      containerClass =
                        "border-rose-400 bg-rose-50/70 text-rose-950 shadow-xs";
                      badgeClass = "border-rose-500 bg-rose-600 text-white font-bold";
                    }
                  } else if (isCorrect) {
                    // Not selected, but is the correct answer -> Soft green highlight so learner sees what's right
                    containerClass =
                      "border-emerald-300/80 bg-emerald-50/40 text-emerald-900";
                    badgeClass = "border-emerald-400 bg-emerald-100 text-emerald-700 font-bold";
                  } else {
                    // Not selected and wrong
                    containerClass = "opacity-60 border-border/50";
                  }
                }

                const alphabet = ["A", "B", "C", "D", "E"][optIdx] || `${optIdx + 1}`;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelect(qIdx, optIdx)}
                    className={`group flex w-full cursor-pointer items-center justify-between rounded-lg border px-3.5 py-3 text-left text-[0.93em] transition-all duration-150 ${containerClass}`}
                  >
                    <div className="flex items-center gap-3 pr-2 min-w-0">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs transition-colors ${badgeClass}`}
                      >
                        {hasSelected && isSelected ? (
                          isCorrect ? "✓" : "✗"
                        ) : (
                          alphabet
                        )}
                      </span>
                      <span className="leading-snug break-words">{opt.text}</span>
                    </div>

                    {/* Instant feedback badge */}
                    {hasSelected && isSelected && (
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          isCorrect
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-rose-600 text-white shadow-xs"
                        }`}
                      >
                        {isCorrect ? "ถูกต้อง! 🎉" : "ยังไม่ใช่ ❌"}
                      </span>
                    )}

                    {hasSelected && !isSelected && isCorrect && (
                      <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        คำตอบที่ถูก ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card appears instantly when selected */}
            {hasSelected && (
              <div
                className={`border-t px-5 py-3.5 text-[0.88em] leading-relaxed transition-all ${
                  selectedOpt?.isCorrect
                    ? "border-emerald-200/80 bg-emerald-50/50 text-emerald-900"
                    : "border-amber-200/80 bg-amber-50/50 text-amber-900"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="font-bold shrink-0">
                    {selectedOpt?.isCorrect ? "💡 คำอธิบาย:" : "💡 คำแนะนำ:"}
                  </span>
                  <span>
                    {selectedOpt?.explain ||
                      q.explain ||
                      (selectedOpt?.isCorrect
                        ? "คุณตอบถูกต้องตามหลักการครับ!"
                        : "ลองทบทวนดูคำตอบที่ถูกต้องที่ไฮไลต์สีเขียวด้านบนนะครับ")}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
