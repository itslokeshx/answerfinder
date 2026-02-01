<div align="center">

<img src="assets/icons/icon128.png" alt="AnswerFinder Logo" width="128" height="128" />

# AnswerFinder

**Lightning-Fast Q&A Chrome Extension with AI Support**

[![Version](https://img.shields.io/badge/version-1.2-blue.svg)](manifest.json)
[![Platform](https://img.shields.io/badge/platform-Chrome-orange.svg)](https://developer.chrome.com/docs/extensions/mv3/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Upload your Q&A database → Search any text on any webpage → Get instant answers  
No match? Optional AI (Gemma 2) generates answers for you.

**Perfect for:** Students • Researchers • Developers • Knowledge Workers

[Quick Start](#-quick-start) • [Features](#-key-features) • [How It Works](#-how-it-works) • [FAQ](#-faq)

</div>

---

## 🚀 Quick Start

### 1. Install Extension

```bash
git clone https://github.com/yourusername/answerfinder.git
```

1. Open `chrome://extensions/`
2. Enable **Developer mode** (top-right)
3. Click **Load unpacked** → Select `answerfinder` folder

### 2. Create Q&A File

**JSON Format** (recommended):

```json
[
  { "question": "What is the capital of France?", "answer": "Paris" },
  { "question": "Who wrote Romeo and Juliet?", "answer": "William Shakespeare" }
]
```

**TXT Format** (simple):

```text
What is the capital of France?
Paris

Who wrote Romeo and Juliet?
William Shakespeare
```

> **Note:** Blank line required between each Q&A pair in TXT format

### 3. Upload & Use

1. Click extension icon → Upload your file
2. Select text on any webpage
3. Right-click → **"Search Answer"**
4. Get instant results!

**Optional:** Enable AI in settings for questions not in your database.

---

## ✨ Key Features

### 🎯 Smart Matching System
- **4-tier matching:** Exact → Keyword → Fuzzy → Partial
- **Typo handling:** Finds "Wha is Paris?" for "What is Paris?"
- **Partial matching:** "capital France" finds "What is the capital of France?"
- **Lightning fast:** <10ms for most searches

### 🤖 AI-Powered Answers
- **Gemma 2 AI** generates answers for questions not in your database
- **Smart reasoning:** AI explains why answers are correct
- **Cost-effective:** ~$0.0001 per query (nearly free)
- **Privacy-focused:** Questions sent via secure proxy
- **Cached results:** Won't ask AI twice for the same question

### 💾 Data Management
- **Local storage:** All data stays in your browser
- **No tracking:** Zero analytics or telemetry
- **Export/Import:** Full data portability
- **Handles 10,000+ questions** with no performance issues

### 🎨 User Experience
- **Clean sidebar overlay:** Non-intrusive answer display
- **Auto-hide:** Answers fade after viewing
- **Copy button:** One-click answer copying
- **Confidence scores:** Know how reliable each match is
- **Context menu:** Right-click to search

---

## 🔧 How It Works

### The Matching Process

AnswerFinder uses **4 smart matching tiers** automatically:

| Tier | Method            | What It Does             | Speed | Confidence |
| ---- | ----------------- | ------------------------ | ----- | ---------- |
| 1    | **Exact Match**   | Perfect character match  | <1ms  | 100%       |
| 2    | **Keyword Match** | Matches important words  | <5ms  | 85-95%     |
| 3    | **Fuzzy Match**   | Handles typos/variations | <10ms | 70-85%     |
| 4    | **Partial Match** | Incomplete questions     | <15ms | 60-75%     |
| 5    | **AI Answer**     | Generates new answer     | 2-4s  | Variable   |

### Search Flow

```
Select text → Search database (Tiers 1-4)
                    ↓
          Match found in database?
                    ↓
            YES → Show answer
                    ↓
             NO → AI enabled?
                    ↓
    YES → AI generates answer
                    ↓
    NO → Suggest enabling AI
```

**You don't configure anything** - AnswerFinder automatically tries all matching methods in order, from fastest to most comprehensive.

---

## 🤖 AI Integration

### Setup (2 Steps)

1. Click extension icon → Open popup
2. Check ✅ **"Enable AI Answering"**

That's it! Uses default Cloudflare Worker - no API key needed.

### How AI Works

- **Model:** Google Gemma 2 (fast, accurate, cost-effective)
- **Privacy:** Questions sent through secure proxy (anonymous)
- **Cost:** ~$0.0001 per query (nearly free)
- **Limit:** 100 queries/day
- **Caching:** Answers saved locally, won't ask AI twice

### When to Use AI

**Enable AI if:**
- ✅ You want complete coverage for any question
- ✅ Your database is small/incomplete
- ✅ You need answers for unexpected questions

**Keep AI disabled if:**
- ❌ You only want answers from your database
- ❌ You want 100% control over answers
- ❌ You're concerned about costs (though minimal)

---

## 📂 Data Formats

### JSON Format (Recommended)

**Best for:** 100+ questions, special characters, easy editing

```json
[
  {
    "question": "What is the Pythagorean theorem?",
    "answer": "a² + b² = c² - In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides."
  },
  {
    "question": "Who discovered penicillin?",
    "answer": "Alexander Fleming discovered penicillin in 1928."
  }
]
```

**Benefits:**
- ✅ Handles thousands of entries
- ✅ Supports Unicode, emojis, special characters
- ✅ Can validate syntax (use [JSONLint](https://jsonlint.com))
- ✅ Version control friendly

### TXT Format (Simple)

**Best for:** Quick notes, <100 questions, simple text

```text
What is the Pythagorean theorem?
a² + b² = c² - In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.

Who discovered penicillin?
Alexander Fleming discovered penicillin in 1928.
```

**Rules:**
- ❗ Question on line 1, answer on line 2
- ❗ **BLANK LINE** between each Q&A pair
- ❗ No special formatting needed

### Sample Files

Check `sample_questions.json` and `sample_questions.txt` for examples.

---

## ⚙️ Settings & Configuration

### Extension Settings

Open popup (click extension icon) to access:

**Enable AI Answering**
- ✅ Checked: AI generates answers for questions not in database
- ❌ Unchecked: Only searches your uploaded Q&A database

**Export Data**
- Downloads your Q&A database as JSON file
- Format: `answerfinder-export-[timestamp].json`
- Use for backups, sharing, version control

**Clear All Data**
- Removes ALL uploaded questions and cache
- ⚠️ **Cannot be undone!** Export first if needed

**Statistics**
- Questions Loaded: Total Q&A pairs in database
- Cache Entries: Cached search results
- Last Import: When you last uploaded a file

### Custom AI Backend (Advanced)

Want to host your own AI backend? See [USAGE.md](USAGE.md) for detailed instructions on:
- Deploying your own Cloudflare Worker
- Running a local development server
- Using custom AI models
- Setting up OpenRouter API

---

## 🎯 Use Cases

### For Students
Upload flashcards/notes → Study online → Select questions → Get instant answers from your notes

### For Researchers
Create Q&A from paper abstracts → Look up terms while reading → AI fills gaps for new concepts

### For Developers
Convert API docs to Q&A → Select function names while coding → Get quick reference without leaving browser

### For Teams
Create company FAQ in JSON → Share with team → Everyone has instant access → AI handles uncommon questions

---

## ❓ FAQ

**Q: What browsers are supported?**  
A: Chrome, Edge, Brave, Opera, and other Chromium-based browsers.

**Q: How many questions can I upload?**  
A: Tested with 10,000+ questions with no performance issues.

**Q: Can I upload multiple files?**  
A: Currently one file at a time. Export and merge manually if needed.

**Q: Where is my data stored?**  
A: Locally in your browser only. Nothing sent to external servers (except AI queries if enabled).

**Q: Is it really free?**  
A: Yes! Extension is free. AI queries cost ~$0.0001 each (nearly free), only if you enable AI.

**Q: How accurate is the AI?**  
A: Gemma 2 is very accurate for factual questions. Always verify critical information.

**Q: Does it work offline?**  
A: Local matching works 100% offline. Only AI answering requires internet.

**Q: Can I use it on PDFs?**  
A: Yes! If you can select text in the PDF, AnswerFinder works.

**Q: Why no matches found?**  
A: Question might not be in your database, or phrasing is too different. Try enabling AI or rephrase the search.

**Q: How do I update the extension?**  
A: Pull latest code → Click "Reload" button in `chrome://extensions/`

---

## 🛠️ Troubleshooting

### Extension won't install
1. ✅ Enable Developer Mode in `chrome://extensions/`
2. ✅ Select the root `answerfinder` folder containing `manifest.json`
3. ✅ Try reloading Chrome

### File upload fails
1. ✅ **For JSON:** Validate at [jsonlint.com](https://jsonlint.com)
2. ✅ **For TXT:** Ensure blank lines between Q&A pairs
3. ✅ Check file size (keep under 10MB)
4. ✅ Verify UTF-8 encoding

### No matches found
1. ✅ Verify file uploaded successfully (check Statistics)
2. ✅ Try selecting more/less text
3. ✅ Enable AI as fallback
4. ✅ Export data to verify content

### AI not responding
1. ✅ Verify "Enable AI Answering" is checked
2. ✅ Check you haven't hit 100 queries today
3. ✅ Verify internet connection
4. ✅ Open browser console (F12) → Check for errors

### Slow performance
1. ✅ Clear cache: Settings → Clear All Data → Re-upload
2. ✅ Reduce database size
3. ✅ Restart browser

---

## 📊 Technical Architecture

### Component Overview

```
┌─────────────────────────────────────────────────────┐
│                  Browser Extension                   │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Popup UI  │  │  Background  │  │  Content   │ │
│  │  (Settings) │  │   Service    │  │  Script    │ │
│  └──────┬──────┘  └──────┬───────┘  └─────┬──────┘ │
│         │                │                 │         │
│         │         ┌──────▼──────────┐      │         │
│         └────────►│  State Manager  │◄─────┘         │
│                   └──────┬──────────┘                │
│                          │                           │
│         ┌────────────────┼────────────────┐          │
│         │                │                │          │
│    ┌────▼────┐    ┌──────▼──────┐  ┌─────▼─────┐   │
│    │  Index  │    │   Matching  │  │    AI     │   │
│    │   DB    │    │   Engine    │  │  Service  │   │
│    │ Manager │    │   (4-tier)  │  │           │   │
│    └─────────┘    └─────────────┘  └─────┬─────┘   │
│                                           │         │
└───────────────────────────────────────────┼─────────┘
                                            │
                                            ▼
                                  ┌───────────────────┐
                                  │ Cloudflare Worker │
                                  │    (AI Proxy)     │
                                  └─────────┬─────────┘
                                            │
                                            ▼
                                  ┌───────────────────┐
                                  │  OpenRouter API   │
                                  │   (Gemma 2 AI)    │
                                  └───────────────────┘
```

### File Structure

```
answerfinder/
├── manifest.json                    # Extension configuration
├── background/
│   ├── service-worker.js           # Main background script
│   ├── state-manager.js            # Centralized state
│   └── msg-handler.js              # Message routing
├── content/
│   └── content-script-bundled.js   # Injected into pages
├── popup/
│   ├── popup.html                  # Extension popup
│   ├── popup.css                   # Popup styles
│   └── popup.js                    # Popup logic
├── lib/
│   ├── ai/                         # AI integration
│   ├── matching/                   # 4-tier matching engine
│   ├── storage/                    # IndexedDB & caching
│   └── parsers/                    # JSON/TXT parsers
└── proxy/
    ├── server.js                   # Local dev server
    └── cloudflare-worker/          # Production proxy
```

---

## 🚀 Development

### Local Setup

```bash
# Clone repository
git clone https://github.com/yourusername/answerfinder.git
cd answerfinder

# Load extension (no build needed)
# 1. Open chrome://extensions/
# 2. Enable Developer Mode
# 3. Load unpacked → Select folder
```

### Making Changes

1. Edit files
2. Click "Reload" in `chrome://extensions/`
3. Test changes

### Testing

**Manual Testing:**
1. Upload test Q&A file
2. Visit any webpage
3. Select text → Right-click → Search Answer
4. Verify answer appears correctly

**Console Testing:**
- Open DevTools (F12)
- Check Background worker logs
- Check Content script logs

### Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request


## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

**In short:** You can use, modify, and distribute this extension freely. Attribution appreciated but not required.

---

## Credits

**Built with:**
- Chrome Extension Manifest V3
- IndexedDB for local storage
- OpenRouter API for AI access
- Cloudflare Workers for serverless backend
- Google Gemma 2 AI model

**Inspired by:** The need for instant access to study materials and knowledge bases.

---

<div align="center">

### Made with ❤️ for Students, Researchers & Knowledge Seekers

**Star ⭐ this repo if you find it useful!**

</div>
