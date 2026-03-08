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

// 1단계: Skills 관리
const skillContainer = document.getElementById('skill-selection');
const customSkillInput = document.getElementById('custom-skill-input');
const skillsInputHidden = document.getElementById('selected-skills-input');
const step1NextBtn = document.querySelector('#step-1 .next-btn');
let selectedSkills = [];

// 버튼 활성화 및 히든 인풋 업데이트
function updateSkillValidation() {
  skillsInputHidden.value = JSON.stringify(selectedSkills);
  step1NextBtn.disabled = selectedSkills.length < 3;
  step1NextBtn.textContent = `다음 단계로 (${selectedSkills.length}개 선택됨)`;
}

// 칩 클릭 이벤트 (기존 및 신규 칩 공용)
function handleChipClick(chip) {
  const value = chip.dataset.value;
  if (selectedSkills.includes(value)) {
    selectedSkills = selectedSkills.filter(s => s !== value);
    chip.classList.remove('selected');
    // 커스텀 칩인 경우 삭제 버튼이 있을 수 있음
  } else {
    selectedSkills.push(value);
    chip.classList.add('selected');
  }
  updateSkillValidation();
}

// 초기 칩들에 이벤트 등록
document.querySelectorAll('.keyword-chip').forEach(chip => {
  chip.addEventListener('click', () => handleChipClick(chip));
});

// 커스텀 칩 추가 함수
function addCustomChip(value) {
  if (!value || selectedSkills.includes(value)) return;

  const newChip = document.createElement('div');
  newChip.className = 'keyword-chip selected';
  newChip.dataset.value = value;
  newChip.innerHTML = `
    ${value}
    <span class="delete-chip" onclick="removeCustomChip(event, '${value}')">×</span>
  `;
  
  newChip.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-chip')) return;
    handleChipClick(newChip);
  });

  skillContainer.appendChild(newChip);
  selectedSkills.push(value);
  updateSkillValidation();
}

// 커스텀 칩 삭제 함수
window.removeCustomChip = function(event, value) {
  event.stopPropagation(); // 칩 클릭 이벤트 전파 방지
  selectedSkills = selectedSkills.filter(s => s !== value);
  const chipElement = Array.from(document.querySelectorAll('.keyword-chip'))
    .find(c => c.dataset.value === value);
  if (chipElement) chipElement.remove();
  updateSkillValidation();
};

// 엔터 키 입력 시 커스텀 칩 추가
customSkillInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const value = customSkillInput.value.trim();
    if (value) {
      addCustomChip(value);
      customSkillInput.value = '';
    }
  }
});

// 폼 제출
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  
  const linkedInData = {
    request_type: "linkedin_job_analysis",
    user_profile: {
      linkedin_skills: selectedSkills,
      target_industry: formData.get('industry'),
      key_achievement: formData.get('performance'),
      work_preference: formData.get('work_style')
    }
  };

  console.log("Firebase/API 전송 데이터:", linkedInData);
  showLinkedInResults(selectedSkills, formData.get('industry'));
});

function showLinkedInResults(skills, industry) {
  const resultContainer = document.getElementById('result-container');
  const formContainer = document.getElementById('step-form-container');
  const resultsDiv = document.getElementById('job-results');
  
  formContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  const mockJobs = [
    { title: `Senior ${skills[0]} Specialist`, score: 95, industry: industry, tasks: "전략적 시스템 설계 및 기술 최적화", match: [skills[0], skills[1]] },
    { title: `${industry} Strategy Lead`, score: 88, industry: industry, tasks: "산업 트렌드 분석 및 비즈니스 혁신 리딩", match: [skills[2]] },
    { title: `Global ${skills[1]} Expert`, score: 82, industry: industry, tasks: "글로벌 협업 및 기술 아키텍처 수립", match: [skills[1]] },
    { title: `Digital Transformation Analyst`, score: 75, industry: industry, tasks: "데이터 기반의 조직 프로세스 혁신", match: [skills[0]] },
    { title: `Product Innovation Manager`, score: 70, industry: industry, tasks: "신규 서비스 기획 및 사용자 경험 강화", match: [skills[2]] }
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
        <div class="job-section-title">매칭 기술</div>
        <div class="competency-list">
          ${job.match.map(s => `<span class="comp-tag matched">✨ ${s}</span>`).join('')}
        </div>
        <p class="job-task" style="margin-top:1rem;"><strong>주요 업무:</strong> ${job.tasks}</p>
        <div class="industry-tag">📍 ${job.industry}</div>
      </div>
    </div>
  `).join('');
}
