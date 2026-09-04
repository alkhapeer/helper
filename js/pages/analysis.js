function renderAnalysis() {
    const user = loadUser();
    const container = document.getElementById('page-container');
    const progress = getOverallProgress(user);
    const strengths = getStrengths(user);
    const weak = getWeakTopics(user);

    container.innerHTML = `
        <div class="page active" id="page-analysis">
            <div class="card">
                <div class="card-title">مستواك العام</div>
                <div style="font-size:32px; font-weight:700;">${progress}%</div>
                <div class="progress-bar"><div class="fill" style="width:${progress}%"></div></div>
            </div>
            <div class="card">
                <div class="card-title">نقاط القوة 💪</div>
                <div>${strengths.length ? strengths.slice(0,3).map(s => `<div class="skill-item"><span>${s.subject}</span><span style="font-weight:600; color:#34c759;">${s.score}%</span></div>`).join('') : '<div class="text-muted">لا توجد بيانات كافية</div>'}</div>
            </div>
            <div class="card">
                <div class="card-title">تحتاج إلى تطوير 🔥</div>
                <div>${weak.length ? weak.slice(0,3).map(w => `<div class="skill-item"><span>${w.subject}</span><span style="font-weight:600; color:#ff3b30;">${w.score}%</span></div>`).join('') : '<div class="text-muted">🎉 لا توجد نقاط ضعف ملحوظة</div>'}</div>
            </div>
            <div class="card" style="border-right:4px solid #ff9500;">
                <div class="card-title" style="font-size:14px;"><i class="fas fa-lightbulb"></i> توصية</div>
                <div>${weak.length ? `لو ركزت على "${weak[0].subject}" لمدة 7 أيام، يمكنك تحسين مستواك بشكل ملحوظ.` : 'أداؤك ممتاز! حافظ على هذا المستوى.'}</div>
            </div>
        </div>
    `;
}