// DATOS DE LOS PROYECTOS
const projects = [{
    id: 1,
    title: "AURA",
    category: "Dirección de arte",
    year: 2025,
    description: "Instalación inmersiva que explora la relación entre luz, sonido y espacio. Una experiencia sensorial que invita al espectador a ser parte de la obra.",
    credits: "Dir. María González · Arte: Lucía Méndez",
    videoUrl: "/video/vd1.mp4", // Soporte para video local
    thumbnail: "/img/calculadora.jpeg"
}, {
    id: 2,
    title: "NÓMADA", 
    category: "Video musical",
    year: 2024,
    description: "Videoclip para el sencillo 'Nómada' de la banda Fuego Cruzado. Grabado en locaciones del desierto de Atacama con técnicas de stop-motion.",
    credits: "Dir. Carlos Rivera · Fotografía: Ana Torres",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&crop=center&auto=format"
}, {
    id: 3,
    title: "KAIROS",
    category: "Branding",
    year: 2025,
    description: "Identidad visual y estrategia de marca para una startup de tecnología sostenible. Incluye diseño de logo, paleta de color y motion graphics.",
    credits: "Dir. creativa: Sofía Herrera · Diseño: Estudio Nai",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop&crop=center&auto=format"
}, {
    id: 4,
    title: "ENTREPLIEGUES",
    category: "Cortometraje",
    year: 2024,
    description: "Cortometraje documental que retrata el oficio de los encuadernadores artesanales en el centro histórico de la ciudad.",
    credits: "Dir. Javier Mora · Prod. Lucía Pardo",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop&crop=center&auto=format"
}, {
    id: 5,
    title: "SINESTESIA",
    category: "Instalación",
    year: 2025,
    description: "Instalación interactiva que traduce ondas sonoras en patrones de luz y proyecciones en tiempo real. Presentada en el Festival de Arte Digital.",
    credits: "Concepto: Elena Ríos · Tecnología: Miguel Ángel",
    videoUrl: "https://www.youtube.com/embed/6Dh-RL__uN4",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop&crop=center&auto=format"
}, {
    id: 6,
    title: "HORIZONTE",
    category: "Fotografía · Video",
    year: 2026,
    description: "Serie de videoensayos sobre paisajes urbanos y periféricos. Una reflexión visual sobre el crecimiento desmedido y la memoria del territorio.",
    credits: "Autor: Tomás Gutiérrez · Edición: Carla Díaz",
    videoUrl: "https://www.youtube.com/embed/L_jWHffIx5E",
    thumbnail: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&h=400&fit=crop&crop=center&auto=format"
}];

// RENDERIZAR TARJETAS EN EL DOM
const grid = document.getElementById('projectsGrid');

projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = p.id;
    card.innerHTML = `
        <div class="card-thumb">
            <img src="${p.thumbnail}" alt="${p.title}" loading="lazy" />
        </div>
        <div class="card-info">
            <h3>${p.title}</h3>
            <div class="category">${p.category}</div>
            <span class="btn-ver">Ver proyecto</span>
        </div>
    `;
    card.addEventListener('click', () => openModal(p.id));
    grid.appendChild(card);
});

// ELEMENTOS DEL MODAL
const overlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('modalClose');
const videoWrapper = document.getElementById('modalVideoWrapper');
const titleEl = document.getElementById('modalTitle');
const catEl = document.getElementById('modalCategory');
const yearEl = document.getElementById('modalYear');
const descEl = document.getElementById('modalDesc');
const creditsEl = document.getElementById('modalCredits');

function openModal(id) {
    const p = projects.find(proj => proj.id === id);
    if (!p) return;

    // Rellenar datos de texto de forma segura
    titleEl.textContent = p.title;
    catEl.textContent = p.category;
    yearEl.textContent = p.year;
    descEl.textContent = p.description;
    creditsEl.textContent = 'Créditos: ' + p.credits;

    // Limpiar contenedor multimedia anterior
    videoWrapper.innerHTML = '';

    // Lógica dual: Soporte para video local (.mp4) o iframe externo (YouTube)
    if (p.videoUrl.endsWith('.mp4') || p.videoUrl.includes('video/')) {
        const video = document.createElement('video');
        video.src = p.videoUrl;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.maxHeight = '400px';
        videoWrapper.appendChild(video);
    } else {
        const iframe = document.createElement('iframe');
        iframe.src = p.videoUrl + (p.videoUrl.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        videoWrapper.appendChild(iframe);
    }

    // Mostrar modal
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Limpiar src del reproductor para detener el audio/video al cerrar
    videoWrapper.innerHTML = '';
}

// Eventos de cierre del modal
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
});

// Animación con Intersection Observer (error de sintaxis corregido: i * 0.08)
const cards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(card);
});

// Asegurar visibilidad para tarjetas iniciales en pantalla
setTimeout(() => {
    cards.forEach(c => {
        const rect = c.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
        }
    });
}, 100);

console.log('Studio Showcase cargado y optimizado correctamente');