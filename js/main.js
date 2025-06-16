// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加交互动画
    setupAnimations();
});


/**
 * 设置卡片交互动画
 */
function setupAnimations() {
    // 为卡片添加悬停效果
    const cards = document.querySelectorAll('.feature-card, .staff-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}