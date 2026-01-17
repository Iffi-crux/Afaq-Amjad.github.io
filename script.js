const output = document.getElementById('output');
const input = document.getElementById('user-input');

// Replace with your actual GitHub username
const GITHUB_USER = 'Afaq-Amjad'; 

const commands = {
    'help': 'Modules: [projects, exploits, experience, github, clear, sudo exploit]',
    'experience': `<strong>[Identity]</strong><br>
                   - Founder @ Faseel Infosec (2024 - Present)<br>
                   - Offensive Security Researcher (Red Teaming)<br>
                   - Final Year Student Researcher<br>
                   - Focus: Web & LLM Security`,
    'exploits': `<strong>[Bug Hunting Archive]</strong><br>
                 - [P2] Duplicate: High Impact Web Exploitation<br>
                 - [P3/P4] Informative: Logic & IDOR Flaws<br>
                 - Progress: 173 PortSwigger Labs Complete`,
    'sudo exploit': '<span style="color:#ff003c">Critical: System override initiated... Just kidding. Welcome Admin.</span>'
};

// Function to fetch Live Projects from GitHub
async function fetchGithubProjects() {
    printLine("Fetching live data from GitHub API...", "output-text");
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`);
        const repos = await response.json();
        let list = "<strong>[Live GitHub Forge]</strong><br>";
        repos.slice(0, 5).forEach(repo => {
            list += `- <a href="${repo.html_url}" target="_blank">${repo.name}</a>: ${repo.description || 'No description'} (⭐ ${repo.stargazers_count})<br>`;
        });
        printLine(list, "output-text");
    } catch (err) {
        printLine("Error: Could not connect to GitHub API.", "output-text");
    }
}

input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const val = input.value.toLowerCase().trim();
        printLine(`Afaq@Amjad:~$ ${val}`, 'prompt');
        
        if (val === 'projects' || val === 'ls') {
            await fetchGithubProjects();
        } else if (commands[val]) {
            printLine(commands[val], 'output-text');
        } else if (val === 'clear') {
            output.innerHTML = '';
        } else {
            printLine(`Command '${val}' not found. Type 'help' for available modules.`, 'output-text');
        }
        
        input.value = '';
        document.getElementById('terminal-container').scrollTop = document.getElementById('terminal-container').scrollHeight;
    }
});

function printLine(text, className) {
    const p = document.createElement('p');
    p.innerHTML = text;
    p.className = className;
    output.appendChild(p);
}
