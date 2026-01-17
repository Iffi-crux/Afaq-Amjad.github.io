const output = document.getElementById('output');
const input = document.getElementById('user-input');

const commands = {
    'help': 'Available commands: [projects, exploits, experience, github, clear, sudo exploit]',
    'projects': `<strong>[The Forge - Faseel Infosec]</strong><br>
                 - Faseel Core: AI-driven vulnerability scanner (In-Dev)<br>
                 - Recon-Script-v1: Automated JS sub-domain scraper.`,
    'exploits': `<strong>[The Bug Archive - HackerOne]</strong><br>
                 - [P2] Duplicate: Server Side Template Injection (SSTI)<br>
                 - [P2] Duplicate: Cross-Site Scripting on Primary Domain<br>
                 - [P4] Resolved: Information Disclosure via .env<br>
                 - Total Labs: 173 PortSwigger Labs completed.`,
    'experience': `<strong>[Identity]</strong><br>
                   Role: Founder @ Faseel Infosec<br>
                   Status: Final Year Student Researcher<br>
                   Focus: Red Teaming & LLM Security (OWASP LLM01/06)`,
    'github': 'Redirecting to @Afaq-Amjad...',
    'sudo exploit': '<span style="color:red">ERROR: HACKER DETECTED. Just kidding. Welcome, Admin. You just found the Easter Egg.</span>'
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = input.value.toLowerCase().trim();
        printLine(`guest@faseel:~$ ${val}`, 'prompt');
        
        if (commands[val]) {
            printLine(commands[val], 'output-text');
            if (val === 'github') window.open('https://github.com/Afaq-Amjad', '_blank');
        } else if (val === 'clear') {
            output.innerHTML = '';
        } else {
            printLine(`Command not found: ${val}. Type 'help' for options.`, 'output-text');
        }
        
        input.value = '';
        window.scrollTo(0, document.body.scrollHeight);
    }
});

function printLine(text, className) {
    const p = document.createElement('p');
    p.innerHTML = text;
    p.className = className;
    output.appendChild(p);
}
