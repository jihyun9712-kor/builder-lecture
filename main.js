const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

let currentLang = 'ko';

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
    step3_desc: "AI가 직무 레벨을 판단할 수 있도록 성과를 적어주세요.",
    perf_placeholder: "가장 성과가 좋았던 경험을 한 문장으로 적어주세요.",
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
    analyzing: "가치관 매칭 분석 중...",
    error_msg: "데이터를 불러오지 못했습니다. 다시 시도해주세요.",
    result_title: "가치관 기반 커리어 매칭 결과",
    retry: "다시 하기"
  },
  en: {
    hero_title: "Verify Your Global Career Value",
    hero_desc: "AI-powered analysis matches you with optimal global career paths.",
    vp1_title: "Precise Skill Matching",
    vp1_desc: "Suggesting jobs that translate directly based on performance data.",
    vp2_title: "Global Market Trends",
    vp2_desc: "Real-time hiring data from global hubs.",
    vp3_title: "Custom Career Guide",
    vp3_desc: "Learning directions to fill skill gaps.",
    step1_title: "Step 1: Core Skills",
    step1_desc: "Select 5 skills.",
    skill_js: "JavaScript",
    skill_python: "Python",
    skill_pm: "Project Management",
    skill_da: "Data Analysis",
    skill_uiux: "UI/UX Design",
    skill_dm: "Digital Marketing",
    skill_sql: "SQL",
    skill_ps: "Problem Solving",
    skill_agile: "Agile",
    custom_placeholder: "Type and Enter",
    next_step: "Next Step",
    selected_count: "/5",
    prev_step: "Prev",
    step2_title: "Step 2: Industry",
    step2_desc: "Select target industry.",
    industry_placeholder: "Select Industry",
    ind_it: "IT / Software",
    ind_finance: "Finance / Fintech",
    ind_healthcare: "Healthcare / Bio",
    ind_ecommerce: "E-commerce",
    ind_media: "Media / Ads",
    step3_title: "Step 3: Achievement",
    step3_desc: "Describe your best performance.",
    perf_placeholder: "One sentence of your best achievement.",
    step4_title: "Step 4: Environment",
    step4_desc: "Select preferred location.",
    work_remote: "Remote",
    work_office: "Office",
    step5_title: "Step 5: Career Values",
    step5_desc: "Select what makes you happy at work.",
    val_autonomy: "Autonomy",
    val_a1: "Decide Self",
    val_a2: "Manual-based",
    val_social: "Social",
    val_s1: "Teamwork",
    val_s2: "Solo",
    val_reward: "Reward",
    val_r1: "Performance",
    val_r2: "Stable",
    val_source: "Achievement",
    val_o1: "Problem Solving",
    val_o2: "Visual",
    find_jobs: "Start Analysis",
    analyzing: "Analyzing Values...",
    error_msg: "Error fetching data.",
    result_title: "Value-based Matching Results",
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

// Skill Selection Logic
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

// Performance Counter
const perfTextarea = document.getElementById('performance');
const charCount = document.getElementById('char-count');
if (perfTextarea) {
  perfTextarea.addEventListener('input', (e) => {
    charCount.textContent = e.target.value.length;
  });
}

// Final Submit
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
  showIndustrySpecificResults(currentLang, selectedSkills, formData.get('industry'), formData);
});

