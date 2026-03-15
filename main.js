const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

let currentLang = 'ko';

// 1. 확장된 키워드 데이터 (1단계 & 3단계 공용 사용 가능)
const skillKeywords = {
  service: ["프리미엄 서비스", "고객 심리 분석", "메뉴 기획", "공간 운영", "커뮤니티 관리"],
  creative: ["브랜딩 스토리", "SNS 채널 운영", "디지털 굿즈 기획", "퍼스널 브랜딩", "섬세한 미감"],
  edu: ["커리큘럼 설계", "온라인 강의 기획", "비대면 상담", "코칭", "공정 기획력"],
  analysis: ["데이터 기반 분석", "친환경 가치", "창의적 문제 해결", "시장 조사"]
};

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
    skill_premium_service: "프리미엄 서비스",
    skill_cust_psych: "고객 심리 분석",
    skill_menu_plan: "메뉴 기획",
    skill_space_op: "공간 운영",
    skill_comm_mgmt: "커뮤니티 관리",
    skill_brand_story: "브랜딩 스토리",
    skill_sns_mgmt: "SNS 채널 운영",
    skill_digi_goods: "디지털 굿즈 기획",
    skill_pers_brand: "퍼스널 브랜딩",
    skill_curr_design: "커리큘럼 설계",
    skill_online_lec: "온라인 강의 기획",
    skill_remote_counsel: "비대면 상담",
    skill_coaching: "코칭",
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
    step3_title: "3단계: 전이 가능한 기술",
    step3_desc: "당신의 소중한 경험 속에서 다른 직무에서도 빛날 '전이 가능한 기술'을 선택하세요.",
    pivot_delicate: "섬세한 미감",
    pivot_plan: "공정 기획력",
    pivot_comm: "고객 공감 능력",
    pivot_analysis: "데이터 기반 분석",
    pivot_eco: "친환경 가치",
    pivot_creative: "창의적 문제 해결",
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
    skill_premium_service: "Premium Service",
    skill_cust_psych: "Customer Psychology",
    skill_menu_plan: "Menu Planning",
    skill_space_op: "Space Operations",
    skill_comm_mgmt: "Community Management",
    skill_brand_story: "Branding Story",
    skill_sns_mgmt: "SNS Management",
    skill_digi_goods: "Digital Goods",
    skill_pers_brand: "Personal Branding",
    skill_curr_design: "Curriculum Design",
    skill_online_lec: "Online Lecture",
    skill_remote_counsel: "Remote Counseling",
    skill_coaching: "Coaching",
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
    step3_title: "Step 3: Transferable Skills",
    step3_desc: "Select 'transferable skills' that will shine in other jobs.",
    pivot_delicate: "Delicate Aesthetic",
    pivot_plan: "Process Planning",
    pivot_comm: "Customer Empathy",
    pivot_analysis: "Data-driven Analysis",
    pivot_eco: "Eco-friendly Value",
    pivot_creative: "Creative Problem Solving",
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
  if (currentStep === 3) {
    if (nextBtn) nextBtn.disabled = selectedTransferableSkills.length === 0;
  }
  updateUI();
}

nextBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStep < 5) { currentStep++; updateSteps(); } }));
prevBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStep > 1) { currentStep--; updateSteps(); } }));

const skillContainer = document.getElementById('skill-selection');
const customSkillInput = document.getElementById('custom-skill-input');
const transferableSkillContainer = document.getElementById('transferable-skill-selection');
let selectedSkills = [];
let selectedTransferableSkills = [];

