const logElement = document.getElementById('live-log');

const logEntries = [
    "[INFO] Initializing Faseel OS v4.0...",
    "[SUCCESS] 200+ PortSwigger Labs authenticated.",
    "[STATUS] PentesterLab: 6/6 Badges synchronized.",
    "[ALERT] Target acquisition: Searching for P2 vulnerabilities...",
    "[DEV] Aegis AI attack blocker: 94% efficiency reached.",
    "[SCAN] Monitoring HackerOne signal... Stable.",
    "[ARCHIVE] 50+ vulnerabilities logged in public database.",
    "[SPRINT] CPTS & OSCP paths merging in 3... 2... 1..."
];

let entryIndex = 0;

function typeLog(text, index = 0) {
    if (index === 0) {
        const newLine = document.createElement('p');
        newLine.className = 'log-entry';
        logElement.appendChild(newLine);
    }
    
    const lines = logElement.getElementsByClassName('log-entry');
    const currentLine = lines[lines.length - 1];
    
    if (index < text.length) {
        currentLine.innerHTML += text.charAt(index);
        setTimeout(() => typeLog(text, index + 1), 30); // Typing speed
    } else {
        setTimeout(startNextEntry, 2000); // Pause before next line
    }
    
    // Auto-scroll to bottom
    logElement.scrollTop = logElement.scrollHeight;
}

function startNextEntry() {
    if (logElement.childNodes.length > 10) {
        logElement.removeChild(logElement.firstChild);
    }
    typeLog(logEntries[entryIndex]);
    entryIndex = (entryIndex + 1) % logEntries.length;
}

// Start the 2055 feed
window.onload = () => {
    startNextEntry();
};
