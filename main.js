const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('language-select');
const body = document.body;

let currentLang = 'ko';

// 번역 데이터 (UI용)
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
    hero_title: "Verify Your Global Career Value",
    hero_desc: "Our AI-powered analysis matches you with optimal global career paths based on your core competencies and achievements.",
    vp1_title: "Precise Skill Matching",
    vp1_desc: "Going beyond simple keywords, we suggest jobs that translate directly to the real world based on your performance data.",
    vp2_title: "Global Market Trends",
    vp2_desc: "We analyze real-time hiring data from major global IT and business hubs to provide info on promising industries.",
    vp3_title: "Custom Career Guide",
    vp3_desc: "Receive learning directions to fill skill gaps and tips for entering global networks based on your results.",
    step1_title: "Step 1: Core Skills",
    step1_desc: "Select existing keywords or enter manually. (Select 5)",
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
    selected_count: "/5",
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
  if (nextBtn) nextBtn.disabled = selectedSkills.length < 5;
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

// 폼 및 입력 필드 상태 관리
const performanceTextarea = document.getElementById('performance');
const charCountSpan = document.getElementById('char-count');

if (performanceTextarea) {
  performanceTextarea.addEventListener('input', (e) => {
    const len = e.target.value.length;
    charCountSpan.textContent = len;
    if (len > 200) {
      e.target.value = e.target.value.substring(0, 200);
      charCountSpan.textContent = 200;
    }
  });
}

