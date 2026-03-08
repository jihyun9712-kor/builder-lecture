const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// 테마 초기화
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeBtn.textContent = '☀️ 화이트 모드';
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  themeBtn.textContent = isDark ? '☀️ 화이트 모드' : '🌙 다크 모드';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
    if (parseInt(ind.dataset.step) <= currentStep) {
      ind.classList.add('active');
    }
  });
  
  document.getElementById(`step-${currentStep}`).classList.add('active');
}

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep < 4) {
      currentStep++;
      updateSteps();
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateSteps();
    }
  });
});

// 1단계: LinkedIn Skills 선택 (정확히 5개)
const skillChips = document.querySelectorAll('.keyword-chip');
const skillsInput = document.getElementById('selected-skills-input');
let selectedSkills = [];

skillChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const value = chip.dataset.value;
    
    if (selectedSkills.includes(value)) {
      selectedSkills = selectedSkills.filter(s => s !== value);
      chip.classList.remove('selected');
    } else if (selectedSkills.length < 5) {
      selectedSkills.push(value);
      chip.classList.add('selected');
    }
    
    skillsInput.value = selectedSkills.join(',');
    const step1NextBtn = document.querySelector('#step-1 .next-btn');
    step1NextBtn.disabled = selectedSkills.length !== 5;
    step1NextBtn.textContent = `다음 단계로 (${selectedSkills.length}/5)`;
  });
});

// 폼 제출 (OpenAI API용 JSON 구조)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  
  const linkedInData = {
    request_type: "linkedin_job_analysis",
    context: "Match user with LinkedIn job postings based on skills and industry",
    user_profile: {
      linkedin_skills: selectedSkills,
      target_industry: formData.get('industry'),
      key_achievement: formData.get('performance'),
      work_preference: formData.get('work_style')
    },
    ai_instructions: "사용자의 성과 문장을 바탕으로 직무 레벨(Junior, Mid, Senior)을 판단하고, 링크드인 기술 섹션과 산업군을 고려하여 가장 적합한 공고 유형 5개를 추천하라."
  };

  console.log("OpenAI API로 전달될 데이터 구조:", linkedInData);
  
  // 결과 표시 시뮬레이션
  showLinkedInResults(selectedSkills, formData.get('industry'));
});

function showLinkedInResults(skills, industry) {
  const resultContainer = document.getElementById('result-container');
  const formContainer = document.getElementById('step-form-container');
  const resultsDiv = document.getElementById('job-results');
  
  formContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  // 시뮬레이션 데이터
  const mockJobs = [
    { title: `Senior ${skills[0]} Specialist`, score: 95, industry: industry, tasks: "대규모 시스템 설계 및 기술 스택 최적화 리딩", match: [skills[0], skills[1], skills[2]] },
    { title: `${industry} Project Manager`, score: 88, industry: industry, tasks: "산업군 특화 솔루션 기획 및 스테이크홀더 관리", match: [skills[2], skills[4]] },
    { title: `Strategic ${skills[3]} Consultant`, score: 82, industry: industry, tasks: "데이터 기반 비즈니스 전략 수립 및 임원진 보고", match: [skills[3], skills[4]] },
    { title: `Global ${skills[1]} Lead`, score: 75, industry: industry, tasks: "글로벌 협업 프로젝트 총괄 및 기술 표준 수립", match: [skills[1], skills[2]] },
    { title: `Innovation Analyst`, score: 70, industry: industry, tasks: "신규 시장 트렌드 분석 및 혁신 과제 발굴", match: [skills[3], skills[0]] }
  ];

  resultsDiv.innerHTML = mockJobs.map((job, index) => `
    <div class="job-card rank-${index + 1}">
      <div class="job-card-header">
        <div class="rank-badge">${index + 1}위</div>
        <div class="job-title-row">
          <div class="job-title">${job.title}</div>
          <div class="match-percentage">${job.score}%</div>
        </div>
        <div class="gauge-container">
          <div class="gauge-fill" style="width: ${job.score}%"></div>
        </div>
      </div>
      <div class="job-card-body">
        <div class="job-section-title">LinkedIn 기술 매칭</div>
        <div class="competency-list">
          ${job.match.map(s => `<span class="comp-tag matched">✨ ${s}</span>`).join('')}
        </div>
        <p class="job-task" style="margin-top:1rem;"><strong>주요 업무:</strong> ${job.tasks}</p>
        <div class="industry-tag">📍 ${job.industry}</div>
      </div>
    </div>
  `).join('');
}
