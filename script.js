// ROBOT FRAMES
const robotFrames = [
    `      ▆▆▆▆▆▆\n    █        █\n   █  O    O  █\n   █    ▆     █\n    █  ▆▆▆   █\n     ▆▆▆▆▆▆`,
    `      ▆▆▆▆▆▆\n    █        █\n   █  -    -  █\n   █    ▆     █\n    █  ▆▆▆   █\n     ▆▆▆▆▆▆`,
    `      ▆▆▆▆▆▆\n    █        █\n   █  >    <  █\n   █    ▆     █\n    █  ▆▆▆   █\n     ▆▆▆▆▆▆`
];

let currentFrame = 0;
function animateRobot() {
    const bot = document.getElementById('animated-robot');
    if(bot) {
        bot.textContent = robotFrames[currentFrame];
        currentFrame = (currentFrame + 1) % robotFrames.length;
    }
    setTimeout(animateRobot, 600);
}

// ACCESS DENIED
function showAccessDenied(e) {
    e.preventDefault();
    const overlay = document.getElementById('access-denied');
    overlay.style.display = 'flex';
    setTimeout(() => { overlay.style.display = 'none'; }, 3000);
    return false;
}

// 2055 SYSTEM LOG
const logEntries = [
    "[INFO] Initializing Afaq-OS v9.4...",
    "[AUTH] 200+ PortSwigger Labs Synchronized.",
    "[DATA] PentesterLab: 6 Badges Verified.",
    "[SCAN] Searching for target vulnerabilities...",
    "[LOAD] Aegis AI attack blocker: ACTIVE.",
    "[WARN] P2 Duplicate detected in H1 feed.",
    "[INFO] Faseel Scanner: Year 2055 Update Complete."
];

let logIndex = 0;
function typeLog() {
    const log = document.getElementById('live-log');
    if(logIndex < logEntries.length) {
        log.innerHTML += `<p style="margin:2px 0; color:#00ff41;">> ${logEntries[logIndex]}</p>`;
        logIndex++;
        log.scrollTop = log.scrollHeight;
        setTimeout(typeLog, 2000);
    } else {
        logIndex = 0; log.innerHTML = ""; typeLog();
    }
}

window.onload = () => {
    animateRobot();
    typeLog();
    
    // Block Inspect Keys
    document.onkeydown = (e) => {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) {
            showAccessDenied(e);
            return false;
        }
    };
};
