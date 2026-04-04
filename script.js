/**
 * 1. PRELOADER LOGIC
 * Runs immediately to handle the loading screen.
 */
const hidePreloader = () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.classList.add("loader-hidden");
        // Ensure it doesn't block clicks after fading
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
};

// Hide when page is fully loaded
window.addEventListener("load", hidePreloader);
// Emergency fail-safe: hide after 4 seconds regardless
setTimeout(hidePreloader, 4000);


/**
 * 2. MAIN UI LOGIC
 * All DOM-dependent code goes inside this block.
 */
document.addEventListener("DOMContentLoaded", function () {
  
    // --- TYPING ANIMATION ---
    const words = ["Financial Consultant"," Insurance Strategist","MDRT Member", "Certified Trainer of Trainers","Managing Director","Financial Advisor","Financial Consultant","Content Creator"];
    let wordIndex = 0, charIndex = 0, currentWord = '';
    const typingSpeed = 100, erasingSpeed = 50, newWordDelay = 2000;

    function type() {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;

        if (charIndex < words[wordIndex].length) {
            currentWord += words[wordIndex].charAt(charIndex);
            typingElement.textContent = currentWord;
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newWordDelay);
        }
    }

    function erase() {
        const typingElement = document.querySelector('.typing-animation');
        if (charIndex > 0) {
            currentWord = currentWord.slice(0, -1);
            typingElement.textContent = currentWord;
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, typingSpeed + 500);
        }
    }

    if (document.querySelector('.typing-animation')) type();


    // --- MODAL CORE ELEMENTS ---
    const modal = document.getElementById('accomplishmentModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalImg = document.getElementById('modalImg');

    // Helper function to close and reset modal state
    const closeModal = () => {
        if (modal) modal.style.display = 'none';
        if (modalImg) modalImg.style.display = 'block'; 
        
        if (modal) {
            const oldGallery = modal.querySelector('.services-gallery-wrapper');
            if (oldGallery) oldGallery.remove();
        }
    };

    // --- ACCOMPLISHMENT MODAL OPEN ---
    document.querySelectorAll('.accomplishment-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title') || 'Project Title';
            const longBrief = item.getAttribute('data-long') || 'No description provided.';
            const imgSrc = item.querySelector('img')?.src || '';

            // Clean up any leftovers from Service Gallery
            if (modalImg) modalImg.style.display = 'block';
            if (modal) {
                const oldGallery = modal.querySelector('.services-gallery-wrapper');
                if (oldGallery) oldGallery.remove();
            }

            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalDescription').textContent = longBrief;
            if (modalImg) modalImg.src = imgSrc;
            if (modal) modal.style.display = 'flex';
        });
    });

    // --- UNIFIED MODAL CLOSE LISTENERS ---
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    window.onclick = (e) => { 
        if (e.target === modal) closeModal(); 
    };


    // --- SKILL BARS & CIRCLES ---
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = (bar.getAttribute('data-done') || 0) + '%';
                bar.style.opacity = 1;
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.progress-done').forEach(bar => skillObserver.observe(bar));

    document.querySelectorAll('.circle').forEach(circle => {
        circle.style.setProperty('--percent', circle.getAttribute('data-percent'));
    });
});
