const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

let currentLang = 'ko';

// --- 전이 가능한 기술(Transferable Skills) 매핑 테이블 ---
const pivotMapping = {
  "섬세함": ["UX Designer", "Quality Assurance", "Precision Medicine"],
  "기획": ["Product Manager", "Content Producer", "Strategy Consultant"],
  "미감": ["Brand Director", "UI Designer", "Virtual Human Producer"],
  "소통": ["Community Manager", "Client Relations", "Sales Lead"],
  "분석": ["Data Analyst", "Risk Analyst", "Market Strategist"],
  "관리": ["Operations Manager", "Project Manager", "DAO Operator"],
  "창의": ["Prompt Engineer", "Creative Director", "Innovation Lead"]
};

const translations = {
  ko: {
    hero_title: "당신의 글로벌 커리어 가치를 확인하세요",
    hero_desc: "AI 기반 분석 시스템이 당신의 핵심 역량과 성과를 바탕으로 최적의 글로벌 직무를 매칭해 드립니다.",
    vp1_title: "정밀한 역량 매칭",
    vp1_desc: "단순한 키워드 매칭을 넘어, 입력하신 실제 성과 데이터를 바탕으로 실무에서 바로 통용될 수 있는 직무를 제안합니다.",
    vp2_title: "글로벌 시장 트렌드",
    vp2_desc: "전 세계 주요 IT 및 비즈니스 거점의 실시간 채용 데이터를 분석하여 현재 가장 유망한 산업군 정보를 제공합니다.",
    vp3_title: "맞춤형 커리어 가이드",
    vp3_desc: "분석된 결과에 따라 부족한 역량을 보완할 수 있는 학습 방향과 글로벌 네트워크 진출 팁을 함께 제공합니다.",
    step1_title: "1단계: 핵심 역량",
    step1_desc: "기존 키워드를 선택하거나 직접 입력해주세요. (5개 선택)",
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
    step2_title: "2단계: 관심 산업군",
    step2_desc: "분석을 희망하는 타겟 산업군을 선택하세요.",
    industry_placeholder: "산업군 선택",
    ind_it: "IT / 소프트웨어",
    ind_finance: "금융 / 핀테크",
    ind_healthcare: "의료 / 바이오",
    ind_ecommerce: "커머스 / 유통",
    ind_media: "미디어 / 광고",
    step3_title: "3단계: 주요 성과",
    step3_desc: "AI가 당신의 경험에서 '전이 가능한 기술'을 추출합니다.",
    perf_placeholder: "예: '호텔 파티시에로서 섬세한 레시피 기획과 시각적 미감을 강조한 디저트를 제작함'",
    step4_title: "4단계: 업무 환경",
    step4_desc: "가장 선호하는 근무 장소를 선택해주세요.",
    work_remote: "원격 근무 (Remote)",
    work_office: "오피스 출근 (Office)",
    step5_title: "5단계: 직업적 가치관",
    step5_desc: "당신을 가장 행복하게 만드는 가치를 선택해주세요.",
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
    find_jobs: "분석 시작하기",
    analyzing: "커리어 피벗 경로 분석 중...",
    error_msg: "데이터를 불러오지 못했습니다. 다시 시도해주세요.",
    result_title: "커리어 피벗 분석 결과",
    retry: "다시 하기",
    pivot_reason: "당신의 기존 강점인 [EXTRACTED] 역량이 이 직무의 핵심 성공 요인과 일치합니다."
  },
  en: {
    // (English translations omitted for brevity in this example but should be included)
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
    { id: 'fin_sec', industry: "Finance", title: isKor ? "핀테크 보안 전문가" : "Fintech Security Specialist", tags: ["Web3", "Security"], v: { location: 'remote', autonomy: 'manual', social: 'solo', reward: 'stable', source: 'solve' } },
    { id: 'ux_des', industry: "IT/Software", title: isKor ? "UX 디자이너" : "UX Designer", tags: ["Design", "Research"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' } },
    { id: 'brand_dir', industry: "Media/Ads", title: isKor ? "푸드 브랜딩 디렉터" : "Food Brand Director", tags: ["Creative", "Marketing"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'high', source: 'visual' } },
    { id: 'prompt_eng', industry: "IT/Software", title: isKor ? "프롬프트 엔지니어" : "Prompt Engineer", tags: ["AI", "LLM"], v: { location: 'remote', autonomy: 'decide', social: 'solo', reward: 'high', source: 'solve' } },
    { id: 'dtx_ux', industry: "Healthcare", title: isKor ? "디지털 치료제 UX 디자이너" : "DTx UX Designer", tags: ["Health-tech", "Design"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' } },
    { id: 'nomad_con', industry: "General", title: isKor ? "디지털 노마드 컨설턴트" : "Digital Nomad Consultant", tags: ["Remote", "Future Work"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' } },
    { id: 'dao_op', industry: "Finance", title: isKor ? "DAO 거버넌스 운영자" : "DAO Operator", tags: ["Web3", "Gov"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' } }
  ];

  // 2. 가중치 기반 스코어링 시스템 (가점 방식)
  const scoredJobs = jobDatabase.map(job => {
    let score = 0;
    
    // 산업군 가점
    if (job.industry === industry) score += 1.0;
    if (job.industry === "General") score += 0.5;

    // 가치관 매칭 가점 (각 0.5점)
    if (job.v.autonomy === userValues.autonomy) score += 0.5;
    if (job.v.social === userValues.social) score += 0.5;
    if (job.v.reward === userValues.reward) score += 0.5;
    if (job.v.source === userValues.source) score += 0.5;

    // 재택근무 가점 (하드 필터링 대신 가점 0.8점 부여)
    if (job.v.location === userValues.location) score += 0.8;

    // 전이 기술 가점 (추출된 기술당 1.2점 - 커리어 피벗의 핵심)
    let matchedPivotSkill = "";
    extractedSkills.forEach(sk => {
      if (pivotMapping[sk].includes(job.title) || pivotMapping[sk].some(val => job.tags.includes(val))) {
        score += 1.2;
        matchedPivotSkill = sk;
      }
    });

    return { ...job, score, pivotSkill: matchedPivotSkill };
  });

  // 3. 중복 제거 및 점수 순 정렬 (ID 기반으로 고유성 보장)
  const uniqueJobs = Array.from(new Map(scoredJobs.map(item => [item.id, item])).values());
  const sortedJobs = uniqueJobs.sort((a, b) => b.score - a.score);

  resultsDiv.innerHTML = sortedJobs.slice(0, 6).map((job, i) => `
    <div class="job-card" style="animation-delay: ${i * 0.1}s; border: ${job.pivotSkill ? '2px solid #1a202c' : '1px solid var(--border-color)'}">
      ${job.pivotSkill ? `<div style="background:#1a202c; color:white; font-size:0.65rem; padding:2px 8px; position:absolute; top:-10px; left:15px; border-radius:4px; font-weight:700;">커리어 피벗 추천: ${job.pivotSkill} 기반</div>` : ''}
      <div class="job-card-header">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="job-title">${job.title}</div>
          <div style="font-size:0.7rem; font-weight:700;">추천 지수: ${Math.round(job.score * 20)}%</div>
        </div>
      </div>
      <div class="job-card-body">
        <div class="competency-list">
          ${job.tags.map(t => `<span class="comp-tag"># ${t}</span>`).join('')}
        </div>
        <p style="font-size: 0.82rem; margin-top: 1rem; color: #1e293b; font-weight:500; line-height:1.5;">
          ${job.pivotSkill 
            ? `과거 당신의 <b>'${job.pivotSkill}'</b> 역량은 새로운 분야인 ${job.title}에서 성공하기 위한 가장 중요한 기반이 됩니다.`
            : `당신의 전반적인 직업적 선호도와 산업군 트렌드를 결합한 최적의 매칭 결과입니다.`}
        </p>
      </div>
    </div>
  `).join('');
}

updateUI();
updateSteps();
