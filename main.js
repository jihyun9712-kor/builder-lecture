const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

let currentLang = 'ko';

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

function updateUI() {
  const lang = currentLang;
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (key === 'next_step' && el.classList.contains('next-btn') && currentStep === 1) {
        el.textContent = `${t.next_step} (${selectedSkills.length}${t.selected_count})`;
      } else { el.textContent = t[key]; }
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

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  const t = translations[currentLang];

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = t.analyzing;
    await new Promise(resolve => setTimeout(resolve, 1500));
    const formData = new FormData(form);
    document.getElementById('step-form-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    showResults(currentLang, selectedSkills, formData.get('industry'));
  } catch (error) {
    const resultsDiv = document.getElementById('job-results');
    document.getElementById('step-form-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    resultsDiv.innerHTML = `<p style="color: #ef4444; text-align: center; padding: 2rem;">${t.error_msg}</p>`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
});

function showResults(lang, skills, industry) {
  const resultsDiv = document.getElementById('job-results');
  const isKor = lang === 'ko' || lang === 'KOR';
  
  const data = isKor ? [
    {
      title: "시니어 풀스택 개발자 (Senior Full-stack Developer)",
      desc: [
        "고도화된 웹 아키텍처 설계와 구축을 주도하며 글로벌 기술 시장에서 핵심적인 몸값을 형성함.",
        "사용자의 JS 및 Python 숙련도를 활용해 개발 공수를 획기적으로 단축하고 서비스 안정성에 기여함."
      ],
      skills: ["React", "Python", "System Design"],
      reason: "보유하신 기술 스택이 현대적 개발 환경의 요구사항과 완벽히 일치함."
    },
    {
      title: "테크니컬 프로덕트 매니저 (Technical Product Manager)",
      desc: [
        "기술과 비즈니스의 가교 역할을 수행하며 제품 로드맵 수립을 통해 높은 사업적 임팩트를 창출함.",
        "사용자의 프로젝트 관리 및 데이터 분석 역량을 투입해 제품 출시 성공률을 극대화하고 수익 성장을 견인함."
      ],
      skills: ["Agile", "SQL", "Product Roadmap"],
      reason: "관리 전문성과 기술적 이해도가 결합되어 리더 포지션에 최적화된 상태임."
    },
    {
      title: "마케팅 테크놀로지 전문가 (MarTech Specialist)",
      desc: [
        "자동화 툴과 데이터 시스템을 통합하여 기업의 마케팅 효율을 고도화하는 고부가가치 직무임.",
        "기존의 마케팅 자동화 성공 사례를 시스템화하여 마케팅 ROI를 직접적으로 증대시키고 기여함."
      ],
      skills: ["Marketing Automation", "Python API", "CRM"],
      reason: "성과가 입증된 경험이 마케팅 기술 최적화 영역에서 독보적인 경쟁력을 가짐."
    },
    {
      title: "데이터 기반 UX 엔지니어 (Data-driven UX Engineer)",
      desc: [
        "사용자 데이터를 분석해 인터페이스를 개선하고 서비스 전환율을 높이는 기술 디자인 전문가임.",
        "UI/UX 디자인 감각과 데이터 분석 기술을 접목해 사용자 경험 기반의 실질적인 매출 증대를 실현함."
      ],
      skills: ["Figma", "Web Analytics", "Interaction Design"],
      reason: "디자인과 데이터의 융합 역량이 고객 경험 고도화 트렌드와 일치함."
    },
    {
      title: "그로스 솔루션 아키텍트 (Growth Solution Architect)",
      desc: [
        "기업의 성장 지표를 기술적으로 해결하며 비즈니스 확장을 위한 시스템 기반을 설계하는 전문가임.",
        "사용자의 문제 해결 능력과 기술 스택을 성장 실험에 투입해 제품의 시장 점유율 확대를 주도함."
      ],
      skills: ["Growth Hacking", "A/B Testing", "Cloud Strategy"],
      reason: "문제 해결 중심의 사고방식이 기업의 성장 동력 확보에 필수적인 자산임."
    }
  ] : [
    {
      title: "Senior Full-stack Developer",
      desc: [
        "Leading advanced web architecture design with high market value in the global tech industry.",
        "Utilizing your JS and Python proficiency to reduce dev costs and ensure service stability."
      ],
      skills: ["React", "Python", "System Design"],
      reason: "Your tech stack perfectly matches the requirements of modern development environments."
    },
    {
      title: "Technical Product Manager",
      desc: [
        "Bridging tech and business to create high impact through strategic product roadmap establishment.",
        "Applying your PM and data skills to maximize launch success rates and drive revenue growth."
      ],
      skills: ["Agile", "SQL", "Product Roadmap"],
      reason: "The combination of management expertise and tech depth is optimized for leader roles."
    },
    {
      title: "MarTech Specialist",
      desc: [
        "Integrating automation tools and data systems to enhance corporate marketing efficiency.",
        "Systematizing your previous automation success to directly increase and contribute to marketing ROI."
      ],
      skills: ["Marketing Automation", "Python API", "CRM"],
      reason: "Your proven track record provides a unique competitive edge in MarTech optimization."
    },
    {
      title: "Data-driven UX Engineer",
      desc: [
        "A tech-design expert improving interfaces and conversion rates through user data analysis.",
        "Merging UI/UX design sense with data skills to realize tangible revenue growth based on CX."
      ],
      skills: ["Figma", "Web Analytics", "Interaction Design"],
      reason: "Convergent skills in design and data align with customer experience enhancement trends."
    },
    {
      title: "Growth Solution Architect",
      desc: [
        "Designing system foundations for business expansion by solving growth metrics technically.",
        "Deploying your problem-solving skills and tech stack into experiments to drive market share."
      ],
      skills: ["Growth Hacking", "A/B Testing", "Cloud Strategy"],
      reason: "Your problem-solving mindset is an essential asset for securing corporate growth engines."
    }
  ];

  resultsDiv.innerHTML = data.map((job, i) => `
    <div class="job-card">
      <div class="job-card-header">
        <div class="job-title">${job.title}</div>
        <div class="gauge-container"><div class="gauge-fill" style="width: ${95 - i*5}%"></div></div>
      </div>
      <div class="job-card-body">
        <div class="job-section-title">${isKor ? '핵심 업무 요약' : 'Core Job Summary'}</div>
        <div class="job-task-list">
          ${job.desc.map(line => `<p class="job-task">• ${line}</p>`).join('')}
        </div>
        <div class="job-section-title" style="margin-top:1.5rem;">${isKor ? '필수 역량' : 'Core Required Skills'}</div>
        <div class="competency-list">${job.skills.map(s => `<span class="comp-tag">✨ ${s}</span>`).join('')}</div>
        <p class="job-task" style="margin-top:1.5rem; color: var(--accent-color); font-weight: 700;">
          <strong>${isKor ? '매칭 이유' : 'Match Reason'}:</strong> ${job.reason}
        </p>
      </div>
    </div>
  `).join('');
}

updateUI();
