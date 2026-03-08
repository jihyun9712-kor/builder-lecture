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

// 3단계 폼 로직
const form = document.getElementById('multi-step-form');
const steps = document.querySelectorAll('.form-step');
const indicators = document.querySelectorAll('.step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
let currentStep = 1;

function updateSteps() {
  steps.forEach(step => step.classList.remove('active'));
  indicators.forEach(ind => ind.classList.remove('active'));
  
  document.getElementById(`step-${currentStep}`).classList.add('active');
  document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
}

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep < 3) {
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

// 1단계: 키워드 선택 (최대 3개)
const keywordChips = document.querySelectorAll('.keyword-chip');
const keywordsInput = document.getElementById('selected-keywords-input');
let selectedKeywords = [];

keywordChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const value = chip.dataset.value;
    
    if (selectedKeywords.includes(value)) {
      selectedKeywords = selectedKeywords.filter(k => k !== value);
      chip.classList.remove('selected');
    } else if (selectedKeywords.length < 3) {
      selectedKeywords.push(value);
      chip.classList.add('selected');
    }
    
    keywordsInput.value = selectedKeywords.join(',');
    // 3개 선택 시에만 '다음' 버튼 활성화
    const step1NextBtn = document.querySelector('#step-1 .next-btn');
    step1NextBtn.disabled = selectedKeywords.length !== 3;
  });
});

// 폼 제출 시 데이터 취합 (JSON 설계 구조)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const finalData = {
    request_type: "job_matching_analysis",
    data_source: "Worknet Job Dictionary (South Korea)",
    user_input: {
      selected_keywords: selectedKeywords,
      experience_description: formData.get('경험'),
      work_preference: formData.get('work_style')
    }
  };

  console.log("OpenAI API로 전달할 JSON 데이터:", finalData);
  
  // 현재는 로컬 시뮬레이션 결과 표시
  showSimulatedResults(selectedKeywords);
});

// 결과 표시 시뮬레이션
function showSimulatedResults(keywords) {
  const resultContainer = document.getElementById('result-container');
  const formContainer = document.getElementById('step-form-container');
  const resultsDiv = document.getElementById('job-results');
  
  formContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  
  // 예시 데이터 (실제로는 API 결과가 들어갈 자리)
  const mockJobs = [
    { title: "서비스 기획자", tasks: "사용자 요구사항을 분석하여 IT 서비스를 기획함", reqs: ["논리적 사고", "문서 작성 역량"] },
    { title: "마케팅 전문가", tasks: "시장 트렌드를 분석하고 캠페인을 추진함", reqs: ["창의적 기획력", "데이터 분석"] }
  ];

  resultsDiv.innerHTML = mockJobs.map(job => `
    <div class="job-card">
      <div class="job-card-header">
        <div class="job-title">${job.title}</div>
      </div>
      <div class="job-card-body">
        <div class="job-section-title">주요 업무</div>
        <p class="job-task">${job.tasks}</p>
        <div class="job-section-title">추가 필요 역량</div>
        <ul class="job-requirements">
          ${job.reqs.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}
