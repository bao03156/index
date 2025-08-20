let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.hero .dot');
const slider = document.querySelector('.slider');
const totalSlides = slides.length;
let slideInterval;

function goToSlide(index) {
    currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

goToSlide(0);
startSlider();

document.querySelector('.slider-btn.next').addEventListener('click', () => {
    stopSlider();
    nextSlide();
    startSlider();
});

document.querySelector('.slider-btn.prev').addEventListener('click', () => {
    stopSlider();
    prevSlide();
    startSlider();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopSlider();
        goToSlide(index);
        startSlider();
    });
});

window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    backToTop.classList.toggle('show', window.scrollY > 300);
});

document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = this.parentElement;
            const dropdown = this.nextElementSibling;
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            this.querySelector('.dropdown-icon').classList.toggle('fa-rotate-180');
            dropdownToggles.forEach(other => {
                if (other !== this) {
                    other.nextElementSibling.style.display = 'none';
                    other.querySelector('.dropdown-icon').classList.remove('fa-rotate-180');
                }
            });
        }
    });
});