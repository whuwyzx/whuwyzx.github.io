/**
 * 部门内容加载脚本
 */
document.addEventListener('DOMContentLoaded', function() {
    // 加载部门内容
    loadDepartmentContents();
    
    // 初始化部门导航
    setupDepartmentTabs();
});

/**
 * 加载所有部门内容
 */
async function loadDepartmentContents() {
    const departments = ['zonglian', 'xinmeiti', 'meiyu', 'wenmeng'];
    
    for (const deptId of departments) {
        await loadDepartment(deptId);
    }
}

/**
 * 加载单个部门内容
 */
async function loadDepartment(deptId) {
    const container = document.getElementById(deptId);
    if (!container) return;
    
    try {
        const response = await fetch(`/components/departments/${deptId}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load department: ${response.status}`);
        }
        
        const html = await response.text();
        container.innerHTML = html;
        console.log(`Department ${deptId} loaded successfully`);
    } catch (error) {
        console.error(`Error loading department ${deptId}:`, error);
        container.innerHTML = `<p class="error">加载部门内容失败，请刷新页面重试。</p>`;
    }
}

/**
 * 设置部门子导航功能
 */
function setupDepartmentTabs() {
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    const deptContents = document.querySelectorAll('.dept-content');

    subNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有活动状态
            subNavItems.forEach(nav => nav.classList.remove('active'));
            deptContents.forEach(content => content.style.display = 'none');
            
            // 添加活动状态
            this.classList.add('active');
            const targetDeptId = this.dataset.dept;
            const targetDept = document.getElementById(targetDeptId);
            
            if (targetDept) {
                targetDept.style.display = 'block';
            }
        });
    });
}