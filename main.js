const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

// 테마 변경
themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  themeBtn.textContent = body.classList.contains('dark-mode') ? '☀️ Light' : '🌙 Dark';
});

// 4단계 폼 로직
const form = document.getElementById('multi-step-form');
const steps = document.querySelectorAll('.form-step');
const indicators = document.querySelectorAll('.step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
let currentStep = 1;

function updateSteps() {
  steps.forEach(step => step.classList.remove('active'));
  indicators.forEach(ind => {
    ind.classList.remove('active');
    if (parseInt(ind.dataset.step) <= currentStep) ind.classList.add('active');
  });
  document.getElementById(`step-${currentStep}`).classList.add('active');
}

nextBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStep < 4) { currentStep++; updateSteps(); } }));
prevBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStep > 1) { currentStep--; updateSteps(); } }));

// Skills 관리
const skillContainer = document.getElementById('skill-selection');
const customSkillInput = document.getElementById('custom-skill-input');
const skillsInputHidden = document.getElementById('selected-skills-input');
let selectedSkills = [];

function updateSkillValidation() {
  skillsInputHidden.value = JSON.stringify(selectedSkills);
  const nextBtn = document.querySelector('#step-1 .next-btn');
  nextBtn.disabled = selectedSkills.length < 3;
  nextBtn.textContent = `다음 단계로 (${selectedSkills.length}개 선택됨)`;
}

function attachChipEvent(chip) {
  chip.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-chip')) return;
    const val = chip.dataset.value;
    if (selectedSkills.includes(val)) {
      selectedSkills = selectedSkills.filter(s => s !== val);
      chip.classList.remove('selected');
    } else if (selectedSkills.length < 5) {
      selectedSkills.push(val);
      chip.classList.add('selected');
    }
    updateSkillValidation();
  });
}

document.querySelectorAll('.keyword-chip').forEach(attachChipEvent);

customSkillInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const val = customSkillInput.value.trim();
    if (val && !selectedSkills.includes(val)) {
      const chip = document.createElement('div');
      chip.className = 'keyword-chip selected';
      chip.dataset.value = val;
      chip.innerHTML = `${val} <span class="delete-chip">×</span>`;
      skillContainer.appendChild(chip);
      const delBtn = chip.querySelector('.delete-chip');
      delBtn.onclick = (ev) => {
        ev.stopPropagation();
        selectedSkills = selectedSkills.filter(s => s !== val);
        chip.remove();
        updateSkillValidation();
      };
      attachChipEvent(chip);
      selectedSkills.push(val);
      updateSkillValidation();
    }
    customSkillInput.value = '';
  }
});

// 결과 렌더링 엔진 (KOR / ENG 분기)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const currentLang = langSelect.value === 'korean' ? 'KOR' : 'ENG';
  
  showResults(currentLang, selectedSkills, formData.get('industry'));
});

