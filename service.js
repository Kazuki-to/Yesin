document.addEventListener("DOMContentLoaded", function () {
    const serviceCards = document.querySelectorAll('.service-trigger');
    const modal = document.getElementById('accomplishmentModal');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-long');
            const galleryImages = card.querySelectorAll('.hidden-gallery img');

            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalDescription').textContent = description;

            const modalBody = document.getElementById('modalImg').parentElement;
            document.getElementById('modalImg').style.display = 'none';

            const oldGallery = modalBody.querySelector('.services-gallery-wrapper');
            if (oldGallery) oldGallery.remove();

            if (galleryImages.length > 0) {
                // Create Wrapper for Gallery + Nav
                const wrapper = document.createElement('div');
                wrapper.className = 'services-gallery-wrapper';

                const container = document.createElement('div');
                container.className = 'services-gallery-container';

                galleryImages.forEach(img => {
                    const newImg = document.createElement('img');
                    newImg.src = img.src;
                    newImg.className = 'service-modal-img';
                    container.appendChild(newImg);
                });

                wrapper.appendChild(container);

                // Add Nav Arrows only if multiple images exist
                if (galleryImages.length > 1) {
                    const nextBtn = document.createElement('button');
                    const prevBtn = document.createElement('button');
                    
                    nextBtn.innerHTML = '&#10095;'; // Right Arrow
                    prevBtn.innerHTML = '&#10094;'; // Left Arrow
                    
                    nextBtn.className = 'nav-btn next';
                    prevBtn.className = 'nav-btn prev';

                    nextBtn.onclick = () => container.scrollBy({ left: 300, behavior: 'smooth' });
                    prevBtn.onclick = () => container.scrollBy({ left: -300, behavior: 'smooth' });

                    wrapper.appendChild(prevBtn);
                    wrapper.appendChild(nextBtn);
                }

                modalBody.appendChild(wrapper);
            }
            modal.style.display = 'flex';
        });
    });
});