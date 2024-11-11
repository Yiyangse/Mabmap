// DOM 요소 선택
const spicyLevel = document.getElementById('spicyLevel');
const spicyGauge = document.getElementById('spicyGauge');
const testSubmit = document.getElementById('testSubmit');
const recommendMenu = document.getElementById('recommendMenu');

// 메뉴 데이터베이스
const menuDatabase = {
    low: ['순한맛 라면', '크림 떡볶이', '순한맛 카레'],
    medium: ['신라면', '일반 떡볶이', '매운맛 카레'],
    high: ['불닭볶음면', '치즈 불닭', '엽기 떡볶이'],
    extreme: ['불지옥 라면', '죽음의 불닭', '극악 떡볶이']
};

// 매운맛 게이지 업데이트
spicyLevel.addEventListener('input', (e) => {
    spicyGauge.style.width = `${e.target.value}%`;
});

// 메뉴 추천 기능
function getRecommendations(level, frequency) {
    if (level < 25) {
        return menuDatabase.low;
    } else if (level < 50) {
        return menuDatabase.medium;
    } else if (level < 75) {
        return menuDatabase.high;
    } else {
        return menuDatabase.extreme;
    }
}

// 결과 표시 함수
function displayResults(recommendations) {
    const menuHtml = `
        <h4>당신을 위한 추천 메뉴</h4>
        <ul>
            ${recommendations.map(menu => `<li>${menu}</li>`).join('')}
        </ul>
    `;
    recommendMenu.innerHTML = menuHtml;
}

// 테스트 제출 이벤트
testSubmit.addEventListener('click', () => {
    const level = parseInt(spicyLevel.value);
    const frequency = document.getElementById('spicy-frequency').value;
    
    const recommendations = getRecommendations(level, frequency);
    displayResults(recommendations);
});

// 초기 게이지 설정
spicyGauge.style.width = `${spicyLevel.value}%`;