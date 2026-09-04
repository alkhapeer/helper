const STORAGE_KEY = 'success_assistant';

function getDefaultUser() {
  return {
    name: '',
    stage: '',
    goal: 90,
    points: 0,
    completedLessons: [],
    testResults: [],      // [{testId, score}]
    dailyMinutes: 60,
    plan: [],             // [{day, task, done}]
    selectedCategory: null,
    selectedSubject: null
  };
}

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      const def = getDefaultUser();
      for (let key in def) {
        if (!(key in data)) data[key] = def[key];
      }
      return data;
    }
  } catch (e) { console.warn('خطأ في تحميل البيانات:', e); }
  return getDefaultUser();
}

function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function resetUserData() {
  const oldName = loadUser().name || '';
  const def = getDefaultUser();
  def.name = oldName;
  saveUser(def);
}
