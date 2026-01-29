// Background 3D Animation with Three.js
class CyberpunkBackground {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('bg-canvas'),
            alpha: true,
            antialias: true
        });
        
        this.init();
        this.createParticles();
        this.createGeometry();
        this.animate();
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a0a0a, 1);
        this.camera.position.z = 50;
        this.camera.position.y = 10;
        
        // Enhanced lighting for tech elements
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100);
        pointLight1.position.set(20, 20, 20);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff006e, 0.8, 100);
        pointLight2.position.set(-20, 10, -20);
        this.scene.add(pointLight2);
        
        const pointLight3 = new THREE.PointLight(0x39ff14, 0.6, 80);
        pointLight3.position.set(0, 30, 0);
        this.scene.add(pointLight3);
        
        // Add fog for depth
        this.scene.fog = new THREE.Fog(0x0a0a0a, 30, 200);
    }
    
    createParticles() {
        // Digital Matrix Rain Effect
        this.createMatrixRain();
        
        // Cyberpunk Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);
        
        const colors = [
            [0, 1, 1],     // Cyan
            [1, 0, 0.43],  // Magenta  
            [0.51, 0.22, 0.93], // Purple
            [0.22, 1, 0.08]     // Neon Green
        ];
        
        for (let i = 0; i < particlesCount; i++) {
            // Position
            posArray[i * 3] = (Math.random() - 0.5) * 200;
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 200;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 200;
            
            // Random cyberpunk color
            const colorIndex = Math.floor(Math.random() * colors.length);
            colorArray[i * 3] = colors[colorIndex][0];
            colorArray[i * 3 + 1] = colors[colorIndex][1];
            colorArray[i * 3 + 2] = colors[colorIndex][2];
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 1.2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });
        
        this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particlesMesh);
    }
    
    createMatrixRain() {
        // Create vertical lines that look like matrix code rain
        this.matrixLines = [];
        for (let i = 0; i < 30; i++) {
            const points = [];
            const startX = (Math.random() - 0.5) * 150;
            const startZ = (Math.random() - 0.5) * 150;
            
            for (let j = 0; j < 20; j++) {
                points.push(new THREE.Vector3(
                    startX + (Math.random() - 0.5) * 2,
                    50 - j * 5,
                    startZ + (Math.random() - 0.5) * 2
                ));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: Math.random() > 0.5 ? 0x00ff41 : 0x00ffff,
                transparent: true,
                opacity: 0.3 + Math.random() * 0.3
            });
            
            const line = new THREE.Line(geometry, material);
            this.matrixLines.push(line);
            this.scene.add(line);
        }
    }
    
    createGeometry() {
        // Floating Computer Screens
        this.createFloatingScreens();
        
        // Holographic Keyboards
        this.createFloatingKeyboards();
        
        // Digital Code Panels
        this.createCodePanels();
        
        // Cyberpunk Grid Floor
        const gridGeometry = new THREE.PlaneGeometry(200, 200, 100, 100);
        const gridMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide
        });
        this.grid = new THREE.Mesh(gridGeometry, gridMaterial);
        this.grid.rotation.x = -Math.PI / 2;
        this.grid.position.y = -30;
        this.scene.add(this.grid);
        
        // Floating Tech Cubes (like computer cases)
        this.techCubes = [];
        for (let i = 0; i < 6; i++) {
            const cubeGeometry = new THREE.BoxGeometry(4, 3, 2);
            const cubeMaterial = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x00ffff : 0x8338ec,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.x = (Math.random() - 0.5) * 120;
            cube.position.y = (Math.random() - 0.2) * 60 + 10;
            cube.position.z = (Math.random() - 0.5) * 80;
            cube.rotation.x = Math.random() * Math.PI;
            cube.rotation.y = Math.random() * Math.PI;
            this.techCubes.push(cube);
            this.scene.add(cube);
        }
        
        // Binary Data Streams
        this.createDataStreams();
    }
    
    createFloatingScreens() {
        this.screens = [];
        for (let i = 0; i < 8; i++) {
            // Screen frame
            const screenGeometry = new THREE.PlaneGeometry(6, 4);
            const screenMaterial = new THREE.MeshBasicMaterial({
                color: 0x001122,
                transparent: true,
                opacity: 0.8
            });
            const screen = new THREE.Mesh(screenGeometry, screenMaterial);
            
            // Screen border
            const borderGeometry = new THREE.PlaneGeometry(6.2, 4.2);
            const borderMaterial = new THREE.MeshBasicMaterial({
                color: i % 3 === 0 ? 0x00ffff : i % 3 === 1 ? 0xff006e : 0x39ff14,
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });
            const border = new THREE.Mesh(borderGeometry, borderMaterial);
            border.position.z = -0.1;
            screen.add(border);
            
            // Position screens randomly
            screen.position.x = (Math.random() - 0.5) * 100;
            screen.position.y = (Math.random() - 0.3) * 40 + 15;
            screen.position.z = (Math.random() - 0.5) * 60;
            screen.rotation.x = (Math.random() - 0.5) * 0.5;
            screen.rotation.y = (Math.random() - 0.5) * 1;
            
            this.screens.push(screen);
            this.scene.add(screen);
        }
    }
    
    createFloatingKeyboards() {
        this.keyboards = [];
        for (let i = 0; i < 5; i++) {
            const keyboardGeometry = new THREE.BoxGeometry(8, 0.3, 3);
            const keyboardMaterial = new THREE.MeshBasicMaterial({
                color: 0x1a1a1a,
                transparent: true,
                opacity: 0.7
            });
            const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
            
            // Add keys as small cubes
            for (let j = 0; j < 20; j++) {
                const keyGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.3);
                const keyMaterial = new THREE.MeshBasicMaterial({
                    color: Math.random() > 0.9 ? 0x00ffff : 0x333333,
                    transparent: true,
                    opacity: 0.8
                });
                const key = new THREE.Mesh(keyGeometry, keyMaterial);
                key.position.x = (j % 10 - 4.5) * 0.7;
                key.position.y = 0.2;
                key.position.z = Math.floor(j / 10) * 0.7 - 0.35;
                keyboard.add(key);
            }
            
            keyboard.position.x = (Math.random() - 0.5) * 80;
            keyboard.position.y = (Math.random() - 0.4) * 30 + 5;
            keyboard.position.z = (Math.random() - 0.5) * 50;
            keyboard.rotation.x = (Math.random() - 0.5) * 0.3;
            keyboard.rotation.y = Math.random() * Math.PI * 2;
            
            this.keyboards.push(keyboard);
            this.scene.add(keyboard);
        }
    }
    
    createCodePanels() {
        this.codePanels = [];
        for (let i = 0; i < 10; i++) {
            const panelGeometry = new THREE.PlaneGeometry(3, 5);
            const panelMaterial = new THREE.MeshBasicMaterial({
                color: 0x001a1a,
                transparent: true,
                opacity: 0.4
            });
            const panel = new THREE.Mesh(panelGeometry, panelMaterial);
            
            // Add code lines
            for (let j = 0; j < 8; j++) {
                const lineGeometry = new THREE.PlaneGeometry(2.5, 0.2);
                const lineMaterial = new THREE.MeshBasicMaterial({
                    color: j % 2 === 0 ? 0x00ff41 : 0x00ffff,
                    transparent: true,
                    opacity: 0.8
                });
                const line = new THREE.Mesh(lineGeometry, lineMaterial);
                line.position.y = 2 - j * 0.5;
                line.position.z = 0.01;
                panel.add(line);
            }
            
            panel.position.x = (Math.random() - 0.5) * 120;
            panel.position.y = (Math.random() - 0.2) * 50 + 20;
            panel.position.z = (Math.random() - 0.5) * 70;
            panel.rotation.y = Math.random() * Math.PI * 2;
            
            this.codePanels.push(panel);
            this.scene.add(panel);
        }
    }
    
    createDataStreams() {
        this.dataStreams = [];
        for (let i = 0; i < 15; i++) {
            const points = [];
            const startX = (Math.random() - 0.5) * 100;
            const startZ = (Math.random() - 0.5) * 100;
            
            for (let j = 0; j < 15; j++) {
                points.push(new THREE.Vector3(
                    startX + Math.sin(j * 0.3) * 5,
                    40 - j * 3,
                    startZ + Math.cos(j * 0.3) * 5
                ));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: i % 4 === 0 ? 0x00ff41 : i % 4 === 1 ? 0x00ffff : i % 4 === 2 ? 0xff006e : 0x8338ec,
                transparent: true,
                opacity: 0.6
            });
            
            const stream = new THREE.Line(geometry, material);
            this.dataStreams.push(stream);
            this.scene.add(stream);
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate and move particles
        this.particlesMesh.rotation.x += 0.0005;
        this.particlesMesh.rotation.y += 0.001;
        
        // Animate floating screens
        this.screens.forEach((screen, index) => {
            screen.rotation.y += 0.002 + index * 0.0001;
            screen.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
            
            // Screen glow effect
            const border = screen.children[0];
            if (border) {
                border.material.opacity = 0.4 + Math.sin(Date.now() * 0.003 + index) * 0.2;
            }
        });
        
        // Animate floating keyboards
        this.keyboards.forEach((keyboard, index) => {
            keyboard.rotation.y += 0.001 + index * 0.0002;
            keyboard.position.y += Math.cos(Date.now() * 0.0008 + index * 0.7) * 0.015;
            
            // Random key highlights
            keyboard.children.forEach((key, keyIndex) => {
                if (Math.random() > 0.995) {
                    key.material.color.setHex(0x00ffff);
                    setTimeout(() => {
                        key.material.color.setHex(0x333333);
                    }, 200);
                }
            });
        });
        
        // Animate code panels
        this.codePanels.forEach((panel, index) => {
            panel.rotation.y += 0.003 + index * 0.0001;
            panel.position.y += Math.sin(Date.now() * 0.0012 + index * 1.2) * 0.01;
            
            // Code line flickering
            panel.children.forEach((line, lineIndex) => {
                if (Math.random() > 0.99) {
                    line.material.opacity = Math.random() * 0.8 + 0.2;
                }
            });
        });
        
        // Animate tech cubes (computer cases)
        this.techCubes.forEach((cube, index) => {
            cube.rotation.x += 0.005 + index * 0.001;
            cube.rotation.y += 0.003 + index * 0.0005;
            cube.position.y += Math.sin(Date.now() * 0.0009 + index * 0.8) * 0.02;
        });
        
        // Animate data streams
        this.dataStreams.forEach((stream, index) => {
            stream.rotation.y += 0.001;
            stream.material.opacity = 0.4 + Math.sin(Date.now() * 0.002 + index) * 0.2;
        });
        
        // Animate grid floor
        if (this.grid) {
            this.grid.material.opacity = 0.05 + Math.sin(Date.now() * 0.001) * 0.03;
        }
        
        // Animate matrix rain
        this.matrixLines.forEach((line, index) => {
            line.position.y -= 0.8;
            if (line.position.y < -120) {
                line.position.y = 60;
                line.position.x = (Math.random() - 0.5) * 150;
                line.position.z = (Math.random() - 0.5) * 150;
            }
            
            // Digital glitch effect
            if (Math.random() > 0.97) {
                line.material.color.setHex(Math.random() > 0.5 ? 0x00ff41 : 0xff006e);
                line.material.opacity = Math.random() * 0.8 + 0.2;
            }
        });
        
        // Camera sway for immersion
        if (window.mouseX !== undefined && window.mouseY !== undefined) {
            this.camera.position.x += (window.mouseX * 0.00005 - this.camera.position.x) * 0.05;
            this.camera.position.y += (window.mouseY * -0.00005 - this.camera.position.y) * 0.05;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleMouseMove() {
        if (window.mouseX !== undefined && window.mouseY !== undefined) {
            this.camera.position.x = window.mouseX * 0.0001;
            this.camera.position.y = window.mouseY * -0.0001;
        }
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize background animation
let cyberpunkBg;
document.addEventListener('DOMContentLoaded', () => {
    cyberpunkBg = new CyberpunkBackground();
});

// Mouse tracking for 3D interaction
document.addEventListener('mousemove', (event) => {
    window.mouseX = event.clientX - window.innerWidth / 2;
    window.mouseY = event.clientY - window.innerHeight / 2;
});

// Window resize handler
window.addEventListener('resize', () => {
    if (cyberpunkBg) {
        cyberpunkBg.onWindowResize();
    }
});

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.init();
    }
    
    init() {
        // Scroll effect on navbar
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Active link highlighting
        window.addEventListener('scroll', () => this.updateActiveLink());
        
        // Smooth scrolling for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Mobile menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }
    }
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            this.navbar.style.backdropFilter = 'blur(20px)';
        } else {
            this.navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            this.navbar.style.backdropFilter = 'blur(10px)';
        }
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos <= bottom) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }
}

