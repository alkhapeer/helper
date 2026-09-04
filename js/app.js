// ================================================================
// البيانات المضمنة (يمكنك تعديلها مباشرة هنا)
// ================================================================

const SUBJECTS = [
  { "id": "math", "name": "رياضيات", "stage": "ابتدائي" },
  { "id": "arabic", "name": "لغة عربية", "stage": "ابتدائي" },
  { "id": "science", "name": "علوم", "stage": "ابتدائي" },
  { "id": "math-prep", "name": "رياضيات", "stage": "اعدادي" },
  { "id": "physics-prep", "name": "فيزياء", "stage": "اعدادي" },
  { "id": "chem-prep", "name": "كيمياء", "stage": "اعدادي" },
  { "id": "verbal", "name": "لفظي", "stage": "ثانوي", "category": "قدرات" },
  { "id": "quant", "name": "كمي", "stage": "ثانوي", "category": "قدرات" },
  { "id": "math-sec", "name": "رياضيات", "stage": "ثانوي", "category": "تحصيلي" },
  { "id": "physics-sec", "name": "فيزياء", "stage": "ثانوي", "category": "تحصيلي" },
  { "id": "chemistry-sec", "name": "كيمياء", "stage": "ثانوي", "category": "تحصيلي" },
  { "id": "biology-sec", "name": "أحياء", "stage": "ثانوي", "category": "تحصيلي" }
];

const LESSONS = [
  { "id": "p-math-1", "stage": "ابتدائي", "subjectId": "math", "title": "الأعداد من 1 إلى 100", "difficulty": "easy", "content": "<h2>الأعداد من 1 إلى 100</h2><p>تعلم الأعداد من 1 إلى 100 مع تمارين تفاعلية.</p><ul><li>العد من 1 إلى 10</li><li>العد من 10 إلى 20</li><li>العد من 20 إلى 100</li></ul><div class='highlight-box'><strong>💡 نصيحة:</strong> راجع الأعداد يومياً حتى تتقنها.</div>" },
  { "id": "p-math-2", "stage": "ابتدائي", "subjectId": "math", "title": "الجمع والطرح", "difficulty": "easy", "content": "<h2>الجمع والطرح</h2><p>تعلم أساسيات الجمع والطرح.</p><table><tr><th>العملية</th><th>مثال</th></tr><tr><td>الجمع</td><td>5 + 3 = 8</td></tr><tr><td>الطرح</td><td>10 - 4 = 6</td></tr></table>" },
  { "id": "p-arabic-1", "stage": "ابتدائي", "subjectId": "arabic", "title": "الحروف الهجائية", "difficulty": "easy", "content": "<h2>الحروف الهجائية</h2><p>تعلم الحروف الأبجدية مع أمثلة.</p><ul><li>أ: أرنب</li><li>ب: باب</li><li>ت: تفاح</li></ul>" },
  { "id": "p-science-1", "stage": "ابتدائي", "subjectId": "science", "title": "النباتات والحيوانات", "difficulty": "easy", "content": "<h2>النباتات والحيوانات</h2><p>تصنيف الكائنات الحية.</p><ul><li>نباتات: تنتج غذائها بنفسها</li><li>حيوانات: تتغذى على غيرها</li></ul>" },
  { "id": "m-math-1", "stage": "اعدادي", "subjectId": "math-prep", "title": "النسبة والتناسب", "difficulty": "medium", "content": "<h2>النسبة والتناسب</h2><p>تعلم النسبة والتناسب مع أمثلة.</p><div class='highlight-box'><strong>مثال:</strong> إذا كانت النسبة 2:3، فالنسبة المكافئة هي 4:6.</div>" },
  { "id": "m-math-2", "stage": "اعدادي", "subjectId": "math-prep", "title": "المعادلات الخطية", "difficulty": "medium", "content": "<h2>المعادلات الخطية</h2><p>حل المعادلات من الدرجة الأولى.</p><p><strong>مثال:</strong> 2س + 3 = 7 → 2س = 4 → س = 2</p>" },
  { "id": "m-physics-1", "stage": "اعدادي", "subjectId": "physics-prep", "title": "الحركة والسرعة", "difficulty": "medium", "content": "<h2>الحركة والسرعة</h2><p>مفاهيم الحركة والسرعة والتسارع.</p><ul><li>السرعة: المسافة / الزمن</li><li>التسارع: التغير في السرعة / الزمن</li></ul>" },
  { "id": "m-chem-1", "stage": "اعدادي", "subjectId": "chem-prep", "title": "المادة وخواصها", "difficulty": "easy", "content": "<h2>المادة وخواصها</h2><p>تعريف المادة وخواصها الفيزيائية والكيميائية.</p><ul><li>خواص فيزيائية: اللون، الكتلة، الحجم</li><li>خواص كيميائية: التفاعل مع المواد الأخرى</li></ul>" },
  { "id": "s-verbal-1", "stage": "ثانوي", "subjectId": "verbal", "title": "استيعاب المقروء - المستوى 1", "difficulty": "easy", "content": "<h2>استيعاب المقروء</h2><p>تدريبات على فهم النصوص.</p><div class='highlight-box'><strong>نص:</strong> القراءة مفتاح العلم. <br>السؤال: مفتاح العلم هو؟<br>الإجابة: القراءة.</div>" },
  { "id": "s-verbal-2", "stage": "ثانوي", "subjectId": "verbal", "title": "إكمال الجمل - المستوى 2", "difficulty": "medium", "content": "<h2>إكمال الجمل</h2><p>تدريبات على إكمال الجمل.</p><p><strong>مثال:</strong> الشمس تشرق من ________. (الشرق)</p>" },
  { "id": "s-quant-1", "stage": "ثانوي", "subjectId": "quant", "title": "الحساب الأساسي", "difficulty": "easy", "content": "<h2>الحساب الأساسي</h2><p>مراجعة العمليات الحسابية.</p><ul><li>الجمع: 12 + 8 = 20</li><li>الطرح: 25 - 10 = 15</li><li>الضرب: 6 × 7 = 42</li></ul>" },
  { "id": "s-quant-2", "stage": "ثانوي", "subjectId": "quant", "title": "النسب والتناسب - كمي", "difficulty": "medium", "content": "<h2>النسب والتناسب (كمي)</h2><p>تدريبات على النسب والتناسب.</p><p>مثال: إذا كان 3 س = 9، فما قيمة س؟ (س = 3)</p>" },
  { "id": "s-math-1", "stage": "ثانوي", "subjectId": "math-sec", "title": "التفاضل - المستوى 1", "difficulty": "medium", "content": "<h2>التفاضل</h2><p>مشتقات الدوال الأساسية.</p><p><strong>مثال:</strong> مشتقة س² هي 2س.</p><p>مشتقة 3س² + 2س هي 6س + 2.</p>" },
  { "id": "s-phys-1", "stage": "ثانوي", "subjectId": "physics-sec", "title": "القوانين الأساسية في الحركة", "difficulty": "medium", "content": "<h2>قوانين نيوتن للحركة</h2><p>القانون الأول: الجسم الساكن يبقى ساكناً ما لم تؤثر عليه قوة.</p><p>القانون الثاني: القوة = الكتلة × التسارع.</p><p>القانون الثالث: لكل فعل رد فعل مساوٍ له في المقدار ومعاكس في الاتجاه.</p>" },
  { "id": "chem1-intro", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "مقدمة في علم الكيمياء", "difficulty": "easy", "content": "<h2>مقدمة في علم الكيمياء</h2><p>الكيمياء هي علم المادة وتفاعلاتها.</p><ul><li>المادة: كل ما له كتلة ويشغل حيزاً</li><li>التفاعل الكيميائي: تحول المواد المتفاعلة إلى ناتجة</li></ul>" },
  { "id": "chem1-matter", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "المادة: الخواص والتغيرات", "difficulty": "easy", "content": "<h2>المادة وخواصها</h2><p>المادة لها خواص فيزيائية وكيميائية.</p><ul><li>الخواص الفيزيائية: اللون، الكثافة، نقطة الغليان</li><li>الخواص الكيميائية: التفاعل مع الأكسجين، الحموضة</li></ul>" },
  { "id": "chem1-atom", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "تركيب الذرة والتوزيع الإلكتروني", "difficulty": "medium", "content": "<h2>تركيب الذرة</h2><p>الذرة تتكون من:</p><ul><li>بروتونات (شحنة موجبة) في النواة</li><li>نيوترونات (متعدلة) في النواة</li><li>إلكترونات (شحنة سالبة) تدور حول النواة</li></ul><div class='highlight-box'><strong>مثال:</strong> ذرة الهيدروجين تحتوي على بروتون واحد وإلكترون واحد.</div>" },
  { "id": "chem1-reactions", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "التفاعلات الكيميائية", "difficulty": "medium", "content": "<h2>التفاعلات الكيميائية</h2><p>التفاعلات تحول المواد المتفاعلة إلى ناتجة.</p><p><strong>مثال:</strong> 2H₂ + O₂ → 2H₂O</p><p>وهو تفاعل اتحاد بين الهيدروجين والأكسجين لتكوين الماء.</p>" },
  { "id": "chem1-mole", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "المول والحسابات الكيميائية", "difficulty": "hard", "content": "<h2>المول</h2><p>المول هو وحدة قياس كمية المادة، ويساوي 6.022 × 10²³ وحدة.</p><p><strong>مثال:</strong> كتلة مول واحد من الماء (H₂O) = 18 جرام.</p>" },
  { "id": "chem2-energy", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "الكيمياء الحرارية", "difficulty": "medium", "content": "<h2>الكيمياء الحرارية</h2><p>دراسة انتقال الحرارة في التفاعلات.</p><ul><li>تفاعل طارد للحرارة: يطلق حرارة (مثل احتراق الخشب)</li><li>تفاعل ماص للحرارة: يمتص حرارة (مثل ذوبان الثلج)</li></ul>" },
  { "id": "chem2-speed", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "سرعة التفاعلات الكيميائية", "difficulty": "hard", "content": "<h2>سرعة التفاعل</h2><p>سرعة التفاعل تتأثر بـ:</p><ul><li>تركيز المواد</li><li>درجة الحرارة</li><li>العوامل المساعدة (المحفزات)</li></ul>" },
  { "id": "chem2-equilibrium", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "الاتزان الكيميائي", "difficulty": "hard", "content": "<h2>الاتزان الكيميائي</h2><p>في التفاعلات العكوسة يصل النظام إلى حالة توازن.</p><p><strong>مبدأ لوتشاتيليه:</strong> إذا أثرت على نظام في حالة اتزان، فإنه يتجه نحو تقليل هذا التأثير.</p>" },
  { "id": "chem2-hydrocarbons", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "الهيدروكربونات", "difficulty": "medium", "content": "<h2>الهيدروكربونات</h2><p>مركبات تحتوي على كربون وهيدروجين.</p><ul><li>ألكانات: روابط أحادية (CH₄)</li><li>ألكينات: روابط مزدوجة (C₂H₄)</li><li>ألكاينات: روابط ثلاثية (C₂H₂)</li></ul>" },
  { "id": "chem2-derivatives", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "مشتقات الهيدروكربونات", "difficulty": "medium", "content": "<h2>مشتقات الهيدروكربونات</h2><p>المجموعات الوظيفية تحدد خواص المركبات.</p><ul><li>كحول: يحتوي على مجموعة -OH</li><li>ألدهيد: يحتوي على مجموعة -CHO</li><li>كيتون: يحتوي على مجموعة -CO-</li></ul>" },
  { "id": "chem2-biochemistry", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "المركبات العضوية الحيوية", "difficulty": "easy", "content": "<h2>المركبات العضوية الحيوية</h2><p>البروتينات والسكريات من الجزيئات الحيوية.</p><ul><li>البروتينات: مكونة من أحماض أمينية</li><li>السكريات: مصدر الطاقة الأساسي</li></ul>" },
  { "id": "chem3-mixtures", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "المخاليط والمحاليل", "difficulty": "easy", "content": "<h2>المخاليط والمحاليل</h2><p>المخاليط: مزج مادتين أو أكثر دون تفاعل كيميائي.</p><ul><li>محلول: مخلوط متجانس (مثل الماء والملح)</li><li>غروي: مخلوط غير متجانس (مثل الحليب)</li><li>معلق: جسيمات كبيرة تترسب (مثل الرمل والماء)</li></ul>" },
  { "id": "chem3-acids", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "الأحماض والقواعد", "difficulty": "hard", "content": "<h2>الأحماض والقواعد</h2><div class='highlight-box'><strong>📘 تعريف الأحماض والقواعد</strong><p>الحمض: مادة تتفكك في الماء وتعطي أيونات الهيدروجين (H⁺).<br>القاعدة: مادة تتفكك في الماء وتعطي أيونات الهيدروكسيد (OH⁻).</p></div><h2>مقياس pH</h2><p>يقيس pH حموضة أو قاعدية المحلول.</p><ul><li>pH &lt; 7 → حمضي</li><li>pH = 7 → متعادل</li><li>pH &gt; 7 → قاعدي</li></ul><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/PH_scale_%281%29.png/800px-PH_scale_%281%29.png' alt='مقياس pH' style='width:100%; max-width:300px;' /><h2>فيديو توضيحي</h2><iframe src='https://www.youtube.com/embed/2pVOSwKv-b8' allowfullscreen></iframe>" },
  { "id": "chem3-redox", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "الأكسدة والاختزال", "difficulty": "medium", "content": "<h2>الأكسدة والاختزال</h2><p>تفاعلات الأكسدة والاختزال تتضمن انتقال الإلكترونات.</p><ul><li>الأكسدة: فقدان إلكترونات</li><li>الاختزال: اكتساب إلكترونات</li></ul><p><strong>مثال:</strong> 2Mg + O₂ → 2MgO (أكسدة المغنيسيوم)</p>" },
  { "id": "chem3-electro", "stage": "ثانوي", "subjectId": "chemistry-sec", "title": "الكيمياء الكهربائية", "difficulty": "hard", "content": "<h2>الكيمياء الكهربائية</h2><p>الخلايا الجلفانية تحول الطاقة الكيميائية إلى كهربائية.</p><p><strong>مثال:</strong> بطارية السيارة تعتمد على تفاعلات أكسدة-اختزال.</p>" },
  { "id": "s-bio-1", "stage": "ثانوي", "subjectId": "biology-sec", "title": "الخلية وتركيبها", "difficulty": "medium", "content": "<h2>الخلية</h2><p>الخلية هي الوحدة الأساسية للحياة.</p><ul><li>النواة: تحتوي على المادة الوراثية</li><li>السيتوبلازم: يحتوي على العضيات</li><li>الغشاء الخلوي: يتحكم في دخول وخروج المواد</li></ul>" },
  { "id": "s-bio-2", "stage": "ثانوي", "subjectId": "biology-sec", "title": "الوراثة", "difficulty": "hard", "content": "<h2>الوراثة</h2><p>مبادئ الوراثة وقوانين مندل.</p><div class='highlight-box'><strong>قانون مندل الأول:</strong> الصفات تنتقل عبر عوامل وراثية (جينات).</div><p><strong>مثال:</strong> نبات البازلاء: صفة الطول (T) سائدة على القصر (t).</p>" }
];

const TESTS = [
  {
    "id": "test-p-math-1",
    "stage": "ابتدائي",
    "subjectId": "math",
    "title": "اختبار الأعداد والجمع",
    "questions": [
      { "q": "ما ناتج 5 + 3؟", "options": ["5", "7", "8", "10"], "correct": 2 },
      { "q": "كم عدد الأصابع في يدين؟", "options": ["8", "9", "10", "12"], "correct": 2 }
    ]
  },
  {
    "id": "test-m-math-1",
    "stage": "اعدادي",
    "subjectId": "math-prep",
    "title": "اختبار النسبة والتناسب",
    "questions": [
      { "q": "إذا كانت النسبة 2:3، فما النسبة المكافئة؟", "options": ["4:6", "3:2", "1:2", "6:4"], "correct": 0 },
      { "q": "أوجد 20% من 80", "options": ["12", "16", "20", "24"], "correct": 1 }
    ]
  },
  {
    "id": "test-verbal-1",
    "stage": "ثانوي",
    "subjectId": "verbal",
    "title": "اختبار استيعاب المقروء",
    "questions": [
      { "q": "القراءة مفتاح العلم. المعنى المقصود: القراءة تساعد على...", "options": ["التسلية", "التعلم", "الترفيه", "الرياضة"], "correct": 1 },
      { "q": "كلمة 'نور' مضادها:", "options": ["ظلام", "ضياء", "شمس", "قمر"], "correct": 0 }
    ]
  },
  {
    "id": "test-quant-1",
    "stage": "ثانوي",
    "subjectId": "quant",
    "title": "اختبار الحساب والنسب",
    "questions": [
      { "q": "ما ناتج 15 × 6؟", "options": ["80", "85", "90", "95"], "correct": 2 },
      { "q": "نسبة 25% تساوي:", "options": ["1/4", "1/3", "1/2", "3/4"], "correct": 0 }
    ]
  },
  {
    "id": "test-chem1-mid",
    "stage": "ثانوي",
    "subjectId": "chemistry-sec",
    "title": "اختبار كيمياء - مقدمة",
    "questions": [
      { "q": "يوجد غاز الأوزون في طبقة:", "options": ["التروبوسفير", "الستراتوسفير", "الميزوسفير", "الأكسوسفير"], "correct": 1 },
      { "q": "ما فرع الكيمياء الذي يدرس مواد التغليف؟", "options": ["الكيمياء الحيوية", "الكيمياء العضوية", "الكيمياء البيئية", "الكيمياء الفيزيائية"], "correct": 2 }
    ]
  },
  {
    "id": "test-chem3-final",
    "stage": "ثانوي",
    "subjectId": "chemistry-sec",
    "title": "اختبار كيمياء شامل",
    "questions": [
      { "q": "تفاعل حمض مع قاعدة يسمى:", "options": ["التعادل", "الأكسدة", "الاختزال", "الترسيب"], "correct": 0 },
      { "q": "الحركة البراونية تحدث في:", "options": ["المحاليل الحقيقية", "المخاليط الغروية", "المعلقات", "العناصر"], "correct": 1 }
    ]
  }
];

