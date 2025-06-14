/**
 * 加载公共组件
 */
async function loadComponents() {
    // 加载导航栏
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        try {
            const response = await fetch('/components/navbar.html');
            const html = await response.text();
            navbarPlaceholder.innerHTML = html;
            
            // 根据当前页面路径设置活动导航项
            const currentPath = window.location.pathname;
            let activeNavId = 'nav-overview'; // 默认为概览页
            
            if (currentPath.includes('/departments/')) {
                activeNavId = 'nav-departments';
            } else if (currentPath.includes('/activities/')) {
                activeNavId = 'nav-activities';
            } else if (currentPath.includes('/feedback/')) {
                activeNavId = 'nav-feedback';
            }
            
            // 设置当前页面的导航项为活动状态
            const activeItem = document.getElementById(activeNavId);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        } catch (error) {
            console.error('加载导航栏组件失败:', error);
        }
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadComponents);