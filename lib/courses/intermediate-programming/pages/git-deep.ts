import type { Page } from "@/lib/types";

const GROUP = "บทที่ 5: Git สำหรับทำงานเป็นทีม";

export const gitDeepPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "git-recap": {
    slug: "git-recap",
    title: "ทบทวน Git + Mental Model",
    lead: "เข้าใจ git เป็น \"ภาพถ่าย\" ของโปรเจกต์ และ 3 พื้นที่ที่ทำให้ทุกคำสั่งง่ายขึ้น",
    group: GROUP,
    blocks: [
      { t: "p", c: "Git คือระบบติดตามการเปลี่ยนแปลงโค้ด (version control) ที่ทุกบริษัทใช้ หัวข้อนี้ปูพื้นและให้ \"แผนที่ความคิด\" ที่ทำให้คำสั่ง git ทั้งหมดเข้าใจง่าย ก่อนลงลึกเรื่อง branch และการทำงานเป็นทีม" },

      { t: "h2", c: "git เก็บ \"ภาพถ่าย\" ไม่ใช่ผลต่าง" },
      { t: "p", c: "ทุกครั้งที่ commit git เก็บภาพถ่าย (snapshot) ของไฟล์ทั้งโปรเจกต์ ณ ตอนนั้น ทำให้ย้อนกลับไปจุดไหนก็ได้ และรู้ว่าใครแก้อะไรเมื่อไร" },

      { t: "h2", c: "3 พื้นที่ของ git (หัวใจสำคัญ)" },
      { t: "p", c: "เข้าใจ 3 พื้นที่นี้แล้ว คำสั่ง git แทบทุกตัวจะเข้าใจทันที" },
      {
        t: "table",
        head: ["พื้นที่", "คือ", "ย้ายเข้าด้วย"],
        rows: [
          ["Working Directory", "ไฟล์ที่กำลังแก้อยู่จริง", "(แก้ไฟล์)"],
          ["Staging Area", "ที่พักไฟล์ที่จะ commit รอบนี้", "git add"],
          ["Repository", "ประวัติ commit ถาวร", "git commit"],
        ],
      },
      { t: "code", lang: "bash", c: "git init                  # สร้าง repo ในโฟลเดอร์\ngit status                # ดูว่าไฟล์ไหนเปลี่ยน/staged\ngit add file.py           # working -> staging\ngit add .                 # เพิ่มทุกไฟล์ที่เปลี่ยน\ngit commit -m \"เพิ่มฟีเจอร์ X\"  # staging -> repository\ngit log --oneline         # ดูประวัติ commit แบบย่อ" },
      { t: "callout", title: "ทำไมมี staging area", c: "staging ให้เราเลือกได้ว่า \"จะ commit อะไรบ้างในรอบนี้\" — แก้ 5 ไฟล์แต่ commit แค่ 2 ไฟล์ที่เกี่ยวกันได้ ทำให้ commit สื่อความหมายและแยกเรื่องชัดเจน" },

      { t: "h2", c: "commit ที่ดี" },
      { t: "p", c: "commit คือหน่วยของการเปลี่ยนแปลง 1 เรื่อง พร้อมข้อความอธิบาย — เป็นทั้งจุด save และเอกสารบอกว่าทำไมแก้" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "git เก็บ snapshot ของโปรเจกต์ทุก commit ย้อนกลับได้",
          "3 พื้นที่: Working Directory → (git add) → Staging → (git commit) → Repository",
          "git status ดูสถานะ, git log ดูประวัติ",
          "staging ให้เลือกว่าจะ commit อะไรในรอบนี้",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้างโฟลเดอร์ใหม่ git init แล้ว commit ไฟล์แรก  2) แก้ไฟล์ 2 ไฟล์ แต่ git add แค่ไฟล์เดียวแล้ว commit สังเกต git status  3) ดู git log --oneline  4) อธิบายความต่างของ working / staging / repository ด้วยคำตัวเอง" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Branch & Merge →", slug: "git-branch", desc: "แยกงานเป็นสายเพื่อไม่ให้กระทบของหลัก" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "git-branch": {
    slug: "git-branch",
    title: "Branch & Merge",
    lead: "แยกงานเป็น \"สาย\" ของตัวเองแล้วรวมกลับ — หัวใจของการทำงานหลายฟีเจอร์/หลายคนพร้อมกัน",
    group: GROUP,
    blocks: [
      { t: "p", c: "branch ให้เราทำงานบนสายของตัวเองโดยไม่กระทบโค้ดหลัก ทำฟีเจอร์เสร็จค่อยรวม (merge) กลับ — เป็นวิธีที่ทีมทำงานหลายอย่างพร้อมกันโดยไม่เหยียบกัน" },

      { t: "h2", c: "branch คืออะไร" },
      { t: "p", c: "นึกถึง branch เป็น \"สายเวลาคู่ขนาน\" ของโค้ด สาขาหลักมักชื่อ main คุณแตกสายใหม่ไปทำฟีเจอร์ พอเสร็จค่อยรวมกลับ main" },
      { t: "code", lang: "bash", c: "git branch                  # ดู branch ทั้งหมด (* คืออันปัจจุบัน)\ngit switch -c feature-login # สร้าง+ย้ายไป branch ใหม่\n# (แบบเก่า: git checkout -b feature-login)\n\n# ...แก้โค้ด, add, commit บน branch นี้...\n\ngit switch main             # กลับมา main" },

      { t: "h2", c: "merge — รวม branch กลับ" },
      { t: "code", lang: "bash", c: "git switch main             # ไปยัง branch ปลายทาง\ngit merge feature-login     # รวม feature-login เข้า main\ngit branch -d feature-login # ลบ branch ที่ merge แล้ว" },

      { t: "h2", c: "fast-forward vs merge commit" },
      { t: "p", c: "ถ้า main ไม่มี commit ใหม่ระหว่างที่เราทำ feature การ merge จะเป็น fast-forward (แค่เลื่อนตัวชี้) แต่ถ้า main มีการเปลี่ยนด้วย git จะสร้าง merge commit เพื่อรวมสองสาย" },
      { t: "callout", title: "อย่าทำงานบน main ตรง ๆ", warn: true, c: "ในทีม กฎทั่วไปคือไม่แก้ main โดยตรง — แตก branch ต่อฟีเจอร์/ต่อ bug เสมอ ทำให้ main คงสภาพใช้งานได้ตลอด และรีวิวก่อนรวมได้ (เจอใน PR workflow ท้ายบท)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "branch = สายเวลาคู่ขนานของโค้ด แยกงานไม่ให้กระทบ main",
          "git switch -c ชื่อ สร้าง+ย้าย; git switch main กลับมา",
          "git merge รวม branch กลับ; git branch -d ลบที่ merge แล้ว",
          "ไม่แก้ main ตรง ๆ — แตก branch ต่อฟีเจอร์เสมอ",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง branch feature-x แก้ไฟล์ commit แล้ว merge กลับ main  2) ดู git branch ก่อน/หลังสร้าง  3) ลองสร้าง 2 branch แก้คนละไฟล์แล้ว merge ทั้งคู่  4) ลบ branch ที่ merge แล้วด้วย -d" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Remote, GitHub & push/pull →", slug: "git-remote", desc: "เก็บโค้ดบนคลาวด์และทำงานร่วมกัน" },
          { title: "← ก่อนหน้า: ทบทวน Git", slug: "git-recap" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "git-remote": {
    slug: "git-remote",
    title: "Remote, GitHub & push/pull",
    lead: "เก็บโค้ดบนเซิร์ฟเวอร์กลาง (เช่น GitHub) แล้ว push/pull เพื่อทำงานร่วมกับคนอื่น",
    group: GROUP,
    blocks: [
      { t: "p", c: "จนถึงตอนนี้ git อยู่บนเครื่องเราคนเดียว remote คือสำเนา repo บนเซิร์ฟเวอร์กลาง (เช่น GitHub) ที่ทีมใช้ร่วมกัน — push ส่งงานขึ้นไป, pull ดึงงานคนอื่นลงมา" },

      { t: "h2", c: "เชื่อม repo กับ remote" },
      { t: "code", lang: "bash", c: "# เชื่อม repo เครื่องเรากับ remote ชื่อ origin\ngit remote add origin https://github.com/user/repo.git\ngit remote -v               # ดู remote ที่เชื่อมไว้\n\n# push ครั้งแรก (ตั้ง upstream ด้วย -u)\ngit push -u origin main\n\n# ครั้งต่อไป push สั้น ๆ\ngit push" },

      { t: "h2", c: "clone, push, pull, fetch" },
      {
        t: "table",
        head: ["คำสั่ง", "ทำอะไร"],
        rows: [
          ["git clone <url>", "ก็อป repo จาก remote มาทั้งหมด"],
          ["git push", "ส่ง commit ของเราขึ้น remote"],
          ["git pull", "ดึงงานใหม่จาก remote + รวมเข้าของเรา"],
          ["git fetch", "ดึงงานใหม่มาดูก่อน (ยังไม่รวม)"],
        ],
      },
      { t: "code", lang: "bash", c: "git clone https://github.com/user/repo.git   # ก็อปมาเริ่มงาน\ngit pull                                     # ดึงงานล่าสุดก่อนเริ่มทำ\n# ...ทำงาน, commit...\ngit push                                     # ส่งขึ้นไป" },
      { t: "callout", title: "pull = fetch + merge", c: "git pull จริง ๆ คือทำ 2 อย่างต่อกัน: fetch (ดึง commit ใหม่จาก remote) แล้ว merge (รวมเข้า branch เรา) ถ้าอยากดูก่อนว่ามีอะไรเปลี่ยนค่อยรวม ให้ fetch แล้วดูก่อน" },

      { t: "h2", c: "การยืนยันตัวตน (Auth)" },
      { t: "p", c: "GitHub ไม่ให้ใช้รหัสผ่านธรรมดาแล้ว ต้องใช้ Personal Access Token (PAT) แทนรหัสผ่านตอน push ผ่าน HTTPS หรือใช้ SSH key — ตั้งครั้งเดียวแล้วใช้ได้ตลอด" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "remote = repo บนเซิร์ฟเวอร์กลาง (เช่น GitHub) ชื่อปริยาย origin",
          "git clone ก็อปมาเริ่ม, git push ส่งขึ้น, git pull ดึงลง",
          "pull = fetch + merge; fetch ดึงมาดูก่อนไม่รวม",
          "GitHub ใช้ Personal Access Token หรือ SSH key แทนรหัสผ่าน",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง repo บน GitHub แล้วเชื่อมกับโปรเจกต์เครื่องเรา push ขึ้นไป  2) clone repo ลงมาอีกโฟลเดอร์  3) แก้ใน clone แล้ว push กลับ พร้อม pull ในโฟลเดอร์เดิม  4) อธิบายความต่างของ fetch กับ pull" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Merge Conflict & Rebase →", slug: "git-conflict", desc: "แก้เมื่อโค้ดชนกัน และเข้าใจ rebase" },
          { title: "← ก่อนหน้า: Branch & Merge", slug: "git-branch" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "git-conflict": {
    slug: "git-conflict",
    title: "Merge Conflict & Rebase",
    lead: "แก้เมื่อสองคนแก้บรรทัดเดียวกัน และเข้าใจว่า rebase ต่างจาก merge อย่างไร",
    group: GROUP,
    blocks: [
      { t: "p", c: "เมื่อทำงานเป็นทีม จะมีบางครั้งที่สองคนแก้ไฟล์เดียวกันบรรทัดเดียวกัน git รวมเองไม่ได้ เกิด merge conflict — มันไม่น่ากลัว แค่ต้องบอก git ว่าจะเอาเวอร์ชันไหน หัวข้อนี้สอนวิธีแก้และความต่างของ rebase" },

      { t: "h2", c: "conflict เกิดและหน้าตาเป็นอย่างไร" },
      { t: "p", c: "เมื่อ merge แล้วชนกัน git จะใส่เครื่องหมายในไฟล์บอกว่าส่วนไหนชน: ของเรา (HEAD) กับของอีกฝั่ง" },
      { t: "code", lang: "text", c: "<<<<<<< HEAD\nprice = 100        # โค้ดฝั่งเรา (branch ปัจจุบัน)\n=======\nprice = 120        # โค้ดฝั่งที่กำลัง merge เข้ามา\n>>>>>>> feature-x" },
      { t: "h2", c: "วิธีแก้ conflict" },
      {
        t: "ol",
        c: [
          "เปิดไฟล์ที่ conflict (git status บอกว่าไฟล์ไหน)",
          "เลือกว่าจะเอาเวอร์ชันไหน หรือรวมมือ แล้วลบเครื่องหมาย <<<<, ====, >>>> ออก",
          "git add ไฟล์ที่แก้แล้ว",
          "git commit เพื่อจบการ merge",
        ],
      },
      { t: "code", lang: "bash", c: "git merge feature-x\n# CONFLICT (content): Merge conflict in app.py\n# ...แก้ไฟล์ให้เหลือเวอร์ชันที่ต้องการ ลบ marker...\ngit add app.py\ngit commit              # จบ merge" },

      { t: "h2", c: "merge vs rebase" },
      { t: "p", c: "ทั้งคู่รวมงานจากอีก branch แต่ผลต่างกัน: merge สร้าง merge commit รวมสองสาย ส่วน rebase ย้าย commit ของเราไปต่อท้ายอีก branch ทำให้ประวัติเป็นเส้นตรงสวยงาม" },
      {
        t: "table",
        head: ["", "merge", "rebase"],
        rows: [
          ["ประวัติ", "แตกสาย + merge commit", "เส้นตรง สะอาด"],
          ["commit เดิม", "คงไว้", "ถูกเขียนใหม่ (hash เปลี่ยน)"],
          ["เหมาะกับ", "รวมงานเข้า main", "เก็บ branch ส่วนตัวให้สะอาดก่อน merge"],
        ],
      },
      { t: "code", lang: "bash", c: "git switch feature-x\ngit rebase main         # ย้าย commit ของ feature ไปต่อท้าย main ล่าสุด" },
      { t: "callout", title: "กฎทองของ rebase", warn: true, c: "อย่า rebase branch ที่ push ขึ้น remote แล้วหรือที่คนอื่นใช้อยู่ เพราะ rebase เขียนประวัติใหม่ (hash เปลี่ยน) จะทำให้ของคนอื่นพัง — ใช้ rebase กับ branch ส่วนตัวที่ยังไม่ได้แชร์เท่านั้น" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "conflict เกิดเมื่อแก้บรรทัดเดียวกันคนละทาง — git ใส่ marker <<< === >>>",
          "แก้: เลือกเวอร์ชัน ลบ marker → git add → git commit",
          "merge เก็บประวัติแตกสาย; rebase ทำประวัติเป็นเส้นตรง (เขียน commit ใหม่)",
          "ห้าม rebase ของที่ push/แชร์แล้ว",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง conflict โดยแก้บรรทัดเดียวกันใน 2 branch แล้ว merge  2) แก้ conflict ให้จบ (เลือกเวอร์ชัน, add, commit)  3) ลอง rebase branch ส่วนตัวเข้า main  4) อธิบายว่าทำไมห้าม rebase ของที่แชร์แล้ว" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: PR Workflow & commit hygiene →", slug: "git-workflow", desc: "วิธีทำงานเป็นทีมจริงด้วย Pull Request" },
          { title: "← ก่อนหน้า: Remote & GitHub", slug: "git-remote" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "git-workflow": {
    slug: "git-workflow",
    title: "PR Workflow & commit hygiene",
    lead: "วิธีที่ทีมจริงทำงานด้วยกัน: feature branch → Pull Request → review → merge พร้อมเขียน commit ที่ดี",
    group: GROUP,
    blocks: [
      { t: "p", c: "หัวข้อนี้รวมทุกอย่างเป็น \"วิธีทำงานจริง\" ที่เกือบทุกทีมใช้ — แตก branch ทำฟีเจอร์, เปิด Pull Request ให้คนรีวิว, แล้วค่อย merge เข้า main พร้อมหลักการเขียน commit ที่ดี" },

      { t: "h2", c: "Feature Branch Workflow" },
      { t: "p", c: "วงจรมาตรฐานของการเพิ่มฟีเจอร์หนึ่งอย่าง:" },
      { t: "code", lang: "bash", c: "git switch main && git pull       # 1. อัปเดต main ล่าสุด\ngit switch -c feature-search      # 2. แตก branch ต่อฟีเจอร์\n# 3. ...แก้โค้ด, commit เป็นช่วง ๆ...\ngit push -u origin feature-search # 4. push branch ขึ้น remote\n# 5. เปิด Pull Request บน GitHub ให้คนรีวิว\n# 6. รีวิวผ่าน -> merge เข้า main -> ลบ branch" },

      { t: "h2", c: "Pull Request (PR) & Code Review" },
      { t: "p", c: "PR คือคำขอ \"ขอรวม branch ของฉันเข้า main\" บน GitHub เพื่อนร่วมทีมจะรีวิวโค้ด คอมเมนต์ ขอแก้ แล้วค่อยอนุมัติ — เป็นด่านคุณภาพก่อนเข้า main และเป็นที่ที่ทีมเรียนรู้จากกัน" },
      {
        t: "ul",
        c: [
          "PR เล็ก รีวิวง่ายกว่า PR ใหญ่ — แยกเป็นเรื่อง ๆ",
          "เขียนคำอธิบาย PR ว่าแก้อะไร ทำไม ทดสอบยังไง",
          "ตอบ/แก้ตามคอมเมนต์รีวิวอย่างสุภาพ — รีวิวเรื่องโค้ด ไม่ใช่เรื่องคน",
          "CI (เทสต์อัตโนมัติ) ควรผ่านก่อน merge (เจอในบท Capstone)",
        ],
      },

      { t: "h2", c: "commit message ที่ดี" },
      { t: "p", c: "commit message อธิบายว่า \"ทำไม\" ไม่ใช่แค่ \"อะไร\" หลายทีมใช้รูปแบบ conventional commits" },
      { t: "code", lang: "text", c: "# ❌ ไม่ดี\nfix\nupdate\nงานวันนี้\n\n# ✅ ดี (conventional commits: ประเภท: สรุป)\nfeat: add user search by email\nfix: handle empty cart in checkout\ndocs: update README install steps\nrefactor: extract validation into helper" },
      { t: "callout", title: "commit เล็ก ๆ ดีกว่าก้อนใหญ่", c: "commit ที่ทำทีละเรื่องและสื่อความหมาย ช่วยให้ย้อนดู/ย้อนกลับง่าย และรีวิวง่าย — อย่ายัดงาน 10 เรื่องใน commit เดียวชื่อ \"update\"" },

      { t: "h2", c: ".gitignore & revert vs reset" },
      { t: "code", lang: "text", c: "# .gitignore — ไฟล์/โฟลเดอร์ที่ไม่เอาเข้า git\n.venv/\n__pycache__/\n.env\n*.log\nnode_modules/" },
      { t: "code", lang: "bash", c: "git revert <commit>   # สร้าง commit ใหม่ที่ย้อนผลของ commit เดิม (ปลอดภัย ใช้กับของที่ push แล้ว)\ngit reset --hard <commit>  # ย้อนกลับไปจุดนั้น (อันตราย ลบประวัติหลังจุดนั้น)" },
      { t: "callout", title: "revert ปลอดภัยกว่า reset", warn: true, c: "ถ้าต้องยกเลิก commit ที่ push แล้ว ใช้ git revert (สร้าง commit ย้อนผล ไม่ลบประวัติ) ส่วน git reset --hard ลบประวัติทิ้ง — ใช้กับงานในเครื่องที่ยังไม่ push เท่านั้น" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "วงจร: อัปเดต main → แตก feature branch → push → เปิด PR → review → merge",
          "PR เป็นด่านรีวิวคุณภาพ — ทำเล็ก เขียนอธิบาย รีวิวเรื่องโค้ด",
          "commit message สื่อ \"ทำไม\" (conventional commits) + commit เล็กทีละเรื่อง",
          ".gitignore กันไฟล์ไม่พึงประสงค์; revert ปลอดภัยกว่า reset --hard",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ทำ feature branch workflow ครบวงจรกับ repo บน GitHub (branch → push → เปิด PR → merge)  2) เขียน commit message แบบ conventional 3 อัน  3) สร้าง .gitignore กัน .venv และ .env  4) อธิบายว่าเมื่อไรใช้ revert เมื่อไรใช้ reset" },
      {
        t: "links",
        c: [
          { title: "จบบทที่ 5 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 6: การเขียนเทสต์ กำลังจัดทำ" },
          { title: "← ก่อนหน้า: Merge Conflict & Rebase", slug: "git-conflict" },
          { title: "ทบทวน: Mental Model ของ Git (ต้นบท)", slug: "git-recap" },
        ],
      },
    ],
  },
};
