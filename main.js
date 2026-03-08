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

// 결과 렌더링
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const lang = langSelect.value; // 우측 상단 드롭다운에서 값 가져옴
  
  showResults(lang, selectedSkills, formData.get('industry'));
});

function showResults(lang, skills, industry) {
  const resultContainer = document.getElementById('result-container');
  const formContainer = document.getElementById('step-form-container');
  const resultsDiv = document.getElementById('job-results');

  formContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  // 시뮬레이션 데이터
  const data = lang === 'korean' ? [
    {
      title: "시니어 풀스택 개발자 (Senior Full-stack Developer)",
      desc: "자바스크립트와 파이썬 기반의 고도화된 웹 아키텍처를 설계함. UI/UX 디자인 감각을 코드에 녹여내어 사용자 경험을 최적화함. 프로젝트 관리 능력을 통해 팀의 개발 속도를 리딩함. 데이터 분석을 기반으로 성능 병목을 찾아내고 개선함. 원격 근무 환경에서의 협업 시스템을 구축함. 링크드인 공고에서 가장 선호되는 하이브리드 인재상임.",
      skills: ["React", "Python", "Cloud Architecture"]
    },
    {
      title: "기술 전략 프로덕트 매니저 (Technical Product Manager)",
      desc: "데이터를 기반으로 제품 로드맵을 수립하고 실행함. 기술적 배경을 바탕으로 엔지니어링 팀과 긴밀히 소통함. 시장 트렌드를 분석하여 제품의 차별화 포인트를 발굴함. 마케팅 자동화 성공 사례를 제품 기능으로 확장함. 사용자 요구사항을 UI/UX 관점에서 정의하고 설계함. 글로벌 시장에서의 경쟁력을 확보하기 위한 전략을 제시함.",
      skills: ["Product Strategy", "Data Analysis", "Agile"]
    }
  ] : [
    {
      title: "Senior Full-stack Developer",
      desc: "Designing advanced web architectures based on JS and Python. Optimizing user experience by integrating UI/UX design into code. Leading development velocity through professional project management. Identifying and fixing performance bottlenecks using data analysis. Establishing collaboration systems for remote work environments. Highly preferred hybrid talent in current LinkedIn trends.",
      skills: ["React", "Python", "Cloud Architecture"]
    },
    {
      title: "Technical Product Manager",
      desc: "Establishing and executing product roadmaps based on data. Communicating closely with engineering teams using technical background. Identifying differentiation points by analyzing market trends. Expanding marketing automation success into product features. Defining and designing user requirements from a UI/UX perspective. Suggesting strategies to secure global market competitiveness.",
      skills: ["Product Strategy", "Data Analysis", "Agile"]
    }
  ];

  resultsDiv.innerHTML = data.map((job, i) => `
    <div class="job-card">
      <div class="job-card-header">
        <div class="job-title">${job.title}</div>
        <div class="gauge-container"><div class="gauge-fill" style="width: ${95 - i*10}%"></div></div>
      </div>
      <div class="job-card-body">
        <div class="job-section-title">${lang === 'korean' ? '상세 업무 설명' : 'Job Description'}</div>
        <p class="job-task">${job.desc}</p>
        <div class="job-section-title">${lang === 'korean' ? '핵심 매칭 기술' : 'Key Matching Skills'}</div>
        <div class="competency-list">${job.skills.map(s => `<span class="comp-tag">✨ ${s}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}
