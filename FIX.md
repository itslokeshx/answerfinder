# 🔧 Quick Fix Instructions

## The Error You Saw

**Error**: "Could not establish connection. Receiving end does not exist."

**Cause**: This happens when you reload the extension but the webpage was already open. The content script needs to be injected into the page.

## ✅ Solution (Automatic)

I've added automatic error handling! The extension will now:
1. Try to send the message to the content script
2. If it fails, automatically inject the content script
3. Try again and show the floating window

## 🔄 What To Do Now

**Option 1: Reload the Extension (Recommended)**
1. Go to `chrome://extensions`
2. Find "PDF Answer Finder"
3. Click the **reload icon** (↻)
4. **Refresh any open webpages** (press F5)
5. Try the extension again!

**Option 2: Just Refresh the Page**
- If you see the error, just refresh the webpage (F5)
- The extension will work on the refreshed page

## 🧪 Testing

1. Open `test.html` in your browser
2. Select a question like "What is machine learning?"
3. Right-click → "Find answer from PDF"
4. **Floating window appears!** 🎉

## 💡 Why This Happens

- Content scripts only inject when a page loads
- If you reload the extension, old tabs don't get the new script
- The fix automatically injects it when needed
- New tabs will work perfectly from the start

## ✨ Features Working Now

- ✅ Floating window stays open
- ✅ Shows question and answer
- ✅ Draggable anywhere on screen
- ✅ 500px wide for full content
- ✅ Minimize and close buttons
- ✅ Auto-injection if needed
