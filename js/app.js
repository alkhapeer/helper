// تحميل البيانات من JSON (نفترض أنها معرفة عالمياً)
let SUBJECTS = [];
let LESSONS = [];
let TESTS = [];

// تحميل البيانات (سنقوم بجلبها عبر fetch أو تضمينها)
async function loadData() {
    try {
        const [subs, less, tests] = await Promise.all([
            fetch('data/subjects.json').then(r => r.json()),
            fetch('data/lessons.json').then(r => r.json()),
            fetch('data/tests.json').then(r => r.json())
        ]);
        SUBJECTS = subs;
        LESSONS = less;
        TESTS = tests;
        initApp();
    } catch (e) {
        // في حال عدم وجود خادم، نستخدم البيانات المضمنة (تعريفات احتياطية)
        console.warn('استخدام البيانات المضمنة');
        // يمكن وضع بيانات افتراضية هنا
        initApp();
    }
}

// دوال مساعدة عامة
function getSubjectsForStage(stage) {
    if (stage === 'all') return SUBJECTS;
    return SUBJECTS.filter(s => s.stage === stage);
}

function getOverallProgress(user) {
    const total = LESSONS.length;
    const completed = user.completedLessons.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
}

function getWeakTopics(user) {
    const map = {};
    user.testResults.forEach(tr => {
        const test = TESTS.find(t => t.id === tr.testId);
        if (!test) return;
        const subject = SUBJECTS.find(s => s.id === test.subjectId);
        if (!subject) return;
        if (!map[subject.name]) map[subject.name] = [];
        map[subject.name].push(tr.score);
    });
    const weak = [];
    for (let sub in map) {
        const avg = map[sub].reduce((a,b) => a+b, 0) / map[sub].length;
        if (avg < 70) weak.push({ subject: sub, score: Math.round(avg) });
    }
    weak.sort((a,b) => a.score - b.score);
    return weak;
}

function getStrengths(user) {
    const map = {};
    user.testResults.forEach(tr => {
        const test = TESTS.find(t => t.id === tr.testId);
        if (!test) return;
        const subject = SUBJECTS.find(s => s.id === test.subjectId);
        if (!subject) return;
        if (!map[subject.name]) map[subject.name] = [];
        map[subject.name].push(tr.score);
    });
    const strong = [];
    for (let sub in map) {
        const avg = map[sub].reduce((a,b) => a+b, 0) / map[sub].length;
        if (avg >= 80) strong.push({ subject: sub, score: Math.round(avg) });
    }
    strong.sort((a,b) => b.score - a.score);
    return strong;
}

function generatePlan(user) {
    const days = ['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس'];
    const weak = getWeakTopics(user);
    const plan = [];
    const minutes = user.dailyMinutes || 60;
    for (let i = 0; i < 7; i++) {
        let task = 'مراجعة عامة';
        if (weak.length > 0 && i < weak.length) task = `تدريب على ${weak[i].subject}`;
        else if (i === 0) task = 'مراجعة الأخطاء';
        else if (i === 1) task = 'اختبار قصير';
        else if (i === 2) task = 'حل تمارين متنوعة';
        else if (i === 3) task = 'مراجعة المفاهيم الأساسية';
        else if (i === 4) task = 'تدريب على المهارات الضعيفة';
        else if (i === 5) task = 'اختبار تجريبي';
        else task = 'مراجعة شاملة';
        const oldPlan = user.plan || [];
        const oldItem = oldPlan.find(p => p.day === days[i]);
        plan.push({ day: days[i], task, done: oldItem ? oldItem.done : false });
    }
    return plan;
}

// دوال التنقل
function navigateTo(page) {
    // إعادة توجيه لتحميل الصفحة المناسبة
    switch(page) {
        case 'home': renderHome(); break;
        case 'train': renderTrain(); break;
        case 'test': renderTests(); break;
        case 'analysis': renderAnalysis(); break;
        case 'plan': renderPlan(); break;
    }
    // تحديث شريط التنقل
    document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });
}

