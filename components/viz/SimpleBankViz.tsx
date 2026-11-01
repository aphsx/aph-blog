"use client";

import { useState } from "react";
import { VizStaticFrame } from "@/components/viz/VizFrame";

// ============================================================================
// 1. SQL Parameter ($1, $2, $3) & row.Scan(&a...) Two-Way Data Mapping (Ch 3.1)
// ============================================================================

export function BankSqlScanFlowViz() {
  const [direction, setDirection] = useState<"both" | "outbound" | "inbound">("both");

  return (
    <VizStaticFrame
      title="Data Flow: การส่งค่าเข้า SQL ($1, $2, $3) และการกวาดผลลัพธ์กลับด้วย row.Scan(&a)"
      pills={[
        { label: "ขาไป: arg → $1, $2, $3", color: "#3b82f6" },
        { label: "PostgreSQL RETURNING", color: "#8b5cf6" },
        { label: "ขากลับ: row.Scan(&a...)", color: "#10b981" },
      ]}
      caption="สำคัญมาก: ลำดับตัวแปรใน QueryRowContext ต้องตรงกับ $1, $2, $3 และลำดับ Pointer (&a...) ใน row.Scan ต้องตรงกับคอลัมน์หลัง RETURNING แบบเป๊ะๆ"
      diagram={
        <div className="space-y-4 p-2">
          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setDirection("both")}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                direction === "both"
                  ? "bg-[#6565d5] text-white shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              🔄 ดูภาพรวมทั้งขาไป + ขากลับ
            </button>
            <button
              type="button"
              onClick={() => setDirection("outbound")}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                direction === "outbound"
                  ? "bg-[#3b82f6] text-white shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              ➡️ ขาไป: Go Struct → SQL ($1, $2, $3)
            </button>
            <button
              type="button"
              onClick={() => setDirection("inbound")}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                direction === "inbound"
                  ? "bg-[#10b981] text-white shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              ⬅️ ขากลับ: RETURNING → row.Scan(&a)
            </button>
          </div>

          {/* STEP 1: OUTBOUND */}
          {(direction === "both" || direction === "outbound") && (
            <div className="rounded-xl border border-[#3b82f6]/40 bg-[#0d1526] p-3.5">
              <div className="mb-2.5 flex items-center justify-between border-b border-[#3b82f6]/20 pb-2">
                <span className="text-xs font-bold text-[#93c5fd]">
                  STEP 1 (ขาไป): ส่งพารามิเตอร์จาก Go เข้าสู่ SQL Placeholders ($1, $2, $3)
                </span>
                <span className="rounded bg-[#3b82f6]/20 px-2 py-0.5 font-mono text-[10px] text-[#93c5fd]">
                  db.QueryRowContext(ctx, createAccount, ...)
                </span>
              </div>

              <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-11">
                {/* Left: Go Struct */}
                <div className="rounded-lg border border-[#3b82f6]/40 bg-[#090e1a] p-3 md:col-span-4">
                  <div className="mb-2 font-mono text-[11px] font-bold text-[#60a5fa]">
                    Go Struct: arg (CreateAccountParams)
                  </div>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between rounded bg-[#141e33] px-2.5 py-1.5">
                      <span className="text-[#cbd5e1]">arg.Owner</span>
                      <span className="font-bold text-[#38bdf8]">{`"alice"`}</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[#141e33] px-2.5 py-1.5">
                      <span className="text-[#cbd5e1]">arg.Balance</span>
                      <span className="font-bold text-[#38bdf8]">0</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[#141e33] px-2.5 py-1.5">
                      <span className="text-[#cbd5e1]">arg.Currency</span>
                      <span className="font-bold text-[#38bdf8]">{`"USD"`}</span>
                    </div>
                  </div>
                </div>

                {/* Middle: Mapping Arrows */}
                <div className="flex flex-col items-center justify-center space-y-2 py-1 text-center font-mono text-[11px] md:col-span-3">
                  <div className="w-full rounded border border-[#3b82f6]/30 bg-[#111c33] px-2 py-1 text-[#93c5fd]">
                    ลำดับที่ 1 ───▶ <span className="font-bold text-white">$1</span>
                  </div>
                  <div className="w-full rounded border border-[#3b82f6]/30 bg-[#111c33] px-2 py-1 text-[#93c5fd]">
                    ลำดับที่ 2 ───▶ <span className="font-bold text-white">$2</span>
                  </div>
                  <div className="w-full rounded border border-[#3b82f6]/30 bg-[#111c33] px-2 py-1 text-[#93c5fd]">
                    ลำดับที่ 3 ───▶ <span className="font-bold text-white">$3</span>
                  </div>
                </div>

                {/* Right: SQL Query */}
                <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#130f24] p-3 font-mono text-xs md:col-span-4">
                  <div className="mb-1.5 text-[11px] font-bold text-[#c4b5fd]">
                    PostgreSQL: INSERT INTO accounts
                  </div>
                  <div className="rounded bg-[#0b0816] p-2.5 leading-relaxed text-[#e2e8f0]">
                    <div>(owner, balance, currency)</div>
                    <div>
                      VALUES (
                      <span className="rounded bg-[#3b82f6]/30 px-1 font-bold text-[#93c5fd]">
                        $1=&quot;alice&quot;
                      </span>
                      ,{" "}
                      <span className="rounded bg-[#3b82f6]/30 px-1 font-bold text-[#93c5fd]">
                        $2=0
                      </span>
                      ,{" "}
                      <span className="rounded bg-[#3b82f6]/30 px-1 font-bold text-[#93c5fd]">
                        $3=&quot;USD&quot;
                      </span>
                      )
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: INBOUND */}
          {(direction === "both" || direction === "inbound") && (
            <div className="rounded-xl border border-[#10b981]/40 bg-[#0b1c17] p-3.5">
              <div className="mb-2.5 flex items-center justify-between border-b border-[#10b981]/20 pb-2">
                <span className="text-xs font-bold text-[#6ee7b7]">
                  STEP 2 (ขากลับ): กวาด 5 คอลัมน์จาก RETURNING เข้าตัวแปร Go ผ่าน Pointer (&amp;)
                </span>
                <span className="rounded bg-[#10b981]/20 px-2 py-0.5 font-mono text-[10px] text-[#6ee7b7]">
                  row.Scan(&amp;a.ID, &amp;a.Owner, ...)
                </span>
              </div>

              <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-11">
                {/* Left: RETURNING Row from DB */}
                <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#130f24] p-3 md:col-span-4">
                  <div className="mb-2 font-mono text-[11px] font-bold text-[#c4b5fd]">
                    SQL: RETURNING 5 คอลัมน์ตามลำดับ
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    {[
                      { col: "1. id (auto)", val: "1" },
                      { col: "2. owner", val: `"alice"` },
                      { col: "3. balance", val: "0" },
                      { col: "4. currency", val: `"USD"` },
                      { col: "5. created_at", val: `"2026-10-30..."` },
                    ].map((item) => (
                      <div
                        key={item.col}
                        className="flex justify-between rounded bg-[#1d1736] px-2 py-1"
                      >
                        <span className="text-[#c4b5fd]">{item.col}</span>
                        <span className="font-bold text-white">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle: row.Scan Pointers */}
                <div className="flex flex-col items-center justify-center space-y-1 font-mono text-[11px] md:col-span-3">
                  {[
                    "Scan(&a.ID)",
                    "Scan(&a.Owner)",
                    "Scan(&a.Balance)",
                    "Scan(&a.Currency)",
                    "Scan(&a.CreatedAt)",
                  ].map((ptr) => (
                    <div
                      key={ptr}
                      className="w-full rounded border border-[#10b981]/30 bg-[#0f2922] px-2 py-1 text-center text-[#6ee7b7]"
                    >
                      ───▶ <span className="font-bold text-white">{ptr}</span>
                    </div>
                  ))}
                </div>

                {/* Right: Go Account Struct in Memory */}
                <div className="rounded-lg border border-[#10b981]/40 bg-[#081310] p-3 md:col-span-4">
                  <div className="mb-2 font-mono text-[11px] font-bold text-[#34d399]">
                    Go RAM: var a Account (ผลลัพธ์ที่ได้)
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    {[
                      { field: "a.ID", val: "1 (int64)" },
                      { field: "a.Owner", val: `"alice"` },
                      { field: "a.Balance", val: "0 (int64)" },
                      { field: "a.Currency", val: `"USD"` },
                      { field: "a.CreatedAt", val: "2026-10-30T..." },
                    ].map((item) => (
                      <div
                        key={item.field}
                        className="flex justify-between rounded bg-[#11261f] px-2 py-1"
                      >
                        <span className="text-[#a7f3d0]">{item.field}</span>
                        <span className="font-bold text-[#34d399]">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

// ============================================================================
// 2. Store Architecture: Normal Mode (*sql.DB) vs Transaction Mode (*sql.Tx) (Ch 4.1)
// ============================================================================

export function BankStoreTxFlowViz() {
  const [mode, setMode] = useState<"normal" | "tx">("tx");

  return (
    <VizStaticFrame
      title="Store Architecture: ทำไมQueries ถึงรับได้ทั้งโหมดปกติ (*sql.DB) และโหมด Transaction (*sql.Tx)"
      pills={[
        { label: "DBTX Interface", color: "#3b82f6" },
        { label: "Normal: *sql.DB (Auto-Commit)", color: "#64748b" },
        { label: "Transaction: *sql.Tx (execTx)", color: "#10b981" },
      ]}
      caption="หัวใจสำคัญคือ DBTX Interface: โค้ด SQL ใน db/account.go, db/entry.go, db/transfer.go เขียนแค่ครั้งเดียว แต่ถูกเรียกใช้ได้ทั้งแบบเดี่ยวและแบบมัดรวมใน Transaction!"
      diagram={
        <div className="space-y-4 p-2">
          {/* Mode Toggle */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setMode("tx")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                mode === "tx"
                  ? "bg-[#10b981] text-white shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              🔒 โหมด 2: Transaction Mode (store.TransferTx → execTx)
            </button>
            <button
              type="button"
              onClick={() => setMode("normal")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                mode === "normal"
                  ? "bg-[#3b82f6] text-white shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              ⚡ โหมด 1: Normal Mode (store.CreateAccount เดี่ยวๆ)
            </button>
          </div>

          {mode === "normal" ? (
            <div className="rounded-xl border border-[#3b82f6]/40 bg-[#0d1526] p-4">
              <div className="mb-3 text-center text-xs font-bold text-[#93c5fd]">
                โหมดที่ 1: เรียกใช้งานคำสั่งตารางเดียว (Auto-Commit ทันที)
              </div>
              <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-[#3b82f6]/40 bg-[#090e1a] p-3 text-center">
                  <div className="font-mono text-xs font-bold text-[#60a5fa]">1. Caller (API / Test)</div>
                  <div className="mt-1 font-mono text-xs text-white">
                    store.CreateAccount(ctx, arg)
                  </div>
                  <div className="mt-1 text-[11px] text-[#8a90a0]">
                    เรียกผ่าน Embedded *Queries บน Store โดยตรง
                  </div>
                </div>

                <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#130f24] p-3 text-center">
                  <div className="font-mono text-xs font-bold text-[#c4b5fd]">2. Queries (db: *sql.DB)</div>
                  <div className="mt-1 font-mono text-xs text-white">
                    db/account.go → CreateAccount
                  </div>
                  <div className="mt-1 text-[11px] text-[#8a90a0]">
                    ฟิลด์ q.db ข้างในคือ *sql.DB ปกติ
                  </div>
                </div>

                <div className="rounded-lg border border-[#10b981]/40 bg-[#081310] p-3 text-center">
                  <div className="font-mono text-xs font-bold text-[#34d399]">3. PostgreSQL</div>
                  <div className="mt-1 font-mono text-xs text-white">INSERT 1 แถว → Commit ทันที</div>
                  <div className="mt-1 text-[11px] text-[#8a90a0]">
                    เหมาะกับงานตารางเดียว เช่น สร้างบัญชี / ดึงข้อมูลบัญชี
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-[#10b981]/40 bg-[#0b1c17] p-4">
              <div className="mb-3 text-center text-xs font-bold text-[#6ee7b7]">
                โหมดที่ 2: มัดรวม 5 คำสั่งใน 1 ACID Transaction (db/store.go + db/tx_transfer.go)
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <div className="rounded-lg border border-[#10b981]/40 bg-[#081310] p-3">
                  <div className="font-mono text-xs font-bold text-[#34d399]">1. เปิด Transaction</div>
                  <div className="mt-1 font-mono text-[11px] text-white">
                    tx, _ := s.db.BeginTx(ctx, nil)
                  </div>
                  <p className="mt-1 text-[11px] text-[#94a3b8]">
                    เปิดกรอบงานพิเศษ <code className="text-[#6ee7b7]">*sql.Tx</code> จาก{" "}
                    <code className="text-[#6ee7b7]">s.db</code>
                  </p>
                </div>

                <div className="rounded-lg border border-[#3b82f6]/40 bg-[#090e1a] p-3">
                  <div className="font-mono text-xs font-bold text-[#60a5fa]">2. ห่อด้วย New(tx)</div>
                  <div className="mt-1 font-mono text-[11px] text-white">q := New(tx)</div>
                  <p className="mt-1 text-[11px] text-[#94a3b8]">
                    สร้าง <code className="text-[#93c5fd]">*Queries</code> ตัวใหม่ที่ข้างในถือ{" "}
                    <code className="text-[#93c5fd]">tx</code> แทน <code className="text-[#93c5fd]">*sql.DB</code>
                  </p>
                </div>

                <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#130f24] p-3">
                  <div className="font-mono text-xs font-bold text-[#c4b5fd]">3. รัน 5 คำสั่งผ่าน q</div>
                  <div className="mt-1 space-y-0.5 font-mono text-[10px] text-[#e2e8f0]">
                    <div>• q.CreateTransfer(...)</div>
                    <div>• q.CreateEntry(ขาออก -10)</div>
                    <div>• q.CreateEntry(ขาเข้า +10)</div>
                    <div>• q.AddAccountBalance(A)</div>
                    <div>• q.AddAccountBalance(B)</div>
                  </div>
                </div>

                <div className="rounded-lg border border-[#eab308]/40 bg-[#1a170e] p-3">
                  <div className="font-mono text-xs font-bold text-[#fde047]">
                    4. Commit หรือ Rollback
                  </div>
                  <div className="mt-1 space-y-1 font-mono text-[11px]">
                    <div className="rounded bg-[#10b981]/20 px-1.5 py-0.5 text-[#6ee7b7]">
                      ✅ ครบ 5 ขั้น → tx.Commit()
                    </div>
                    <div className="rounded bg-[#ef4444]/20 px-1.5 py-0.5 text-[#fca5a5]">
                      ❌ พังแม้แต่จุดเดียว → tx.Rollback()
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

// ============================================================================
// 3. Gin ShouldBindJSON Data Mapping & Validation Flow (Ch 6.1)
// ============================================================================

export function BankGinBindingFlowViz() {
  const [scenario, setScenario] = useState<"valid" | "invalid">("valid");

  return (
    <VizStaticFrame
      title="Data Flow: ผังการทำงานของ ctx.ShouldBindJSON(&req) จนถึงชั้น Database"
      pills={[
        { label: "1. Raw JSON Body", color: "#3b82f6" },
        { label: "2. Struct Tags + Validator", color: "#8b5cf6" },
        { label: "3. Go Struct → db/account.go", color: "#10b981" },
      ]}
      caption="กดสลับดูได้ทั้งกรณีที่ลูกค้าส่ง JSON ถูกต้อง (200 OK) และกรณีส่งผิดกฎ (ถูก ShouldBindJSON ตีกลับ 400 Bad Request ทันทีหน้าประตู ไม่ไปกวน Database)"
      diagram={
        <div className="space-y-4 p-2">
          {/* Scenario Switcher */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setScenario("valid")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                scenario === "valid"
                  ? "bg-[#10b981] text-white shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              ✅ กรณีที่ 1: ส่ง JSON ถูกต้อง (ผ่านฉลุย → 200 OK)
            </button>
            <button
              type="button"
              onClick={() => setScenario("invalid")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                scenario === "invalid"
                  ? "bg-[#ef4444] text-white shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              ❌ กรณีที่ 2: ส่ง JSON ผิดกฎ (โดนตีกลับ 400 Bad Request ทันที)
            </button>
          </div>

          {scenario === "valid" ? (
            <div className="space-y-3">
              {/* Row 1: JSON -> Struct Tag -> Go Struct */}
              <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-3">
                {/* Box 1: HTTP JSON Body */}
                <div className="rounded-xl border border-[#3b82f6]/40 bg-[#0d1526] p-3.5">
                  <div className="flex items-center justify-between border-b border-[#3b82f6]/20 pb-1.5">
                    <span className="font-mono text-xs font-bold text-[#60a5fa]">
                      1. HTTP Request Body (JSON)
                    </span>
                    <span className="rounded bg-[#3b82f6]/20 px-1.5 py-0.5 font-mono text-[10px] text-[#93c5fd]">
                      POST /accounts
                    </span>
                  </div>
                  <pre className="mt-2.5 rounded-lg bg-[#070b14] p-2.5 font-mono text-xs leading-relaxed text-[#e2e8f0]">
                    {`{\n  `}
                    <span className="text-[#38bdf8]">&quot;owner&quot;</span>
                    {`: `}
                    <span className="font-bold text-[#a7f3d0]">&quot;alice&quot;</span>
                    {`,\n  `}
                    <span className="text-[#38bdf8]">&quot;currency&quot;</span>
                    {`: `}
                    <span className="font-bold text-[#a7f3d0]">&quot;USD&quot;</span>
                    {`\n}`}
                  </pre>
                  <div className="mt-2 text-[11px] text-[#94a3b8]">
                    ข้อมูลดิบที่ลูกค้าส่งมาใน Body ของ HTTP
                  </div>
                </div>

                {/* Box 2: ShouldBindJSON & Struct Tags */}
                <div className="rounded-xl border border-[#8b5cf6]/40 bg-[#140f26] p-3.5">
                  <div className="flex items-center justify-between border-b border-[#8b5cf6]/20 pb-1.5">
                    <span className="font-mono text-xs font-bold text-[#c4b5fd]">
                      2. ctx.ShouldBindJSON(&amp;req)
                    </span>
                    <span className="rounded bg-[#10b981]/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#6ee7b7]">
                      PASS ✓
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-2 font-mono text-[11px]">
                    <div className="rounded-lg border border-[#8b5cf6]/30 bg-[#0c0918] p-2">
                      <div className="text-[#c4b5fd]">
                        `json:&quot;owner&quot; binding:&quot;required&quot;`
                      </div>
                      <div className="mt-1 text-[#6ee7b7]">
                        ✓ เจอคีย์ &quot;owner&quot; และค่า &quot;alice&quot; ไม่ว่างเปล่า
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#8b5cf6]/30 bg-[#0c0918] p-2">
                      <div className="text-[#c4b5fd]">
                        `json:&quot;currency&quot; binding:&quot;required,oneof=USD EUR THB&quot;`
                      </div>
                      <div className="mt-1 text-[#6ee7b7]">
                        ✓ เจอคีย์ &quot;currency&quot; และ &quot;USD&quot; อยู่ในกลุ่มที่อนุญาต
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 3: Go Struct + DB Call */}
                <div className="rounded-xl border border-[#10b981]/40 bg-[#0b1c17] p-3.5">
                  <div className="flex items-center justify-between border-b border-[#10b981]/20 pb-1.5">
                    <span className="font-mono text-xs font-bold text-[#34d399]">
                      3. ตัวแปร req → ส่งต่อให้ db/account.go
                    </span>
                    <span className="rounded bg-[#10b981]/20 px-1.5 py-0.5 font-mono text-[10px] text-[#6ee7b7]">
                      200 OK
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-1.5 font-mono text-xs">
                    <div className="rounded bg-[#07120e] px-2.5 py-1.5 text-[#d1fae5]">
                      req.Owner = <span className="font-bold text-[#34d399]">&quot;alice&quot;</span>
                    </div>
                    <div className="rounded bg-[#07120e] px-2.5 py-1.5 text-[#d1fae5]">
                      req.Currency = <span className="font-bold text-[#34d399]">&quot;USD&quot;</span>
                    </div>
                    <div className="rounded border border-[#eab308]/40 bg-[#1c180b] px-2.5 py-1.5 text-[11px] text-[#fde047]">
                      + Balance: 0 (Server บังคับเอง ห้ามลูกค้าส่งมา)
                    </div>
                  </div>
                  <div className="mt-2 font-mono text-[11px] text-[#6ee7b7]">
                    ➔ เรียก server.store.CreateAccount(ctx, arg)
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-3">
              {/* Box 1: Invalid JSON */}
              <div className="rounded-xl border border-[#ef4444]/40 bg-[#220e12] p-3.5">
                <div className="flex items-center justify-between border-b border-[#ef4444]/20 pb-1.5">
                  <span className="font-mono text-xs font-bold text-[#f87171]">
                    1. HTTP Request Body (ผิดกฎ)
                  </span>
                  <span className="rounded bg-[#ef4444]/20 px-1.5 py-0.5 font-mono text-[10px] text-[#fca5a5]">
                    POST /accounts
                  </span>
                </div>
                <pre className="mt-2.5 rounded-lg bg-[#120608] p-2.5 font-mono text-xs leading-relaxed text-[#e2e8f0]">
                  {`{\n  `}
                  <span className="text-[#38bdf8]">&quot;owner&quot;</span>
                  {`: `}
                  <span className="font-bold text-[#f87171]">&quot;&quot;</span>
                  {`,\n  `}
                  <span className="text-[#38bdf8]">&quot;currency&quot;</span>
                  {`: `}
                  <span className="font-bold text-[#f87171]">&quot;JPY&quot;</span>
                  {`\n}`}
                </pre>
                <div className="mt-2 text-[11px] text-[#fca5a5]">
                  ส่งชื่อว่างเปล่า และสกุลเงิน JPY ที่ไม่อยู่ในระบบ
                </div>
              </div>

              {/* Box 2: Validator Rejects */}
              <div className="rounded-xl border border-[#ef4444]/50 bg-[#261015] p-3.5">
                <div className="flex items-center justify-between border-b border-[#ef4444]/20 pb-1.5">
                  <span className="font-mono text-xs font-bold text-[#fca5a5]">
                    2. ctx.ShouldBindJSON(&amp;req)
                  </span>
                  <span className="rounded bg-[#ef4444] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                    ERROR != nil
                  </span>
                </div>
                <div className="mt-2.5 space-y-2 font-mono text-[11px]">
                  <div className="rounded-lg border border-[#ef4444]/40 bg-[#14070a] p-2 text-[#fca5a5]">
                    ✗ Field &apos;Owner&apos; failed on the &apos;required&apos; tag
                  </div>
                  <div className="rounded-lg border border-[#ef4444]/40 bg-[#14070a] p-2 text-[#fca5a5]">
                    ✗ Field &apos;Currency&apos; failed on the &apos;oneof&apos; tag
                  </div>
                </div>
              </div>

              {/* Box 3: Immediate 400 Return */}
              <div className="rounded-xl border border-[#eab308]/40 bg-[#1c160b] p-3.5">
                <div className="flex items-center justify-between border-b border-[#eab308]/20 pb-1.5">
                  <span className="font-mono text-xs font-bold text-[#fde047]">
                    3. ตีกลับทันที (ไม่แตะ Database!)
                  </span>
                  <span className="rounded bg-[#ef4444]/30 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#fca5a5]">
                    400 Bad Request
                  </span>
                </div>
                <div className="mt-2.5 rounded-lg bg-[#110d06] p-2.5 font-mono text-[11px] text-[#fde047]">
                  <div>ctx.JSON(http.StatusBadRequest, errorResponse(err))</div>
                  <div className="mt-1 font-bold text-[#f87171]">return // หยุดทำงานทันที!</div>
                </div>
                <div className="mt-2 text-[11px] text-[#cbd5e1]">
                  ช่วยประหยัด Connection ของ PostgreSQL ไม่ให้เสียเวลาประมวลผลข้อมูลขยะ
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

// ============================================================================
// 4. Gin 3 Input Channels Comparison: URI vs Query vs JSON Body (Ch 6.1)
// ============================================================================

export function BankGin3ChannelsViz() {
  const [channel, setChannel] = useState<"uri" | "query" | "json">("uri");

  return (
    <VizStaticFrame
      title="Anatomy of HTTP Request in Gin: แยกแยะ 3 ช่องทางการดึงข้อมูลเข้า Struct"
      pills={[
        { label: "Path (:id) → uri tag", color: "#f59e0b" },
        { label: "Query (?k=v) → form tag", color: "#3b82f6" },
        { label: "Body ({...}) → json tag", color: "#10b981" },
      ]}
      caption="จำง่ายๆ: ข้อมูลอยู่ส่วนไหนของ HTTP Request ให้เลือกคู่ Struct Tag + ฟังก์ชัน ShouldBind... ให้ตรงกับส่วนนั้น"
      diagram={
        <div className="space-y-4 p-2">
          {/* Channel Selector */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setChannel("uri")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                channel === "uri"
                  ? "bg-[#f59e0b] text-black shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              1️⃣ URL Path: GET /accounts/42 (ShouldBindUri)
            </button>
            <button
              type="button"
              onClick={() => setChannel("query")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                channel === "query"
                  ? "bg-[#3b82f6] text-white shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              2️⃣ Query String: ?page_id=2&amp;page_size=5 (ShouldBindQuery)
            </button>
            <button
              type="button"
              onClick={() => setChannel("json")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                channel === "json"
                  ? "bg-[#10b981] text-white shadow"
                  : "border border-[#2a3040] bg-[#141824] text-[#8a90a0] hover:text-white"
              }`}
            >
              3️⃣ JSON Body: POST /accounts (ShouldBindJSON)
            </button>
          </div>

          {channel === "uri" && (
            <div className="rounded-xl border border-[#f59e0b]/40 bg-[#1c1609] p-4">
              <div className="mb-3 font-mono text-sm font-bold text-white">
                <span className="rounded bg-[#3b82f6]/30 px-2 py-0.5 text-[#93c5fd]">GET</span>{" "}
                <span className="text-[#94a3b8]">http://localhost:8080/accounts/</span>
                <span className="rounded bg-[#f59e0b] px-2 py-0.5 font-extrabold text-black">
                  42
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-[#f59e0b]/30 bg-[#120e05] p-3">
                  <div className="text-[11px] font-bold text-[#fbbf24]">1. Route ที่ตั้งไว้ใน server.go</div>
                  <div className="mt-1.5 font-mono text-xs text-white">
                    router.GET(&quot;/accounts/<span className="font-bold text-[#fbbf24]">:id</span>&quot;, ...)
                  </div>
                  <div className="mt-1 text-[11px] text-[#94a3b8]">
                    โคลอน <code className="text-[#fbbf24]">:id</code> คือตัวแปรบน Path
                  </div>
                </div>

                <div className="rounded-lg border border-[#f59e0b]/30 bg-[#120e05] p-3">
                  <div className="text-[11px] font-bold text-[#fbbf24]">2. Struct Tag &amp; ตัวแกะของ Gin</div>
                  <div className="mt-1.5 font-mono text-xs text-white">
                    ID int64 `uri:&quot;<span className="font-bold text-[#fbbf24]">id</span>&quot; binding:&quot;required,min=1&quot;`
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-[#fde68a]">
                    ctx.ShouldBindUri(&amp;req)
                  </div>
                </div>

                <div className="rounded-lg border border-[#10b981]/30 bg-[#091712] p-3">
                  <div className="text-[11px] font-bold text-[#34d399]">3. ค่าที่ได้ใน Go Struct</div>
                  <div className="mt-1.5 font-mono text-xs font-bold text-[#6ee7b7]">
                    req.ID = 42 (แปลงเป็น int64 ให้อัตโนมัติ)
                  </div>
                  <div className="mt-1 text-[11px] text-[#94a3b8]">
                    ถ้าส่ง /accounts/0 หรือ /accounts/abc จะติด min=1 ตีกลับ 400 ทันที
                  </div>
                </div>
              </div>
            </div>
          )}

          {channel === "query" && (
            <div className="rounded-xl border border-[#3b82f6]/40 bg-[#0d1526] p-4">
              <div className="mb-3 font-mono text-sm font-bold text-white">
                <span className="rounded bg-[#3b82f6]/30 px-2 py-0.5 text-[#93c5fd]">GET</span>{" "}
                <span className="text-[#94a3b8]">http://localhost:8080/accounts?</span>
                <span className="rounded bg-[#3b82f6] px-2 py-0.5 font-extrabold text-white">
                  page_id=2&amp;page_size=5
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-[#3b82f6]/30 bg-[#080d18] p-3">
                  <div className="text-[11px] font-bold text-[#60a5fa]">1. ตำแหน่งของข้อมูล</div>
                  <div className="mt-1.5 font-mono text-xs text-white">
                    หลังเครื่องหมาย <span className="font-bold text-[#60a5fa]">?</span> บน URL
                  </div>
                  <div className="mt-1 text-[11px] text-[#94a3b8]">
                    คู่คีย์=ค่า คั่นด้วย &amp; (`page_id=2` และ `page_size=5`)
                  </div>
                </div>

                <div className="rounded-lg border border-[#3b82f6]/30 bg-[#080d18] p-3">
                  <div className="text-[11px] font-bold text-[#60a5fa]">2. Struct Tag &amp; ตัวแกะของ Gin</div>
                  <div className="mt-1.5 font-mono text-[11px] text-white">
                    <div>PageID int32 `form:&quot;page_id&quot; ...`</div>
                    <div>PageSize int32 `form:&quot;page_size&quot; ...`</div>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-[#93c5fd]">
                    ctx.ShouldBindQuery(&amp;req)
                  </div>
                </div>

                <div className="rounded-lg border border-[#10b981]/30 bg-[#091712] p-3">
                  <div className="text-[11px] font-bold text-[#34d399]">3. คำนวณ Pagination ส่งเข้า SQL</div>
                  <div className="mt-1.5 font-mono text-xs text-[#6ee7b7]">
                    <div>Limit = req.PageSize = 5</div>
                    <div>Offset = (2 - 1) * 5 = 5</div>
                  </div>
                  <div className="mt-1 text-[11px] text-[#94a3b8]">
                    ข้าม 5 แถวแรก (ของหน้า 1) แล้วดึงแถวที่ 6–10 มาแสดง!
                  </div>
                </div>
              </div>
            </div>
          )}

          {channel === "json" && (
            <div className="rounded-xl border border-[#10b981]/40 bg-[#0b1c17] p-4">
              <div className="mb-3 font-mono text-sm font-bold text-white">
                <span className="rounded bg-[#10b981]/30 px-2 py-0.5 text-[#6ee7b7]">POST</span>{" "}
                <span className="text-[#94a3b8]">http://localhost:8080/accounts</span>{" "}
                <span className="rounded bg-[#10b981] px-2 py-0.5 text-xs font-extrabold text-black">
                  Body: {`{"owner": "alice", "currency": "USD"}`}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-[#10b981]/30 bg-[#07120e] p-3">
                  <div className="text-[11px] font-bold text-[#34d399]">1. ตำแหน่งของข้อมูล</div>
                  <div className="mt-1.5 font-mono text-xs text-white">HTTP Request Body (JSON)</div>
                  <div className="mt-1 text-[11px] text-[#94a3b8]">
                    ใช้กับ POST / PUT / PATCH ที่ส่งข้อมูลชุดใหญ่เข้ามาสร้างหรือแก้ไข
                  </div>
                </div>

                <div className="rounded-lg border border-[#10b981]/30 bg-[#07120e] p-3">
                  <div className="text-[11px] font-bold text-[#34d399]">2. Struct Tag &amp; ตัวแกะของ Gin</div>
                  <div className="mt-1.5 font-mono text-[11px] text-white">
                    <div>Owner string `json:&quot;owner&quot; ...`</div>
                    <div>Currency string `json:&quot;currency&quot; ...`</div>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-[#6ee7b7]">
                    ctx.ShouldBindJSON(&amp;req)
                  </div>
                </div>

                <div className="rounded-lg border border-[#10b981]/30 bg-[#07120e] p-3">
                  <div className="text-[11px] font-bold text-[#34d399]">3. ค่าที่ได้ใน Go Struct</div>
                  <div className="mt-1.5 font-mono text-xs text-[#6ee7b7]">
                    <div>req.Owner = &quot;alice&quot;</div>
                    <div>req.Currency = &quot;USD&quot;</div>
                  </div>
                  <div className="mt-1 text-[11px] text-[#94a3b8]">
                    พร้อมส่งต่อให้ server.store.CreateAccount(...)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

// ============================================================================
// 5. Custom Validator Pipeline: binding:"currency" (Ch 6.2)
// ============================================================================

export function BankCustomValidatorFlowViz() {
  return (
    <VizStaticFrame
      title="Custom Validator Pipeline: เบื้องหลังการทำงานของแท็ก binding:&quot;required,currency&quot;"
      pills={[
        { label: "1. RegisterValidation", color: "#3b82f6" },
        { label: "2. Struct Tag: currency", color: "#8b5cf6" },
        { label: "3. IsSupportedCurrency", color: "#10b981" },
      ]}
      caption="แทนที่จะพิมพ์ oneof=USD EUR THB ซ้ำๆ ทุกไฟล์ เราลงทะเบียนกฎชื่อ 'currency' ไว้ที่ศูนย์กลาง เพื่อให้ทุก Struct เรียกใช้ได้ทันที"
      diagram={
        <div className="grid grid-cols-1 gap-3 p-2 md:grid-cols-4">
          <div className="rounded-lg border border-[#3b82f6]/40 bg-[#0d1526] p-3">
            <div className="font-mono text-[11px] font-bold text-[#60a5fa]">
              1. api/server.go (ตอนเริ่มเซิร์ฟเวอร์)
            </div>
            <div className="mt-1.5 rounded bg-[#080d18] p-2 font-mono text-[11px] text-white">
              v.RegisterValidation(&quot;currency&quot;, validCurrency)
            </div>
            <p className="mt-1.5 text-[11px] text-[#94a3b8]">
              ผูกชื่อแท็ก <code className="text-[#93c5fd]">&quot;currency&quot;</code> เข้ากับฟังก์ชัน{" "}
              <code className="text-[#93c5fd]">validCurrency</code>
            </p>
          </div>

          <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#140f26] p-3">
            <div className="font-mono text-[11px] font-bold text-[#c4b5fd]">
              2. api/account.go &amp; transfer.go
            </div>
            <div className="mt-1.5 rounded bg-[#0b0816] p-2 font-mono text-[11px] text-white">
              binding:&quot;required,<span className="font-bold text-[#c4b5fd]">currency</span>&quot;
            </div>
            <p className="mt-1.5 text-[11px] text-[#94a3b8]">
              เมื่อ <code className="text-[#c4b5fd]">ShouldBindJSON</code> เจอคำว่า{" "}
              <code className="text-[#c4b5fd]">currency</code> จะเรียกฟังก์ชันที่ผูกไว้ทันที
            </p>
          </div>

          <div className="rounded-lg border border-[#f59e0b]/40 bg-[#1c1609] p-3">
            <div className="font-mono text-[11px] font-bold text-[#fbbf24]">
              3. api/validator.go
            </div>
            <div className="mt-1.5 rounded bg-[#110d05] p-2 font-mono text-[11px] text-white">
              fl.Field().Interface().(string)
            </div>
            <p className="mt-1.5 text-[11px] text-[#94a3b8]">
              ดึงค่าจากฟิลด์ (เช่น <code className="text-[#fde68a]">&quot;USD&quot;</code>) แล้วแปลงเป็น{" "}
              <code className="text-[#fde68a]">string</code> อย่างปลอดภัย
            </p>
          </div>

          <div className="rounded-lg border border-[#10b981]/40 bg-[#0b1c17] p-3">
            <div className="font-mono text-[11px] font-bold text-[#34d399]">
              4. util/currency.go
            </div>
            <div className="mt-1.5 rounded bg-[#07120e] p-2 font-mono text-[11px] text-white">
              IsSupportedCurrency(currency)
            </div>
            <p className="mt-1.5 text-[11px] text-[#94a3b8]">
              เช็คว่าตรงกับ <code className="text-[#6ee7b7]">USD, EUR, THB</code> หรือไม่ (คืน{" "}
              <code className="text-[#6ee7b7]">true/false</code>)
            </p>
          </div>
        </div>
      }
    />
  );
}

// ============================================================================
// 6. Auth Middleware Header Parsing & Context Flow (Ch 7.2)
// ============================================================================

export function BankAuthMiddlewareFlowViz() {
  return (
    <VizStaticFrame
      title="Auth Middleware Pipeline: การแกะ Authorization Header และส่งต่อตัวตนเข้า Context"
      pills={[
        { label: "1. strings.Fields(header)", color: "#3b82f6" },
        { label: "2. VerifyToken", color: "#8b5cf6" },
        { label: "3. ctx.Set → ctx.MustGet", color: "#10b981" },
      ]}
      caption="ด่านตรวจคนเข้าเมือง (authMiddleware) จะสกัดเอาชื่อผู้ใช้ที่แท้จริงจาก Token แล้วแปะลง ctx เพื่อให้ด่านถัดไปรู้ทันทีว่าใครเป็นคนยิง Request"
      diagram={
        <div className="space-y-3 p-2">
          {/* Raw Header Box */}
          <div className="rounded-xl border border-[#3b82f6]/40 bg-[#0d1526] p-3">
            <div className="text-[11px] font-bold text-[#60a5fa]">
              HTTP Request Header ที่ลูกค้าแนบมากับคำขอ:
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[#94a3b8]">Authorization:</span>
              <span className="rounded bg-[#f59e0b]/20 px-2 py-0.5 font-bold text-[#fbbf24]">
                Bearer
              </span>
              <span className="rounded bg-[#3b82f6]/20 px-2 py-0.5 font-bold text-[#93c5fd]">
                v4.local.G7x9KpL2mN8qR4tW...
              </span>
            </div>
          </div>

          {/* 4-Step Flow */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="rounded-lg border border-[#f59e0b]/40 bg-[#1c1609] p-3">
              <div className="font-mono text-[11px] font-bold text-[#fbbf24]">
                1. หั่นด้วย strings.Fields()
              </div>
              <div className="mt-1.5 space-y-1 font-mono text-[11px]">
                <div className="rounded bg-[#110d05] px-2 py-1 text-white">
                  fields[0] = <span className="text-[#fbbf24]">&quot;Bearer&quot;</span>
                </div>
                <div className="rounded bg-[#110d05] px-2 py-1 text-white">
                  fields[1] = <span className="text-[#93c5fd]">&quot;v4.local...&quot;</span>
                </div>
              </div>
              <div className="mt-1 text-[10px] text-[#94a3b8]">
                เช็คว่า <code className="text-[#fbbf24]">len(fields) == 2</code> และช่องแรกคือ{" "}
                <code className="text-[#fbbf24]">bearer</code>
              </div>
            </div>

            <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#140f26] p-3">
              <div className="font-mono text-[11px] font-bold text-[#c4b5fd]">
                2. ตรวจและถอดรหัส Token
              </div>
              <div className="mt-1.5 rounded bg-[#0b0816] p-2 font-mono text-[11px] text-white">
                payload, err := tokenMaker.VerifyToken(fields[1])
              </div>
              <div className="mt-1 text-[10px] text-[#94a3b8]">
                เช็คลายเซ็นและวันหมดอายุ ได้ก้อน <code className="text-[#c4b5fd]">*Payload</code>{" "}
                (`Username: &quot;alice&quot;`)
              </div>
            </div>

            <div className="rounded-lg border border-[#3b82f6]/40 bg-[#0d1526] p-3">
              <div className="font-mono text-[11px] font-bold text-[#60a5fa]">
                3. แปะลงกระเป๋า Context
              </div>
              <div className="mt-1.5 rounded bg-[#080d18] p-2 font-mono text-[11px] text-white">
                <div>ctx.Set(&quot;auth_payload&quot;, payload)</div>
                <div className="text-[#6ee7b7]">ctx.Next()</div>
              </div>
              <div className="mt-1 text-[10px] text-[#94a3b8]">
                ฝากข้อมูลผู้ใช้ไว้ใน <code className="text-[#93c5fd]">ctx</code> แล้วเปิดทางให้วิ่งเข้า Handler
              </div>
            </div>

            <div className="rounded-lg border border-[#10b981]/40 bg-[#0b1c17] p-3">
              <div className="font-mono text-[11px] font-bold text-[#34d399]">
                4. Handler หยิบไปใช้งาน
              </div>
              <div className="mt-1.5 rounded bg-[#07120e] p-2 font-mono text-[11px] text-white">
                authPayload := ctx.MustGet(authPayloadKey).(*token.Payload)
              </div>
              <div className="mt-1 text-[10px] text-[#94a3b8]">
                ใช้ <code className="text-[#6ee7b7]">authPayload.Username</code> ยืนยันเจ้าของบัญชีตัวจริง!
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

// ============================================================================
// 7. Viper Config Mapping: app.env + AutomaticEnv -> Config Struct (Ch 7.3)
// ============================================================================

export function BankViperConfigFlowViz() {
  return (
    <VizStaticFrame
      title="Viper Configuration Pipeline: จากไฟล์ app.env และ OS Env สู่ Go Struct"
      pills={[
        { label: "1. app.env (ค่าเริ่มต้นบนเครื่อง)", color: "#3b82f6" },
        { label: "2. AutomaticEnv (เซิร์ฟเวอร์จริงทับค่า)", color: "#f59e0b" },
        { label: "3. mapstructure → Config Struct", color: "#10b981" },
      ]}
      caption="Viper ช่วยให้อ่านค่าจากไฟล์ app.env ตอนพัฒนาบนเครื่อง และสลับไปใช้ Environment Variable บน Docker/Production ได้อัตโนมัติโดยไม่ต้องแก้โค้ด"
      diagram={
        <div className="grid grid-cols-1 items-center gap-3 p-2 md:grid-cols-3">
          {/* Col 1: Sources */}
          <div className="space-y-2.5">
            <div className="rounded-lg border border-[#3b82f6]/40 bg-[#0d1526] p-3">
              <div className="font-mono text-[11px] font-bold text-[#60a5fa]">
                แหล่งที่ 1: ไฟล์ app.env (Local Dev)
              </div>
              <div className="mt-1.5 space-y-1 rounded bg-[#080d18] p-2 font-mono text-[10px] text-[#cbd5e1]">
                <div>DB_SOURCE=postgresql://root:secret@localhost:5432/...</div>
                <div>HTTP_SERVER_ADDRESS=0.0.0.0:8080</div>
                <div>TOKEN_SYMMETRIC_KEY=1234567890...</div>
                <div>ACCESS_TOKEN_DURATION=15m</div>
              </div>
            </div>

            <div className="rounded-lg border border-[#f59e0b]/40 bg-[#1c1609] p-3">
              <div className="font-mono text-[11px] font-bold text-[#fbbf24]">
                แหล่งที่ 2: OS Env (viper.AutomaticEnv)
              </div>
              <div className="mt-1 text-[11px] text-[#fde68a]">
                ถ้าบน Docker / Cloud มีการตั้งค่า <code className="font-mono">DB_SOURCE</code> ไว้
                Viper จะใช้ค่าของเซิร์ฟเวอร์จริงทับค่าในไฟล์ทันที!
              </div>
            </div>
          </div>

          {/* Col 2: mapstructure tags */}
          <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#140f26] p-3.5">
            <div className="font-mono text-xs font-bold text-[#c4b5fd]">
              ตัวเชื่อม: viper.Unmarshal(&amp;config)
            </div>
            <div className="mt-2 space-y-1.5 font-mono text-[11px]">
              <div className="rounded bg-[#0b0816] p-2 text-white">
                `mapstructure:&quot;<span className="text-[#c4b5fd]">DB_SOURCE</span>&quot;`
              </div>
              <div className="rounded bg-[#0b0816] p-2 text-white">
                `mapstructure:&quot;<span className="text-[#c4b5fd]">HTTP_SERVER_ADDRESS</span>&quot;`
              </div>
              <div className="rounded bg-[#0b0816] p-2 text-white">
                `mapstructure:&quot;<span className="text-[#c4b5fd]">ACCESS_TOKEN_DURATION</span>&quot;`
              </div>
            </div>
            <div className="mt-2 text-[11px] text-[#94a3b8]">
              จับคู่ชื่อตัวแปรพิมพ์ใหญ่เข้ากับฟิลด์ของ Go พร้อมแปลง <code className="text-[#c4b5fd]">&quot;15m&quot;</code> เป็น{" "}
              <code className="text-[#c4b5fd]">time.Duration</code> ให้อัตโนมัติ
            </div>
          </div>

          {/* Col 3: Resulting Go Struct */}
          <div className="rounded-lg border border-[#10b981]/40 bg-[#0b1c17] p-3.5">
            <div className="font-mono text-xs font-bold text-[#34d399]">
              ผลลัพธ์: config (util.Config)
            </div>
            <div className="mt-2 space-y-1.5 font-mono text-[11px]">
              <div className="rounded bg-[#07120e] px-2.5 py-1.5 text-[#d1fae5]">
                config.DBSource <span className="text-[#34d399]">(string)</span>
              </div>
              <div className="rounded bg-[#07120e] px-2.5 py-1.5 text-[#d1fae5]">
                config.HTTPServerAddress <span className="text-[#34d399]">(string)</span>
              </div>
              <div className="rounded bg-[#07120e] px-2.5 py-1.5 text-[#d1fae5]">
                config.AccessTokenDuration <span className="text-[#34d399]">(15m0s)</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-[#6ee7b7]">
              พร้อมนำไปใช้ใน main.go โดยไม่มี Hardcode!
            </div>
          </div>
        </div>
      }
    />
  );
}