function attachSkillChipEvent(chip) {
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

function attachTransferableSkillChipEvent(chip) {
  chip.addEventListener('click', () => {
    const val = chip.dataset.value;
    if (selectedTransferableSkills.includes(val)) {
      selectedTransferableSkills = selectedTransferableSkills.filter(s => s !== val);
      chip.classList.remove('selected');
    } else {
      selectedTransferableSkills.push(val);
      chip.classList.add('selected');
    }
    updateSteps();
  });
}

document.querySelectorAll('#skill-selection .keyword-chip').forEach(attachSkillChipEvent);
document.querySelectorAll('#transferable-skill-selection .keyword-chip').forEach(attachTransferableSkillChipEvent);

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
      attachSkillChipEvent(chip);
      selectedSkills.push(val);
      updateSteps();
    }
    customSkillInput.value = '';
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  
  const loadingTexts = currentLang === 'ko' 
    ? ['역량 분석 중...', '글로벌 루트 탐색 중...', '최적의 루트 발견!']
    : ['Analyzing competencies...', 'Searching global routes...', 'Optimal route discovered!'];
  
  for (const text of loadingTexts) {
    submitBtn.textContent = text;
    await new Promise(r => setTimeout(r, 800));
  }

  document.getElementById('step-form-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';
  
  const formData = new FormData(form);
  showPivotResults(currentLang, selectedSkills, selectedTransferableSkills, formData);
});

