const animals = [
  "쥐", "소", "호랑이", "토끼", "용", "뱀", 
  "말", "양", "원숭이", "닭", "개", "돼지"
];

const drawButton = document.getElementById('draw-button');
const resultDiv = document.getElementById('result');
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

// 동물 뽑기 이벤트
drawButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * animals.length);
  const selectedAnimal = animals[randomIndex];
  
  resultDiv.textContent = selectedAnimal;
  
  resultDiv.classList.remove('animate');
  void resultDiv.offsetWidth; 
  resultDiv.classList.add('animate');
});
