// 导航菜单切换
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// 点击菜单项后关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// 平滑滚动函数
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // 考虑导航栏高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .timeline-item, .destination-card, .testimonial-card, .contact-info, .contact-form'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// 旅行表单处理
const travelForm = document.getElementById('travelForm');

travelForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(travelForm);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        travelType: formData.get('travelType'),
        destination: formData.get('destination'),
        budget: formData.get('budget'),
        requirements: formData.get('requirements')
    };
    
    // 表单验证
    if (!validateTravelForm(data)) {
        return;
    }
    
    // 显示提交状态
    const submitBtn = travelForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '提交中...';
    submitBtn.disabled = true;
    
    try {
        // 模拟API调用
        await simulateTravelFormSubmission(data);
        
        // 成功提示
        showNotification('旅行定制需求提交成功！我们的专属旅行顾问将在24小时内与您联系，为您量身定制专属旅程。', 'success');
        travelForm.reset();
        
    } catch (error) {
        // 错误提示
        showNotification('提交失败，请稍后重试或直接致电我们的专属热线 400-VERTU-88。', 'error');
    } finally {
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// 旅行表单验证函数
function validateTravelForm(data) {
    const errors = [];
    
    // 姓名验证
    if (!data.name || data.name.trim().length < 2) {
        errors.push('请输入有效的姓名');
    }
    
    // 电话验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        errors.push('请输入有效的手机号码');
    }
    
    // 邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('请输入有效的邮箱地址');
    }
    
    // 旅行类型验证
    if (!data.travelType) {
        errors.push('请选择旅行类型');
    }
    
    // 目的地验证
    if (!data.destination) {
        errors.push('请选择首选目的地');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// 模拟旅行表单提交
function simulateTravelFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟95%成功率
            if (Math.random() > 0.05) {
                console.log('旅行定制需求数据:', data);
                resolve();
            } else {
                reject(new Error('网络错误'));
            }
        }, 2500);
    });
}

// 通知函数
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #d4af37 0%, #f4e4a6 100%)' : 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 450px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
    `;
    
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 1.5rem;
        font-weight: bold;
    `;
    
    const messageEl = notification.querySelector('.notification-message');
    messageEl.style.cssText = `
        flex: 1;
        white-space: pre-line;
        line-height: 1.6;
        font-size: 1rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.8rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
    });
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 关闭功能
    const closeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // 自动关闭
    setTimeout(closeNotification, 6000);
}

// 目的地卡片交互
document.addEventListener('DOMContentLoaded', () => {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('click', () => {
            const destination = card.getAttribute('data-destination');
            showDestinationDetails(destination);
        });
    });
});

// 显示目的地详情
function showDestinationDetails(destination) {
    const destinationInfo = {
        'maldives': {
            title: '马尔代夫私人岛屿度假',
            description: '在印度洋的蓝宝石上，享受无与伦比的奢华体验。私人岛屿、水上别墅、专属海滩，让您远离尘嚣，沉浸在纯净的自然美景中。',
            features: ['私人岛屿独享', '水上别墅住宿', '专属海滩服务', '潜水探索体验', '私人管家服务']
        },
        'tuscany': {
            title: '托斯卡纳艺术美食之旅',
            description: '在意大利文艺复兴的发源地，体验艺术与美食的完美融合。古老的庄园、世界级的艺术品、米其林星级美食，为您呈现最纯正的意式奢华。',
            features: ['历史庄园住宿', '私人艺术导览', '米其林餐厅体验', '葡萄酒庄参观', '手工艺品定制']
        },
        'antarctica': {
            title: '南极探险奢华之旅',
            description: '踏上地球最后的净土，在世界尽头感受大自然的震撼力量。豪华探险船、专业科考团队、极地野生动物，开启一场终生难忘的极地探险。',
            features: ['豪华探险邮轮', '专业科考向导', '极地野生动物观察', '冰川徒步体验', '极地摄影指导']
        },
        'kyoto': {
            title: '京都文化深度体验',
            description: '在千年古都感受日本文化的精髓，从传统茶道到现代艺术，从古老寺庙到精致料理，体验东方美学的极致表达。',
            features: ['传统茶道体验', '私人寺庙参观', '和服文化体验', '怀石料理品鉴', '传统工艺学习']
        }
    };
    
    const info = destinationInfo[destination];
    if (info) {
        showDestinationModal(info);
    }
}

// 显示目的地模态框
function showDestinationModal(info) {
    const modal = document.createElement('div');
    modal.className = 'destination-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${info.title}</h2>
            <p class="modal-description">${info.description}</p>
            <h3>特色体验</h3>
            <ul class="modal-features">
                ${info.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="scrollToSection('contact')">定制此行程</button>
                <button class="btn btn-secondary modal-close-btn">了解更多</button>
            </div>
        </div>
    `;
    
    // 添加模态框样式
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: linear-gradient(135deg, #fff 0%, #f8f8f8 100%);
        padding: 50px;
        border-radius: 25px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 25px;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        transition: color 0.3s ease;
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 显示动画
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 100);
    
    // 关闭功能
    const closeModal = () => {
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    
    // ESC键关闭
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 为所有按钮添加点击效果
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // 创建波纹效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // 添加波纹动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .modal-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: #000;
            margin-bottom: 20px;
        }
        
        .modal-description {
            color: #666;
            line-height: 1.8;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        .modal-content h3 {
            font-family: 'Playfair Display', serif;
            color: #d4af37;
            margin-bottom: 15px;
        }
        
        .modal-features {
            list-style: none;
            margin-bottom: 30px;
        }
        
        .modal-features li {
            padding: 8px 0;
            color: #666;
            position: relative;
            padding-left: 25px;
        }
        
        .modal-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #d4af37;
            font-weight: bold;
        }
        
        .modal-actions {
            display: flex;
            gap: 20px;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
});

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    // ESC键关闭移动端菜单
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// 窗口大小改变时的处理
window.addEventListener('resize', () => {
    // 如果窗口变大，关闭移动端菜单
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// 页面滚动到顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 显示/隐藏回到顶部按钮
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 如果没有回到顶部按钮，创建一个
    let backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.onclick = scrollToTop;
        
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #d4af37 0%, #f4e4a6 100%);
            color: #000;
            border: none;
            border-radius: 50%;
            font-size: 1.8rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
            transition: all 0.3s ease;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
        `;
        
        document.body.appendChild(backToTopBtn);
    }
    
    // 显示/隐藏按钮
    if (scrollTop > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
        backToTopBtn.style.transform = 'translateY(0)';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transform = 'translateY(20px)';
    }
});

// 统计数字动画
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(target.replace('+', '').replace('%', ''));
        
        if (isNumber) {
            const finalNumber = parseInt(target.replace('+', '').replace('%', ''));
            const suffix = target.includes('+') ? '+' : target.includes('%') ? '%' : '';
            let current = 0;
            const increment = finalNumber / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    current = finalNumber;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 30);
        }
    });
}

// 当统计区域进入视口时开始动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});