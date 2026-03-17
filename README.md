# FactCheck App

> A context-aware, AI-powered fake post detector for Instagram. Share any reel or post directly to the app — it researches the claims in real time, scores source credibility, and gives you a verdict backed by evidence.

---

## How it works

When you share an Instagram post or reel to FactCheck, it runs a 5-stage pipeline:

1. **Content extraction** — Downloads the post, transcribes audio (Whisper), and reads on-screen text (OCR)
2. **Claim detection** — Claude identifies specific, checkable factual claims from the content
3. **Live web research** — Runs targeted searches (Brave Search API) and fetches full source content
4. **Source credibility scoring** — Rates each domain using the MBFC database + trust heuristics
5. **LLM synthesis** — Claude reasons through all evidence and produces a structured verdict

### Verdict types

| Verdict | Meaning |
|---|---|
| ✓ **True** | Claim supported by credible evidence |
| ~ **Misleading** | Technically partial truth or deceptively framed |
| ✗ **False** | Claim contradicted by credible evidence |
| ? **Unverifiable** | Insufficient evidence to make a determination |

---

## Tech stack

| Layer | Technology |
|---|---|
| Mobile app | React Native (Expo) |
| iOS share extension | Swift (NSExtension) |
| Android share | Kotlin intent-filter + `react-native-share-menu` |
| Backend | Node.js (Express) |
| Audio transcription | OpenAI Whisper |
| OCR | Tesseract.js |
| Web search | Brave Search API |
| AI reasoning | Anthropic Claude (`claude-sonnet-4-20250514`) |
| Source credibility | MBFC dataset + custom scoring |
| Caching (optional) | Redis |
| Database (optional) | PostgreSQL |

---

## Project structure

```
factcheck/
├── backend/
│   ├── index.js          # Express server + SSE streaming
│   ├── pipeline.js       # Main orchestrator
│   ├── extractor.js      # yt-dlp, Whisper, OCR, web scraping
│   ├── claims.js         # Claude claim extraction
│   ├── researcher.js     # Brave Search + page fetching
│   ├── credibility.js    # Domain trust scoring
│   ├── verdict.js        # Claude synthesis + verdict generation
│   └── data/
│       └── mbfc_ratings.json
├── mobile/
│   ├── App.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── CheckingScreen.tsx
│   │   └── ResultScreen.tsx
│   └── ios/
│       └── ShareExtension/
│           └── ShareViewController.swift
└── README.md
```

---

## Prerequisites

### System dependencies (on your server)

```bash
# FFmpeg — audio/video processing
sudo apt-get install ffmpeg

# Tesseract — OCR
sudo apt-get install tesseract-ocr

# yt-dlp — downloading Instagram posts
pip install yt-dlp
```

### API keys needed

| Service | Where to get it | Required? |
|---|---|---|
| Anthropic Claude | [console.anthropic.com](https://console.anthropic.com) | ✅ Yes |
| Brave Search API | [search.brave.com/api](https://search.brave.com/api) | ✅ Yes |
| OpenAI (Whisper) | [platform.openai.com](https://platform.openai.com) | Only for video |

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/yourname/factcheck-app.git
cd factcheck-app/backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
ANTHROPIC_API_KEY=sk-ant-...
BRAVE_API_KEY=BSA...
OPENAI_API_KEY=sk-...        # optional, for Whisper
REDIS_URL=redis://localhost:6379   # optional
DATABASE_URL=postgresql://...      # optional
```

### 3. Run the backend

```bash
node index.js
# Server starts at http://localhost:3001
```

### 4. Set up the mobile app

```bash
cd ../mobile
npx expo install
npx expo start
```

Set `API_BASE_URL` in your app config to point to your backend URL.

---

## Share extension setup

The share extension is native code — it's what allows Instagram's "Share" button to open your app.

### iOS

In Xcode:
1. Open `mobile/ios/` in Xcode
2. Go to **File → New Target → Share Extension**
3. Enable **App Groups** capability on both the main app and extension targets — use the same group ID (e.g. `group.com.yourapp.factcheck`)
4. The `ShareViewController.swift` file in `/ios/ShareExtension/` handles extracting the URL and passing it to the main app via `UserDefaults`

### Android

Android uses intent filters declared in `AndroidManifest.xml`. The `react-native-share-menu` package handles the rest on the JS side. No extra native code needed.

---

## API reference

### `POST /api/check`

Accepts shared content and streams progress + result via Server-Sent Events.

**Request body:**
```json
{ "url": "https://instagram.com/reel/...", "text": null }
```

**Streamed events:**
```
data: { "type": "progress", "step": "extract", "message": "Extracting post content..." }
data: { "type": "progress", "step": "claims", "message": "Identifying checkable claims..." }
data: { "type": "progress", "step": "research", "message": "Researching 2 claim(s)..." }
data: { "type": "progress", "step": "verdict", "message": "Analyzing evidence..." }
data: { "type": "result", "verdict": "MISLEADING", "confidence": 72, ... }
```

**Result object:**
```json
{
  "verdict": "MISLEADING",
  "confidence": 72,
  "headline": "Short summary of the verdict",
  "explanation": "Plain-language explanation for general audience",
  "reasoning": "Step-by-step chain-of-thought from Claude",
  "key_evidence": [
    { "type": "supports|contradicts|context", "text": "...", "source": "domain.com" }
  ],
  "context_notes": "Important context the viewer should know",
  "original_claim": "What the post actually claimed",
  "sources_checked": [
    { "domain": "reuters.com", "credibility": 9, "label": "High credibility" }
  ]
}
```

---

## Estimated cost per check

| Service | Cost |
|---|---|
| Claude API (Sonnet) | ~$0.01–0.03 |
| Brave Search API | ~$0.001–0.005 |
| Whisper (video only) | ~$0.003 |
| **Total** | **~$0.015–0.04** |

At 100 checks/day that's roughly $1.50–$4/day.

---

## Deployment

The backend is a standard Node.js app with system dependencies. Deploy to any Linux server or Docker-compatible host.

**Recommended: Railway**

```bash
# From the backend directory
railway init
railway up
railway variables set ANTHROPIC_API_KEY=... BRAVE_API_KEY=...
```

Railway detects the Dockerfile automatically and provides a public URL.

**Dockerfile snippet** (needed for ffmpeg + yt-dlp):

```dockerfile
FROM node:20-slim
RUN apt-get update && apt-get install -y ffmpeg tesseract-ocr python3 python3-pip
RUN pip3 install yt-dlp
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
```

---

## Known limitations

- **Private posts** — The app only works on public Instagram posts. Private accounts are not accessible.
- **Breaking news** — Events less than 24–48 hours old may have no reliable sources yet. The system returns `UNVERIFIABLE` rather than a false negative.
- **Satire accounts** — Parody accounts like The Onion can be misread as real. The LLM prompt includes satire detection, but edge cases exist.
- **Instagram ToS** — Using yt-dlp to download content may conflict with Instagram's terms of service. Design for personal/research use accordingly.

---

## Roadmap

- [ ] Reverse image search (detect old photos used in new context)
- [ ] Caching layer (Redis) to avoid re-checking the same viral post
- [ ] Support for Twitter/X, YouTube Shorts, WhatsApp forwards
- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] Community notes integration (X/Twitter flagging data)
- [ ] User feedback loop to improve verdict accuracy

---

## License

MIT
