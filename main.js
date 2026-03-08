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
    const step1NextBtn = document.querySelector('#step-1 .next-btn');
    step1NextBtn.disabled = selectedKeywords.length !== 3;
  });
});

// 폼 제출
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  
  // 결과 표시 시뮬레이션
  showSimulatedResults(selectedKeywords);
});

// 추천 직업 데이터 세트 (시뮬레이션용)
const extendedJobDb = [
  { title: "데이터 분석 전문가", score: 98, tasks: "비즈니스 데이터를 수집하고 통계적 기법을 통해 인사이트를 도출합니다.", competencies: ["분석적", "논리적", "꼼꼼함"], reqs: ["SQL/Python 숙련", "통계학 지식"] },
  { title: "IT 서비스 기획자", score: 92, tasks: "사용자 요구사항을 정의하고 서비스 모델을 설계하여 개발 가이드라인을 제시합니다.", competencies: ["창의적", "논리적", "적응력"], reqs: ["스토리보드 작성", "UX 이론 이해"] },
  { title: "UI/UX 디자이너", score: 85, tasks: "사용자 중심의 인터페이스를 설계하고 시각적 요소를 구현하여 사용자 경험을 최적화합니다.", competencies: ["창의적", "공감능력", "도전적"], reqs: ["Figma 숙련", "디자인 시스템 이해"] },
  { title: "인사 전략 컨설턴트", score: 78, tasks: "조직의 목표에 부합하는 인재 관리 전략을 수립하고 인사 시스템을 개선합니다.", competencies: ["사교적", "리더십", "분석적"], reqs: ["노동법 지식", "커뮤니케이션 기술"] },
  { title: "기술 지원 엔지니어", score: 72, tasks: "시스템 구축 시 발생하는 기술적 문제를 해결하고 고객사 기술 교육을 담당합니다.", competencies: ["논리적", "책임감", "적응력"], reqs: ["네트워크 기본 지식", "문제해결 능력"] }
];

function showSimulatedResults(userKeywords) {
  const resultContainer = document.getElementById('result-container');
  const formContainer = document.getElementById('step-form-container');
  const resultsDiv = document.getElementById('job-results');
  
  formContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  
  // 점수 순으로 정렬 (상위 5개)
  const sortedJobs = extendedJobDb.sort((a, b) => b.score - a.score).slice(0, 5);

  resultsDiv.innerHTML = sortedJobs.map((job, index) => {
    // 하이라이트 로직: 사용자가 선택한 키워드가 직업의 핵심 역량에 포함되는지 확인
    const highlightedCompetencies = job.competencies.map(comp => {
      const isMatched = userKeywords.includes(comp);
      return `<span class="comp-tag ${isMatched ? 'matched' : ''}">${isMatched ? '✨ ' : ''}${comp}</span>`;
    }).join('');

    return `
      <div class="job-card rank-${index + 1}">
        <div class="job-card-header">
          <div class="rank-badge">${index + 1}위</div>
          <div class="job-title-row">
            <div class="job-title">${job.title}</div>
            <div class="match-percentage">${job.score}% 일치</div>
          </div>
          <div class="gauge-container">
            <div class="gauge-fill" style="width: ${job.score}%"></div>
          </div>
        </div>
        <div class="job-card-body">
          <div class="job-section-title">핵심 역량 매칭</div>
          <div class="competency-list">
            ${highlightedCompetencies}
          </div>
          <div class="job-section-title" style="margin-top: 1.2rem;">주요 업무</div>
          <p class="job-task">${job.tasks}</p>
          <div class="job-section-title">추가 필요 역량</div>
          <ul class="job-requirements">
            ${job.reqs.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }).join('');
}
