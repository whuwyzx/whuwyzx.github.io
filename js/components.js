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
            
            // 导航栏加载完成后，设置滚动行为
            setupNavbarScrollBehavior();
            setActiveNavItem();
            adjustContentMargin();
            
        } catch (error) {
            console.error('加载导航栏组件失败:', error);
        }
    }

    // 加载页脚
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        try {
            const response = await fetch('/components/footer.html');
            const html = await response.text();
            footerPlaceholder.innerHTML = html;
        } catch (error) {
            console.error('加载页脚组件失败:', error);
        }
    }
}

/**
 * 动态调整主内容区的上边距以匹配导航栏高度
 */
function adjustContentMargin() {
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('.main-content');
    
    if (navbar && mainContent) {
        // 获取导航栏的实际高度
        const navbarHeight = navbar.offsetHeight;
        // 设置主内容区的上边距
        mainContent.style.marginTop = navbarHeight + 'px';
        
        // 监听窗口大小变化，重新调整边距
        window.addEventListener('resize', function() {
            const updatedNavbarHeight = navbar.offsetHeight;
            mainContent.style.marginTop = updatedNavbarHeight + 'px';
        });
    }
}

// 在窗口加载完成时再次调整，确保所有元素都已完全渲染
window.addEventListener('load', function() {
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('.main-content');
    
    if (navbar && mainContent) {
        mainContent.style.marginTop = navbar.offsetHeight + 'px';
    }
});

/**
 * 设置当前页面的导航项为活动状态
 */
function setActiveNavItem() {
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
}

/**
 * 导航栏滚动行为控制
 * 向下滚动时隐藏，只有向上滚动时才显示
 */
function setupNavbarScrollBehavior() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        // 判断滚动方向
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;
        const scrollAmount = Math.abs(currentScrollY - lastScrollY);
        
        // 只在滚动量超过阈值时处理，避免微小滚动触发
        if (scrollAmount > 5) {
            // 如果向下滚动且不在顶部，则隐藏导航栏
            if (scrollingDown && currentScrollY > 50) {
                navbar.classList.add('navbar-hidden');
            } 
            // 如果向上滚动，则显示导航栏
            else if (!scrollingDown) {
                navbar.classList.remove('navbar-hidden');
            }
            
            // 更新上次滚动位置
            lastScrollY = currentScrollY;
        }
        
        // 如果在页面顶部，始终显示导航栏
        if (currentScrollY <= 10) {
            navbar.classList.remove('navbar-hidden');
        }
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadComponents);