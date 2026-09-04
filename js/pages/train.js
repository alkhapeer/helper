function renderTrain() {
  const user = loadUser();
  const container = document.getElementById('page-container');
  const subjects = getSubjectsForStage(user.stage);
  const categories = getCategoriesForStage(user.stage);
  
  let html = `
    <div class="page active" id="page-train">
  `;

  // عرض الأقسام (للثانوي فقط)
  if (categories.length > 0) {
    html += `
      <div class="category-tabs">
        ${categories.map(cat => `
          <button class="category-tab ${user.selectedCategory === cat ? 'active' : ''}" data-category="${cat}">
            ${cat === 'قدرات' ? '🎯 قدرات' : '📚 تحصيلي'}
          </button>
        `).join('')}
      </div>
    `;
  }

  // عرض المواد حسب القسم المختار
  let filteredSubjects = subjects;
  if (user.selectedCategory) {
    filteredSubjects = subjects.filter(s => s.category === user.selectedCategory);
  }

  html += `
    <div class="subject-tabs">
      <button class="subject-tab ${!user.selectedSubject ? 'active' : ''}" data-subject="all">الكل</button>
      ${filteredSubjects.map(s => `
        <button class="subject-tab ${user.selectedSubject === s.id ? 'active' : ''}" data-subject="${s.id}">
          ${s.name}
        </button>
      `).join('')}
    </div>
    <div id="lessonsList">
  `;

  // عرض الدروس
  let lessons = getLessonsForStage(user.stage);
  if (user.selectedCategory) {
    const subjectIds = filteredSubjects.map(s => s.id);
    lessons = lessons.filter(l => subjectIds.includes(l.subjectId));
  }
  if (user.selectedSubject) {
    lessons = lessons.filter(l => l.subjectId === user.selectedSubject);
  }

  if (lessons.length === 0) {
    html += `<div class="text-muted">لا توجد دروس للمادة المختارة.</div>`;
  } else {
    const completedIds = new Set(user.completedLessons);
    lessons.forEach(lesson => {
      const isCompleted = completedIds.has(lesson.id);
      const diff = lesson.difficulty === 'easy' ? 'تأسيسي' : lesson.difficulty === 'medium' ? 'متوسط' : 'متقدم';
      const subjectName = SUBJECTS.find(s => s.id === lesson.subjectId)?.name || '';
      html += `
        <div class="lesson-item">
          <div class="info">
            <div class="title">${lesson.title}</div>
            <div class="sub">${diff} • ${subjectName}</div>
          </div>
          <div class="actions">
            ${isCompleted ? '<span class="completed-badge"><i class="fas fa-check"></i> مكتمل</span>' : 
              `<button class="btn btn-sm" onclick="openLesson('${lesson.id}')">بدء الدراسة</button>`}
          </div>
        </div>
      `;
    });
  }

  html += `</div></div>`;
  container.innerHTML = html;

  // ربط الأحداث
  container.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', function() {
      user.selectedCategory = this.dataset.category;
      user.selectedSubject = null;
      saveUser(user);
      renderTrain();
    });
  });

  container.querySelectorAll('.subject-tab').forEach(btn => {
    btn.addEventListener('click', function() {
      const subjectId = this.dataset.subject;
      user.selectedSubject = subjectId === 'all' ? null : subjectId;
      saveUser(user);
      renderTrain();
    });
  });
}
