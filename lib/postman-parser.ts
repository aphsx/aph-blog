export type RawPostmanCase = {
  id: string;
  title: string;
  tabLabel: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  queryParams: Array<{ key: string; value: string }>;
  reqHeaders: Array<{ key: string; value: string }>;
  reqBodyRaw: string;
  hasBody: boolean;
  statusCode: number;
  statusText: string;
  resHeaders: Array<{ key: string; value: string }>;
  resBodyRaw: string;
  resRaw: string;
  reqRaw: string;
  time: string;
  size: string;
};

export type PostmanCase = RawPostmanCase & {
  reqBodyHtml?: string;
  reqRawHtml?: string;
  resBodyHtml?: string;
  resRawHtml?: string;
};

export function parsePostmanBlock(code: string, out: string, blockLabel?: string): RawPostmanCase[] {
  // Check if there are multiple requests in code
  const methodRegex = /(?:^|\n)(?:[#\/]{1,2}\s*([^\n\r]+)\n)?\s*(GET|POST|PUT|DELETE|PATCH)\s+([^\r\n]+)/g;
  const reqMatches = Array.from(code.matchAll(methodRegex));

  const codeChunks: { title?: string; method: string; url: string; raw: string }[] = [];

  if (reqMatches.length <= 1) {
    const singleMatch = code.match(/^\s*(GET|POST|PUT|DELETE|PATCH)\s+([^\r\n]+)/m);
    codeChunks.push({
      title: blockLabel,
      method: singleMatch ? singleMatch[1] : "POST",
      url: singleMatch ? singleMatch[2].trim() : "http://localhost:8080",
      raw: code.trim(),
    });
  } else {
    for (let i = 0; i < reqMatches.length; i++) {
      const match = reqMatches[i];
      const startIndex = match.index;
      const nextIndex = i + 1 < reqMatches.length ? reqMatches[i + 1].index : code.length;
      const chunk = code.substring(startIndex, nextIndex).trim();
      codeChunks.push({
        title: match[1]?.trim() || `${match[2]} ${match[3]}`,
        method: match[2],
        url: match[3].trim(),
        raw: chunk,
      });
    }
  }

  // Parse response chunks from out
  const statusRegex = /(?:^|\n)(?:[#\/]{1,2}\s*([^\n\r]+)\n)?\s*HTTP\/1\.[01]\s+(\d{3})/gi;
  const outMatches = Array.from(out.matchAll(statusRegex));

  const outChunks: string[] = [];
  if (outMatches.length <= 1) {
    outChunks.push(out.trim());
  } else {
    for (let i = 0; i < outMatches.length; i++) {
      const startIndex = outMatches[i].index;
      const nextIndex = i + 1 < outMatches.length ? outMatches[i + 1].index : out.length;
      outChunks.push(out.substring(startIndex, nextIndex).trim());
    }
  }

  return codeChunks.map((chunk, index) => {
    const rawOut = outChunks[index] || outChunks[0] || "";
    const method = (chunk.method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH") || "GET";
    const fullUrl = chunk.url;

    // Parse query params
    const queryParams: Array<{ key: string; value: string }> = [];
    if (fullUrl.includes("?")) {
      const queryStr = fullUrl.split("?")[1] || "";
      const pairs = queryStr.split("&");
      for (const pair of pairs) {
        const [k, v] = pair.split("=");
        if (k) {
          queryParams.push({ key: decodeURIComponent(k), value: decodeURIComponent(v || "") });
        }
      }
    }

    // Parse request headers & body
    const reqLines = chunk.raw.split(/\r?\n/);
    const reqHeaders: Array<{ key: string; value: string }> = [];
    let inReqHeaders = false;
    let reqBodyStartIndex = -1;

    for (let i = 0; i < reqLines.length; i++) {
      const line = reqLines[i].trim();
      if (/^(GET|POST|PUT|DELETE|PATCH)\s+/i.test(line)) {
        inReqHeaders = true;
        continue;
      }
      if (inReqHeaders) {
        if (line === "") {
          reqBodyStartIndex = i + 1;
          break;
        }
        const headerMatch = line.match(/^([^:]+):\s*(.+)$/);
        if (headerMatch) {
          reqHeaders.push({ key: headerMatch[1].trim(), value: headerMatch[2].trim() });
        } else if (!line.startsWith("#")) {
          reqBodyStartIndex = i;
          break;
        }
      }
    }

    let reqBodyRaw = "";
    if (reqBodyStartIndex >= 0 && reqBodyStartIndex < reqLines.length) {
      reqBodyRaw = reqLines.slice(reqBodyStartIndex).join("\n").trim();
    }

    // Default Content-Type header if body exists and no header provided
    if (reqBodyRaw && !reqHeaders.some((h) => h.key.toLowerCase() === "content-type")) {
      reqHeaders.push({ key: "Content-Type", value: "application/json" });
    }

    const hasBody = reqBodyRaw.length > 0 && (reqBodyRaw.startsWith("{") || reqBodyRaw.startsWith("[") || reqBodyRaw.startsWith("\""));

    // Parse response status
    const statusMatch = rawOut.match(/HTTP\/1\.[01]\s+(\d{3})(?:\s+([^\r\n]+))?/i);
    const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : 200;
    const statusText = statusMatch && statusMatch[2] ? `${statusCode} ${statusMatch[2].trim()}` : statusCode === 201 ? "201 Created" : statusCode === 200 ? "200 OK" : statusCode === 400 ? "400 Bad Request" : statusCode === 404 ? "404 Not Found" : `${statusCode} OK`;

    // Parse response headers & body
    const outLines = rawOut.split(/\r?\n/);
    const resHeaders: Array<{ key: string; value: string }> = [];
    let inResHeaders = false;
    let resBodyStartIndex = -1;

    for (let i = 0; i < outLines.length; i++) {
      const line = outLines[i].trim();
      if (/^HTTP\/1\.[01]\s+\d{3}/i.test(line)) {
        inResHeaders = true;
        continue;
      }
      if (inResHeaders) {
        if (line === "") {
          resBodyStartIndex = i + 1;
          break;
        }
        const headerMatch = line.match(/^([^:]+):\s*(.+)$/);
        if (headerMatch) {
          resHeaders.push({ key: headerMatch[1].trim(), value: headerMatch[2].trim() });
        }
      }
    }

    let resBodyRaw = "";
    if (resBodyStartIndex >= 0 && resBodyStartIndex < outLines.length) {
      resBodyRaw = outLines.slice(resBodyStartIndex).join("\n").trim();
    } else {
      // Find JSON block in rawOut
      const jsonStart = rawOut.search(/[\[{]/);
      if (jsonStart >= 0) {
        resBodyRaw = rawOut.substring(jsonStart).trim();
      } else {
        resBodyRaw = rawOut;
      }
    }

    // Calculate response size and realistic time
    const byteLength = new TextEncoder().encode(resBodyRaw).length;
    const size = byteLength > 1024 ? `${(byteLength / 1024).toFixed(1)} KB` : `${byteLength} B`;
    const time = statusCode === 201 ? "16 ms" : statusCode === 400 ? "4 ms" : statusCode === 404 ? "6 ms" : "12 ms";

    // Tab label
    let tabLabel = `${method} ${fullUrl.replace(/^https?:\/\/[^\/]+/, "")}`;
    if (tabLabel.length > 28) {
      tabLabel = tabLabel.substring(0, 26) + "…";
    }

    return {
      id: `case-${index}`,
      title: chunk.title || tabLabel,
      tabLabel,
      method,
      url: fullUrl,
      queryParams,
      reqHeaders,
      reqBodyRaw,
      hasBody,
      statusCode,
      statusText,
      resHeaders,
      resBodyRaw,
      resRaw: rawOut,
      reqRaw: chunk.raw,
      time,
      size,
    };
  });
}
