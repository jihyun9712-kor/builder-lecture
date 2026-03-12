const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

let currentLang = 'ko';

// --- 전이 가능한 기술(Transferable Skills) 매핑 테이블 ---
const pivotMapping = {
  "섬세함": ["UX Designer", "Quality Assurance", "Precision Medicine", "Premium Hospitality Manager", "Space Curator", "Wellness Content Planner", "Untact Psychological Counselor"],
  "기획": ["Product Manager", "Content Producer", "Strategy Consultant", "Senior Care Planner", "Edutech Content Planner", "Local Branding Director", "Wellness Content Planner", "Online Baking Class Operator", "Edutech Curriculum Designer", "Personal Branding Consultant"],
  "미감": ["Brand Director", "UI Designer", "Virtual Human Producer", "Space Curator", "Digital Stationery Designer", "Local Branding Director", "Online Baking Class Operator", "Personal Branding Consultant"],
  "소통": ["Community Manager", "Client Relations", "Sales Lead", "Non-face-to-face Counselor", "Personal Branding Director", "Untact Psychological Counselor", "Personal Branding Consultant"],
  "분석": ["Data Analyst", "Risk Analyst", "Market Strategist", "ESG Consultant", "Edutech Curriculum Designer"],
  "관리": ["Operations Manager", "Project Manager", "DAO Operator", "Vegan Business Operator", "Online Baking Class Operator"],
  "창의": ["Prompt Engineer", "Creative Director", "Innovation Lead", "Local Branding Specialist", "Virtual Space Designer", "Local Branding Director"],
  "친환경": ["Vegan Business Operator", "Upcycling Professional", "ESG Consultant"],
  "로컬": ["Local Branding Specialist", "Local Branding Director"],
  "디자인": ["Digital Stationery Designer", "Virtual Space Designer", "UX Designer"],
  "심리": ["Non-face-to-face Counselor", "Untact Psychological Counselor"],
  "교육": ["Edutech Content Planner", "Online Baking Class Operator", "Edutech Curriculum Designer"],
  "실버": ["Senior Care Planner"]
};

