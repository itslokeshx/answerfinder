# PDF Answer Finder Extension

A Chrome/Edge browser extension that helps students quickly find answers from their converted PDF study materials. Works completely offline with no external dependencies.

## 🎯 Features

- ✅ **Instant Search**: Find answers in milliseconds
- ✅ **Completely Offline**: No internet required after setup
- ✅ **Privacy First**: No data tracking or external API calls
- ✅ **Simple to Use**: Right-click context menu integration
- ✅ **Free Forever**: No subscriptions or hidden costs
- ✅ **Smart Matching**: Keyword-based algorithm finds best matches

## 📋 Requirements

- Chrome or Edge browser (Manifest V3 compatible)
- A PDF file converted to plain text format
- Basic understanding of browser extensions

## 🚀 Installation Instructions

### Step 1: Enable Developer Mode

1. Open Chrome or Edge browser
2. Navigate to extensions page:
   - **Chrome**: Type `chrome://extensions` in the address bar
   - **Edge**: Type `edge://extensions` in the address bar
3. Look for the **Developer mode** toggle in the top-right corner
4. Turn it **ON** (it should turn blue/enabled)

### Step 2: Prepare Your PDF Content

1. Convert your PDF to text using one of these free online tools:
   - [PDF2TXT](https://www.pdf2txt.com/)
   - [Adobe Online PDF to Text](https://www.adobe.com/acrobat/online/pdf-to-text.html)
   - [Zamzar](https://www.zamzar.com/convert/pdf-to-txt/)
   - Or use any PDF reader's "Save as Text" feature

2. Copy all the converted text content

3. Open the `answers.txt` file in the extension folder

4. **Replace** the entire content with your PDF text

5. Save the file

### Step 3: Load the Extension

1. On the extensions page (from Step 1), click **"Load unpacked"** button
   - It's usually in the top-left area of the page

2. Navigate to the `pdf_answer_extension` folder

3. Select the folder and click **"Select Folder"** or **"Open"**

4. The extension should now appear in your extensions list

5. You should see the 📄 icon in your browser toolbar

### Step 4: Verify Installation

1. Check that the extension shows as **"Enabled"** (toggle should be ON)

2. Look for any error messages:
   - If you see errors, click the **"Reload"** icon (circular arrow)
   - Make sure all files are in the correct location

3. Click the 📄 extension icon to open the popup
   - You should see the welcome message with instructions

## 📖 How to Use

### Basic Workflow

1. **Visit any webpage** with questions (e.g., online quiz, study guide)

2. **Select the question text** with your mouse
   - Highlight the entire question or key parts of it

3. **Right-click** on the selected text

4. Choose **"Find answer from PDF"** from the context menu

5. **Click the extension icon** (📄) in your toolbar

6. **View the answer** in the popup window

### Example Usage

**Scenario**: You're taking an online quiz about Artificial Intelligence

1. You see the question: "What is machine learning?"
2. Select the text "What is machine learning?"
3. Right-click → "Find answer from PDF"
4. Click the 📄 icon
5. See the answer: "Machine learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed."

## 🎨 Extension Interface

The popup displays:
- **Header**: Extension name and icon
- **Answer Area**: Shows the matching answer with glassmorphism design
- **Timestamp**: When the last search was performed
- **Instructions**: How to use (shown when no search has been performed)

## ⚙️ How It Works

### Technical Flow

1. **File Loading**: When installed, `background.js` loads `answers.txt` into memory
2. **Context Menu**: Creates a right-click menu item for selected text
3. **Matching Algorithm**: 
   - Converts question to lowercase
   - Splits into individual words (ignoring words < 3 characters)
   - Scores each line in answers.txt based on keyword matches
   - Returns the line with the highest score
4. **Storage**: Saves the result to `chrome.storage.local`
5. **Display**: Popup retrieves and displays the stored answer

### Matching Algorithm Details

```javascript
// Example: Question = "What is artificial intelligence?"
// Keywords extracted: ["what", "artificial", "intelligence"]
// Each line in answers.txt is scored by counting matching keywords
// Line with highest score is returned as the answer
```

## 📁 File Structure

```
pdf_answer_extension/
├── manifest.json       # Extension configuration (Manifest V3)
├── background.js       # Service worker (file loading, matching, storage)
├── popup.html          # Popup interface with styling
├── popup.js            # Popup logic (display answers)
└── answers.txt         # Your converted PDF content (user provides)
```

## 🔧 Troubleshooting

### Extension Not Appearing

**Problem**: Extension doesn't show up after loading

**Solutions**:
- Make sure Developer mode is enabled
- Check that you selected the correct folder (should contain manifest.json)
- Look for error messages on the extensions page
- Try reloading the extension (click the reload icon)

### No Answers Showing

**Problem**: Clicking the extension icon shows no answer

**Solutions**:
- Make sure you right-clicked and selected "Find answer from PDF" first
- Check that answers.txt is not empty
- Verify that answers.txt contains relevant content
- Try selecting more specific text from the question
- Reload the extension after updating answers.txt

### Incorrect Matches

**Problem**: The answer doesn't match the question

**Solutions**:
- Select more specific keywords from the question
- Ensure your answers.txt has the correct content
- Try including both question and answer in answers.txt
- Format answers.txt with one answer per line for better matching
- Remove irrelevant content (headers, footers, page numbers) from answers.txt

### "No match found" Message

**Problem**: Extension says "No matching answer found"

**Solutions**:
- Your answers.txt may not contain relevant information
- Try selecting different parts of the question
- Check if the question uses different terminology than your PDF
- Add more content to answers.txt
- Ensure the PDF conversion was successful

### Extension Errors

**Problem**: Red error badge on extension icon

**Solutions**:
- Click "Details" on the extension to see error messages
- Common issues:
  - Missing files: Make sure all 5 files are present
  - Syntax errors: Check that you didn't accidentally modify the code
  - Permission issues: Make sure manifest.json has correct permissions
- Try removing and re-loading the extension

### Updating answers.txt

**Problem**: Changes to answers.txt not reflected

**Solution**:
- After editing answers.txt, you MUST reload the extension
- Go to chrome://extensions
- Click the reload icon (circular arrow) on the PDF Answer Finder extension
- The new content will now be loaded

## 💡 Tips for Best Results

### Optimizing answers.txt

1. **Keep original formatting**: Preserve the structure from your PDF
2. **One answer per line**: Works best for simple matching
3. **Include questions**: Add both Q&A for better context
4. **Remove noise**: Delete headers, footers, page numbers
5. **Use clear language**: Match terminology between questions and answers

### Selecting Text

1. **Be specific**: Select key terms rather than entire paragraphs
2. **Include keywords**: Make sure important words are selected
3. **Avoid filler words**: Don't select "the", "a", "an" only
4. **Try variations**: If first attempt fails, try different selection

### File Size Considerations

- The extension can handle large files (tested up to 1MB+)
- Larger files may take slightly longer to load initially
- Once loaded, search speed is instant regardless of file size

## 🔒 Privacy & Security

- ✅ **100% Offline**: No internet connection required
- ✅ **No Data Collection**: Nothing is sent to external servers
- ✅ **Local Storage Only**: All data stays on your computer
- ✅ **No Tracking**: No analytics or user monitoring
- ✅ **Open Source**: All code is visible and auditable

## 📝 answers.txt Format Examples

### Format 1: Simple Q&A (One Line)
```
What is AI? Artificial intelligence is the simulation of human intelligence by machines.
What is ML? Machine learning is a subset of AI that learns from data.
```

### Format 2: Detailed Q&A (Multi-line)
```
Question: What is artificial intelligence?
Answer: Artificial intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction.

Question: What is machine learning?
Answer: Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.
```

### Format 3: Paragraph Style
```
Artificial intelligence encompasses various technologies including natural language processing, computer vision, robotics, and expert systems.

Machine learning algorithms can be categorized into supervised, unsupervised, and reinforcement learning.

Deep learning uses neural networks with multiple hidden layers to extract features from raw data.
```

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all files are present and unmodified
3. Check browser console for errors (F12 → Console tab)
4. Try with a fresh copy of the extension
5. Ensure your browser supports Manifest V3

## 📜 License

This extension is provided for educational purposes. Feel free to modify and distribute.

## 🎓 Educational Use Disclaimer

This extension is designed to help students reference their own study materials more efficiently. Please use it responsibly and in accordance with your institution's academic integrity policies.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Compatibility**: Chrome 88+, Edge 88+ (Manifest V3)
