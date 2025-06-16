/**
 * 图片轮播功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播元素
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    
    // 设置当前索引
    let currentIndex = 0;
    let autoplayInterval;
    
    // 初始化轮播
    initCarousel();
    
    function initCarousel() {
        // 设置轮播宽度
        updateSlidePosition();
        
        // 添加事件监听
        nextButton.addEventListener('click', moveToNextSlide);
        prevButton.addEventListener('click', moveToPrevSlide);
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.dataset.index);
                moveToSlide(slideIndex);
            });
        });
        
        // 鼠标悬停时暂停自动播放，移开时恢复
        const carousel = document.querySelector('.carousel-container');
        carousel.addEventListener('mouseenter', pauseAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        
        // 开始自动播放
        startAutoplay();
    }
    
    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新小圆点
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }
    
    function moveToNextSlide() {
        if (currentIndex === slides.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlidePosition();
    }
    
    function moveToPrevSlide() {
        if (currentIndex === 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex--;
        }
        updateSlidePosition();
    }
    
    function moveToSlide(index) {
        currentIndex = index;
        updateSlidePosition();
    }
    
    function startAutoplay() {
        // 每5秒自动切换到下一张
        autoplayInterval = setInterval(moveToNextSlide, 5000);
    }
    
    function pauseAutoplay() {
        clearInterval(autoplayInterval);
    }
});