/**
 * AFAQ AMJAD PORTFOLIO ENGINE - v2.0.55
 * Red Team / Founder @ Faseel Infosec
 */

// 1. SECURITY PROTOCOL: ACCESS DENIED
// Triggers when a user tries to right-click to inspect your code
function showAccessDenied(e) {
    e.preventDefault();
    const overlay = document.getElementById('access-denied');
    overlay.style.display = 'flex';
    
    // Auto-hide after 3 seconds
    setTimeout(() => { 
        overlay.style.display = 'none'; 
    }, 3000);
    
    return false;
}

// 2. LIVE GITHUB FORGE: DYNAMIC PROJECT LOADING
// Fetches your real repositories so the site is never "junk"
async function fetchLiveProjects() {
    const GITHUB_USER = 'Afaq-Amjad'; // Your GitHub username
    const projectGrid = document.querySelector('.project-grid');

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`);
        const repos = await response.json();
        
        // We only take the top 2 if we want to keep it "congested" and tight
        // or keep your manual Faseel/Aegis entries and append these.
        if (repos.length > 0) {
            console.log("[SYSTEM] Live projects synchronized.");
        }
    } catch (err) {
        console.error("[ERROR] Failed to bridge GitHub API.");
    }
}

// 3. SYSTEM INTELLIGENCE FEED: YEAR 2055
// Scrolling log entries highlighting your 200+ PortSwigger labs and P2 finds
const logEntries = [
    "[INFO] Booting Afaq-OS v9.4... [OK]",
    "[AUTH] 200+ PortSwigger Labs: VERIFIED.",
    "[DATA] PentesterLab: 6 Badges synchronized.",
    "[SCAN] Searching for target vulnerabilities...",
    "[LOAD] Aegis AI attack blocker: PHASE 1 ACTIVE.",
    "[WARN] High-severity P2 detected in duplicate logs.",
    "[INFO] Final Year Project: Faseel Scanner initialized.",
    "[STATUS] OSCP / CPTS Prep: 85% completion rate.",
    "[ALERT] Unauthorized inspection attempt logged.",
    "[CMD] Hacking in English... LLM Red Teaming active."
];

let logIndex = 0;
function typeLog() {
    const logContainer = document.getElementById('live-log');
    
    if (logIndex < logEntries.length) {
        const entry = document.createElement('p');
        entry.style.margin = "2px 0";
        entry.style.color = "#00ff41";
        entry.innerHTML = `> ${logEntries[logIndex]}`;
        
        logContainer.appendChild(entry);
        logIndex++;
        
        // Auto-scroll to keep the latest logs visible
        logContainer.scrollTop = logContainer.scrollHeight;
        
        setTimeout(typeLog, 1500); // Time between new lines
    } else {
        // Reset and clear to loop the feed
        setTimeout(() => {
            logContainer.innerHTML = "";
            logIndex = 0;
            typeLog();
        }, 3000);
    }
}

// 4. INITIALIZATION
window.onload = () => {
    typeLog();
    fetchLiveProjects();
    
    // Extra Security: Block F12 and Ctrl+Shift+I
    document.onkeydown = function(e) {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) {
            showAccessDenied(e);
            return false;
        }
    };
};
