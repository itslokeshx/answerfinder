// PDF Answer Finder - Background Service Worker
// This script runs in the background and handles:
// 1. Loading the answers.txt file
// 2. Creating the context menu
// 3. Processing search requests
// 4. Storing results

let answersData = '';
let isLoaded = false;

// Load answers.txt file immediately when service worker starts
loadAnswersFile();

// Load answers.txt file when extension is installed or updated
chrome.runtime.onInstalled.addListener(async () => {
    console.log('PDF Answer Finder extension installed');

    // Create context menu item
    chrome.contextMenus.create({
        id: 'findAnswerFromPDF',
        title: 'Find answer from PDF',
        contexts: ['selection']
    });

    // Load answers.txt file
    await loadAnswersFile();
});

// Load the answers.txt file from the extension directory
async function loadAnswersFile() {
    try {
        const url = chrome.runtime.getURL('answers.txt');
        console.log('Attempting to load answers.txt from:', url);

        const response = await fetch(url);

        if (!response.ok) {
            console.error('Failed to load answers.txt file. Status:', response.status);
            answersData = '';
            isLoaded = false;
            return;
        }

        answersData = await response.text();
        isLoaded = true;
        console.log('✅ Answers file loaded successfully!');
        console.log('   - File size:', answersData.length, 'characters');
        console.log('   - Number of lines:', answersData.split('\n').length);
        console.log('   - First 100 chars:', answersData.substring(0, 100));
    } catch (error) {
        console.error('❌ Error loading answers.txt:', error);
        answersData = '';
        isLoaded = false;
    }
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'findAnswerFromPDF') {
        const selectedText = info.selectionText;

        console.log('Context menu clicked. Selected text:', selectedText);
        console.log('Answers data loaded:', isLoaded, 'Size:', answersData.length);

        if (!selectedText || selectedText.trim() === '') {
            saveResult('Please select some text first.', selectedText, tab.id);
            return;
        }

        if (!answersData || answersData.trim() === '') {
            saveResult('Error: answers.txt file is empty or not loaded. Please add your converted PDF content to answers.txt and reload the extension.', selectedText, tab.id);
            return;
        }

        // Find the best matching answer
        const answer = findBestMatch(selectedText, answersData);
        saveResult(answer, selectedText, tab.id);
    }
});

// Keyword matching algorithm
// This function finds the answer in answers.txt based on question keywords
function findBestMatch(question, answersText) {
    try {
        // Convert question to lowercase and split into words
        const questionLower = question.toLowerCase();
        const questionWords = questionLower
            .split(/\s+/)
            .filter(word => word.length > 2) // Ignore very short words
            .map(word => word.replace(/[^\w]/g, '')); // Remove punctuation

        console.log('Searching for keywords:', questionWords);

        if (questionWords.length === 0) {
            return 'No valid keywords found in the selected text.';
        }

        // Split answers into lines (keep empty lines for structure)
        const lines = answersText.split('\n');

        if (lines.length === 0) {
            return 'No content found in answers.txt file.';
        }

        let bestMatchIndex = -1;
        let highestScore = 0;

        // Score each line based on keyword matches
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineLower = line.toLowerCase();
            let score = 0;

            // Count how many question words appear in this line
            for (const word of questionWords) {
                if (lineLower.includes(word)) {
                    score++;
                }
            }

            // Update best match if this line has a higher score
            if (score > highestScore) {
                highestScore = score;
                bestMatchIndex = i;
            }
        }

        console.log('Best match score:', highestScore);
        console.log('Best match line index:', bestMatchIndex);

        // Return result
        if (highestScore === 0 || bestMatchIndex === -1) {
            return 'No matching answer found. Try selecting more specific text or check if your answers.txt contains relevant content.';
        }

        // Get the matched line
        let matchedLine = lines[bestMatchIndex].trim();

        // Check if this looks like a question (contains "?" or starts with question words)
        const isQuestion = matchedLine.includes('?') ||
            /^(what|which|who|where|when|why|how|fill|complete|select|true|false)/i.test(matchedLine);

        if (isQuestion && bestMatchIndex < lines.length - 1) {
            // This is a question, so get the next non-empty line(s) as the answer
            let answerLines = [];
            let currentIndex = bestMatchIndex + 1;

            // Skip empty lines
            while (currentIndex < lines.length && lines[currentIndex].trim() === '') {
                currentIndex++;
            }

            // Collect answer lines (up to 5 lines or until we hit another question/section)
            let linesCollected = 0;
            while (currentIndex < lines.length && linesCollected < 5) {
                const currentLine = lines[currentIndex].trim();

                // Stop if we hit an empty line followed by a question or module header
                if (currentLine === '') {
                    if (currentIndex + 1 < lines.length) {
                        const nextLine = lines[currentIndex + 1].trim();
                        if (/^(module|final|what|which|who|where|when|why|how|\d+\.)/i.test(nextLine)) {
                            break;
                        }
                    }
                    currentIndex++;
                    continue;
                }

                // Stop if this line looks like a new question or section header
                if (/^(module|final assessment|what|which|who|where|when|why|how|\d+\.)/i.test(currentLine)) {
                    break;
                }

                answerLines.push(currentLine);
                linesCollected++;
                currentIndex++;
            }

            if (answerLines.length > 0) {
                const answer = answerLines.join(' ');
                console.log('Found answer:', answer.substring(0, 100));
                return answer;
            }
        }

        // If not a question or no answer found after it, return the matched line itself
        console.log('Returning matched line:', matchedLine.substring(0, 100));
        return matchedLine;

    } catch (error) {
        console.error('Error in findBestMatch:', error);
        return 'Error processing your request. Please try again.';
    }
}


// Save result and show in floating window
function saveResult(answer, selectedText, tabId) {
    const timestamp = new Date().toLocaleString();

    // Save to storage for persistence
    chrome.storage.local.set({
        lastAnswer: answer,
        lastQuestion: selectedText,
        lastSearchTime: timestamp
    }, () => {
        console.log('Answer saved to storage');
    });

    // Send message to content script to show floating window
    chrome.tabs.sendMessage(tabId, {
        action: 'showAnswer',
        question: selectedText,
        answer: answer,
        timestamp: timestamp
    }).catch(error => {
        console.log('Content script not ready, injecting now...');

        // Content script not loaded yet, inject it manually
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }).then(() => {
            // Inject CSS
            return chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ['content.css']
            });
        }).then(() => {
            // Try sending message again after a short delay
            setTimeout(() => {
                chrome.tabs.sendMessage(tabId, {
                    action: 'showAnswer',
                    question: selectedText,
                    answer: answer,
                    timestamp: timestamp
                }).catch(err => {
                    console.error('Failed to show floating window:', err);
                    alert('Please reload the page and try again.');
                });
            }, 100);
        }).catch(err => {
            console.error('Failed to inject content script:', err);
            alert('Please reload the page and try again.');
        });
    });
}

// Reload answers file when browser starts
chrome.runtime.onStartup.addListener(async () => {
    console.log('Browser started, reloading answers file');
    await loadAnswersFile();
});
