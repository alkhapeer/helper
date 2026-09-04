// ================================================================
// المتغيرات العامة
// ================================================================
let SUBJECTS = [];
let LESSONS = [];
let TESTS = [];

// ================================================================
// تحميل البيانات من ملفات JSON
// ================================================================
async function loadAllData() {
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
  } catch (error) {
    console.error('خطأ في تحميل البيانات:', error);
    // محاولة استخدام بيانات افتراضية في حال فشل التحميل
    alert('حدث خطأ في تحميل البيانات، تأكد من وجود ملفات JSON.');
  }
}

// ================================================================
// التنقل بين الصفحات
// ================================================================
function navigateTo(page) {
  switch (page) {
    case 'home': renderHome(); break;
    case 'train': renderTrain(); break;
    case 'test': renderTests(); break;
    case 'analysis': renderAnalysis(); break;
    case 'plan': renderPlan(); break;
  }
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
}

// ================================================================
// المودال
// ================================================================
function showModal(html) {
  document.getElementById('contentModalBody').innerHTML = html;
  document.getElementById('contentModal').classList.add('active');
}

function closeModal() {
  document.getElementById('contentModal').classList.remove('active');
}

document.getElementById('contentModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ================================================================
// دوال تفاعل الدروس والاختبارات
// ================================================================

function openLesson(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  const user = loadUser();
  if (user.completedLessons.includes(lessonId)) {
    alert('هذا الدرس مكتمل بالفعل!');
    return;
  }
  const subject = SUBJECTS.find(s => s.id === lesson.subjectId);
  
  // بناء المحتوى مع تنسيق أفضل
  const html = `
    <div class="lesson-header">
      <h2>${lesson.title}</h2>
      <div class="meta">
        <i class="fas fa-book"></i> ${subject ? subject.name : ''} 
        <span style="margin:0 8px;">•</span>
        <i class="fas fa-signal"></i> ${lesson.difficulty === 'easy' ? 'تأسيسي' : lesson.difficulty === 'medium' ? 'متوسط' : 'متقدم'}
      </div>
    </div>
    <div class="lesson-content">
      ${lesson.content || '<p class="text-muted">لا يوجد محتوى لهذا الدرس حالياً.</p>'}
    </div>
    <div class="modal-actions">
      <button class="btn btn-outline" onclick="closeModal()"><i class="fas fa-arrow-right"></i> رجوع</button>
      <button class="btn btn-success" onclick="completeLesson('${lessonId}')"><i class="fas fa-check"></i> إنهاء الدرس</button>
    </div>
  `;
  showModal(html);
}

function completeLesson(lessonId) {
  const user = loadUser();
  if (user.completedLessons.includes(lessonId)) { closeModal(); return; }
  user.completedLessons.push(lessonId);
  user.points = (user.points || 0) + 10;
  const plan = user.plan.length ? user.plan : generatePlan(user);
  const firstPending = plan.find(p => !p.done);
  if (firstPending) firstPending.done = true;
  user.plan = plan;
  saveUser(user);
  closeModal();
  renderHome();
  updateHeader();
  alert('✅ تم إكمال الدرس بنجاح!');
}

function startTest(testId) {
  const test = TESTS.find(t => t.id === testId);
  if (!test) return;
  const user = loadUser();
  if (user.testResults.find(r => r.testId === testId)) {
    alert('قمت بهذا الاختبار بالفعل.');
    return;
  }
  let html = `<h2>${test.title}</h2><form id="quizForm">`;
  test.questions.forEach((q, idx) => {
    html += `
      <div style="background:#f8faff; padding:12px; border-radius:16px; margin-bottom:12px;">
        <div style="font-weight:600; margin-bottom:8px;">${idx+1}. ${q.q}</div>
        ${q.options.map((opt, oi) => `
          <label class="option"><input type="radio" name="q${idx}" value="${oi}" required /> ${opt}</label>
        `).join('')}
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
      user.points = (user.points || 0) + 20;
      saveUser(user);
    }
    document.getElementById('quizResult').innerHTML = `
      <div class="result-box">
        <div class="score-big">${percent}%</div>
        <div>الإجابات الصحيحة: ${correct} من ${test.questions.length}</div>
        <button class="btn btn-sm btn-success" onclick="closeModal(); renderHome(); updateHeader();" style="margin-top:10px;">عرض النتائج</button>
      </div>
    `;
    document.getElementById('quizForm').querySelector('button[type="submit"]').disabled = true;
    updateHeader();
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

// ================================================================
// إدارة الملف الشخصي
// ================================================================

function editProfile() {
  const user = loadUser();
  document.getElementById('inputName').value = user.name || '';
  document.querySelectorAll('#stageOptions button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.stage === user.stage);
  });
  document.getElementById('welcomeTitle').textContent = 'تعديل الملف الشخصي';
  document.getElementById('welcomeSub').textContent = 'يمكنك تغيير اسمك ومرحلتك';
  document.getElementById('startAppBtn').textContent = 'حفظ التغييرات';
  document.getElementById('welcomeModal').classList.add('active');
}

function closeWelcomeModal() {
  document.getElementById('welcomeModal').classList.remove('active');
}

// ================================================================
// دوال مساعدة (إعادة تعيين، بيانات نموذجية)
// ================================================================

function resetProgress() {
  if (confirm('هل أنت متأكد من حذف كل تقدمك؟')) {
    const oldUser = loadUser();
    const def = getDefaultUser();
    def.name = oldUser.name || '';
    def.stage = oldUser.stage || '';
    saveUser(def);
    renderHome();
    updateHeader();
  }
}

function addSampleData() {
  const user = loadUser();
  const stageLessons = getLessonsForStage(user.stage);
  const sampleIds = stageLessons.slice(0, 3).map(l => l.id);
  let added = 0;
  sampleIds.forEach(id => {
    if (!user.completedLessons.includes(id)) {
      user.completedLessons.push(id);
      user.points = (user.points || 0) + 10;
      added++;
    }
  });
  saveUser(user);
  renderHome();
  updateHeader();
  alert(`تمت إضافة ${added} دروس نموذجية!`);
}

// ================================================================
// تحديث الرأس
// ================================================================

function updateHeader() {
  const user = loadUser();
  document.getElementById('userNameDisplay').textContent = user.name || 'طالب';
  document.getElementById('userStageDisplay').textContent = user.stage || '';
  document.getElementById('userPointsDisplay').textContent = user.points || 0;
}

// ================================================================
// التهيئة الأولية
// ================================================================

function initApp() {
  let user = loadUser();

  // إذا لم تكن هناك مرحلة محددة، نعرض شاشة الترحيب
  if (!user.stage) {
    document.getElementById('welcomeModal').classList.add('active');
    document.getElementById('startAppBtn').onclick = function() {
      const name = document.getElementById('inputName').value.trim();
      const stage = document.querySelector('#stageOptions button.active')?.dataset.stage || 'ثانوي';
      if (!name) {
        alert('الرجاء إدخال اسمك');
        return;
      }
      user.name = name;
      user.stage = stage;
      user.plan = generatePlan(user);
      saveUser(user);
      closeWelcomeModal();
      updateHeader();
      navigateTo('home');
    };
    return;
  }

  // إذا كانت المرحلة موجودة، نعرض التطبيق مباشرة
  updateHeader();
  navigateTo('home');
}

// ================================================================
// ربط الأحداث
// ================================================================

document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
  btn.addEventListener('click', function() {
    navigateTo(this.dataset.page);
  });
});

document.getElementById('welcomeModal').addEventListener('click', function(e) {
  if (e.target === this) {
    const user = loadUser();
    if (!user.stage) return;
    this.classList.remove('active');
  }
});

document.querySelectorAll('#stageOptions button').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('#stageOptions button').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// ================================================================
// بدء التطبيق
// ================================================================

document.addEventListener('DOMContentLoaded', loadAllData);
