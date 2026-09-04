function renderPlan() {
    const user = loadUser();
    const container = document.getElementById('page-container');
    const plan = user.plan.length ? user.plan : generatePlan(user);
    const total = plan.length;
    const done = plan.filter(p => p.done).length;
    const percent = total > 0 ? Math.round((done/total)*100) : 0;

    container.innerHTML = `
        <div class="page active" id="page-plan">
            <div class="card">
                <div class="flex-row">
                    <span>خطة الوصول إلى <strong>${user.goal}%</strong></span>
                    <span class="badge">${total - done} يوم متبقي</span>
                </div>
                <div class="progress-bar"><div class="fill" style="width:${percent}%"></div></div>
                <div class="flex-row text-muted" style="font-size:13px;">مكتمل: ${percent}%</div>
            </div>
            <div id="planDaysList">
                ${plan.map((item, idx) => `
                    <div class="plan-day">
                        <div class="day">${item.day}</div>
                        <div class="task">${item.task}</div>
                        <div class="status ${item.done ? 'done' : 'pending'}" onclick="togglePlanDay(${idx})">
                            <i class="fas ${item.done ? 'fa-check-circle' : 'fa-circle'}"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="card">
                <div class="card-title">كم تستطيع الدراسة يومياً؟</div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    ${[30,45,60,90].map(m => `<button class="btn btn-sm btn-outline time-option ${user.dailyMinutes === m ? 'active' : ''}" data-minutes="${m}">${m} د</button>`).join('')}
                </div>
                <div style="margin-top:10px;">
                    <button class="btn btn-sm" onclick="generatePlanFromUI()">إعادة بناء الخطة</button>
                </div>
            </div>
        </div>
    `;
    // أحداث الوقت
    container.querySelectorAll('.time-option').forEach(btn => {
        btn.addEventListener('click', function() {
            user.dailyMinutes = parseInt(this.dataset.minutes);
            user.plan = generatePlan(user);
            saveUser(user);
            renderPlan();
        });
    });
}