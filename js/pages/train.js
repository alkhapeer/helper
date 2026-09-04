function renderTrain() {
    const user = loadUser();
    const container = document.getElementById('page-container');
    const subjects = getSubjectsForStage(user.stage || 'all');
    let html = `
        <div class="page active" id="page-train">
            <div class="stage-selector">
                <button class="stage-btn ${user.stage === 'all' ? 'active' : ''}" data-stage="all">الكل</button>
                <button class="stage-btn ${user.stage === 'ابتدائي' ? 'active' : ''}" data-stage="ابتدائي">ابتدائي</button>
                <button class="stage-btn ${user.stage === 'اعدادي' ? 'active' : ''}" data-stage="اعدادي">اعدادي</button>
                <button class="stage-btn ${user.stage === 'ثانوي' ? 'active' : ''}" data-stage="ثانوي">ثانوي</button>
            </div>
            <div id="subjectFilter" style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px;">
                <button class="subject-chip ${!user.selectedSubject ? 'active' : ''}" data-subject="all">الكل</button>
                ${subjects.map(s => `<button class="subject-chip ${user.selectedSubject === s.id ? 'active' : ''}" data-subject="${s.id}">${s.name}</button>`).join('')}
            </div>
            <div id="lessonsList">
                ${renderLessonsList(user, subjects)}
            </div>
        </div>
    `;
    container.innerHTML = html;

    // أحداث الأزرار
    container.querySelectorAll('.stage-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            user.stage = this.dataset.stage;
            user.selectedSubject = null;
            saveUser(user);
            renderTrain();
        });
    });
    container.querySelectorAll('.subject-chip').forEach(btn => {
        btn.addEventListener('click', function() {
            const subjectId = this.dataset.subject;
            user.selectedSubject = subjectId === 'all' ? null : subjectId;
            saveUser(user);
            renderTrain();
        });
    });
}

function renderLessonsList(user, subjects) {
    let lessons = [];
    if (user.selectedSubject) {
        lessons = LESSONS.filter(l => l.subjectId === user.selectedSubject);
    } else {
        const subjectIds = subjects.map(s => s.id);
        lessons = LESSONS.filter(l => subjectIds.includes(l.subjectId));
    }
    if (!lessons.length) return '<div class="text-muted">لا توجد دروس للمادة المختارة.</div>';
    const completedIds = new Set(user.completedLessons);
    return lessons.map(lesson => `
        <div class="lesson-item">
            <div class="info">
                <div class="title">${lesson.title}</div>
                <div class="sub">${lesson.difficulty === 'easy' ? 'تأسيسي' : lesson.difficulty === 'medium' ? 'متوسط' : 'متقدم'} • ${SUBJECTS.find(s=>s.id===lesson.subjectId)?.name || ''}</div>
            </div>
            <div class="actions">
                ${completedIds.has(lesson.id) ? '<span class="completed-badge"><i class="fas fa-check"></i> مكتمل</span>' : `<button class="btn btn-sm" onclick="openLesson('${lesson.id}')">بدء الدراسة</button>`}
            </div>
        </div>
    `).join('');
}