/**
 * 图片轮播功能 - 改进的无限循环版本
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
    let isAnimating = false; // 防止动画过程中重复触发
    
    // 初始化轮播
    initCarousel();
    
    function initCarousel() {
        // 克隆第一张幻灯片并添加到末尾，用于无缝循环
        if (slides.length > 1) {
            const firstSlideClone = slides[0].cloneNode(true);
            track.appendChild(firstSlideClone);
        }
        
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
        
        // 监听过渡结束事件
        track.addEventListener('transitionend', handleTransitionEnd);
        
        // 鼠标悬停时暂停自动播放，移开时恢复
        const carousel = document.querySelector('.carousel-container');
        carousel.addEventListener('mouseenter', pauseAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        
        // 开始自动播放
        startAutoplay();
    }
    
    function updateSlidePosition(withAnimation = true) {
        if (withAnimation) {
            track.style.transition = 'transform 0.5s ease-in-out';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新小圆点 (只考虑原始幻灯片的数量)
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex % slides.length].classList.add('active');
    }
    
    function moveToNextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex++;
        updateSlidePosition();
    }
    
    function moveToPrevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        if (currentIndex === 0) {
            // 如果在第一张，先瞬间跳转到克隆的末尾幻灯片，再向左动画
            currentIndex = slides.length;
            updateSlidePosition(false);
            
            // 短暂延迟后开始动画，确保浏览器有时间渲染
            setTimeout(() => {
                currentIndex--;
                updateSlidePosition();
            }, 10);
        } else {
            currentIndex--;
            updateSlidePosition();
        }
    }
    
    function moveToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex = index;
        updateSlidePosition();
    }
    
    function handleTransitionEnd() {
        isAnimating = false;
        
        // 如果到达了克隆的第一张幻灯片，无动画地跳回真正的第一张
        if (currentIndex === slides.length) {
            currentIndex = 0;
            updateSlidePosition(false);
        }
    }
    
    function startAutoplay() {
        // 每5秒自动切换到下一张
        autoplayInterval = setInterval(moveToNextSlide, 5000);
    }
    
    function pauseAutoplay() {
        clearInterval(autoplayInterval);
    }
});