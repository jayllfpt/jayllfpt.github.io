// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Function to render PDF
async function renderPDF(url, container) {
    try {
        console.log('Rendering PDF:', url);
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        
        // Get the first page
        const page = await pdf.getPage(1);
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-preview';
        
        // Set scale for better quality
        const viewport = page.getViewport({ scale: 1.5 });
        
        // Prepare canvas for rendering
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render PDF page
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        await page.render(renderContext);
        container.appendChild(canvas);
        console.log('PDF rendered successfully:', url);
    } catch (error) {
        console.error('Error rendering PDF:', url, error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Error loading PDF';
        container.appendChild(errorDiv);
    }
}

// Function to create image preview
function createImagePreview(url, container) {
    console.log('Creating image preview:', url);
    const img = document.createElement('img');
    img.className = 'certificate-image';
    img.src = url;
    img.alt = 'Certificate';
    img.onerror = () => {
        console.error('Error loading image:', url);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Error loading image';
        container.appendChild(errorDiv);
    };
    container.appendChild(img);
}

// Function to create certificate card
function createCertificateCard(fileInfo) {
    console.log('Creating card for:', fileInfo.name);
    const card = document.createElement('div');
    card.className = 'certificate-card reveal-item';
    card.setAttribute('data-category', fileInfo.category);

    const content = document.createElement('div');
    content.className = 'certificate-content';

    // Extract title from filename
    let title = fileInfo.name.replace(/\.[^/.]+$/, ''); // Remove extension
    title = title.replace(/^\[(.*?)\]/, '[$1] '); // Clean up brackets

    content.innerHTML = `
        <h3>${title}</h3>
        <div class="preview-container"></div>
    `;

    card.appendChild(content);
    
    // Get preview container
    const previewContainer = content.querySelector('.preview-container');
    
    // Check file type and render accordingly
    const fileUrl = '/statics/certificate/' + fileInfo.name;
    if (fileInfo.name.toLowerCase().endsWith('.pdf')) {
        renderPDF(fileUrl, previewContainer);
    } else {
        createImagePreview(fileUrl, previewContainer);
    }

    return card;
}

// Function to create category section
function createCategorySection(title) {
    console.log('Creating category section:', title);
    const section = document.createElement('div');
    section.className = 'category-section';
    
    const heading = document.createElement('h2');
    heading.className = 'category-title reveal-text';
    heading.textContent = title;
    
    const grid = document.createElement('div');
    grid.className = 'certificates-grid';
    
    section.appendChild(heading);
    section.appendChild(grid);
    
    return { section, grid };
}

// Initialize certificates grid
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Initializing certificates page');
    const mainSection = document.querySelector('.certificates-section');
    
    try {
        // Fetch certificates data
        console.log('Fetching certificates data');
        const response = await fetch('/statics/certificate/files.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const files = await response.json();
        console.log('Loaded certificates:', files);
        
        // Create category sections
        const categories = {
            'ai': 'Artificial Intelligence & Machine Learning',
            'programming': 'Programming & Development',
            'data': 'Data Science & Analysis',
            'other': 'Other Skills & Certifications'
        };
        
        // Group certificates by category
        const groupedCerts = {};
        files.forEach(file => {
            if (!groupedCerts[file.category]) {
                groupedCerts[file.category] = [];
            }
            groupedCerts[file.category].push(file);
        });
        
        // Create and populate category sections
        Object.entries(categories).forEach(([category, title]) => {
            if (groupedCerts[category] && groupedCerts[category].length > 0) {
                console.log(`Creating section for ${category} with ${groupedCerts[category].length} certificates`);
                const { section, grid } = createCategorySection(title);
                
                groupedCerts[category].forEach(fileInfo => {
                    const card = createCertificateCard(fileInfo);
                    grid.appendChild(card);
                });
                
                mainSection.appendChild(section);
            }
        });
    } catch (error) {
        console.error('Error loading certificates:', error);
        mainSection.innerHTML += `
            <div class="error-message" style="color: red; padding: 1rem;">
                Error loading certificates. Please try again later.
            </div>
        `;
    }

    // Reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.reveal-item, .reveal-text').forEach((item) => {
        observer.observe(item);
    });
});
