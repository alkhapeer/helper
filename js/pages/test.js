function renderTests() {
    const user = loadUser();
    const container = document.getElementById('page-container');
    const solvedIds = new Set(user.testResults.map(r => r.testId));
    const available = TESTS.filter(t => !solvedIds.has(t.id));
    const past = user.testResults.map(tr => {
        const test = TESTS.find(t => t.id === tr.testId);
        return test ? { ...test, score: tr.score } : null;
    }).filter(Boolean);

    let html = `
        <div class="page active" id="page-test">
            <div id="availableTests">
                ${available.length ? available.map(test => `
                    <div class="test-card">
                        <div class="title">${test.title}</div>
                        <div class="meta">${SUBJECTS.find(s=>s.id===test.subjectId)?.name || ''} • ${test.questions.length} سؤالاً</div>
                        <button class="btn btn-sm" onclick="startTest('${test.id}')">ابدأ الاختبار</button>
                    </div>
                `).join('') : '<div class="text-muted">🎉 لا توجد اختبارات جديدة حالياً.</div>'}
            </div>
            <div class="card" style="margin-top:16px;">
                <div class="card-title">اختبارات سابقة</div>
                <div id="pastTests">
                    ${past.length ? past.map(test => `
                        <div class="test-card" style="border-right-color:#8a9bb5;">
                            <div class="flex-row">
                                <span class="title">${test.title}</span>
                                <span style="font-weight:700;">${test.score}%</span>
                            </div>
                            <div class="meta">تم الحل</div>
                        </div>
                    `).join('') : '<div class="text-muted">لا توجد اختبارات سابقة</div>'}
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
}