// Typewriter effect
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = this.txt;
        
        let typeSpeed = 150;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Skills animation
class SkillsAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkill(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.skillBars.forEach(bar => observer.observe(bar));
    }
    
    animateSkill(bar) {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--width', width);
    }
}

// Particle system for hero section
class HeroParticles {
    constructor() {
        this.container = document.querySelector('.hero-particles');
        this.particleCount = 50;
        this.particles = [];
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
        
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration
        const duration = Math.random() * 10 + 5;
        particle.style.animationDuration = duration + 's';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color
        const colors = ['#00ffff', '#ff006e', '#8338ec', '#39ff14'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.7';
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    animate() {
        this.particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                particle.style.top = '-10px';
                particle.style.left = Math.random() * 100 + '%';
            } else {
                particle.style.top = (parseFloat(particle.style.top) + 0.5) + 'px';
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Form handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showMessage('Message sent successfully!', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${type === 'success' ? '#39ff14' : '#ff006e'};
            color: #000;
            padding: 1rem 2rem;
            border-radius: 50px;
            z-index: 10000;
            font-weight: 600;
            animation: fadeInOut 3s ease forwards;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe elements for animation
        document.querySelectorAll('.project-card, .skill-category, .about-content > *, .hero-content > *').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    new Navigation();
    
    // Initialize typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        new TypeWriter(typewriterElement, [
            'Security Researcher',
            'Bug Bounty Hunter',
            'Penetration Tester',
            'AI Security Specialist',
            'Web App Security Expert',
            'Founder of Faseel Infosec'
        ], 2000);
    }
    
    // Initialize skills animation
    new SkillsAnimator();
    
    // Initialize hero particles
    new HeroParticles();
    
    // Initialize contact form
    new ContactForm();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Add glitch effect to random elements
    setInterval(() => {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(el => {
            if (Math.random() > 0.8) {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = '';
                }, 100);
            }
        });
    }, 5000);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        10%, 90% { opacity: 1; }
    }
    
    @keyframes animate-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: animate-in 0.8s ease forwards;
    }
    
    .hero-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
        text-shadow: 0 0 10px var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(20px);
            border-top: 1px solid var(--border-color);
            padding: 1rem 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);