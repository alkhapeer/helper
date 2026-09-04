// المتغيرات العالمية (تُملأ من ملفات JSON)
let SUBJECTS = [];
let LESSONS = [];
let TESTS = [];

// تحميل البيانات من JSON
function loadData(callback) {
  // بما أننا نستخدم script src، البيانات موجودة في المتغيرات
  // نستخدمها مباشرة
  callback();
}

// دوال التصفية حسب المرحلة
function getSubjectsForStage(stage) {
  if (!stage) return SUBJECTS;
  return SUBJECTS.filter(s => s.stage === stage);
}

function getLessonsForStage(stage) {
  if (!stage) return LESSONS;
  return LESSONS.filter(l => l.stage === stage);
}

function getTestsForStage(stage) {
  if (!stage) return TESTS;
  return TESTS.filter(t => t.stage === stage);
}

function getLessonsForSubject(subjectId) {
  return LESSONS.filter(l => l.subjectId === subjectId);
}

function getTestsForSubject(subjectId) {
  return TESTS.filter(t => t.subjectId === subjectId);
}

function getSubjectsByCategory(stage, category) {
  return SUBJECTS.filter(s => s.stage === stage && s.category === category);
}

function getCategoriesForStage(stage) {
  const categories = new Set();
  SUBJECTS.filter(s => s.stage === stage).forEach(s => {
    if (s.category) categories.add(s.category);
  });
  return Array.from(categories);
}

// حساب التقدم
function getOverallProgress(user) {
  const stageLessons = getLessonsForStage(user.stage);
  const total = stageLessons.length;
  const completed = user.completedLessons.filter(id => 
    stageLessons.some(l => l.id === id)
  ).length;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

// نقاط القوة والضعف
function getWeakTopics(user) {
  const map = {};
  const stageTests = getTestsForStage(user.stage);
  user.testResults.forEach(tr => {
    const test = stageTests.find(t => t.id === tr.testId);
    if (!test) return;
    const subject = SUBJECTS.find(s => s.id === test.subjectId);
    if (!subject) return;
    if (!map[subject.name]) map[subject.name] = [];
    map[subject.name].push(tr.score);
  });
  const weak = [];
  for (let sub in map) {
    const avg = map[sub].reduce((a, b) => a + b, 0) / map[sub].length;
    if (avg < 70) weak.push({ subject: sub, score: Math.round(avg) });
  }
  weak.sort((a, b) => a.score - b.score);
  return weak;
}

function getStrengths(user) {
  const map = {};
  const stageTests = getTestsForStage(user.stage);
  user.testResults.forEach(tr => {
    const test = stageTests.find(t => t.id === tr.testId);
    if (!test) return;
    const subject = SUBJECTS.find(s => s.id === test.subjectId);
    if (!subject) return;
    if (!map[subject.name]) map[subject.name] = [];
    map[subject.name].push(tr.score);
  });
  const strong = [];
  for (let sub in map) {
    const avg = map[sub].reduce((a, b) => a + b, 0) / map[sub].length;
    if (avg >= 80) strong.push({ subject: sub, score: Math.round(avg) });
  }
  strong.sort((a, b) => b.score - a.score);
  return strong;
}

// توليد الخطة الأسبوعية
function generatePlan(user) {
  const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
  const weak = getWeakTopics(user);
  const stageLessons = getLessonsForStage(user.stage);
  const notCompleted = stageLessons.filter(l => !user.completedLessons.includes(l.id));
  const plan = [];
  
  for (let i = 0; i < 7; i++) {
    let task = 'مراجعة عامة';
    if (weak.length > 0 && i < weak.length) {
      task = `تدريب على "${weak[i].subject}"`;
    } else if (notCompleted.length > 0 && i < notCompleted.length) {
      task = `دراسة "${notCompleted[i].title}"`;
    } else if (i === 0) {
      task = 'مراجعة الأخطاء';
    } else if (i === 1) {
      task = 'اختبار قصير';
    } else if (i === 2) {
      task = 'حل تمارين متنوعة';
    } else if (i === 3) {
      task = 'مراجعة المفاهيم الأساسية';
    } else if (i === 4) {
      task = 'تدريب على المهارات الضعيفة';
    } else if (i === 5) {
      task = 'اختبار تجريبي';
    } else {
      task = 'مراجعة شاملة';
    }
    const oldPlan = user.plan || [];
    const oldItem = oldPlan.find(p => p.day === days[i]);
    plan.push({ day: days[i], task, done: oldItem ? oldItem.done : false });
  }
  return plan;
}
