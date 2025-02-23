document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initDaysCounter();
    initGallery();
    initTimeline();
    initMusicPlayer();
    initScrollReveal();
    initLoveNotes();
});

// Days Counter
function initDaysCounter() {
    const startDate = new Date('2022-09-01'); // Update this with your actual start date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const daysCount = document.querySelector('.days-count');
    if (daysCount) {
        daysCount.textContent = diffDays;
        daysCount.classList.add('active');
    }
}

// Gallery
function initGallery() {
    const galleryImages = [
        { src: 'statics/images/lovedays/memories/firstdate.jpg', caption: 'First Date' },
        { src: 'statics/images/lovedays/memories/sweetmemories.jpg', caption: 'Sweet Memories' },
        { src: 'statics/images/lovedays/memories/together-forever.jpg', caption: 'Together Forever' }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    galleryImages.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${image.src}" alt="${image.caption}" loading="lazy">`;
        item.addEventListener('click', () => openLightbox(image));
        galleryGrid.appendChild(item);
    });
}

// Timeline
function initTimeline() {
    const timelineItems = [
        {
            date: '2023',
            image: 'statics/images/lovedays/timeline/2023.jpg',
            description: 'Khởi đầu câu chuyện tình yêu của chúng ta'
        },
        {
            date: 'Early 2024',
            image: 'statics/images/lovedays/timeline/2024-1.jpg',
            description: 'Những khoảnh khắc đầu năm bên nhau'
        },
        {
            date: 'Mid 2024',
            image: 'statics/images/lovedays/timeline/2024-2.jpg',
            description: 'Cùng nhau trải qua những ngày tháng đáng nhớ'
        },
        {
            date: '2025',
            image: 'statics/images/lovedays/timeline/2025.jpg',
            description: 'Tình yêu của chúng ta ngày càng bền chặt'
        }
    ];

    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    timelineItems.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item reveal-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${item.date}</div>
                <img src="${item.image}" alt="${item.date}" loading="lazy">
                <p>${item.description}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Lightbox
function openLightbox(image) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');

    lightboxImg.src = image.src;
    lightboxCaption.textContent = image.caption;
    lightbox.classList.add('active');

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Close button
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

// Music Player
function initMusicPlayer() {
    const musicToggle = document.querySelector('.music-toggle');
    const audio = document.getElementById('bgMusic');
    
    if (!musicToggle || !audio) return;

    musicToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicToggle.classList.add('playing');
        } else {
            audio.pause();
            musicToggle.classList.remove('playing');
        }
    });
}

// Scroll Reveal
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all elements with reveal classes
    document.querySelectorAll('.reveal-section, .reveal-item, .reveal-text').forEach(el => {
        observer.observe(el);
    });
}

// Love Notes
function initLoveNotes() {
    const notesContainer = document.querySelector('.notes-display');
    const addNoteBtn = document.getElementById('addNote');
    const noteInput = document.getElementById('noteText');

    if (!notesContainer || !addNoteBtn || !noteInput) return;

    // Load existing notes from localStorage
    loadNotes();

    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            addNote(noteText);
            noteInput.value = '';
        }
    });
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('loveNotes') || '[]');
    const notesDisplay = document.querySelector('.notes-display');
    
    if (!notesDisplay) return;
    
    notesDisplay.innerHTML = '';
    notes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesDisplay.appendChild(noteElement);
    });
}

function addNote(text) {
    const note = {
        id: Date.now(),
        text,
        date: new Date().toLocaleDateString()
    };

    const notes = JSON.parse(localStorage.getItem('loveNotes') || '[]');
    notes.push(note);
    localStorage.setItem('loveNotes', JSON.stringify(notes));

    const noteElement = createNoteElement(note);
    document.querySelector('.notes-display').appendChild(noteElement);
}

function createNoteElement(note) {
    const div = document.createElement('div');
    div.className = 'note reveal-item';
    div.innerHTML = `
        <p>${note.text}</p>
        <small>${note.date}</small>
    `;
    return div;
}
