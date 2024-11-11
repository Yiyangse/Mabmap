document.addEventListener('DOMContentLoaded', () => {
    const introText = document.getElementById('introText');
    const startButton = document.getElementById('startButton');
    const introSection = document.getElementById('introSection');
    const testSection = document.getElementById('testSection');
    
    // 인트로 텍스트 애니메이션
    const texts = [
        "매운 음식 잘 드세요?",
        "그렇다면 맵기 레벨을 알려드릴게요!",
        "지금 바로 시작해보세요!"
    ];
    
    let currentTextIndex = 0;
    
    function updateIntroText() {
        introText.style.opacity = "0";
        introText.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            introText.textContent = texts[currentTextIndex];
            introText.style.opacity = "1";
            introText.style.transform = "translateY(0)";
            
            currentTextIndex++;
            if (currentTextIndex < texts.length) {
                setTimeout(updateIntroText, 2000);
            } else {
                startButton.style.display = "inline-block";
                startButton.style.animation = "fadeInUp 1s forwards";
            }
        }, 500);
    }
    
    // 배경색 변경 애니메이션
    function updateBackground() {
        const colors = [
            'linear-gradient(45deg, #00BFB3, #7C3AED)',
            'linear-gradient(45deg, #7C3AED, #EF4444)',
            'linear-gradient(45deg, #EF4444, #00BFB3)'
        ];
        
        let colorIndex = 0;
        
        setInterval(() => {
            introSection.style.background = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 3000);
    }
    
    updateIntroText();
    updateBackground();
    
    // 테스트 시작
    let currentQuestionIndex = 0;
    let scores = [];
    
    startButton.addEventListener('click', () => {
        introSection.style.display = 'none';
        testSection.style.display = 'flex';
        showQuestion(currentQuestionIndex);
    });
    
    function showQuestion(index) {
        const questionText = document.getElementById('questionText');
        const currentQuestionSpan = document.getElementById('currentQuestion');
        const progressBar = document.getElementById('progressBar');
        
        questionText.textContent = questions[index];
        currentQuestionSpan.textContent = index + 1;
        progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
        
        // 답변 버튼 이벤트 리스너 초기화
        document.querySelectorAll('.answer-btn').forEach(button => {
            button.onclick = function() {
                scores.push(parseInt(this.dataset.score));
                nextQuestion();
            };
        });
    }
    
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showResult();
        }
    }
    
    function showResult() {
        const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        const testSection = document.getElementById('testSection');
        
        // 결과에 따른 레벨 결정
        let level;
        if (averageScore < 2) level = "프로 맵맵러";
        else if (averageScore < 3) level = "참매미";
        else if (averageScore < 4) level = "맵고수";
        else level = "맵신";
        
        testSection.innerHTML = `
            <div class="question-container">
                <h2>당신의 매운맛 레벨은...!</h2>
                <div class="result-level">${level}</div>
                <p>평균 점수: ${averageScore.toFixed(1)}/5.0</p>
                <button class="answer-btn" onclick="location.reload()">다시 테스트하기</button>
            </div>
        `;
    }
});