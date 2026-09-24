/**
 * DIDWMSA BARGAYARY - Modern Website Scripts
 * GitHub Pages Static Compatibility
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Mobile Navigation Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking any nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 2. Interactive Professional Summary Typing Effect ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "Cybersecurity specialist & penetration tester dedicated to building open-source security tools, analyzing malware vectors, and engineering fast, reliable mobile applications. Experienced in Kali Linux, Arch Linux, Wireshark, and custom network utilities.";
        let charIndex = 0;
        typingElement.textContent = "";

        function typeWriter() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 22);
            }
        }

        // Start typing after initial fade-in
        setTimeout(typeWriter, 500);
    }

    // --- 3. Dynamic Footer Year ---
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // --- 4. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- 5. Security Warning User Acknowledgement & Download Activation ---
    const ackCheckboxes = document.querySelectorAll('.risk-ack-checkbox');
    ackCheckboxes.forEach(checkbox => {
        const targetBtnId = checkbox.getAttribute('data-target-btn');
        const downloadBtn = targetBtnId ? document.getElementById(targetBtnId) : document.querySelector('.btn-download-app');
        
        if (downloadBtn) {
            // Initial state: ensure disabled
            updateDownloadButtonState(checkbox, downloadBtn);

            checkbox.addEventListener('change', function() {
                updateDownloadButtonState(this, downloadBtn);
            });
        }
    });

    function updateDownloadButtonState(checkbox, btn) {
        if (checkbox.checked) {
            btn.classList.remove('disabled');
            btn.classList.add('active');
            btn.removeAttribute('aria-disabled');
            btn.removeAttribute('tabindex');
            btn.innerHTML = '<i class="fas fa-download"></i> Download CricZ TV (.APK)';
        } else {
            btn.classList.add('disabled');
            btn.classList.remove('active');
            btn.setAttribute('aria-disabled', 'true');
            btn.setAttribute('tabindex', '-1');
            btn.innerHTML = '<i class="fas fa-lock"></i> Check Box Above to Unlock Download';
        }
    }

    // Intercept clicks if disabled
    document.querySelectorAll('.btn-download-app').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) {
                e.preventDefault();
                alert('Please read and check the Security & Safety Warning acknowledgement box above to unlock the APK download.');
            }
        });
    });

    // --- 6. Screenshot Gallery Lightbox Modal ---
    const screenshotCards = document.querySelectorAll('.screenshot-card');
    const screenshotModal = document.getElementById('screenshotModal');
    const modalImg = document.getElementById('modalScreenshotImg');
    const modalCaption = document.getElementById('modalScreenshotCaption');
    const closeBtn = document.querySelector('.screenshot-modal-close');
    const prevBtn = document.querySelector('.screenshot-prev-btn');
    const nextBtn = document.querySelector('.screenshot-next-btn');

    let currentScreenshotIndex = 0;
    const screenshotData = [];

    screenshotCards.forEach((card, index) => {
        const img = card.querySelector('img');
        const title = card.querySelector('h4') ? card.querySelector('h4').textContent : 'Screenshot';
        const desc = card.querySelector('p') ? card.querySelector('p').textContent : '';

        if (img) {
            screenshotData.push({
                src: img.getAttribute('src'),
                caption: `${title} — ${desc}`
            });

            card.addEventListener('click', function() {
                currentScreenshotIndex = index;
                openScreenshotModal();
            });
        }
    });

    function openScreenshotModal() {
        if (!screenshotModal || screenshotData.length === 0) return;
        const current = screenshotData[currentScreenshotIndex];
        if (modalImg) modalImg.src = current.src;
        if (modalCaption) modalCaption.textContent = current.caption;
        screenshotModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeScreenshotModal() {
        if (!screenshotModal) return;
        screenshotModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevScreenshot() {
        currentScreenshotIndex = (currentScreenshotIndex - 1 + screenshotData.length) % screenshotData.length;
        openScreenshotModal();
    }

    function showNextScreenshot() {
        currentScreenshotIndex = (currentScreenshotIndex + 1) % screenshotData.length;
        openScreenshotModal();
    }

    if (closeBtn) closeBtn.addEventListener('click', closeScreenshotModal);
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevScreenshot(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextScreenshot(); });

    if (screenshotModal) {
        screenshotModal.addEventListener('click', function(e) {
            if (e.target === screenshotModal || e.target.classList.contains('screenshot-modal-content')) {
                closeScreenshotModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (screenshotModal && screenshotModal.classList.contains('active')) {
            if (e.key === 'Escape') closeScreenshotModal();
            if (e.key === 'ArrowLeft') showPrevScreenshot();
            if (e.key === 'ArrowRight') showNextScreenshot();
        }
    });
});