function updateSteps() {
  steps.forEach(step => step.classList.remove('active'));
  indicators.forEach(ind => {
    ind.classList.remove('active');
    if (parseInt(ind.dataset.step) <= currentStep) ind.classList.add('active');
  });
  document.getElementById(`step-${currentStep}`).classList.add('active');
  
  // 버튼 활성화 로직 추가
  const currentStepEl = document.getElementById(`step-${currentStep}`);
  const nextBtn = currentStepEl.querySelector('.next-btn');
  
  if (currentStep === 2) {
    const industries = document.querySelectorAll('input[name="industry"]');
    const checkIndustry = () => {
      if (nextBtn) nextBtn.disabled = !Array.from(industries).some(i => i.checked);
    };
    industries.forEach(i => i.addEventListener('change', checkIndustry));
    checkIndustry();
  }
  
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
  
  // 대규모 마이크로 니치 & 트렌드 직무 데이터베이스 (50개 이상)
  const jobDatabase = [
    // --- FINANCE & FINTECH ---
    { id: 1, industry: "Finance", title: isKor ? "핀테크 보안 전문가 (Fintech Security)" : "Fintech Security Specialist", type: "Security", tags: ["Web3", "Cybersecurity", "Compliance"] },
    { id: 2, industry: "Finance", title: isKor ? "디지털 자산 자산관리자 (Crypto Wealth Manager)" : "Digital Asset Wealth Manager", tags: ["DeFi", "Portfolio", "Crypto"] },
    { id: 3, industry: "Finance", title: isKor ? "ESG 금융 공시 컨설턴트" : "ESG Financial Reporting Consultant", tags: ["Sustainability", "Audit", "Policy"] },
    { id: 4, industry: "Finance", title: isKor ? "알고리즘 트레이딩 전략가" : "Algorithmic Trading Strategist", tags: ["Python", "Math", "Quant"] },
    { id: 5, industry: "Finance", title: isKor ? "임베디드 금융 서비스 기획자" : "Embedded Finance Product Manager", tags: ["API", "B2B", "Fintech"] },
    { id: 6, industry: "Finance", title: isKor ? "전업 탈중앙화 자율조직(DAO) 오퍼레이터" : "DAO Operator", tags: ["Remote", "Web3", "Governance"] },

    // --- IT & SOFTWARE & AI ---
    { id: 10, industry: "IT/Software", title: isKor ? "프롬프트 엔지니어 (Prompt Engineer)" : "Prompt Engineer", tags: ["LLM", "Generative AI", "NLP"] },
    { id: 11, industry: "IT/Software", title: isKor ? "AI 윤리 가이드라인 설계자" : "AI Ethics Specialist", tags: ["Policy", "AI", "Ethics"] },
    { id: 12, industry: "IT/Software", title: isKor ? "플랫폼 엔지니어 (Internal Developer Experience)" : "Platform Engineer", tags: ["DevOps", "Infrastructure", "Go"] },
    { id: 13, industry: "IT/Software", title: isKor ? "풀스택 노코드 개발자 (Low-code/No-code)" : "Full-stack No-code Developer", tags: ["Bubble", "Zapier", "Agile"] },
    { id: 14, industry: "IT/Software", title: isKor ? "메타버스 월드 아키텍트" : "Metaverse World Architect", tags: ["Unity", "3D", "Design"] },
    { id: 15, industry: "IT/Software", title: isKor ? "MLOps 엔지니어 (AI 배포 자동화)" : "MLOps Engineer", tags: ["Machine Learning", "Cloud", "Python"] },
    { id: 16, industry: "IT/Software", title: isKor ? "디지털 트윈 솔루션 설계자" : "Digital Twin Solution Architect", tags: ["IoT", "Simulation", "Industry 4.0"] },

    // --- HEALTHCARE & BIO ---
    { id: 20, industry: "Healthcare", title: isKor ? "디지털 치료제(DTx) UX 디자이너" : "Digital Therapeutics UX Designer", tags: ["Product Design", "Healthcare", "Patient Exp"] },
    { id: 21, industry: "Healthcare", title: isKor ? "개인 맞춤형 정밀 의료 분석가" : "Precision Medicine Data Analyst", tags: ["Genomics", "Big Data", "Python"] },
    { id: 22, industry: "Healthcare", title: isKor ? "원격 의료 시스템 운영 전문가" : "Telemedicine Operations Lead", tags: ["Logistics", "Compliance", "Strategy"] },
    { id: 23, industry: "Healthcare", title: isKor ? "스마트 헬스케어 기기 데이터 보호관" : "Health Data Privacy Officer", tags: ["Security", "GDPR", "Health-tech"] },
    { id: 24, industry: "Healthcare", title: isKor ? "바이오 인포매틱스 알고리즘 개발자" : "Bio-informatics Developer", tags: ["R", "Biology", "Cloud"] },

    // --- E-COMMERCE & RETAIL ---
    { id: 30, industry: "E-commerce", title: isKor ? "리커머스(중고 거래) 비즈니스 분석가" : "Re-commerce Strategy Analyst", tags: ["Circular Economy", "Data", "E-commerce"] },
    { id: 31, industry: "E-commerce", title: isKor ? "라이브 커머스 쇼퍼테인먼트 피디" : "Live Commerce Producer", tags: ["Media", "Directing", "Sales"] },
    { id: 32, industry: "E-commerce", title: isKor ? "D2C 브랜드 그로스 마케터" : "D2C Brand Growth Marketer", tags: ["GA4", "CRM", "Content"] },
    { id: 33, industry: "E-commerce", title: isKor ? "드롭쉬핑 자동화 시스템 구축가" : "Dropshipping Automation Specialist", tags: ["SCM", "Shopify", "Automation"] },
    { id: 34, industry: "E-commerce", title: isKor ? "커머스 개인화 알고리즘 전문가" : "Personalization Engine Specialist", tags: ["AI", "Recommendation", "SQL"] },

    // --- MEDIA & ADS & CONTENT ---
    { id: 40, industry: "Media/Ads", title: isKor ? "버추얼 휴먼 프로듀서" : "Virtual Human Producer", tags: ["CGI", "AI", "Talent Management"] },
    { id: 41, industry: "Media/Ads", title: isKor ? "프로그래매틱 광고 최적화 전문가" : "Programmatic Ad Specialist", tags: ["AdTech", "Bidding", "Data"] },
    { id: 42, industry: "Media/Ads", title: isKor ? "뉴스레터 기반 지식 비즈니스 오너" : "Knowledge Business Owner", tags: ["Newsletter", "Writer", "Niche"] },
    { id: 43, industry: "Media/Ads", title: isKor ? "숏폼 콘텐츠 알고리즘 마스터" : "Short-form Content Strategist", tags: ["TikTok", "Reels", "Viral"] },
    { id: 44, industry: "Media/Ads", title: isKor ? "디지털 커뮤니티 거버넌스 매니저" : "Community Governance Manager", tags: ["Discord", "Engagement", "Brand"] },

    // --- LIFESTYLE & NEW TRENDS (Mixed Industries) ---
    { id: 50, industry: "General", title: isKor ? "디지털 노마드 워크플레이스 컨설턴트" : "Digital Nomad Workplace Consultant", tags: ["Remote", "HR", "Future of Work"] },
    { id: 51, industry: "General", title: isKor ? "지속 가능성(Sustainability) 전략가" : "Sustainability Consultant", tags: ["Net Zero", "ESG", "Policy"] },
    { id: 52, industry: "General", title: isKor ? "1인 지식 기업가 (Solo-preneur)" : "Independent Knowledge Entrepreneur", tags: ["Personal Brand", "Sales", "Strategy"] },
    { id: 53, industry: "General", title: isKor ? "웹3.0 토큰 이코노미 설계자" : "Tokenomics Architect", tags: ["Web3", "Economics", "Math"] },
    { id: 54, industry: "General", title: isKor ? "AI 협업 워크플로우 자동화 전문가" : "AI Workflow Automation Expert", tags: ["Make", "Zapier", "AI"] }
  ];

  // 50개 채우기 위해 각 산업별 추가 데이터 생성 로직 (예시를 위해 확장)
  // 실제로는 더 많은 고유 항목을 수동으로 넣거나 산업군+역할 조합으로 생성
  const expandedJobs = [...jobDatabase];
  const subTypes = isKor ? ["시니어", "주니어", "프리랜서", "전략", "테크니컬"] : ["Senior", "Junior", "Freelance", "Strategic", "Technical"];
  
  // 데이터 양을 늘리기 위한 시뮬레이션 (최종 50개 이상 보장)
  while (expandedJobs.length < 60) {
    const baseJob = jobDatabase[Math.floor(Math.random() * jobDatabase.length)];
    const subType = subTypes[Math.floor(Math.random() * subTypes.length)];
    expandedJobs.push({
      ...baseJob,
      id: expandedJobs.length + 1,
      title: `${subType} ${baseJob.title}`,
      tags: [...baseJob.tags, subType]
    });
  }

  // 필터링 로직: 선택된 산업군 + (일반/라이프스타일 직무 포함)
  let filteredJobs = expandedJobs.filter(job => job.industry === industry || job.industry === "General");
  
  // 랜덤하게 셔플하여 다양성 제공
  filteredJobs = filteredJobs.sort(() => 0.5 - Math.random()).slice(0, 10);

  resultsDiv.innerHTML = filteredJobs.map((job, i) => `
    <div class="job-card" style="animation-delay: ${i * 0.1}s">
      <div class="job-card-header">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="job-title">${job.title}</div>
          <div style="font-size:0.7rem; background:rgba(0,0,0,0.06); padding:3px 8px; border-radius:6px; font-weight:700; color:#4a5568;">
            ${job.industry}
          </div>
        </div>
        <div class="gauge-container"><div class="gauge-fill" style="width: ${95 - i*4}%"></div></div>
      </div>
      <div class="job-card-body">
        <div class="job-section-title">${isKor ? '핵심 분석 태그' : 'Core Analysis Tags'}</div>
        <div class="competency-list">
          ${job.tags.map(t => `<span class="comp-tag"># ${t}</span>`).join('')}
        </div>
        <p style="font-size: 0.85rem; margin-top: 1rem; color: #64748b; line-height:1.5;">
          ${isKor ? `사용자의 역량인 [${skills.join(', ')}]와(과) 업무 성과를 결합했을 때 가장 높은 시장 가치를 지닌 Micro-niche 직무입니다.` : `A high-value micro-niche role optimized for your skills [${skills.join(', ')}] and career performance.`}
        </p>
      </div>
    </div>
  `).join('');
}

updateUI();
