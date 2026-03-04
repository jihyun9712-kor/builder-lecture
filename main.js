const animals = [
  "쥐", "소", "호랑이", "토끼", "용", "뱀", 
  "말", "양", "원숭이", "닭", "개", "돼지"
];

const drawButton = document.getElementById('draw-button');
const resultDiv = document.getElementById('result');

drawButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * animals.length);
  const selectedAnimal = animals[randomIndex];
  
  resultDiv.textContent = selectedAnimal;
  
  // 간단한 애니메이션 효과
  resultDiv.classList.remove('animate');
  void resultDiv.offsetWidth; // 리플로우 강제 발생
  resultDiv.classList.add('animate');
});
