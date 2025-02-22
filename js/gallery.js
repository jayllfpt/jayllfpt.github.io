document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');
    
    let currentImageIndex = 0;
    let currentCategory = '';
    let allImages = [];

    // Image data organized by categories
    const imageData = {
        'Family Moments': [
            { src: 'statics/images/family/family.jpg', caption: 'Family Gathering' },
            { src: 'statics/images/family/family2.jpg', caption: 'Family Time' },
            { src: 'statics/images/family/family3.jpg', caption: 'Family Memories' },
            { src: 'statics/images/family/grandma.jpg', caption: 'With Grandma' }
        ],
        'FPT Software': [
            { src: 'statics/images/fsoft/fsoft (1).JPG', caption: 'FPT Software - Team Building' },
            { src: 'statics/images/fsoft/fsoft (2).JPG', caption: 'FPT Software - Project Discussion' },
            { src: 'statics/images/fsoft/fsoft (3).JPG', caption: 'FPT Software - Office Life' }
        ]
    };

    // Create category section
    function createCategorySection(title) {
        const section = document.createElement('div');
        section.className = 'gallery-category reveal-item';
        
        const heading = document.createElement('h2');
        heading.className = 'category-title reveal-text';
        heading.textContent = title;
        
        const grid = document.createElement('div');
        grid.className = 'gallery-grid';
        
        section.appendChild(heading);
        section.appendChild(grid);
        
        return { section, grid };
    }

    // Create gallery items
    function createGalleryItems() {
        // Clear existing content
        galleryGrid.innerHTML = '';
        
        // Create sections for each category
        Object.entries(imageData).forEach(([category, images]) => {
            const { section, grid } = createCategorySection(category);
            
            images.forEach((data, index) => {
                const item = document.createElement('div');
                item.className = 'gallery-item reveal-item';
                
                const img = document.createElement('img');
                img.src = data.src;
                img.alt = data.caption;
                img.loading = 'lazy'; // Lazy loading for better performance
                
                const caption = document.createElement('div');
                caption.className = 'caption';
                caption.textContent = data.caption;
                
                item.appendChild(img);
                item.appendChild(caption);
                
                // Store the global index for lightbox navigation
                const globalIndex = allImages.length;
                allImages.push(data);
                
                item.addEventListener('click', () => openLightbox(globalIndex));
                
                grid.appendChild(item);
            });
            
            galleryGrid.appendChild(section);
        });

        // Initialize reveal animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        });

        document.querySelectorAll('.reveal-item').forEach((item) => {
            observer.observe(item);
        });
    }

    // Lightbox functions
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    function updateLightboxImage() {
        const image = allImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxCaption.textContent = image.caption;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        updateLightboxImage();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Initialize gallery
    createGalleryItems();
});