// المودال
function showModal(html) {
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('modalOverlay').classList.add('active');
}
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// دوال تفاعل الدروس والاختبارات
function openLesson(lessonId) {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) return;
    const user = loadUser();
    if (user.completedLessons.includes(lessonId)) return alert('هذا الدرس مكتمل!');
    const html = `
        <h2>${lesson.title}</h2>
        <div class="text-muted">${SUBJECTS.find(s=>s.id===lesson.subjectId)?.name || ''}</div>
        <div style="background:#f8faff; padding:16px; border-radius:16px; line-height:1.8; margin:12px 0;">${lesson.content || 'لا يوجد محتوى حالياً.'}</div>
        <div class="modal-actions">
            <button class="btn btn-outline" onclick="closeModal()">رجوع</button>
            <button class="btn btn-success" onclick="completeLesson('${lessonId}')">إنهاء الدرس</button>
        </div>
    `;
    showModal(html);
}

function completeLesson(lessonId) {
    const user = loadUser();
    if (user.completedLessons.includes(lessonId)) { closeModal(); return; }
    user.completedLessons.push(lessonId);
    user.points += 10;
    const plan = user.plan.length ? user.plan : generatePlan(user);
    const firstPending = plan.find(p => !p.done);
    if (firstPending) firstPending.done = true;
    user.plan = plan;
    saveUser(user);
    closeModal();
    navigateTo('home');
    alert('✅ تم إكمال الدرس بنجاح!');
}

function startTest(testId) {
    const test = TESTS.find(t => t.id === testId);
    if (!test) return;
    const user = loadUser();
    if (user.testResults.find(r => r.testId === testId)) return alert('قمت بهذا الاختبار بالفعل.');
    let html = `<h2>${test.title}</h2><form id="quizForm">`;
    test.questions.forEach((q, idx) => {
        html += `
            <div style="background:#f8faff; padding:12px; border-radius:16px; margin-bottom:12px;">
                <div style="font-weight:600; margin-bottom:8px;">${idx+1}. ${q.q}</div>
                ${q.options.map((opt, oi) => `<label class="option"><input type="radio" name="q${idx}" value="${oi}" required /> ${opt}</label>`).join('')}
            </div>
        `;
    });
    html += `
        <div class="modal-actions">
            <button type="button" class="btn btn-outline" onclick="closeModal()">إلغاء</button>
            <button type="submit" class="btn"><i class="fas fa-paper-plane"></i> إرسال</button>
        </div>
    </form>
    <div id="quizResult"></div>
    `;
    showModal(html);

    document.getElementById('quizForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        let correct = 0;
        test.questions.forEach((q, idx) => {
            const selected = formData.get(`q${idx}`);
            if (selected !== null && parseInt(selected) === q.correct) correct++;
        });
        const percent = Math.round((correct / test.questions.length) * 100);
        if (!user.testResults.find(r => r.testId === testId)) {
            user.testResults.push({ testId, score: percent });
            user.points += 20;
            saveUser(user);
        }
        document.getElementById('quizResult').innerHTML = `
            <div class="result-box">
                <div class="score-big">${percent}%</div>
                <div>الإجابات الصحيحة: ${correct} من ${test.questions.length}</div>
                <button class="btn btn-sm btn-success" onclick="closeModal(); navigateTo('home');" style="margin-top:10px;">عرض النتائج</button>
            </div>
        `;
        document.getElementById('quizForm').querySelector('button[type="submit"]').disabled = true;
    });
}

function togglePlanDay(idx) {
    const user = loadUser();
    const plan = user.plan.length ? user.plan : generatePlan(user);
    if (idx >= 0 && idx < plan.length) {
        plan[idx].done = !plan[idx].done;
        user.plan = plan;
        saveUser(user);
        renderPlan();
    }
}

function generatePlanFromUI() {
    const user = loadUser();
    user.plan = generatePlan(user);
    saveUser(user);
    renderPlan();
    alert('تم إعادة بناء الخطة بنجاح!');
}

// تهيئة التطبيق
function initApp() {
    let user = loadUser();
    if (!user.plan || user.plan.length === 0) {
        user.plan = generatePlan(user);
        saveUser(user);
    }
    if (!user.name || user.name === 'طالب') {
        const name = prompt('مرحباً! ما اسمك؟', 'طالب');
        if (name && name.trim()) {
            user.name = name.trim();
            saveUser(user);
        }
    }
    // عرض الصفحة الافتراضية
    navigateTo('home');
    // تحديث اسم المستخدم في الرأس
    document.getElementById('userNameDisplay').textContent = user.name;
    // ربط أزرار التنقل
    document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
        btn.addEventListener('click', function() {
            navigateTo(this.dataset.page);
        });
    });
}

// تحميل البيانات
loadData();