// ================================================================
// تحميل البيانات (تفعيل fetch لاحقاً)
// ================================================================
async function loadAllData() {
  // إذا كنت تريد استخدام ملفات JSON خارجية، قم بتعليق السطرين التاليين
  // واستخدم fetch كما في الكود السابق
  // لكن حالياً البيانات موجودة في المتغيرات أعلاه
  
  // في حال أردت التبديل إلى JSON، استخدم هذا:
  // try {
  //   const [subs, less, tests] = await Promise.all([
  //     fetch('data/subjects.json').then(r => r.json()),
  //     fetch('data/lessons.json').then(r => r.json()),
  //     fetch('data/tests.json').then(r => r.json())
  //   ]);
  //   // تعيين المتغيرات
  //   window.SUBJECTS = subs;
  //   window.LESSONS = less;
  //   window.TESTS = tests;
  // } catch (error) {
  //   console.error('خطأ في تحميل البيانات:', error);
  // }
  
  // تعيين البيانات المضمنة
  window.SUBJECTS = SUBJECTS;
  window.LESSONS = LESSONS;
  window.TESTS = TESTS;
  
  initApp();
}

// ================================================================
// باقي الكود كما هو (يبدأ من هنا)
// ================================================================

// دوال التنقل والتفاعل (نفس الكود السابق ولكن مع استخدام window.SUBJECTS إلخ)
// ... (باقي الكود)
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