// 2. 직업 데이터베이스 업데이트 (한 줄 설명 description 추가)
function showPivotResults(lang, skills, transferableSkills, formData) {
  const resultsDiv = document.getElementById('job-results');
  const isKor = lang === 'ko';
  const industry = formData.get('industry');

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
    { id: 'life_hosp', industry: "Lifestyle", title: isKor ? "프리미엄 호스피탈리티 매니저" : "Premium Hospitality Manager", description: "고객의 숨은 니즈를 파악해 최상의 환대 경험을 설계하는 서비스 전문가", tags: ["Service", "Planning"], v: { location: 'office', autonomy: 'manual', social: 'team', reward: 'stable', source: 'solve' }, roadmap: isKor ? ["Step 1: 호스피탈리티 기초 강의", "Step 2: 고객 응대 실전 준비", "Step 3: 프리미엄 서비스 수익 창출"] : ["Step 1: Hospitality Basics", "Step 2: Practical Service Prep", "Step 3: Premium Service Revenue"] },
    { id: 'life_space', industry: "Lifestyle", title: isKor ? "공간 큐레이터" : "Space Curator", description: "브랜드의 철학을 공간에 담아 고객에게 특별한 경험을 선사하는 전시 기획자", tags: ["Design", "Experience"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' }, roadmap: isKor ? ["Step 1: 공간 디자인 기초", "Step 2: 전시 및 큐레이션 실전", "Step 3: 공간 브랜딩 수익 창출"] : ["Step 1: Space Design Basics", "Step 2: Curation Practice", "Step 3: Space Branding Revenue"] },
    { id: 'life_brand', industry: "Lifestyle", title: isKor ? "퍼스널 브랜딩 디렉터" : "Personal Branding Director", description: "개인의 고유한 가치를 발굴해 매력적인 브랜드로 구축하는 커리어 전략가", tags: ["Marketing", "Consulting"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' }, roadmap: isKor ? ["Step 1: 브랜딩 전략 기초", "Step 2: 퍼스널 마케팅 실전", "Step 3: 컨설팅 수익 창출"] : ["Step 1: Branding Strategy Basics", "Step 2: Personal Marketing Practice", "Step 3: Consulting Revenue"] },
    
    // Creative
    { id: 'cre_local', industry: "Creative", title: isKor ? "로컬 브랜딩 전문가" : "Local Branding Specialist", description: "지역의 숨겨진 가치를 발굴해 매력적인 브랜드 스토리로 만드는 기획자", tags: ["Local", "Creative"], v: { location: 'hybrid', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' }, roadmap: isKor ? ["Step 1: 지역 가치 분석 기초", "Step 2: 로컬 콘텐츠 기획", "Step 3: 지역 비즈니스 수익 창출"] : ["Step 1: Local Value Analysis Basics", "Step 2: Local Content Planning", "Step 3: Local Business Revenue"] },
    { id: 'cre_stat', industry: "Creative", title: isKor ? "디지털 문방구 디자이너" : "Digital Stationery Designer", description: "태블릿용 굿즈 등 디지털 환경에서 즐기는 문구류를 디자인하고 판매하는 창작자", tags: ["Design", "E-commerce"], v: { location: 'remote', autonomy: 'decide', social: 'solo', reward: 'high', source: 'visual' }, roadmap: isKor ? ["Step 1: 디지털 디자인 기초", "Step 2: 이커머스 입점 준비", "Step 3: 디지털 굿즈 판매 수익"] : ["Step 1: Digital Design Basics", "Step 2: E-commerce Store Prep", "Step 3: Digital Goods Sales Revenue"] },
    { id: 'cre_virt', industry: "Creative", title: isKor ? "가상 공간 디자이너" : "Virtual Space Designer", description: "메타버스와 게임 속 가상 세계를 시각적으로 구현하고 설계하는 건축가", tags: ["3D", "Metaverse"], v: { location: 'remote', autonomy: 'decide', social: 'solo', reward: 'high', source: 'visual' }, roadmap: isKor ? ["Step 1: 3D 모델링 기초", "Step 2: 가상 세계 구축 실전", "Step 3: 메타버스 에셋 수익 창출"] : ["Step 1: 3D Modeling Basics", "Step 2: Virtual World Building", "Step 3: Metaverse Asset Revenue"] },
    
    // Eco/Social
    { id: 'eco_vegan', industry: "EcoSocial", title: isKor ? "비건 비즈니스 운영자" : "Vegan Business Operator", description: "식물성 가치를 기반으로 지속 가능한 식문화를 선도하는 F&B 경영자", tags: ["Sustainability", "F&B"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'stable', source: 'solve' }, roadmap: isKor ? ["Step 1: 비건 시장 이해", "Step 2: 제품 개발 및 유통 실전", "Step 3: 지속 가능 비즈니스 수익"] : ["Step 1: Vegan Market Understanding", "Step 2: Product Dev & Distribution", "Step 3: Sustainable Business Revenue"] },
    { id: 'eco_esg', industry: "EcoSocial", title: isKor ? "ESG 컨설턴트" : "ESG Consultant", description: "기업이 환경과 사회에 긍정적인 영향을 미치도록 경영 전략을 돕는 분석가", tags: ["Analysis", "CSR"], v: { location: 'hybrid', autonomy: 'manual', social: 'team', reward: 'high', source: 'solve' }, roadmap: isKor ? ["Step 1: ESG 평가지표 이해", "Step 2: 기업 컨설팅 실전", "Step 3: 전문 컨설팅 수익 창출"] : ["Step 1: ESG Evaluation Metrics", "Step 2: Corporate Consulting Practice", "Step 3: Expert Consulting Revenue"] },
    { id: 'eco_up', industry: "EcoSocial", title: isKor ? "업사이클링 전문가" : "Upcycling Professional", description: "버려지는 소재에 디자인과 가치를 더해 새로운 제품으로 탄생시키는 제작자", tags: ["Environment", "Design"], v: { location: 'office', autonomy: 'decide', social: 'solo', reward: 'stable', source: 'visual' }, roadmap: isKor ? ["Step 1: 업사이클링 소재 분석", "Step 2: 제품 디자인 및 제작", "Step 3: 친환경 브랜드 수익 창출"] : ["Step 1: Upcycling Material Analysis", "Step 2: Product Design & Making", "Step 3: Eco-brand Revenue"] },
    
    // Edu/Counsel
    { id: 'edu_senior', industry: "EduCounsel", title: isKor ? "시니어 케어 기획자" : "Senior Care Planner", description: "고령 사회의 특성을 반영해 시니어의 삶의 질을 높이는 돌봄 콘텐츠 설계자", tags: ["Silver Economy", "Planning"], v: { location: 'office', autonomy: 'manual', social: 'team', reward: 'stable', source: 'solve' }, roadmap: isKor ? ["Step 1: 시니어 산업의 이해", "Step 2: 돌봄 콘텐츠 기획", "Step 3: 시니어 비즈니스 수익"] : ["Step 1: Understanding Senior Industry", "Step 2: Care Content Planning", "Step 3: Senior Business Revenue"] },
    { id: 'edu_psych', industry: "EduCounsel", title: isKor ? "비대면 심리 상담가" : "Non-face-to-face Counselor", description: "디지털 환경에서 정서적 교감을 통해 마음의 치유를 돕는 심리 전문가", tags: ["Counseling", "Digital"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'stable', source: 'solve' }, roadmap: isKor ? ["Step 1: 심리 상담 이론 기초", "Step 2: 비대면 상담 실무", "Step 3: 전문 상담 수익 창출"] : ["Step 1: Counseling Theory Basics", "Step 2: Remote Counseling Practice", "Step 3: Professional Counseling Revenue"] },
    { id: 'edu_tech', industry: "EduCounsel", title: isKor ? "에듀테크 콘텐츠 기획자" : "Edutech Content Planner", description: "IT 기술을 접목해 학습 효율을 높이는 온라인 교육 커리큘럼 설계자", tags: ["Education", "Content"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' }, roadmap: isKor ? ["Step 1: 에듀테크 시장 분석", "Step 2: 교육 콘텐츠 설계", "Step 3: 플랫폼 비즈니스 수익"] : ["Step 1: Edutech Market Analysis", "Step 2: Edu Content Design", "Step 3: Platform Business Revenue"] },

    // Original roles
    { id: 'fin_sec', industry: "Finance", title: isKor ? "핀테크 보안 전문가" : "Fintech Security Specialist", description: "안전한 디지털 금융 거래 환경을 위해 보안 시스템을 설계하고 운영하는 기술자", tags: ["Web3", "Security"], v: { location: 'remote', autonomy: 'manual', social: 'solo', reward: 'stable', source: 'solve' }, roadmap: isKor ? ["Step 1: 핀테크 보안 기술", "Step 2: 보안 시스템 구축 실무", "Step 3: 보안 전문가 수익 창출"] : ["Step 1: Fintech Security Tech", "Step 2: Security System Practice", "Step 3: Security Expert Revenue"] },
    { id: 'ux_des', industry: "IT/Software", title: isKor ? "UX 디자이너" : "UX Designer", description: "사용자의 행동을 분석해 디지털 서비스의 편리한 사용 경험을 만드는 설계자", tags: ["Design", "Research"], v: { location: 'hybrid', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' }, roadmap: isKor ? ["Step 1: UX 리서치 기초", "Step 2: 프로토타입 설계 실전", "Step 3: UI/UX 프로젝트 수익"] : ["Step 1: UX Research Basics", "Step 2: Prototype Design Practice", "Step 3: UI/UX Project Revenue"] },
    { id: 'brand_dir', industry: "Media/Ads", title: isKor ? "푸드 브랜딩 디렉터" : "Food Brand Director", description: "음식의 시각적 매력과 브랜드 가치를 극대화하는 식품 브랜딩 전문가", tags: ["Creative", "Marketing"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'high', source: 'visual' }, roadmap: isKor ? ["Step 1: 푸드 마케팅 기초", "Step 2: 브랜드 아이덴티티 기획", "Step 3: 브랜딩 컨설팅 수익"] : ["Step 1: Food Marketing Basics", "Step 2: Brand Identity Planning", "Step 3: Branding Consulting Revenue"] },
    { id: 'prompt_eng', industry: "IT/Software", title: isKor ? "프롬프트 엔지니어" : "Prompt Engineer", description: "AI가 최적의 결과물을 내도록 질문과 명령어를 정교하게 설계하는 AI 가이드", tags: ["AI", "LLM"], v: { location: 'remote', autonomy: 'decide', social: 'solo', reward: 'high', source: 'solve' }, roadmap: isKor ? ["Step 1: AI 프롬프트 기초", "Step 2: LLM 최적화 실무", "Step 3: AI 솔루션 수익 창출"] : ["Step 1: AI Prompt Basics", "Step 2: LLM Optimization Practice", "Step 3: AI Solution Revenue"] },
    { id: 'dtx_ux', industry: "Healthcare", title: isKor ? "디지털 치료제 UX 디자이너" : "DTx UX Designer", description: "치료 목적의 앱이나 소프트웨어를 환자가 쉽고 정확하게 사용하도록 설계하는 전문가", tags: ["Health-tech", "Design"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' }, roadmap: isKor ? ["Step 1: 디지털 치료제 개론", "Step 2: 헬스테크 디자인 실전", "Step 3: 혁신 의료기기 설계 수익"] : ["Step 1: Intro to DTx", "Step 2: Health-tech Design Practice", "Step 3: Innovative Device Design Revenue"] },
    { id: 'nomad_con', industry: "General", title: isKor ? "디지털 노마드 컨설턴트" : "Digital Nomad Consultant", description: "어디서든 일할 수 있는 원격 근무 환경 구축과 효율적인 업무 방식을 돕는 조언가", tags: ["Remote", "Future Work"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' }, roadmap: isKor ? ["Step 1: 원격 근무 인프라 이해", "Step 2: 노마드 비즈니스 기획", "Step 3: 글로벌 컨설팅 수익"] : ["Step 1: Remote Work Infra", "Step 2: Nomad Business Planning", "Step 3: Global Consulting Revenue"] },
    { id: 'dao_op', industry: "Finance", title: isKor ? "DAO 거버넌스 운영자" : "DAO Operator", description: "블록체인 기반의 탈중앙화된 조직이 원활하게 소통하고 운영되도록 돕는 관리자", tags: ["Web3", "Gov"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' }, roadmap: isKor ? ["Step 1: Web3 및 DAO 이론", "Step 2: 거버넌스 운영 실전", "Step 3: 커뮤니티 운영 수익"] : ["Step 1: Web3 & DAO Theory", "Step 2: Governance Operation", "Step 3: Community Operation Revenue"] },

    // New Roles
    { id: 'cre_local_dir', industry: "Creative", title: isKor ? "로컬 브랜딩 디렉터" : "Local Branding Director", description: "지역 자원을 활용해 매력적인 브랜드 정체성을 만들고 콘텐츠를 총괄하는 지휘자", tags: ["Local", "Branding", "Creative"], v: { location: 'hybrid', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' }, roadmap: isKor ? ["Step 1: 로컬 브랜딩 기초", "Step 2: 지역 콘텐츠 디렉팅 실전", "Step 3: 로컬 프로젝트 수익 창출"] : ["Step 1: Local Branding Basics", "Step 2: Regional Content Directing", "Step 3: Local Project Revenue"] },
    { id: 'life_wellness', industry: "Lifestyle", title: isKor ? "웰니스 콘텐츠 기획자" : "Wellness Content Planner", description: "건강한 삶을 위한 명상, 운동 등 심신 안정을 돕는 디지털 콘텐츠 설계자", tags: ["Wellness", "Content", "Planning"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'stable', source: 'solve' }, roadmap: isKor ? ["Step 1: 웰니스 트렌드 분석", "Step 2: 마인드풀니스 콘텐츠 기획", "Step 3: 건강 플랫폼 수익 창출"] : ["Step 1: Wellness Trend Analysis", "Step 2: Mindfulness Content Planning", "Step 3: Health Platform Revenue"] },
    { id: 'cre_baking', industry: "Creative", title: isKor ? "온라인 베이킹 클래스 운영자" : "Online Baking Class Operator", description: "베이킹 기술을 영상 콘텐츠로 제작해 온라인에서 지식 서비스를 제공하는 운영자", tags: ["E-commerce", "Education", "Baking"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'visual' }, roadmap: isKor ? ["Step 1: 디지털 레시피 구조화", "Step 2: 영상 강의 제작 실전", "Step 3: 클래스 플랫폼 수익 창출"] : ["Step 1: Digital Recipe Structuring", "Step 2: Video Lecture Production", "Step 3: Class Platform Revenue"] },
    { id: 'edu_edutech_des', industry: "EduCounsel", title: isKor ? "에듀테크 커리큘럼 디자이너" : "Edutech Curriculum Designer", description: "효율적인 비대면 학습을 위해 교육 과정을 단계별로 분석하고 설계하는 교육 기획자", tags: ["Education", "Curriculum", "Analysis"], v: { location: 'remote', autonomy: 'manual', social: 'team', reward: 'stable', source: 'solve' }, roadmap: isKor ? ["Step 1: 교수 설계(ID) 기초", "Step 2: 에듀테크 툴 활용 실전", "Step 3: 교육 커리큘럼 수익 창출"] : ["Step 1: Instructional Design Basics", "Step 2: Edutech Tool Practice", "Step 3: Edu Curriculum Revenue"] },
    { id: 'edu_psych_untact', industry: "EduCounsel", title: isKor ? "비대면 심리상담사" : "Untact Psychological Counselor", description: "온라인 채널을 통해 내담자와 소통하며 심리적 안정을 돕는 비대면 상담 전문가", tags: ["Counseling", "Digital", "Service"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'stable', source: 'solve' }, roadmap: isKor ? ["Step 1: 비대면 상담 기초", "Step 2: 심리 상담 실전 가이드", "Step 3: 유료 상담 서비스 수익"] : ["Step 1: Remote Counseling Basics", "Step 2: Practical Counseling Guide", "Step 3: Paid Counseling Revenue"] },
    { id: 'life_personal_brand', industry: "Lifestyle", title: isKor ? "퍼스널 브랜딩 컨설턴트" : "Personal Branding Consultant", description: "개인이 가진 장점을 수익화 가능한 브랜드 가치로 발굴하고 제안하는 전략가", tags: ["Marketing", "Consulting", "Personal Branding"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' }, roadmap: isKor ? ["Step 1: 개인 가치 발굴 기초", "Step 2: 퍼스널 브랜딩 실전", "Step 3: 브랜드 컨설팅 수익 창출"] : ["Step 1: Discovering Personal Value", "Step 2: Personal Branding Practice", "Step 3: Brand Consulting Revenue"] }
  ];

  // 2. 가중치 기반 스코어링 시스템 (가점 방식)
  const scoredJobs = jobDatabase.map(job => {
    let score = 0;
    
    // 산업군 가점
    if (job.industry === industry) score += 2.0; 
    if (job.industry === "General") score += 0.5;

    // 가치관 매칭 가점 (각 0.5점)
    if (job.v.autonomy === userValues.autonomy) score += 0.5;
    if (job.v.social === userValues.social) score += 0.5;
    if (job.v.reward === userValues.reward) score += 0.5;
    if (job.v.source === userValues.source) score += 0.5;

    // 재택근무 가점
    if (job.v.location === userValues.location) {
      if (userValues.location === 'remote') {
        const isTechJob = /AI|소프트웨어|개발|Software|Develop/.test(job.title) || job.tags.some(t => /AI|소프트웨어|개발|Software|Develop/.test(t));
        score += isTechJob ? 0.8 : 1.5;
      } else {
        score += 0.8;
      }
    }

    // 전이 기술 가점
    let matchedPivotSkill = "";
    let matchReason = "";

    transferableSkills.forEach(sk => {
      if (pivotMapping[sk] && (pivotMapping[sk].includes(job.title) || pivotMapping[sk].some(val => job.tags.includes(val)))) {
        score += 2.5; 
        matchedPivotSkill = sk;
      }
    });

    // 노마드 지수 계산
    let nomadStars = 1;
    if (job.v.location === 'remote') nomadStars = 5;
    else if (job.v.location === 'hybrid') nomadStars = 3;
    else nomadStars = 2;

    // 논리적 추천 근거 생성 로직 (개인화 볼드 처리)
    if (matchedPivotSkill) {
      matchReason = isKor 
        ? `당신이 보유한 <b>'${matchedPivotSkill}'</b> 역량은 ${job.title} 직무의 성공을 위한 가장 강력한 엔진입니다.`
        : `Your <b>'${matchedPivotSkill}'</b> skill is the most powerful engine for success as a ${job.title}.`;
    } else if (job.industry === industry) {
      const displayInd = translations[lang]['ind_' + industry.toLowerCase().replace('/', '')] || industry;
      matchReason = isKor 
        ? `선택하신 <b>'${displayInd}'</b> 분야에 대한 전문성과 보유 역량을 결합하여 새로운 가치를 창출할 수 있는 포지션입니다.`
        : `This role allows you to create new value by combining your expertise in <b>'${displayInd}'</b> with your skills.`;
    } else {
      matchReason = isKor
        ? `당신이 소중히 여기는 직업 가치가 조화롭게 실현되는 환경으로, 심리적 안정감과 성취감을 동시에 얻으실 수 있습니다.`
        : `This environment realizes the professional values you prioritize, offering both stability and achievement.`;
    }

    return { ...job, score, pivotSkill: matchedPivotSkill, matchReason, nomadStars };
  });

  // 3. 중복 제거 및 점수 순 정렬
  const uniqueJobs = Array.from(new Map(scoredJobs.map(item => [item.id, item])).values());
  const sortedJobs = uniqueJobs.sort((a, b) => b.score - a.score);

  // 4. IT/AI 편중 방지 로직
  const maxResults = 6;
  const maxTechAllowed = Math.floor(maxResults * 0.2) || 1; 
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
    <div class="job-card" style="animation-delay: ${i * 0.1}s; border: ${job.pivotSkill ? '2px solid #1a202c' : '1px solid var(--border-color)'}; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background: linear-gradient(to bottom, #ffffff, #f9fafb);">
      ${job.pivotSkill ? `<div style="background:#1a202c; color:white; font-size:0.65rem; padding:2px 8px; position:absolute; top:-10px; left:15px; border-radius:4px; font-weight:700;">최적의 루트 발견</div>` : ''}
      <div class="job-card-header">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div style="flex: 1;">
            <div class="job-title" style="margin-bottom: 4px;">${job.title}</div>
            <div class="nomad-index" style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="font-size: 0.7rem; color: #718096; font-weight: 700;">${isKor ? '장소 독립 지수' : 'Nomad Index'}</span>
              <span style="font-size: 14px;">${'🌴'.repeat(job.nomadStars)}${'☆'.repeat(5 - job.nomadStars)}</span>
            </div>
            <div class="job-desc" style="font-size: 13px; color: #718096;">${job.description}</div>
          </div>
          <div style="text-align: right; margin-left: 15px;">
            <div style="font-size:0.7rem; font-weight:700; color:#4a5568;">매칭 지수</div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--accent-color);">${Math.min(99, Math.round(job.score * 15))}%</div>
          </div>
        </div>
        <div class="gauge-container" style="margin-top: 12px;"><div class="gauge-fill" style="width: ${Math.min(100, job.score * 15)}%; background:${job.pivotSkill ? '#1a202c' : 'var(--accent-color)'}"></div></div>
      </div>
      <div class="job-card-body">
        <div class="competency-list">
          ${job.tags.map(t => `<span class="comp-tag"># ${t}</span>`).join('')}
        </div>
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
            ${job.roadmap ? job.roadmap.map(step => `
              <div class="roadmap-step">
                <span class="step-label">${step.split(':')[0]}</span> 
                ${step.split(':')[1] || ''}
              </div>
            `).join('') : `<div>${isKor ? '상세 로드맵 준비 중입니다.' : 'Roadmap coming soon.'}</div>`}
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
