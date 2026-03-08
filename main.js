const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

let currentLang = 'ko';

// 번역 데이터 (UI용)
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
    analyzing: "산업 트렌드 분석 중...",
    error_msg: "데이터를 불러오지 못했습니다. 다시 시도해주세요.",
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
    analyzing: "Analyzing Trends...",
    error_msg: "Failed to fetch data. Please try again.",
    result_title: "Global Career Matching Results",
    retry: "Try Again"
  }
};

// UI 업데이트 및 폼 로직 (생략 없이 유지)
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
  currentLang = e.target.value === 'korean' ? 'ko' : 'en';
  updateUI();
});

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateUI();
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

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

// 전 산업군 커리어 매칭 엔진
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
    document.getElementById('result-container').style.display = 'block';
    
    showIndustrySpecificResults(currentLang, selectedSkills, formData.get('industry'), formData.get('performance'));
  } catch (error) {
    const resultsDiv = document.getElementById('job-results');
    resultsDiv.innerHTML = `<p style="color: #ef4444; text-align: center; padding: 2rem;">${t.error_msg}</p>`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
});

function showIndustrySpecificResults(lang, skills, industry, performance) {
  const resultsDiv = document.getElementById('job-results');
  const isKor = lang === 'ko';
  
  // 산업군별 직무 데이터베이스 (IT 고정관념 탈피)
  const industryDatabase = {
    "Finance": isKor ? [
      { title: "프라이빗 뱅커 (Wealth Manager)", type: "영업/관리", desc: ["고액 자산가의 포트폴리오를 관리하며 금융 시장에서 가장 신뢰받는 대면 서비스 가치를 창출함.", "사용자의 문제 해결 능력과 성과 중심 사고를 자산 운용 전략에 투입해 고객 수익률 개선에 기여함."], skills: ["Portfolio Management", "Client Relations", "Financial Planning"] },
      { title: "금융 리스크 분석가 (Risk Analyst)", type: "전략/기획", desc: ["금융 시장의 변동성을 예측하고 기업의 자산 건전성을 확보하는 전략적 방어 기제로 평가받음.", "데이터 분석 역량과 꼼꼼한 성격으로 잠재적 손실 요인을 식별하고 금융 안정성 강화에 기여함."], skills: ["Risk Modeling", "SQL", "Compliance"] },
      { title: "핀테크 서비스 기획자 (Fintech Product Manager)", type: "융합/혁신", desc: ["금융 상품과 디지털 기술을 결합하여 사용자 편의성을 극대화하는 시장 파괴적 혁신을 주도함.", "성공적인 프로젝트 관리 경험을 토대로 복잡한 금융 로드맵을 설계하고 서비스 수익화에 기여함."], skills: ["Agile", "User Research", "Banking Regulations"] },
      { title: "투자 심사역 (Investment Associate)", type: "분석/판단", desc: ["유망 기업의 가치를 평가하고 자본 흐름을 결정하며 투자 생태계의 성장을 이끄는 중추적 역할임.", "성과 문장에서 나타난 비즈니스 통찰력을 활용해 투자 타당성을 검증하고 자본 효율 증대에 기여함."], skills: ["Market Analysis", "Financial Modeling", "Due Diligence"] },
      { title: "금융 캠페인 마케터 (Financial Campaign Marketer)", type: "창의/홍보", desc: ["신뢰가 핵심인 금융 상품의 매력을 소구하고 데이터 기반으로 신규 고객을 확보하는 성장 동력임.", "마케팅 자동화 성공 사례를 금융 퍼널에 적용해 고객 획득 비용을 낮추고 매출 증대에 기여함."], skills: ["Performance Marketing", "CRM", "Copywriting"] }
    ] : [
      { title: "Wealth Manager (Private Banker)", type: "Sales/Management", desc: ["Managing high-net-worth portfolios and creating the most trusted value in the financial market.", "Applying your problem-solving and goal-oriented mindset to asset strategies to enhance client returns."] },
      { title: "Risk Analyst", type: "Strategy/Planning", desc: ["Predicting market volatility and serving as a strategic defense mechanism for corporate asset health.", "Identifying potential loss factors with data skills and meticulous nature to ensure financial stability."] }
      // (기타 직무 영어 버전...)
    ],
    "E-commerce": isKor ? [
      { title: "카테고리 매니저 (Merchandiser)", type: "유통/영업", desc: ["시장 트렌드를 분석해 매력적인 상품군을 구성하고 유통 채널의 수익성을 극대화하는 중추적 역할임.", "성과 창출 능력을 공급망 관리와 결합해 재고 효율을 높이고 실질적인 거래액 성장에 기여함."], skills: ["Sourcing", "Inventory Management", "Trend Analysis"] },
      { title: "공급망 운영 전문가 (Supply Chain Specialist)", type: "현장/관리", desc: ["상품의 소싱부터 배송까지 전 과정을 최적화하여 물류 비용을 절감하는 실무 효율의 핵심임.", "프로젝트 관리 역량을 투입해 복잡한 유통 구조를 단순화하고 물류 퍼포먼스 개선에 기여함."], skills: ["Logistics", "Vendor Management", "ERP"] },
      { title: "그로스 마케팅 리드 (Growth Marketing Lead)", type: "전략/기획", desc: ["데이터 분석을 통해 고객 여정을 설계하고 퍼널 최적화를 통해 플랫폼 성장을 견인하는 전문가임.", "마케팅 자동화 경험을 활용해 반복적인 마케팅 업무를 시스템화하고 전환율 증대에 기여함."], skills: ["GA4", "A/B Testing", "Customer Journey"] },
      { title: "커머스 UX 디자이너 (Commerce UX Designer)", type: "창의/예술", desc: ["구매 전환을 유도하는 인터페이스를 설계하여 사용자 경험이 곧 매출이 되는 디지털 환경을 구축함.", "디자인 감각과 성과 중심 사고를 결합해 이탈률을 낮추고 고객의 구매 편의성 증대에 기여함."], skills: ["Figma", "User Psychology", "Prototyping"] },
      { title: "플랫폼 비즈니스 분석가 (Platform Analyst)", type: "분석/판단", desc: ["거래 데이터를 기반으로 판매자와 구매자의 행동을 분석하여 플랫폼 정책의 가이드를 제시함.", "데이터 분석 역량을 비즈니스 지표와 연결해 새로운 수익 모델을 발굴하고 시장 점유율 확대에 기여함."], skills: ["SQL", "Business Intelligence", "Market Sizing"] }
    ] : [
      { title: "Category Manager (Merchandiser)", type: "Retail/Sales", desc: ["Analyzing trends to curate products and maximizing profitability across distribution channels.", "Combining your goal-oriented skills with SCM to improve inventory efficiency and GMV growth."] }
      // (기타 직무 영어 버전...)
    ],
    "IT/Software": isKor ? [
      { title: "시니어 솔루션 아키텍트 (Solution Architect)", type: "전략/기술", desc: ["비즈니스 요구사항을 기술적으로 설계하여 확장성 있는 시스템 기반을 구축하는 시장 가치가 높은 직무임.", "사용자의 JS/Python 역량을 시스템 설계에 투영해 개발 생산성을 높이고 기술적 우위 확보에 기여함."], skills: ["System Design", "Cloud Architecture", "Python"] },
      { title: "테크니컬 프로덕트 매니저 (Technical PM)", type: "기획/관리", desc: ["개발 팀과 비즈니스 팀 사이를 연결하며 데이터 기반으로 제품의 성공적인 출시를 책임지는 리더임.", "프로젝트 관리 전문성을 발휘해 애자일 환경에서 일정을 준수하고 제품의 시장 경쟁력 확보에 기여함."], skills: ["Agile", "Stakeholder Management", "Data Analysis"] }
      // (기타 직무 리스트...)
    ] : []
  };

  // 기본값 설정 (선택 산업군이 없으면 IT 기준)
  const selectedData = industryDatabase[industry] || industryDatabase["IT/Software"];

  resultsDiv.innerHTML = selectedData.map((job, i) => `
    <div class="job-card">
      <div class="job-card-header">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="job-title">${job.title}</div>
          <div style="font-size:0.75rem; background:rgba(0,0,0,0.05); padding:2px 8px; border-radius:4px; font-weight:700;">${job.type}</div>
        </div>
        <div class="gauge-container"><div class="gauge-fill" style="width: ${98 - i*6}%"></div></div>
      </div>
      <div class="job-card-body">
        <div class="job-section-title">${isKor ? '핵심 업무 분석' : 'Core Job Analysis'}</div>
        <div class="job-task-list">
          <p class="job-task">1행: ${job.desc[0]}</p>
          <p class="job-task">2행: ${job.desc[1]}</p>
        </div>
        <div class="job-section-title" style="margin-top:1.2rem;">${isKor ? '필수 역량' : 'Key Skills'}</div>
        <div class="competency-list">${job.skills.map(s => `<span class="comp-tag">✨ ${s}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

updateUI();
