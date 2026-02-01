// PDF Answer Finder - Content Script
// This script creates a floating window on the webpage to display answers

let floatingWindow = null;

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showAnswer') {
        showFloatingWindow(request.question, request.answer, request.timestamp);
    }
});

// Create and show the floating window
function showFloatingWindow(question, answer, timestamp) {
    // Remove existing window if present
    if (floatingWindow) {
        floatingWindow.remove();
    }

    // Create floating window
    floatingWindow = document.createElement('div');
    floatingWindow.id = 'pdf-answer-finder-window';
    floatingWindow.className = 'pdf-finder-window';

    // Create window content
    floatingWindow.innerHTML = `
    <div class="pdf-finder-header">
      <div class="pdf-finder-title">
        <span class="pdf-finder-icon">📄</span>
        <span>PDF Answer Finder</span>
      </div>
      <div class="pdf-finder-controls">
        <button class="pdf-finder-minimize" title="Minimize">−</button>
        <button class="pdf-finder-close" title="Close">×</button>
      </div>
    </div>
    <div class="pdf-finder-content">
      <div class="pdf-finder-question-section">
        <div class="pdf-finder-label">Question:</div>
        <div class="pdf-finder-question">${escapeHtml(question)}</div>
      </div>
      <div class="pdf-finder-answer-section">
        <div class="pdf-finder-label">Answer:</div>
        <div class="pdf-finder-answer">${escapeHtml(answer)}</div>
      </div>
      <div class="pdf-finder-timestamp">${timestamp}</div>
    </div>
  `;

    // Add to page
    document.body.appendChild(floatingWindow);

    // Make draggable
    makeDraggable(floatingWindow);

    // Add event listeners
    const closeBtn = floatingWindow.querySelector('.pdf-finder-close');
    const minimizeBtn = floatingWindow.querySelector('.pdf-finder-minimize');

    closeBtn.addEventListener('click', () => {
        floatingWindow.remove();
        floatingWindow = null;
    });

    minimizeBtn.addEventListener('click', () => {
        floatingWindow.classList.toggle('minimized');
    });
}

// Make window draggable
function makeDraggable(element) {
    const header = element.querySelector('.pdf-finder-header');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        if (e.target.closest('.pdf-finder-controls')) return;

        initialX = e.clientX - element.offsetLeft;
        initialY = e.clientY - element.offsetTop;
        isDragging = true;
        header.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        element.style.left = currentX + 'px';
        element.style.top = currentY + 'px';
    }

    function dragEnd() {
        isDragging = false;
        header.style.cursor = 'grab';
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