const translations = {
  ko: {
    hero_title: "커리어 나침반: Pivot",
    hero_desc: "답답한 어제에서 설레는 내일로, 당신만의 커리어 루트를 찾으세요.",
    vp1_title: "정교한 역량 연결",
    vp1_desc: "단순한 매칭을 넘어, 당신의 소중한 성과 데이터를 기반으로 실무에서 빛날 수 있는 최적의 루트를 발견합니다.",
    vp2_title: "글로벌 시장의 흐름",
    vp2_desc: "전 세계 주요 비즈니스 거점의 데이터를 세밀하게 분석하여, 당신의 가능성이 가장 높게 평가받을 산업군을 안내합니다.",
    vp3_title: "따뜻한 커리어 가이드",
    vp3_desc: "나침반 탐색 결과에 맞추어, 더 나은 내일을 위해 보완하면 좋을 역량과 글로벌 진출을 위한 진심 어린 팁을 제안합니다.",
    step1_title: "1단계: 나만의 핵심 역량",
    step1_desc: "지금까지 쌓아온 소중한 역량 키워드를 선택해주세요. (5개 선택)",
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
    selected_count: "/5",
    prev_step: "이전",
    step2_title: "2단계: 새로운 도전 산업군",
    step2_desc: "당신의 잠재력을 펼치고 싶은 타겟 산업군을 선택하세요.",
    industry_placeholder: "산업군 선택",
    ind_it: "IT / 소프트웨어",
    ind_finance: "금융 / 핀테크",
    ind_healthcare: "의료 / 바이오",
    ind_ecommerce: "커머스 / 유통",
    ind_media: "미디어 / 광고",
    ind_lifestyle: "라이프스타일 / 서비스",
    ind_creative: "크리에이티브",
    ind_ecosocial: "친환경 / 소셜",
    ind_educounsel: "전문 상담 / 교육",
    step3_title: "3단계: 반짝이는 성과",
    step3_desc: "당신의 소중한 경험 속에서 다른 직무에서도 빛날 '전이 가능한 기술'을 세밀하게 추출합니다.",
    perf_placeholder: "예: '호텔 파티시에로서 섬세한 레시피 기획과 시각적 미감을 강조한 디저트를 제작함'",
    step4_title: "4단계: 원하는 업무 환경",
    step4_desc: "당신이 가장 몰입할 수 있는 근무 장소를 선택해주세요.",
    work_remote: "원격 근무 (Remote)",
    work_hybrid: "하이브리드 (Hybrid)",
    work_office: "오피스 출근 (Office)",
    step5_title: "5단계: 커리어의 지향점",
    step5_desc: "일을 통해 당신을 가장 행복하게 만드는 가치를 선택해주세요.",
    val_autonomy: "자율성",
    val_a1: "스스로 결정",
    val_a2: "매뉴얼 중심",
    val_social: "상호작용",
    val_s1: "팀워크/고객",
    val_s2: "개인 몰입",
    val_reward: "보상체계",
    val_r1: "성과급/고수익",
    val_r2: "안정적 급여",
    val_source: "성취원천",
    val_o1: "문제 해결",
    val_o2: "시각적 완성도",
    find_jobs: "루트 발견하기",
    analyzing: "당신만을 위한 커리어 루트를 찾는 중입니다...",
    error_msg: "데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
    result_title: "나침반 탐색 결과",
    retry: "다시 탐색하기",
    pivot_reason: "당신의 소중한 강점인 [EXTRACTED] 역량이 이 직무의 핵심 성공 요인과 조화롭게 연결됩니다."
  },
  en: {
    hero_title: "Career Compass: Pivot",
    hero_desc: "From a frustrating yesterday to an exciting tomorrow, find your own career route.",
    vp1_title: "Precise Competency Connection",
    vp1_desc: "Beyond simple matching, we discover the optimal route for you to shine based on your valuable performance data.",
    vp2_title: "Global Market Trends",
    vp2_desc: "By analyzing data from major global business hubs, we guide you to industries where your potential is most valued.",
    vp3_title: "Warm Career Guide",
    vp3_desc: "Based on the compass navigation results, we suggest skills to supplement for a better tomorrow and sincere tips for global entry.",
    step1_title: "Step 1: Core Competencies",
    step1_desc: "Select existing keywords or enter them directly. (Select 5)",
    skill_js: "JavaScript",
    skill_python: "Python",
    skill_pm: "Project Management",
    skill_da: "Data Analysis",
    skill_uiux: "UI/UX Design",
    skill_dm: "Digital Marketing",
    skill_sql: "SQL",
    skill_ps: "Problem Solving",
    skill_agile: "Agile",
    custom_placeholder: "Enter directly and press Enter",
    next_step: "Next Step",
    selected_count: "/5",
    prev_step: "Previous",
    step2_title: "Step 2: Target Industry",
    step2_desc: "Select the target industry you wish to analyze.",
    industry_placeholder: "Select Industry",
    ind_it: "IT / Software",
    ind_finance: "Finance / Fintech",
    ind_healthcare: "Healthcare / Bio",
    ind_ecommerce: "E-commerce / Retail",
    ind_media: "Media / Ads",
    ind_lifestyle: "Lifestyle / Service",
    ind_creative: "Creative",
    ind_ecosocial: "Eco / Social",
    ind_educounsel: "Professional / Edu",
    step3_title: "Step 3: Key Achievements",
    step3_desc: "AI extracts 'transferable skills' from your experience.",
    perf_placeholder: "E.g., 'As a hotel pastry chef, I created desserts emphasizing delicate recipe planning and visual aesthetics.'",
    step4_title: "Step 4: Work Environment",
    step4_desc: "Please select your preferred work location.",
    work_remote: "Remote",
    work_hybrid: "Hybrid",
    work_office: "Office",
    step5_title: "Step 5: Professional Values",
    step5_desc: "Please select the values that make you happiest.",
    val_autonomy: "Autonomy",
    val_a1: "Decide myself",
    val_a2: "Manual-oriented",
    val_social: "Interaction",
    val_s1: "Teamwork/Client",
    val_s2: "Individual focus",
    val_reward: "Reward System",
    val_r1: "Incentive/High Income",
    val_r2: "Stable Salary",
    val_source: "Source of Achievement",
    val_o1: "Problem Solving",
    val_o2: "Visual Perfection",
    find_jobs: "Discover Routes",
    analyzing: "Finding your unique career route...",
    error_msg: "Failed to load data. Please try again soon.",
    result_title: "Compass Navigation Results",
    retry: "Search Again",
    pivot_reason: "Your valuable strength in [EXTRACTED] connects harmoniously with the core success factors of this role."
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

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateUI();
});

