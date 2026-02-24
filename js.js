const popup = document.getElementById("projet-popup");
const carouselInner = document.querySelector(".popup-carousel");
const closeBtn = document.querySelector(".close-popup");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

document.querySelectorAll('.projet-image').forEach(card => {
    card.addEventListener('click', () => {
        // Récupération des données de l'image cliquer
        const dataImages = card.getAttribute('data-images');
        const dataDesc = card.getAttribute('data-desc');
        const title = card.getAttribute('data-title') || "Projet";

        if (!dataImages) return; // Si pas d'images erreur 404

        const images = dataImages.split(',');
        const descriptions = dataDesc ? dataDesc.split('|') : [];

        // Vder le carrousel avant
        carouselInner.innerHTML = '';

        // Création de chaque slide
        images.forEach((imgSrc, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';

            // Injection des infos
            slide.innerHTML = `
                <h3>${title}</h3> 
                <img src="${imgSrc.trim()}" alt="Slide ${index}">
                <p class="slide-description">${descriptions[index] ? descriptions[index].trim() : ''}</p>
            `;
            carouselInner.appendChild(slide);
        });

        // Affichage du popup
        popup.style.display = "block";
        document.body.style.overflow = "hidden"; // Bloque le scroll arrière
    });
});

// Logique des flèches
nextBtn.addEventListener('click', () => {
    carouselInner.scrollBy({ left: carouselInner.offsetWidth, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    carouselInner.scrollBy({ left: -carouselInner.offsetWidth, behavior: 'smooth' });
});

// Fermer le popup
const closePopup = () => {
    if (popup) {
        popup.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
}

// Fermer le popup quand on clique aileurs
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        closePopup();
    }
});