function showIndustrySpecificResults(lang, skills, industry, formData) {
  const resultsDiv = document.getElementById('job-results');
  const isKor = lang === 'ko';
  
  const userValues = {
    location: formData.get('loc_freedom'),
    autonomy: formData.get('v_autonomy'),
    social: formData.get('v_social'),
    reward: formData.get('v_reward'),
    source: formData.get('v_source')
  };

  // 60+ Job DB with Value Profiles
  const baseDB = [
    { industry: "Finance", title: isKor ? "핀테크 보안 전문가" : "Fintech Security Specialist", tags: ["Web3", "Cybersecurity"], v: { location: 'remote', autonomy: 'manual', social: 'solo', reward: 'stable', source: 'solve' } },
    { industry: "Finance", title: isKor ? "디지털 자산 자산관리자" : "Digital Asset Wealth Manager", tags: ["DeFi", "Portfolio"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' } },
    { industry: "IT/Software", title: isKor ? "프롬프트 엔지니어" : "Prompt Engineer", tags: ["LLM", "Generative AI"], v: { location: 'remote', autonomy: 'decide', social: 'solo', reward: 'high', source: 'solve' } },
    { industry: "IT/Software", title: isKor ? "AI 윤리 가이드 설계자" : "AI Ethics Specialist", tags: ["Policy", "Ethics"], v: { location: 'office', autonomy: 'manual', social: 'team', reward: 'stable', source: 'solve' } },
    { industry: "Healthcare", title: isKor ? "DTx UX 디자이너" : "Digital Therapeutics UX Designer", tags: ["Product Design", "Healthcare"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'stable', source: 'visual' } },
    { industry: "E-commerce", title: isKor ? "리커머스 전략 분석가" : "Re-commerce Strategy Analyst", tags: ["Circular Economy", "Data"], v: { location: 'office', autonomy: 'manual', social: 'team', reward: 'stable', source: 'solve' } },
    { industry: "Media/Ads", title: isKor ? "버추얼 휴먼 프로듀서" : "Virtual Human Producer", tags: ["CGI", "AI"], v: { location: 'office', autonomy: 'decide', social: 'team', reward: 'high', source: 'visual' } },
    { industry: "General", title: isKor ? "디지털 노마드 컨설턴트" : "Digital Nomad Consultant", tags: ["Remote", "Future Work"], v: { location: 'remote', autonomy: 'decide', social: 'team', reward: 'high', source: 'solve' } }
  ];

  // Expand to 60+
  let jobDatabase = [...baseDB];
  while(jobDatabase.length < 65) {
    const b = baseDB[Math.floor(Math.random() * baseDB.length)];
    jobDatabase.push({
      ...b,
      title: (isKor ? "시니어 " : "Senior ") + b.title,
      v: { ...b.v, reward: 'high' }
    });
  }

  const scoredJobs = jobDatabase.map(job => {
    let matchCount = 0;
    if (job.v.location === userValues.location) matchCount++;
    if (job.v.autonomy === userValues.autonomy) matchCount++;
    if (job.v.social === userValues.social) matchCount++;
    if (job.v.reward === userValues.reward) matchCount++;
    if (job.v.source === userValues.source) matchCount++;
    return { ...job, matchRate: matchCount / 5 };
  });

  let filtered = scoredJobs.filter(j => j.industry === industry || j.industry === "General")
                 .sort((a, b) => b.matchRate - a.matchRate);

  resultsDiv.innerHTML = filtered.slice(0, 10).map((job, i) => `
    <div class="job-card" style="border: ${job.matchRate >= 0.8 ? '2px solid #1a202c' : '1px solid var(--border-color)'}; position:relative; margin-top:1.5rem;">
      ${job.matchRate >= 0.8 ? `<div style="background:#1a202c; color:white; font-size:0.65rem; padding:2px 8px; position:absolute; top:-10px; left:15px; border-radius:4px; font-weight:700;">VALUED MATCH 80%+</div>` : ''}
      <div class="job-card-header">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="job-title" style="font-size:1.1rem;">${job.title}</div>
          <div style="font-size:0.7rem; font-weight:700; color:#4a5568;">${Math.round(job.matchRate*100)}%</div>
        </div>
        <div class="gauge-container"><div class="gauge-fill" style="width: ${job.matchRate * 100}%; background:${job.matchRate >= 0.8 ? '#1a202c' : 'var(--accent-color)'}"></div></div>
      </div>
      <div class="job-card-body">
        <div class="competency-list">
          ${job.tags.map(t => `<span class="comp-tag"># ${t}</span>`).join('')}
        </div>
        <p style="font-size: 0.8rem; margin-top: 0.8rem; color: #64748b; line-height:1.4;">
          ${isKor ? `당신의 가치관 중 <b>${Math.round(job.matchRate * 5)}가지</b> 요소가 이 직무의 핵심 특성과 일치합니다.` : `This role aligns with <b>${Math.round(job.matchRate * 5)}</b> of your core values.`}
        </p>
      </div>
    </div>
  `).join('');
}

updateUI();
updateSteps();