langSelect.addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateUI();
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
  
  const currentStepEl = document.getElementById(`step-${currentStep}`);
  const nextBtn = currentStepEl.querySelector('.next-btn');
  
  if (currentStep === 1) {
    if (nextBtn) nextBtn.disabled = selectedSkills.length < 5;
  }
  if (currentStep === 2) {
    const industries = document.querySelectorAll('input[name="industry"]');
    const checkIndustry = () => { if (nextBtn) nextBtn.disabled = !Array.from(industries).some(i => i.checked); };
    industries.forEach(i => i.addEventListener('change', checkIndustry));
    checkIndustry();
  }
  updateUI();
}

nextBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStep < 5) { currentStep++; updateSteps(); } }));
prevBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStep > 1) { currentStep--; updateSteps(); } }));

const skillContainer = document.getElementById('skill-selection');
const customSkillInput = document.getElementById('custom-skill-input');
const skillsInputHidden = document.getElementById('selected-skills-input');
let selectedSkills = [];

function attachChipEvent(chip) {
  chip.addEventListener('click', () => {
    const val = chip.dataset.value;
    if (selectedSkills.includes(val)) {
      selectedSkills = selectedSkills.filter(s => s !== val);
      chip.classList.remove('selected');
    } else if (selectedSkills.length < 5) {
      selectedSkills.push(val);
      chip.classList.add('selected');
    }
    updateSteps();
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
      chip.textContent = val;
      skillContainer.appendChild(chip);
      attachChipEvent(chip);
      selectedSkills.push(val);
      updateSteps();
    }
    customSkillInput.value = '';
  }
});

