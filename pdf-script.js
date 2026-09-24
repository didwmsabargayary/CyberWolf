/**
 * PDF Resource Library & Pagination Script
 * DIDWMSA BARGAYARY - Cybersecurity Resource Library
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const pdfGrid = document.getElementById('pdfGrid');
    const paginationContainer = document.getElementById('pagination');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('pdfSearchInput');
    const searchButton = document.getElementById('searchBtn');
    const noResultsMessage = document.getElementById('noResults');
    const totalPdfCountEl = document.getElementById('totalPdfCount');
    
    // Pagination settings
    const itemsPerPage = 12;
    let currentPage = 1;
    let currentCategory = 'all';
    let filteredPdfs = [];
    
    // Safe reference to pdfData
    const allPdfs = (typeof pdfData !== 'undefined') ? pdfData : [];
    filteredPdfs = [...allPdfs];
    
    if (totalPdfCountEl) {
        totalPdfCountEl.textContent = `(${allPdfs.length} Guides Available)`;
    }

    // Render initial list
    renderPdfs();
    
    // Category filter event listeners
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentCategory = this.getAttribute('data-category') || 'all';
            applyFilterAndSearch();
        });
    });
    
    // Search functionality
    function applyFilterAndSearch() {
        const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
        
        filteredPdfs = allPdfs.filter(pdf => {
            const matchesCategory = (currentCategory === 'all') || 
                (pdf.category && pdf.category.toLowerCase() === currentCategory.toLowerCase());
            
            const matchesSearch = !searchTerm || 
                (pdf.title && pdf.title.toLowerCase().includes(searchTerm)) || 
                (pdf.description && pdf.description.toLowerCase().includes(searchTerm)) ||
                (pdf.category && pdf.category.toLowerCase().includes(searchTerm));
            
            return matchesCategory && matchesSearch;
        });
        
        currentPage = 1;
        renderPdfs();
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', applyFilterAndSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilterAndSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                applyFilterAndSearch();
            }
        });
    }
    
    // Render PDFs with pagination
    function renderPdfs() {
        if (!pdfGrid) return;
        pdfGrid.innerHTML = '';
        
        if (filteredPdfs.length === 0) {
            if (noResultsMessage) noResultsMessage.style.display = 'block';
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        } else {
            if (noResultsMessage) noResultsMessage.style.display = 'none';
        }
        
        const totalPages = Math.ceil(filteredPdfs.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredPdfs.length);
        const currentItems = filteredPdfs.slice(startIndex, endIndex);
        
        currentItems.forEach(pdf => {
            const pdfCard = document.createElement('div');
            pdfCard.className = 'pdf-card';
            
            const pdfPath = pdf.path || '#';
            const pdfTitle = pdf.title || 'Cybersecurity Resource';
            const pdfCategory = pdf.category || 'Security';
            
            pdfCard.innerHTML = `
                <span class="pdf-card-badge"><i class="fas fa-file-pdf"></i> ${pdfCategory}</span>
                <div class="pdf-info">
                    <h3>${pdfTitle}</h3>
                </div>
                <div class="pdf-actions">
                    <a href="${pdfPath}" class="preview-btn" data-pdf="${pdfPath}"><i class="fas fa-eye"></i> Preview</a>
                    <a href="${pdfPath}" class="download-btn" download="${pdfTitle}"><i class="fas fa-download"></i> Download</a>
                </div>
            `;
            
            pdfGrid.appendChild(pdfCard);
        });
        
        renderPagination(totalPages);
        initializePreviewModal();
    }
    
    // Render pagination controls
    function renderPagination(totalPages) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // Prev button
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Prev';
            prevButton.addEventListener('click', () => {
                currentPage--;
                renderPdfs();
                pdfGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            paginationContainer.appendChild(prevButton);
        }
        
        // Page buttons helper
        const addPageBtn = (pageNum) => {
            const pageButton = document.createElement('button');
            pageButton.textContent = pageNum;
            if (pageNum === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = pageNum;
                renderPdfs();
                pdfGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            paginationContainer.appendChild(pageButton);
        };
        
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                addPageBtn(i);
            }
        } else {
            addPageBtn(1);
            if (currentPage > 3) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'pagination-ellipsis';
                paginationContainer.appendChild(ellipsis);
            }
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) {
                addPageBtn(i);
            }
            
            if (currentPage < totalPages - 2) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'pagination-ellipsis';
                paginationContainer.appendChild(ellipsis);
            }
            addPageBtn(totalPages);
        }
        
        // Next button
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            nextButton.addEventListener('click', () => {
                currentPage++;
                renderPdfs();
                pdfGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            paginationContainer.appendChild(nextButton);
        }
    }
    
    // PDF Preview Modal
    function initializePreviewModal() {
        const modal = document.getElementById('pdfModal');
        const pdfViewer = document.getElementById('pdfViewer');
        const closeBtn = document.querySelector('.pdf-close');
        const previewBtns = document.querySelectorAll('.preview-btn');
        
        if (!modal || !pdfViewer) return;
        
        previewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const pdfPath = this.getAttribute('data-pdf');
                if (!pdfPath || pdfPath === '#') return;
                
                pdfViewer.src = pdfPath;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        function closeModal() {
            modal.style.display = 'none';
            pdfViewer.src = '';
            document.body.style.overflow = '';
        }
        
        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }
        
        window.onclick = function(e) {
            if (e.target === modal) {
                closeModal();
            }
        };
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
});