function showResults(currentLang, skills, industry) {
  const resultContainer = document.getElementById('result-container');
  const formContainer = document.getElementById('step-form-container');
  const resultsDiv = document.getElementById('job-results');
  const title = document.getElementById('result-title');

  formContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  title.innerText = currentLang === 'KOR' ? '글로벌 커리어 매칭 결과' : 'Global Career Matching Results';

  // 시뮬레이션 데이터
  const data = currentLang === 'KOR' ? [
    {
      title: "시니어 풀스택 개발자 (Senior Full-stack Developer)",
      desc: [
        "자바스크립트와 파이썬 기반의 고도화된 웹 시스템 아키텍처를 직접 설계하고 구축함.",
        "프론트엔드와 백엔드를 아우르는 기술력을 바탕으로 전체 서비스의 안정성을 책임짐.",
        "UI/UX 디자인 감각을 코드에 정밀하게 구현하여 최상의 사용자 인터랙션을 제공함.",
        "데이터 분석을 통해 서비스 성능의 병목 구간을 발견하고 효율적으로 최적화함.",
        "프로젝트 관리 역량을 발휘하여 팀원들 간의 기술적 협업과 일정 준수를 주도함.",
        "원격 근무 환경에서도 협업 툴을 능숙하게 활용하여 높은 업무 생산성을 유지함."
      ],
      skills: ["리액트(React)", "파이썬(Python)", "클라우드 아키텍처", "데이터 시각화", "애자일"],
      reason: "보유하신 다각도의 기술 스택과 디자인 감각이 현대적인 풀스택 역할에 완벽히 부합함."
    },
    {
      title: "기술 전략 프로덕트 매니저 (Technical Product Manager)",
      desc: [
        "비즈니스 지표와 기술적 타당성을 동시에 고려하여 제품의 중장기 로드맵을 수립함.",
        "데이터 분석 역량을 활용해 시장 트렌드를 파악하고 제품의 핵심 기능을 정의함.",
        "엔지니어링 팀과 고도로 기술적인 논의를 진행하며 제품 출시 전 과정을 조율함.",
        "사용자 중심의 사고로 UI/UX 디자인 방향을 설정하고 고객 만족도를 극대화함.",
        "마케팅 자동화 성공 경험을 제품 기획에 투영하여 실제 매출 성장을 견인함.",
        "글로벌 채용 시장에서 요구하는 기술과 비즈니스의 하이브리드 리더 역할을 수행함."
      ],
      skills: ["제품 로드맵", "비즈니스 인텔리전스", "스테이크홀더 관리", "UX 기획", "SQL"],
      reason: "프로젝트 관리 전문성과 마케팅 성과 창출 경험이 기술 기반 PM 포지션에 최적임."
    }
  ] : [
    {
      title: "Senior Full-stack Developer",
      desc: [
        "Designing and building advanced web architectures using JavaScript and Python.",
        "Ensuring service stability by leveraging expertise in both frontend and backend.",
        "Implementing UI/UX design into code to provide high-quality user interactions.",
        "Optimizing performance by identifying bottlenecks through deep data analysis.",
        "Leading technical collaboration and schedule management with PM expertise.",
        "Maintaining high productivity in remote environments with professional tools."
      ],
      skills: ["React", "Python", "Cloud Architecture", "Data Visualization", "Agile"],
      reason: "Your diverse tech stack and design sense perfectly match modern full-stack requirements."
    },
    {
      title: "Technical Product Manager",
      desc: [
        "Establishing long-term product roadmaps considering both business and tech.",
        "Defining core features by analyzing market trends and user behavior data.",
        "Coordinating product releases through high-level technical discussions with devs.",
        "Setting UI/UX directions to maximize customer satisfaction with user-centric mind.",
        "Driving revenue growth by integrating marketing automation success into products.",
        "Acting as a hybrid leader with technical depth and business intelligence."
      ],
      skills: ["Product Roadmap", "Business Intelligence", "Stakeholder Management", "UX Strategy", "SQL"],
      reason: "Combined project management and marketing success make you an ideal TPM leader."
    }
  ];

  resultsDiv.innerHTML = data.map((job, i) => `
    <div class="job-card">
      <div class="job-card-header">
        <div class="job-title">${job.title}</div>
        <div class="gauge-container"><div class="gauge-fill" style="width: ${98 - i*7}%"></div></div>
      </div>
      <div class="job-card-body">
        <div class="job-section-title">${currentLang === 'KOR' ? '상세 업무 설명' : 'Detailed Job Description'}</div>
        <div class="job-task-list">
          ${job.desc.map(line => `<p class="job-task">• ${line}</p>`).join('')}
        </div>
        <div class="job-section-title" style="margin-top:1.5rem;">${currentLang === 'KOR' ? '핵심 요구 역량' : 'Core Required Skills'}</div>
        <div class="competency-list">${job.skills.map(s => `<span class="comp-tag">✨ ${s}</span>`).join('')}</div>
        <p class="job-task" style="margin-top:1.5rem; color: var(--accent-color); font-weight: 700;">
          <strong>${currentLang === 'KOR' ? '매칭 이유' : 'Match Reason'}:</strong> ${job.reason}
        </p>
      </div>
    </div>
  `).join('');
}