const perfTextarea = document.getElementById('performance');
const charCount = document.getElementById('char-count');
if (perfTextarea) {
  perfTextarea.addEventListener('input', (e) => {
    charCount.textContent = e.target.value.length;
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  const t = translations[currentLang];
  submitBtn.disabled = true;
  submitBtn.textContent = t.analyzing;

  await new Promise(r => setTimeout(r, 1500));
  
  document.getElementById('step-form-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';
  
  const formData = new FormData(form);
  showPivotResults(currentLang, selectedSkills, formData);
});

function showPivotResults(lang, skills, formData) {
  const resultsDiv = document.getElementById('job-results');
  const isKor = lang === 'ko';
  const performanceText = formData.get('performance') || "";
  const industry = formData.get('industry');

  // 1. 성과 문구에서 전이 기술(Transferable Skills) 추출
  const extractedSkills = [];
  Object.keys(pivotMapping).forEach(keyword => {
    if (performanceText.includes(keyword)) extractedSkills.push(keyword);
  });

  const userValues = {
    location: formData.get('loc_freedom'),
    autonomy: formData.get('v_autonomy'),
    social: formData.get('v_social'),
    reward: formData.get('v_reward'),
    source: formData.get('v_source')
  };

  // 고유한 직무 데이터베이스 (중복 방지를 위해 ID 부여)
  const jobDatabase = [
    // Lifestyle
    { id: 'life_hosp', industry: "Lifestyle", title: isKor ? "프리미엄 호스피탈리티 매니저" : "Premium Hospitality Manager", tags: ["Service", "Planning"], v: { location: 'office', autonomy: 'manual', social: 'team', reward: 'stable', source: 'solve' } },
    { id: 'life_space', industry: "Lifestyle", title: isKor ? "공간 큐레이터" : "Space Curator", tags: ["Design", "Experience"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' } },
    { id: 'life_brand', industry: "Lifestyle", title: isKor ? "퍼스널 브랜딩 디렉터" : "Personal Branding Director", tags: ["Marketing", "Consulting"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' } },
    
    // Creative
    { id: 'cre_local', industry: "Creative", title: isKor ? "로컬 브랜딩 전문가" : "Local Branding Specialist", tags: ["Local", "Creative"], v: { location: 'hybrid', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' } },
    { id: 'cre_stat', industry: "Creative", title: isKor ? "디지털 문방구 디자이너" : "Digital Stationery Designer", tags: ["Design", "E-commerce"], v: { location: 'remote', autonomy: 'decide', social: 'solo', reward: 'high', source: 'visual' } },
    { id: 'cre_virt', industry: "Creative", title: isKor ? "가상 공간 디자이너" : "Virtual Space Designer", tags: ["3D", "Metaverse"], v: { location: 'remote', autonomy: 'decide', social: 'solo', reward: 'high', source: 'visual' } },
    
    // Eco/Social
    { id: 'eco_vegan', industry: "EcoSocial", title: isKor ? "비건 비즈니스 운영자" : "Vegan Business Operator", tags: ["Sustainability", "F&B"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'stable', source: 'solve' } },
    { id: 'eco_esg', industry: "EcoSocial", title: isKor ? "ESG 컨설턴트" : "ESG Consultant", tags: ["Analysis", "CSR"], v: { location: 'hybrid', autonomy: 'manual', social: 'team', reward: 'high', source: 'solve' } },
    { id: 'eco_up', industry: "EcoSocial", title: isKor ? "업사이클링 전문가" : "Upcycling Professional", tags: ["Environment", "Design"], v: { location: 'office', autonomy: 'decide', social: 'solo', reward: 'stable', source: 'visual' } },
    
    // Edu/Counsel
    { id: 'edu_senior', industry: "EduCounsel", title: isKor ? "시니어 케어 기획자" : "Senior Care Planner", tags: ["Silver Economy", "Planning"], v: { location: 'office', autonomy: 'manual', social: 'team', reward: 'stable', source: 'solve' } },
    { id: 'edu_psych', industry: "EduCounsel", title: isKor ? "비대면 심리 상담가" : "Non-face-to-face Counselor", tags: ["Counseling", "Digital"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'stable', source: 'solve' } },
    { id: 'edu_tech', industry: "EduCounsel", title: isKor ? "에듀테크 콘텐츠 기획자" : "Edutech Content Planner", tags: ["Education", "Content"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' } },

    // Original roles
    { id: 'fin_sec', industry: "Finance", title: isKor ? "핀테크 보안 전문가" : "Fintech Security Specialist", tags: ["Web3", "Security"], v: { location: 'remote', autonomy: 'manual', social: 'solo', reward: 'stable', source: 'solve' } },
    { id: 'ux_des', industry: "IT/Software", title: isKor ? "UX 디자이너" : "UX Designer", tags: ["Design", "Research"], v: { location: 'hybrid', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' } },
    { id: 'brand_dir', industry: "Media/Ads", title: isKor ? "푸드 브랜딩 디렉터" : "Food Brand Director", tags: ["Creative", "Marketing"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'high', source: 'visual' } },
    { id: 'prompt_eng', industry: "IT/Software", title: isKor ? "프롬프트 엔지니어" : "Prompt Engineer", tags: ["AI", "LLM"], v: { location: 'remote', autonomy: 'decide', social: 'solo', reward: 'high', source: 'solve' } },
    { id: 'dtx_ux', industry: "Healthcare", title: isKor ? "디지털 치료제 UX 디자이너" : "DTx UX Designer", tags: ["Health-tech", "Design"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' } },
    { id: 'nomad_con', industry: "General", title: isKor ? "디지털 노마드 컨설턴트" : "Digital Nomad Consultant", tags: ["Remote", "Future Work"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' } },
    { id: 'dao_op', industry: "Finance", title: isKor ? "DAO 거버넌스 운영자" : "DAO Operator", tags: ["Web3", "Gov"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' } },

    // New Roles
    { id: 'cre_local_dir', industry: "Creative", title: isKor ? "로컬 브랜딩 디렉터" : "Local Branding Director", description: isKor ? "파티시에로서의 섬세한 미감과 기획력을 지역 브랜드의 고유한 가치와 연결하는 능력이 탁월합니다." : "Excellent ability to connect the delicate aesthetic and planning skills of a pastry chef with the unique values of local brands.", tags: ["Local", "Branding", "Creative"], v: { location: 'hybrid', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' } },
    { id: 'life_wellness', industry: "Lifestyle", title: isKor ? "웰니스 콘텐츠 기획자" : "Wellness Content Planner", description: isKor ? "디저트를 통해 행복을 전달하던 경험을 심신의 안정을 돕는 웰니스 콘텐츠 기획으로 전이할 수 있습니다." : "Can transfer the experience of delivering happiness through desserts into planning wellness content that helps physical and mental stability.", tags: ["Wellness", "Content", "Planning"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'stable', source: 'solve' } },
    { id: 'cre_baking', industry: "Creative", title: isKor ? "온라인 베이킹 클래스 운영자" : "Online Baking Class Operator", description: isKor ? "다년간 쌓아온 전문 베이킹 기술과 레시피 설계 능력을 디지털 강의로 확장하여 새로운 가치를 창출합니다." : "Creates new value by expanding professional baking techniques and recipe design skills accumulated over years into digital lectures.", tags: ["E-commerce", "Education", "Baking"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'visual' } },
    { id: 'edu_edutech_des', industry: "EduCounsel", title: isKor ? "에듀테크 커리큘럼 디자이너" : "Edutech Curriculum Designer", description: isKor ? "복잡한 레시피를 단계별 공정으로 구조화하던 분석력을 활용해 효율적인 학습 커리큘럼을 설계합니다." : "Designs efficient learning curricula using the analytical skills used to structure complex recipes into step-by-step processes.", tags: ["Education", "Curriculum", "Analysis"], v: { location: 'remote', autonomy: 'manual', social: 'team', reward: 'stable', source: 'solve' } },
    { id: 'edu_psych_untact', industry: "EduCounsel", title: isKor ? "비대면 심리상담사" : "Untact Psychological Counselor", description: isKor ? "고객의 기분을 세밀하게 살피던 호스피탈리티 정신을 바탕으로 비대면 환경에서도 깊은 공감을 전달합니다." : "Delivers deep empathy even in non-face-to-face environments based on the hospitality spirit of carefully observing customers' moods.", tags: ["Counseling", "Digital", "Service"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'stable', source: 'solve' } },
    { id: 'life_personal_brand', industry: "Lifestyle", title: isKor ? "퍼스널 브랜딩 컨설턴트" : "Personal Branding Consultant", description: isKor ? "개별 제품의 매력을 극대화하던 기획 경험을 통해 개인의 고유한 브랜딩 가치를 발굴하고 제안합니다." : "Discovers and proposes unique personal branding values through planning experience that maximized the appeal of individual products.", tags: ["Marketing", "Consulting", "Personal Branding"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' } }
  ];

  // 2. 가중치 기반 스코어링 시스템 (가점 방식)
  const scoredJobs = jobDatabase.map(job => {
    let score = 0;
    
    // 산업군 가점
    if (job.industry === industry) score += 2.0; // 산업군 매칭 가중치 상향
    if (job.industry === "General") score += 0.5;

    // 가치관 매칭 가점 (각 0.5점)
    if (job.v.autonomy === userValues.autonomy) score += 0.5;
    if (job.v.social === userValues.social) score += 0.5;
    if (job.v.reward === userValues.reward) score += 0.5;
    if (job.v.source === userValues.source) score += 0.5;

    // 재택근무 가점 (하드 필터링 대신 가점 부여)
    if (job.v.location === userValues.location) {
      if (userValues.location === 'remote') {
        const isTechJob = /AI|소프트웨어|개발|Software|Develop/.test(job.title) || job.tags.some(t => /AI|소프트웨어|개발|Software|Develop/.test(t));
        // 전통적 직종의 리모트 워크 형태에 더 높은 우선순위 부여 (+1.5)
        // 일반 IT/테크 재택근무는 기존 가점 유지 (+0.8)
        score += isTechJob ? 0.8 : 1.5;
      } else {
        score += 0.8;
      }
    }

    // 전이 기술 가점 (추출된 기술당 1.5점 - 커리어 피벗의 핵심)
    let matchedPivotSkill = "";
    let matchReason = "";

    extractedSkills.forEach(sk => {
      if (pivotMapping[sk].includes(job.title) || pivotMapping[sk].some(val => job.tags.includes(val))) {
        score += 1.5;
        matchedPivotSkill = sk;
      }
    });

    // 논리적 추천 근거 생성 로직
    if (matchedPivotSkill) {
      matchReason = isKor 
        ? `과거 경험에서 증명된 <b>'${matchedPivotSkill}'</b> 역량은 ${job.title} 직무의 핵심 성공 요인과 깊이 맞닿아 있습니다. 이는 새로운 시작을 위한 견고한 토대가 될 것입니다.`
        : `Your proven <b>'${matchedPivotSkill}'</b> skill aligns deeply with the core success factors of a ${job.title}, providing a solid foundation for your new journey.`;
    } else if (job.industry === industry) {
      matchReason = isKor 
        ? `선택하신 <b>'${translations.ko['ind_' + industry.toLowerCase()] || industry}'</b> 분야에 대한 따뜻한 관심과 보유하신 <b>'${skills[0]}'</b> 역량을 결합하여 새로운 가치를 창출할 수 있는 실무 중심 포지션입니다.`
        : `This role allows you to combine your interest in <b>'${translations.en['ind_' + industry.toLowerCase()] || industry}'</b> with your <b>'${skills[0]}'</b> skill to create new value.`;
    } else {
      matchReason = isKor
        ? `당신이 소중히 여기는 <b>'${translations.ko['val_' + Object.keys(userValues).find(k => userValues[k] === job.v[k.replace('v_', '')])] || '맞춤'}'</b> 가치가 조화롭게 실현되는 환경으로, 심리적 안정감과 성취감을 동시에 얻으실 수 있습니다.`
        : `This environment realizes the <b>'${translations.en['val_' + Object.keys(userValues).find(k => userValues[k] === job.v[k.replace('v_', '')])] || 'customized'}'</b> value you prioritize.`;
    }

    return { ...job, score, pivotSkill: matchedPivotSkill, matchReason };
  });

  // 3. 중복 제거 및 점수 순 정렬 (ID 기반으로 고유성 보장)
  const uniqueJobs = Array.from(new Map(scoredJobs.map(item => [item.id, item])).values());
  const sortedJobs = uniqueJobs.sort((a, b) => b.score - a.score);

  // 4. IT/AI 편중 방지 로직 (최대 20% 제한)
  const maxResults = 6;
  const maxTechAllowed = Math.floor(maxResults * 0.2) || 1; // 6개 중 20%면 1.2개 -> 최대 1개
  let currentTechCount = 0;
  const finalResults = [];

  for (const job of sortedJobs) {
    if (finalResults.length >= maxResults) break;
    
    const isTechJob = /AI|소프트웨어|개발|Software|Develop/.test(job.title) || job.tags.some(t => /AI|소프트웨어|개발|Software|Develop/.test(t));
    
    if (isTechJob) {
      if (currentTechCount < maxTechAllowed) {
        finalResults.push(job);
        currentTechCount++;
      }
    } else {
      finalResults.push(job);
    }
  }

  resultsDiv.innerHTML = finalResults.map((job, i) => `
    <div class="job-card" style="animation-delay: ${i * 0.1}s; border: ${job.pivotSkill ? '2px solid #1a202c' : '1px solid var(--border-color)'}">
      ${job.pivotSkill ? `<div style="background:#1a202c; color:white; font-size:0.65rem; padding:2px 8px; position:absolute; top:-10px; left:15px; border-radius:4px; font-weight:700;">최적의 루트 발견</div>` : ''}
      <div class="job-card-header">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="job-title">${job.title}</div>
          <div style="font-size:0.7rem; font-weight:700; color:#4a5568;">매칭 지수: ${Math.min(99, Math.round(job.score * 15))}%</div>
        </div>
        <div class="gauge-container"><div class="gauge-fill" style="width: ${Math.min(100, job.score * 15)}%; background:${job.pivotSkill ? '#1a202c' : 'var(--accent-color)'}"></div></div>
      </div>
      <div class="job-card-body">
        <div class="competency-list">
          ${job.tags.map(t => `<span class="comp-tag"># ${t}</span>`).join('')}
        </div>
        ${job.description ? `<p style="font-size:0.85rem; color:var(--text-color); margin:12px 0; line-height:1.5; background:var(--bg-secondary); padding:10px; border-radius:6px; border-left:4px solid var(--accent-color);"><b>전이 가능한 기술:</b> ${job.description}</p>` : ''}
        <div class="match-reason-box">
          <span class="reason-label">💡 나침반 탐색 리포트</span>
          <p class="reason-text">${job.matchReason}</p>
        </div>

        <div class="roadmap-container">
          <button class="roadmap-toggle-btn" onclick="toggleRoadmap(this)">
            <span>📍 ${isKor ? '준비 로드맵 보기' : 'View Roadmap'}</span>
            <span class="arrow">▾</span>
          </button>
          <div class="roadmap-content">
            <div class="roadmap-step"><span class="step-label">[Step 1]</span> ${isKor ? '기초 강의: 직무 핵심 역량 및 시장 이해' : 'Basic Lecture: Core Competencies & Market Understanding'}</div>
            <div class="roadmap-step"><span class="step-label">[Step 2]</span> ${isKor ? '실전 준비: 포트폴리오 구성 및 전이 기술 증명' : 'Practical Prep: Portfolio & Transferable Skill Proof'}</div>
            <div class="roadmap-step"><span class="step-label">[Step 3]</span> ${isKor ? '수익 창출: 커리어 피벗 성공 및 전문성 강화' : 'Revenue: Career Pivot Success & Expert Growth'}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

window.toggleRoadmap = function(btn) {
  const content = btn.nextElementSibling;
  const arrow = btn.querySelector('.arrow');
  content.classList.toggle('active');
  if (content.classList.contains('active')) {
    arrow.textContent = '▴';
  } else {
    arrow.textContent = '▾';
  }
};

updateUI();
updateSteps();
