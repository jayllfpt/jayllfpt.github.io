document.addEventListener('DOMContentLoaded', function() {
    const galleryData = {
        'Family': [
            { src: 'statics/images/family/family.jpg', caption: 'Family gathering' },
            { src: 'statics/images/family/family2.jpg', caption: 'Special moments with family' },
            { src: 'statics/images/family/family3.jpg', caption: 'Family celebration' },
            { src: 'statics/images/family/grandma.jpg', caption: 'With my beloved grandmother' }
        ],
        'FPT Software': [
            { src: 'statics/images/fsoft/fsoft (1).JPG', caption: 'Working at FPT Software' },
            { src: 'statics/images/fsoft/fsoft (2).JPG', caption: 'Team collaboration' },
            { src: 'statics/images/fsoft/fsoft (3).JPG', caption: 'Office life at FPT' }
        ]
    };

    const galleryGrid = document.querySelector('.gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');

    let currentIndex = 0;
    let allImages = [];

    // Create gallery items
    for (const [category, images] of Object.entries(galleryData)) {
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'gallery-category reveal-item';

        // Add category title
        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categorySection.appendChild(categoryTitle);

        // Create image grid for this category
        const categoryGrid = document.createElement('div');
        categoryGrid.className = 'category-grid';

        // Add images
        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item reveal-item';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.caption;
            img.loading = 'lazy';

            const caption = document.createElement('div');
            caption.className = 'caption';
            caption.textContent = image.caption;

            item.appendChild(img);
            item.appendChild(caption);
            categoryGrid.appendChild(item);

            // Add to allImages array for lightbox navigation
            allImages.push(image);

            // Add click event
            item.addEventListener('click', () => {
                currentIndex = allImages.indexOf(image);
                showLightbox(image);
            });
        });

        categorySection.appendChild(categoryGrid);
        galleryGrid.appendChild(categorySection);
    }

    // Lightbox functions
    function showLightbox(image) {
        lightboxImg.src = image.src;
        lightboxImg.alt = image.caption;
        lightboxCaption.textContent = image.caption;
        lightbox.classList.add('active');
    }

    function hideLightbox() {
        lightbox.classList.remove('active');
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % allImages.length;
        showLightbox(allImages[currentIndex]);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        showLightbox(allImages[currentIndex]);
    }

    // Event listeners
    closeBtn.addEventListener('click', hideLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
            case 'Escape':
                hideLightbox();
                break;
        }
    });

    // Add reveal animation
    const revealItems = document.querySelectorAll('.reveal-item');
    const revealOnScroll = () => {
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight - 100) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});
