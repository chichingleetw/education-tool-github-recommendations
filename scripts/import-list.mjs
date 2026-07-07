import fs from "node:fs/promises";
import path from "node:path";
import { Buffer } from "node:buffer";
import { normalizeEntry, stringifyCatalogYaml } from "./catalog-schema.mjs";

const listPath = path.resolve("list.txt");
const catalogDir = path.resolve("catalog");
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "education-tool-github-recommendations"
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function parseRepo(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const shorthand = trimmed.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/);
  if (shorthand) return `${shorthand[1]}/${shorthand[2]}`;

  try {
    const url = new URL(trimmed);
    if (url.hostname !== "github.com") return { unsupported: trimmed };
    const [owner, repo] = url.pathname.replace(/^\/|\/$/g, "").split("/");
    if (!owner || !repo) return { unsupported: trimmed };
    return `${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    return { unsupported: trimmed };
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: githubHeaders() });
  if (!response.ok) throw new Error(`GitHub API ${response.status} for ${url}`);
  return response.json();
}

async function fetchReadme(repo) {
  try {
    const data = await fetchJson(`https://api.github.com/repos/${repo}/readme`);
    return Buffer.from(data.content || "", "base64").toString("utf8");
  } catch (error) {
    console.warn(`README not available for ${repo}: ${error.message}`);
    return "";
  }
}

function markdownTitle(readme, fallback) {
  const title = readme.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return title || fallback;
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[`*_>#|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraph(readme) {
  const paragraph = readme
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith("#") && !part.startsWith("!"));
  return plainText(paragraph || "").slice(0, 300);
}

function inferEducationLevels(text) {
  const levels = [];
  const candidates = [
    ["國小", /國小|小學|elementary/i],
    ["國中", /國中|初中|middle school|junior high/i],
    ["高中", /高中|高職|high school|secondary/i],
    ["大學", /大學|college|university|高教/i],
    ["成人教育/教師研習", /教師|研習|成人|professional development|workshop/i]
  ];

  for (const [label, pattern] of candidates) {
    if (pattern.test(text)) levels.push(label);
  }

  if (/課堂|classroom|教學|lecture|聽眾|audience/i.test(text)) {
    for (const level of ["高中", "大學", "成人教育/教師研習"]) {
      if (!levels.includes(level)) levels.push(level);
    }
  }

  return levels.length > 0 ? levels : ["國中", "高中", "大學"];
}

function genericRecommendation(repo, repoData, readme) {
  const text = `${repoData.name || ""} ${repoData.description || ""} ${readme}`;
  const title = markdownTitle(readme, repoData.name || repo.split("/")[1]);
  const summary = firstParagraph(readme) || repoData.description || `${title} 是一個可從 GitHub 取得的教育工具專案。`;
  const levels = inferEducationLevels(text);

  return {
    name: title,
    description: summary.slice(0, 220),
    educatorSummary: `${summary} 教育工作者可先從 README 的使用流程與限制開始評估，確認課堂情境、學生資料與校內資訊安全規範都適合後再導入。`,
    educationLevels: levels,
    useCases: [
      "課前評估工具功能是否符合課程需求",
      "作為課堂活動、教學管理或學習輔助的候選工具",
      "搭配 GitHub README 與原始碼了解部署方式"
    ],
    cautions: [
      "正式使用前請先小規模測試",
      "若涉及學生資料或影像，需確認同意、隱私與校內規範",
      "GitHub stars 僅作為社群參考，不代表教學品質保證"
    ]
  };
}

function audienceAnalysisRecommendation() {
  return {
    name: "課堂聽眾專注度分析",
    description:
      "透過瀏覽器鏡頭與視覺模型觀察課堂整體專注趨勢，協助教師掌握聽眾狀態。",
    educatorSummary:
      "這是一個單檔網頁工具，可在課堂中定時擷取畫面並呼叫支援 Responses API 的視覺模型，估算總人數、疑似不專心人數、手機使用比例與趨勢。它適合做為教師調整課堂節奏、觀察群體參與狀態與課後反思的輔助資料，不應用於個人評分、紀律處分或身分辨識。",
    educationLevels: ["高中", "大學", "成人教育/教師研習"],
    useCases: [
      "大型課堂或講座中快速掌握整體注意力變化",
      "教師研習時示範 AI 視覺模型在教學觀察上的可能性",
      "課後回顧不同教學段落的群體參與趨勢"
    ],
    cautions: [
      "使用攝影機前需透明告知並取得必要同意",
      "分析結果僅供群體觀察參考，不應用於個人評分或懲處",
      "影像會送到使用者設定的 API endpoint，需確認資料保護與校內規範"
    ]
  };
}

function buildEntry(repo, repoData, readme) {
  const recommendation =
    repo === "chichingleetw/audience-analysis"
      ? audienceAnalysisRecommendation()
      : genericRecommendation(repo, repoData, readme);

  const entry = {
    ...recommendation,
    authorName: repoData.owner?.login || repo.split("/")[0],
    authorGitHub: repo.split("/")[0],
    repo,
    homepage: repoData.homepage || "",
    tags: [
      "education",
      "teaching",
      "github",
      ...(repoData.topics || []).slice(0, 5)
    ],
    language: repoData.language || "Unknown",
    install:
      repo === "chichingleetw/audience-analysis"
        ? "下載或 clone 專案後，建議用 python3 -m http.server 8000 啟動本機 HTTP server，再開啟 聽眾分析.html。使用前需準備可用攝影機與支援影像輸入的 API key。"
        : "請依 GitHub README 的安裝與啟動說明操作，並先在測試環境確認權限、資料與瀏覽器相容性。",
    license: repoData.license?.spdx_id || repoData.license?.name || "Unspecified",
    submittedAt: new Date().toISOString().slice(0, 10)
  };

  return normalizeEntry(entry, `list.txt:${repo}`);
}

async function main() {
  const raw = await fs.readFile(listPath, "utf8");
  const repos = [];
  const unsupported = [];

  for (const line of raw.split(/\r?\n/)) {
    const parsed = parseRepo(line);
    if (!parsed) continue;
    if (typeof parsed === "object" && parsed.unsupported) {
      unsupported.push(parsed.unsupported);
      continue;
    }
    if (!repos.includes(parsed)) repos.push(parsed);
  }

  await fs.mkdir(catalogDir, { recursive: true });

  for (const repo of repos) {
    const repoData = await fetchJson(`https://api.github.com/repos/${repo}`);
    const readme = await fetchReadme(repo);
    const entry = buildEntry(repo, repoData, readme);
    const filePath = path.join(catalogDir, `${slugify(repo.split("/")[1])}.yaml`);
    await fs.writeFile(filePath, stringifyCatalogYaml(entry));
    console.log(`Imported ${repo} -> ${path.relative(process.cwd(), filePath)}`);
  }

  for (const item of unsupported) {
    console.warn(`Unsupported list item skipped: ${item}`);
  }

  if (repos.length === 0) {
    console.warn("No GitHub repositories found in list.txt.");
  }
}

await main();
