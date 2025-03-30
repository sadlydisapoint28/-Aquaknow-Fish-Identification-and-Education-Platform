// Quiz questions data
const quizQuestions = [
    {
        question: "Which fish is known for its symbiotic relationship with sea anemones?",
        options: ["Clownfish", "Blue Tang", "Angelfish", "Butterflyfish"],
        correctAnswer: 0,
        image: "images/clownfish.jpg"
    },
    {
        question: "What is the scientific name of the Blue Tang?",
        options: [
            "Amphiprioninae",
            "Paracanthurus hepatus",
            "Pomacanthus imperator",
            "Pterophyllum scalare"
        ],
        correctAnswer: 1,
        image: "images/blue-tang.jpg"
    },
    {
        question: "Which of these is a characteristic of the Clownfish?",
        options: [
            "Changes color at night",
            "Has a retractable spine",
            "Can change gender if needed",
            "Lives solitary lives"
        ],
        correctAnswer: 2
    }
    // Add more questions as needed
];

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        this.quizStart = document.getElementById('quizStart');
        this.quizContent = document.getElementById('quizContent');
        this.quizResults = document.getElementById('quizResults');
        this.questionElement = document.getElementById('quizQuestion');
        this.optionsElement = document.getElementById('quizOptions');
        this.feedbackElement = document.getElementById('quizFeedback');
        this.scoreElement = document.getElementById('quizScore');
    }

    addEventListeners() {
        document.getElementById('startQuiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('nextQuestion').addEventListener('click', () => this.showNextQuestion());
        document.getElementById('retakeQuiz').addEventListener('click', () => this.retakeQuiz());
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizStart.style.display = 'none';
        this.quizContent.style.display = 'block';
        this.quizResults.style.display = 'none';
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        let questionHTML = `<h3>${question.question}</h3>`;
        
        if (question.image) {
            questionHTML += `<img src="${question.image}" alt="Question Image" class="quiz-image">`;
        }
        
        this.questionElement.innerHTML = questionHTML;
        
        this.optionsElement.innerHTML = question.options
            .map((option, index) => `
                <div class="quiz-option" data-index="${index}">
                    ${option}
                </div>
            `).join('');

        this.optionsElement.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', (e) => this.checkAnswer(parseInt(e.target.dataset.index)));
        });

        this.feedbackElement.innerHTML = '';
        document.getElementById('nextQuestion').style.display = 'none';
    }

    checkAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const options = this.optionsElement.querySelectorAll('.quiz-option');
        
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            const index = parseInt(option.dataset.index);
            
            if (index === question.correctAnswer) {
                option.classList.add('correct');
            } else if (index === selectedIndex) {
                option.classList.add('incorrect');
            }
        });

        if (selectedIndex === question.correctAnswer) {
            this.score++;
            this.feedbackElement.innerHTML = '<div class="quiz-feedback correct">Correct! Well done!</div>';
        } else {
            this.feedbackElement.innerHTML = `
                <div class="quiz-feedback incorrect">
                    Incorrect. The correct answer is: ${question.options[question.correctAnswer]}
                </div>
            `;
        }

        document.getElementById('nextQuestion').style.display = 'block';
    }

    showNextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.quizContent.style.display = 'none';
        this.quizResults.style.display = 'block';
        const percentage = (this.score / this.questions.length) * 100;
        this.scoreElement.innerHTML = `
            <p>Your score: ${this.score} out of ${this.questions.length} (${percentage}%)</p>
            <p>${this.getScoreMessage(percentage)}</p>
        `;
    }

    getScoreMessage(percentage) {
        if (percentage === 100) return "Perfect! You're a fish expert!";
        if (percentage >= 80) return "Great job! You know your fish well!";
        if (percentage >= 60) return "Good effort! Keep learning!";
        return "Keep studying! You'll get better with practice.";
    }

    retakeQuiz() {
        this.startQuiz();
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new Quiz(quizQuestions);
}); 