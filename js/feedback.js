// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 反馈表单提交功能
    setupFeedbackForm();
});


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