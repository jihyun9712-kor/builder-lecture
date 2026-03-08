const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

// 전역 상태
let currentLang = 'ko';

// 번역 데이터 정의 (로딩/에러 메시지 추가)
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
    selected_count: "개 선택됨",
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
    analyzing: "분석 중...",
    error_msg: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
    result_title: "글로벌 커리어 분석 결과",
    retry: "다시 하기"
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
    selected_count: " selected",
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
    analyzing: "Analyzing...",
    error_msg: "A network error occurred. Please try again.",
    result_title: "Global Career Matching Results",
    retry: "Try Again"
  }
};

// 언어 업데이트 함수
function updateUI() {
  const lang = currentLang;
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (key === 'next_step' && el.classList.contains('next-btn') && currentStep === 1) {
        el.textContent = `${t.next_step} (${selectedSkills.length}${t.selected_count})`;
      } else {
        el.textContent = t[key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  const isDark = body.classList.contains('dark-mode');
  themeBtn.textContent = isDark ? (lang === 'ko' ? '☀️ 라이트 모드' : '☀️ Light Mode') : (lang === 'ko' ? '🌙 다크 모드' : '🌙 Dark Mode');
}

function updateButtonState() {
  skillsInputHidden.value = JSON.stringify(selectedSkills);
  const nextBtn = document.querySelector('#step-1 .next-btn');
  if (nextBtn) nextBtn.disabled = selectedSkills.length < 3;
  updateUI();
}

langSelect.addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateUI();
});

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateUI();
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');

// 폼 로직
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
  const currentStepEl = document.getElementById(`step-${currentStep}`);
  if (currentStepEl) currentStepEl.classList.add('active');
  updateUI();
}

nextBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStep < 4) { currentStep++; updateSteps(); } }));
prevBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStep > 1) { currentStep--; updateSteps(); } }));

// Skills 관리
const skillContainer = document.getElementById('skill-selection');
const customSkillInput = document.getElementById('custom-skill-input');
const skillsInputHidden = document.getElementById('selected-skills-input');
let selectedSkills = [];

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
    updateButtonState();
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
        updateButtonState();
      };
      attachChipEvent(chip);
      selectedSkills.push(val);
      updateButtonState();
    }
    customSkillInput.value = '';
  }
});

// [FIX] 결과 렌더링 엔진: 새로고침 방지 및 로딩/에러 처리 추가
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // 1. 브라우저 기본 새로고침 동작 차단
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  const t = translations[currentLang];

  try {
    // 2. 로딩 상태 시작
    submitBtn.disabled = true;
    submitBtn.textContent = t.analyzing; // '분석 중...' 메시지 표시

    // Firebase/OpenAI API 호출 시뮬레이션 (2초 대기)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 실제 데이터 준비
    const formData = new FormData(form);
    
    // 3. 상태 전환 (폼 숨기고 결과창 표시)
    document.getElementById('step-form-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';

    showResults(currentLang, selectedSkills, formData.get('industry'));

  } catch (error) {
    console.error("Analysis Error:", error);
    // 4. 에러 핸들링
    const resultsDiv = document.getElementById('job-results');
    document.getElementById('step-form-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    resultsDiv.innerHTML = `<p style="color: #ef4444; text-align: center; padding: 2rem; font-weight: bold;">${t.error_msg}</p>`;
  } finally {
    // 로딩 상태 해제
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
});

function showResults(lang, skills, industry) {
  const resultsDiv = document.getElementById('job-results');
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

// 초기 UI 업데이트
updateUI();
