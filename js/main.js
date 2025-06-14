// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // // 导航功能
    // setupNavigationTabs();
    
    // 部门子导航功能
    setupDepartmentTabs();
    
    // 反馈表单提交功能
    setupFeedbackForm();
    
    // 添加交互动画
    setupAnimations();
});

// /**
//  * 设置主导航标签页功能
//  */
// function setupNavigationTabs() {
//     const navItems = document.querySelectorAll('.nav-item');
//     const pages = document.querySelectorAll('.page');

//     navItems.forEach(item => {
//         item.addEventListener('click', () => {
//             // 移除所有活动状态
//             navItems.forEach(nav => nav.classList.remove('active'));
//             pages.forEach(page => page.classList.remove('active'));
            
//             // 添加活动状态
//             item.classList.add('active');
//             const targetPage = document.getElementById(item.dataset.page);
//             if (targetPage) {
//                 targetPage.classList.add('active');
//             }
//         });
//     });
// }

/**
 * 设置部门子导航功能
 */
function setupDepartmentTabs() {
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    const deptContents = document.querySelectorAll('.dept-content');

    subNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有活动状态
            subNavItems.forEach(nav => nav.classList.remove('active'));
            deptContents.forEach(content => content.style.display = 'none');
            
            // 添加活动状态
            item.classList.add('active');
            const targetDept = document.getElementById(item.dataset.dept);
            if (targetDept) {
                targetDept.style.display = 'block';
            }
        });
    });
}

/**
 * 设置反馈表单提交功能
 */
function setupFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止表单的默认提交行为

            // 获取表单数据
            const formData = new FormData(this);

            // 使用 fetch 发送 POST 请求到 FormCarry
            fetch('https://formcarry.com/s/GPx8R_urfJM', {
                method: 'POST',
                body: formData
            })
            .then(() => {
                // 显示成功消息
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'block';

                    // 重置表单
                    this.reset();

                    // 3秒后隐藏成功消息
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 3000);
                }
            })
            .catch(error => {
                // 处理错误（如果需要）
                console.error('提交反馈时发生错误:', error);
            });
        });
    }
}

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