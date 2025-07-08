// 用户数据存储
const users = {};

// 登录/注册切换
document.getElementById('show-register').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// 注册处理
document.getElementById('register').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    
    if (username && password) {
        if (users[username]) {
            alert('用户名已存在');
        } else {
            users[username] = { password, tasks: [] };
            alert('注册成功，请登录');
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register').reset();
        }
    }
});

// 登录处理
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    if (username && password) {
        if (users[username] && users[username].password === password) {
            // 登录成功
            currentUser = username;
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('app-container').style.display = 'block';
            document.getElementById('login').reset();
            
            // 加载用户任务
            loadTasks();
        } else {
            alert('用户名或密码错误');
        }
    }
});

// 退出登录
document.getElementById('logout-btn').addEventListener('click', function() {
    currentUser = null;
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('task-list').innerHTML = '';
});

// 用户任务管理
let currentUser = null;

function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    if (currentUser && users[currentUser]) {
        users[currentUser].tasks.forEach(task => {
            addTask(task, false);
        });
    }
}

// 添加翻译字典
const translations = {
    'zh-CN': {
        '我的待办事项': '我的待办事项',
        '添加新任务...': '添加新任务...',
        '添加': '添加',
        '删除': '删除',
        '退出登录': '退出登录',
        'English': 'English'
    },
    'en-US': {
        '我的待办事项': 'My To-Do List',
        '添加新任务...': 'Add new task...',
        '添加': 'Add',
        '删除': 'Delete',
        '退出登录': 'Logout',
        'English': '中文'
    }
};

// 当前语言
let currentLang = 'zh-CN';

// 语言切换
document.getElementById('toggle-lang').addEventListener('click', function() {
    currentLang = currentLang === 'zh-CN' ? 'en-US' : 'zh-CN';
    translatePage();
});

// 翻译页面
function translatePage() {
    // 更新按钮文本
    document.getElementById('toggle-lang').textContent = translations[currentLang]['English'];
    
    // 翻译静态文本
    document.getElementById('app-title').textContent = translations[currentLang]['我的待办事项'];
    document.getElementById('task-input').placeholder = translations[currentLang]['添加新任务...'];
    document.getElementById('add-btn').textContent = translations[currentLang]['添加'];
    document.getElementById('logout-btn').textContent = translations[currentLang]['退出登录'];
    
    // 翻译现有任务中的删除按钮
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.textContent = translations[currentLang]['删除'];
    });
}

// 在删除按钮创建时也应用翻译
function addTask(taskText, save = true) {
    const taskList = document.getElementById('task-list');
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">${translations[currentLang]['删除']}</button>
    `;
    
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        if (currentUser && save) {
            users[currentUser].tasks = users[currentUser].tasks.filter(t => t !== taskText);
        }
    });
    
    taskList.appendChild(li);
    
    if (currentUser && save) {
        users[currentUser].tasks.push(taskText);
    }
}

// 保留原有任务添加逻辑
document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(taskText) {
    const taskList = document.getElementById('task-list');
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">删除</button>
    `;
    
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
    });
    
    taskList.appendChild(li);
}

// 在页面加载时创建泡泡
window.addEventListener('load', function() {
    // 创建泡泡
    for (let i = 0; i < 20; i++) {
        createBubble();
    }
    
    // 创建海浪
    const wave = document.createElement('div');
    wave.className = 'wave';
    document.body.appendChild(wave);
    
    // 鼠标移动事件
    document.addEventListener('mousemove', function(e) {
        const bubbles = document.querySelectorAll('.bubble');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        bubbles.forEach(bubble => {
            const bubbleX = parseInt(bubble.style.left) || 0;
            const bubbleY = parseInt(bubble.style.top) || 0;
            
            // 计算泡泡移动方向
            const dx = (mouseX - bubbleX) * 0.02;
            const dy = (mouseY - bubbleY) * 0.02;
            
            bubble.style.transform = `translate(${dx}px, ${dy}px)`;
        });
    });
});

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // 随机大小
    const size = Math.random() * 60 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // 随机位置
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `${Math.random() * 100}%`;
    
    // 随机动画延迟
    bubble.style.animationDelay = `${Math.random() * 15}s`;
    
    document.body.appendChild(bubble);
}