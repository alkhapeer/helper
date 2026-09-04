function renderHome() {
    const user = loadUser();
    const container = document.getElementById('page-container');
    const progress = getOverallProgress(user); // معرفة في app.js
    const weak = getWeakTopics(user);
    const plan = user.plan.length ? user.plan : generatePlan(user);
    const today = new Date().getDay();
    const daysMap = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const todayTask = plan.find(p => p.day === daysMap[today]);

    container.innerHTML = `
        <div class="page active" id="page-home">
            <div class="user-greeting">أهلاً بك 👋 <strong>${user.name}</strong>، هدفك اليوم: رفع مستواك خطوة واحدة</div>

            <div class="card">
                <div class="card-title"><i class="fas fa-chart-line"></i> مستواك الحالي</div>
                <div class="flex-row">
                    <span style="font-size:28px; font-weight:700;">${progress}%</span>
                    <span>هدفك: <strong>${user.goal}%</strong></span>
                </div>
                <div class="progress-bar"><div class="fill" style="width:${progress}%"></div></div>
                <div class="flex-row mt-2 text-muted" style="font-size:13px;">
                    <span><i class="fas fa-check-circle" style="color:#34c759;"></i> ${user.completedLessons.length} درس</span>
                    <span>من ${LESSONS.length}</span>
                </div>
            </div>

            <div class="card" onclick="navigateTo('train')" style="cursor:pointer;">
                <div class="card-title"><i class="fas fa-fire" style="color:#ff9500;"></i> مهمتك اليوم</div>
                <div>${todayTask ? todayTask.task : 'لا توجد مهام اليوم'}</div>
                <button class="btn btn-sm" onclick="event.stopPropagation(); navigateTo('train')">ابدأ التدريب</button>
            </div>

            <div class="card" onclick="navigateTo('plan')" style="cursor:pointer;">
                <div class="card-title"><i class="fas fa-exclamation-circle" style="color:#ff3b30;"></i> أخطاء تحتاج مراجعة</div>
                <div>${weak.reduce((s,w) => s + (100-w.score)/10, 0).toFixed(0)} سؤالاً</div>
            </div>

            <div class="card" style="border-right:4px solid #5b7cfa; background:#f8faff;">
                <div class="card-title" style="font-size:14px;"><i class="fas fa-robot"></i> اقتراح المدرب لك اليوم</div>
                <div>${weak.length ? `ركّز على "${weak[0].subject}"؛ فهي من أكثر المهارات التي تخسر فيها درجات.` : 'أداؤك ممتاز! واصل بنفس الوتيرة.'}</div>
                <button class="btn btn-sm btn-outline" onclick="navigateTo('plan')" style="margin-top:8px;">اطلع على خطتك ←</button>
            </div>
        </div>
    `;
}