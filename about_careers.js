// Arrow functionality for job category section

document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.job-category-cards');
    const leftArrows = document.querySelectorAll('.job-arrow-left');
    const rightArrows = document.querySelectorAll('.job-arrow-right');
    const arrows = document.querySelector('.job-category-arrows');

    function updateArrows() {
        leftArrows.forEach(btn => btn.classList.remove('active'));
        rightArrows.forEach(btn => btn.classList.remove('active'));
    }
    leftArrows.forEach(btn => btn.addEventListener('click', function () {
        btn.classList.add('active');
        cardsContainer.scrollBy({ left: -300, behavior: 'smooth' });
        setTimeout(() => btn.classList.remove('active'), 300);
        setTimeout(updateArrows, 350);
    }));
    rightArrows.forEach(btn => btn.addEventListener('click', function () {
        btn.classList.add('active');
        cardsContainer.scrollBy({ left: 300, behavior: 'smooth' });
        setTimeout(() => btn.classList.remove('active'), 300);
        setTimeout(updateArrows, 350);
    }));
    cardsContainer.addEventListener('scroll', updateArrows);
    updateArrows();

    // Mobile: align arrows to right
    function handleMobileArrows() {
        if (window.innerWidth <= 600) {
            arrows.style.justifyContent = 'flex-end';
            arrows.style.width = '100%';
            arrows.style.marginTop = '0.7rem';
        } else {
            arrows.style.justifyContent = '';
            arrows.style.width = '';
            arrows.style.marginTop = '';
        }
    }
    window.addEventListener('resize', handleMobileArrows);
    handleMobileArrows();

    // Card animation on load
    const cards = document.querySelectorAll('.open-position-card, .benefit-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Filter positions by category
    const categoryCards = document.querySelectorAll('.job-category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = card.querySelector('.job-category-title').textContent.trim();
            let category = '';
            if (title.includes('Retail')) category = 'retail';
            else if (title.includes('Content')) category = 'content';
            else if (title.includes('Human')) category = 'hr';
            else if (title.includes('Finance')) category = 'finance';
            filterByCategory(category, card);
        });
    });

    function filterByCategory(category, clickedCard) {
        const positionCards = document.querySelectorAll('.open-position-card');
        positionCards.forEach(card => {
            if (card.dataset.category === category) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
        // Highlight selected
        categoryCards.forEach(card => card.classList.remove('active-category'));
        if (clickedCard) clickedCard.classList.add('active-category');
        // Reset after 3s
        setTimeout(() => {
            positionCards.forEach(card => {
                card.style.display = 'flex';
            });
            categoryCards.forEach(card => card.classList.remove('active-category'));
        }, 3000);
    }

    // View all positions
    const viewAllBtn = document.getElementById('viewAllPositionsBtn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function () {
            const positionCards = document.querySelectorAll('.open-position-card');
            positionCards.forEach(card => {
                card.style.display = 'flex';
            });
            document.querySelector('.open-positions-section').scrollIntoView({ behavior: 'smooth' });
            alert('Showing all available positions');
        });
    }

    // Apply Now buttons
    const applyBtns = document.querySelectorAll('.open-position-apply');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const position = btn.getAttribute('data-position');
            alert(`Thank you for your interest in the ${position} position! You would be redirected to the application form.`);
        });
    });

    // FadeIn animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}); 