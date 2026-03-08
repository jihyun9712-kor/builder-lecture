const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

// 전역 상태
let currentLang = 'ko';

// 번역 데이터 정의
const translations = {
  ko: {
    step1_title: "1단계: 핵심 역량",
    step1_desc: "기존 키워드를 선택하거나 직접 입력해주세요. (최소 3개)",
    skill_js: "JavaScript",
    skill_python: "Python",
    skill_pm: "프로젝트 관리",
    skill_da: "데이터 분석",
    skill_uiux: "UI/UX 디자인",
    skill_dm: "디지털 마케팅",
    skill_sql: "SQL",
    skill_ps: "문제 해결",
    skill_agile: "애자일",
    custom_placeholder: "직접 입력 후 Enter",
    next_step: "다음 단계로",
    prev_step: "이전",
    step2_title: "2단계: 관심 산업군",
    step2_desc: "분석을 희망하는 타겟 산업군을 선택하세요.",
    industry_placeholder: "산업군 선택",
    ind_it: "IT / 소프트웨어",
    ind_finance: "금융 / 핀테크",
    ind_healthcare: "의료 / 바이오",
    ind_ecommerce: "커머스 / 유통",
    ind_media: "미디어 / 광고",
    step3_title: "3단계: 주요 성과",
    step3_desc: "AI가 직무 레벨을 판단할 수 있도록 성과를 적어주세요.",
    perf_placeholder: "가장 성과가 좋았던 경험을 한 문장으로 적어주세요.",
    step4_title: "4단계: 업무 형태",
    step4_desc: "가장 선호하는 근무 방식을 선택해주세요.",
    work_remote: "원격 근무 (Remote)",
    work_flexible: "유연 근무 (Flexible)",
    work_office: "오피스 출근 (Office)",
    find_jobs: "분석 시작하기",
    result_title: "글로벌 커리어 분석 결과",
    retry: "다시 하기",
    selected_count: "개 선택됨"
  },
  en: {
    step1_title: "Step 1: Core Skills",
    step1_desc: "Select existing keywords or enter manually. (Min 3)",
    skill_js: "JavaScript",
    skill_python: "Python",
    skill_pm: "Project Management",
    skill_da: "Data Analysis",
    skill_uiux: "UI/UX Design",
    skill_dm: "Digital Marketing",
    skill_sql: "SQL",
    skill_ps: "Problem Solving",
    skill_agile: "Agile",
    custom_placeholder: "Type and press Enter",
    next_step: "Next Step",
    prev_step: "Previous",
    step2_title: "Step 2: Target Industry",
    step2_desc: "Select the industry you want to analyze.",
    industry_placeholder: "Select Industry",
    ind_it: "IT / Software",
    ind_finance: "Finance / Fintech",
    ind_healthcare: "Healthcare / Bio",
    ind_ecommerce: "E-commerce / Retail",
    ind_media: "Media / Ads",
    step3_title: "Step 3: Key Achievement",
    step3_desc: "Describe your achievement to help AI judge your level.",
    perf_placeholder: "Describe your best performance in one sentence.",
    step4_title: "Step 4: Work Arrangement",
    step4_desc: "Select your preferred work arrangement.",
    work_remote: "Remote",
    work_flexible: "Flexible",
    work_office: "Office",
    find_jobs: "Start Analysis",
    result_title: "Global Career Matching Results",
    retry: "Try Again",
    selected_count: "selected"
  }
};

// 언어 업데이트 함수
function updateUI() {
  const lang = currentLang;
  const t = translations[lang];

  // data-i18n 속성을 가진 모든 요소 번역
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      // 다음 단계로 버튼처럼 숫자가 포함된 경우는 별도 처리
      if (key === 'next_step' && el.classList.contains('next-btn') && currentStep === 1) {
        el.textContent = `${t[key]} (${selectedSkills.length}${t.selected_count})`;
      } else {
        el.textContent = t[key];
      }
    }
  });

  // placeholder 번역
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // 다크모드 버튼 텍스트 별도 처리
  themeBtn.textContent = body.classList.contains('dark-mode') ? 
    (lang === 'ko' ? '☀️ 라이트 모드' : '☀️ Light Mode') : 
    (lang === 'ko' ? '🌙 다크 모드' : '🌙 Dark Mode');
}

// 언어 선택 이벤트
langSelect.addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateUI();
});

// 테마 변경
themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateUI();
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// 초기화
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}
updateUI();

// 4단계 폼 로직
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
  updateUI(); // 버튼 텍스트 등 업데이트
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
  updateUI(); // 선택 개수 텍스트 반영을 위해 UI 업데이트
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
  
  const linkedInData = {
    request_type: "linkedin_job_analysis",
    current_lang: currentLang, // Firebase API 요청에 언어 정보 포함
    user_profile: {
      linkedin_skills: selectedSkills,
      target_industry: formData.get('industry'),
      key_achievement: formData.get('performance'),
      work_preference: formData.get('work_style')
    }
  };

  console.log("Firebase/API 전송 데이터:", linkedInData);
  showResults(currentLang, selectedSkills, formData.get('industry'));
});

function showResults(lang, skills, industry) {
  const resultContainer = document.getElementById('result-container');
  const formContainer = document.getElementById('step-form-container');
  const resultsDiv = document.getElementById('job-results');

  formContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  // 시뮬레이션 데이터 (KOR / ENG 분기)
  const data = lang === 'ko' ? [
    {
      title: "시니어 풀스택 개발자 (Senior Full-stack Developer)",
      desc: [
        "자바스크립트와 파이썬 기반의 고도화된 웹 시스템 아키텍처를 설계하고 구축함.",
        "프론트엔드와 백엔드 기술력을 바탕으로 서비스의 전체 안정성을 책임짐.",
        "UI/UX 감각을 코드에 녹여내어 최상의 사용자 인터랙션을 제공함.",
        "데이터 분석을 통해 성능 병목 지점을 찾고 시스템을 최적화함.",
        "프로젝트 관리 역량을 활용하여 팀원들과의 원활한 협업을 주도함.",
        "원격 근무 환경에서도 협업 툴을 활용해 최상의 생산성을 발휘함."
      ],
      skills: ["React", "Python", "Cloud Architecture"]
    }
  ] : [
    {
      title: "Senior Full-stack Developer",
      desc: [
        "Design and build advanced web architectures using JS and Python.",
        "Ensure overall service stability with full-stack expertise.",
        "Deliver top-tier user interactions by integrating UI/UX design into code.",
        "Identify and fix performance bottlenecks through data analysis.",
        "Lead team collaboration and schedules with project management skills.",
        "Maintain high productivity in remote environments using collaboration tools."
      ],
      skills: ["React", "Python", "Cloud Architecture"]
    }
  ];

  resultsDiv.innerHTML = data.map((job, i) => `
    <div class="job-card">
      <div class="job-card-header">
        <div class="job-title">${job.title}</div>
        <div class="gauge-container"><div class="gauge-fill" style="width: ${95 - i*10}%"></div></div>
      </div>
      <div class="job-card-body">
        <div class="job-section-title">${lang === 'ko' ? '상세 업무 설명' : 'Job Description'}</div>
        <div class="job-task-list">
          ${job.desc.map(line => `<p class="job-task">• ${line}</p>`).join('')}
        </div>
        <div class="job-section-title">${lang === 'ko' ? '핵심 매칭 기술' : 'Key Matching Skills'}</div>
        <div class="competency-list">${job.skills.map(s => `<span class="comp-tag">✨ ${s}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}
