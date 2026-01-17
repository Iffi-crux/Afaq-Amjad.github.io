const GITHUB_USER = 'Afaq-Amjad';

async function loadRepos() {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`);
    const repos = await response.json();
    const grid = document.getElementById('repo-grid');
    
    grid.innerHTML = repos.slice(0, 6).map(repo => `
        <div class="repo-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Cyber Security Tooling'}</p>
            <div class="tags">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>${repo.language}</span>
            </div>
            <a href="${repo.html_url}" target="_blank">View Source</a>
        </div>
    `).join('');
}

loadRepos();

// Minimal Terminal logic for the "Hacker" segment
const input = document.getElementById('user-input');
const output = document.getElementById('output');

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.toLowerCase();
        output.innerHTML += `<p><span style="color:var(--accent)">$</span> ${cmd}</p>`;
        
        if (cmd === 'help') {
            output.innerHTML += `<p>Modules: [status, exploits, contact]</p>`;
        } else if (cmd === 'status') {
            output.innerHTML += `<p>System: Operational. Current Focus: PentesterLab Badges.</p>`;
        } else {
            output.innerHTML += `<p>Command not found.</p>`;
        }
        
        input.value = '';
    }
});
