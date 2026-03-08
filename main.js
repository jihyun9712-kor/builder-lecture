const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// 테마 초기화
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeBtn.textContent = '☀️ 화이트 모드';
}

// 테마 변경 이벤트
themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  
  themeBtn.textContent = isDark ? '☀️ 화이트 모드' : '🌙 다크 모드';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 직업 데이터베이스
const jobDatabase = {
  "경영·사무·금융·보험": [
    { title: "경영컨설턴트", keywords: ["분석", "문제해결", "전략"], task: "기업의 경영 문제를 진단하고 최적의 해결책을 제시합니다." },
    { title: "데이터 분석가", keywords: ["데이터", "분석", "통계"], task: "비즈니스 데이터를 수집하고 분석하여 전략적 의사결정을 지원합니다." },
    { title: "회계사", keywords: ["수치", "꼼꼼함", "자금"], task: "기업의 재무 상태를 관리하고 회계 기록을 검토합니다." }
  ],
  "연구·공학·기술": [
    { title: "소프트웨어 개발자", keywords: ["코딩", "논리", "창의력"], task: "컴퓨터 프로그램을 설계하고 개발하여 사용자 문제를 해결합니다." },
    { title: "데이터 엔지니어", keywords: ["데이터", "시스템", "파이프라인"], task: "방대한 양의 데이터를 효율적으로 저장하고 처리하는 인프라를 구축합니다." },
    { title: "AI 전문가", keywords: ["머신러닝", "연구", "수학"], task: "인공지능 모델을 설계하고 학습시켜 복잡한 작업을 자동화합니다." },
    { title: "테크니컬 라이터", keywords: ["글쓰기", "설명", "분석"], task: "기술적인 내용을 사용자가 이해하기 쉽게 문서화합니다." }
  ],
  "예술·디자인·방송·스포츠": [
    { title: "UI/UX 디자이너", keywords: ["디자인", "사용자 경험", "감각"], task: "사용자 중심의 인터페이스를 설계하고 시각적으로 구현합니다." },
    { title: "콘텐츠 기획자", keywords: ["창의력", "기획", "트렌드"], task: "디지털 플랫폼에 맞는 창의적인 콘텐츠를 기획하고 제작합니다." },
    { title: "영상 편집자", keywords: ["영상", "편집", "스토리텔링"], task: "촬영된 영상을 편집하여 완성도 높은 결과물을 만듭니다." }
  ]
};

// 폼 제출 이벤트
const jobForm = document.querySelector('form');
jobForm.addEventListener('submit', (e) => {
  e.preventDefault(); // 실제 서버 전송 대신 결과 표시를 위해 차단

  const category = document.getElementById('job-category').value;
  const strengths = document.getElementById('strengths').value;

  matchJobs(category, strengths);
});

function matchJobs(category, strengthsText) {
  const resultContainer = document.getElementById('result-container');
  const jobResultsDiv = document.getElementById('job-results');
  const formContainer = document.querySelector('.form-container:not(#result-container)');

  // 1. 해당 카테고리의 직업 목록 가져오기 (없으면 전체에서 검색)
  let jobsToSearch = jobDatabase[category] || Object.values(jobDatabase).flat();
  
  // 2. 강점 키워드 매칭
  const matchedJobs = jobsToSearch.filter(job => {
    return job.keywords.some(keyword => strengthsText.includes(keyword)) || strengthsText.length === 0;
  });

  // 3. 결과 출력
  jobResultsDiv.innerHTML = '';
  
  if (matchedJobs.length > 0) {
    matchedJobs.forEach(job => {
      const jobItem = document.createElement('div');
      jobItem.className = 'job-item';
      jobItem.innerHTML = `
        <div class="job-title">🏆 ${job.title}</div>
        <div class="job-task"><strong>주요 업무:</strong> ${job.task}</div>
        <div class="job-keywords">#${job.keywords.join(' #')}</div>
      `;
      jobResultsDiv.appendChild(jobItem);
    });
  } else {
    jobResultsDiv.innerHTML = '<p style="text-align: center;">조건에 맞는 추천 직업을 찾지 못했습니다. 조금 더 구체적인 강점을 적어주세요!</p>';
  }

  // 4. 화면 전환
  formContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  resultContainer.scrollIntoView({ behavior: 'smooth' });
}
