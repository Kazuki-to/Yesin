/**
 * 1. PRELOADER LOGIC
 * Runs immediately to ensure it can catch the window load event.
 */
const hidePreloader = () => {
    const preloader = document.getElementById("preloader");
    if (preloader && !preloader.classList.contains("loader-hidden")) {
        preloader.classList.add("loader-hidden");
    }
};

window.addEventListener("load", hidePreloader);
setTimeout(hidePreloader, 5000); // Fail-safe


/**
 * 2. CORE UI LOGIC
 * Runs after HTML is parsed.
 */
document.addEventListener("DOMContentLoaded", function () {
  
    // --- TYPING ANIMATION ---
    const words = ["Financial Consultant","MDRT Member", "Certified Trainer of Trainers","Managing Director","Financial Advisor","Financial Consultant","Content Creator"];
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


    // --- ACCOMPLISHMENT MODAL ---
    const modal = document.getElementById('accomplishmentModal');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.accomplishment-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title') || 'Project Title';
            const longBrief = item.getAttribute('data-long') || 'No description provided.';
            const imgSrc = item.querySelector('img')?.src || '';

            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalDescription').textContent = longBrief;
            document.getElementById('modalImg').src = imgSrc;
            modal.style.display = 'flex';
        });
    });

    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };


    // --- SKILL BARS & CIRCLES ---
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.getAttribute('data-done') + '%';
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


/**
 * 3. STRATEGIES TIMELINE ANIMATION
 * Keeping this outside for better global scope handling.
 */
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = entry.target.classList.contains('item-2') 
                ? "translateY(70px)" : "translateY(-70px)";
        } else {
            entry.target.style.opacity = "0";
            entry.target.style.transform = "translateY(0px)"; 
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = "0";
    item.style.transition = "all 0.8s ease-out";
    timelineObserver.observe(item);
});