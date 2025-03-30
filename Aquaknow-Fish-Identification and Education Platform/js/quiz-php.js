// Quiz functionality for PHP version
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startQuizBtn = document.getElementById('startQuiz');
    const quizStart = document.getElementById('quizStart');
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizFeedback = document.getElementById('quizFeedback');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const quizScore = document.getElementById('quizScore');
    const retakeQuizBtn = document.getElementById('retakeQuiz');

    // Quiz variables
    let fishData = [];
    let currentQuestion = 0;
    let score = 0;
    let questions = [];

    // Fetch fish data for quiz
    async function fetchFishData() {
        try {
            const response = await fetch('api/fish.php?action=getAll');
            const result = await response.json();
            
            if (result.success) {
                fishData = result.data;
                return true;
            } else {
                console.error('Error fetching fish data for quiz:', result.message);
                return false;
            }
        } catch (error) {
            console.error('Failed to fetch fish data for quiz:', error);
            return false;
        }
    }

    // Generate quiz questions
    function generateQuestions() {
        const questionTypes = ['identification', 'habitat', 'diet', 'conservation'];
        questions = [];

        // Shuffle fish data to get random questions
        const shuffledFish = [...fishData].sort(() => Math.random() - 0.5);
        
        // Create 10 questions or less if there are fewer fish
        const numQuestions = Math.min(10, shuffledFish.length);
        
        for (let i = 0; i < numQuestions; i++) {
            const fish = shuffledFish[i];
            const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            let question;
            switch (questionType) {
                case 'identification':
                    question = {
                        type: 'identification',
                        text: `What is the common name of this fish?`,
                        image: fish.image,
                        options: generateOptions(fish, 'commonName'),
                        answer: fish.commonName
                    };
                    break;
                case 'habitat':
                    question = {
                        type: 'habitat',
                        text: `Which habitat is the ${fish.commonName} typically found in?`,
                        options: generateOptions(fish, 'habitat'),
                        answer: fish.habitat
                    };
                    break;
                case 'diet':
                    question = {
                        type: 'diet',
                        text: `What does the ${fish.commonName} primarily eat?`,
                        options: fish.diet.length > 0 ? 
                            generateOptionsFromArray(fish.diet, getAllDietItems()) : 
                            ['Plankton', 'Algae', 'Small fish', 'Crustaceans'],
                        answer: fish.diet.length > 0 ? fish.diet[0] : 'Plankton'
                    };
                    break;
                case 'conservation':
                    question = {
                        type: 'conservation',
                        text: `What is the conservation status of the ${fish.commonName}?`,
                        options: generateOptions(fish, 'conservationStatus'),
                        answer: fish.conservationStatus
                    };
                    break;
            }
            
            questions.push(question);
        }
    }

    // Get all possible diet items from fish data
    function getAllDietItems() {
        const allDiet = new Set();
        fishData.forEach(fish => {
            fish.diet.forEach(item => allDiet.add(item));
        });
        return Array.from(allDiet);
    }

    // Generate options for questions
    function generateOptions(fish, property) {
        const correctAnswer = fish[property];
        const options = [correctAnswer];
        
        // Get unique values for the property from all fish
        const allValues = [...new Set(fishData.map(f => f[property]))];
        
        // Filter out the correct answer
        const filteredValues = allValues.filter(value => value !== correctAnswer);
        
        // Shuffle and take 3 random values (or fewer if there aren't enough)
        const shuffledValues = filteredValues.sort(() => Math.random() - 0.5);
        const numOptions = Math.min(3, shuffledValues.length);
        
        for (let i = 0; i < numOptions; i++) {
            options.push(shuffledValues[i]);
        }
        
        // If we don't have enough options, add some default ones
        while (options.length < 4) {
            const defaultOptions = {
                'commonName': ['Mystery Fish', 'Silver Fish', 'Golden Fish', 'Striped Fish'],
                'habitat': ['Deep Sea', 'Coastal Waters', 'Tropical Reefs', 'Freshwater Lakes'],
                'conservationStatus': ['Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern']
            };
            
            const defaults = defaultOptions[property] || ['Unknown', 'Varies', 'Multiple', 'Other'];
            for (const def of defaults) {
                if (!options.includes(def)) {
                    options.push(def);
                    break;
                }
            }
        }
        
        // Shuffle options so correct answer isn't always first
        return options.sort(() => Math.random() - 0.5);
    }

    // Generate options from an array of possible values
    function generateOptionsFromArray(correctValues, allPossibleValues) {
        const correctAnswer = correctValues[0];
        const options = [correctAnswer];
        
        // Filter out correct values
        const filteredValues = allPossibleValues.filter(value => !correctValues.includes(value));
        
        // Shuffle and take random values
        const shuffledValues = filteredValues.sort(() => Math.random() - 0.5);
        const numOptions = Math.min(3, shuffledValues.length);
        
        for (let i = 0; i < numOptions; i++) {
            options.push(shuffledValues[i]);
        }
        
        // Add default options if needed
        while (options.length < 4) {
            const defaults = ['Plankton', 'Algae', 'Small fish', 'Crustaceans'];
            for (const def of defaults) {
                if (!options.includes(def)) {
                    options.push(def);
                    break;
                }
            }
        }
        
        return options.sort(() => Math.random() - 0.5);
    }

    // Show current question
    function showQuestion() {
        const question = questions[currentQuestion];
        
        let questionHTML = `
            <h3>Question ${currentQuestion + 1} of ${questions.length}</h3>
            <p class="question-text">${question.text}</p>
        `;
        
        // Add image if it's an identification question
        if (question.type === 'identification' && question.image) {
            questionHTML += `
                <div class="question-image">
                    <img src="${question.image}" alt="Fish to identify" onerror="this.src='https://via.placeholder.com/300x200?text=Fish+Image'">
                </div>
            `;
        }
        
        quizQuestion.innerHTML = questionHTML;
        
        // Generate option buttons
        quizOptions.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option));
            quizOptions.appendChild(button);
        });
        
        // Hide next question button and feedback
        nextQuestionBtn.style.display = 'none';
        quizFeedback.innerHTML = '';
    }

    // Check the answer
    function checkAnswer(selectedOption) {
        const question = questions[currentQuestion];
        const isCorrect = selectedOption === question.answer;
        
        // Disable all option buttons
        const optionButtons = quizOptions.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.disabled = true;
            
            if (button.textContent === question.answer) {
                button.classList.add('correct');
            } else if (button.textContent === selectedOption && !isCorrect) {
                button.classList.add('incorrect');
            }
        });
        
        // Show feedback
        quizFeedback.innerHTML = isCorrect 
            ? '<div class="correct-feedback">Correct! 🎉</div>' 
            : `<div class="incorrect-feedback">Incorrect. The correct answer is: ${question.answer}</div>`;
        
        // Update score and show next button
        if (isCorrect) score++;
        nextQuestionBtn.style.display = 'block';
    }

    // Show quiz results
    function showResults() {
        quizContent.style.display = 'none';
        quizResults.style.display = 'block';
        
        const percentage = Math.round((score / questions.length) * 100);
        let message;
        
        if (percentage >= 90) {
            message = 'Amazing! You\'re a fish expert! 🏆';
        } else if (percentage >= 70) {
            message = 'Great job! You know your fish well! 🐠';
        } else if (percentage >= 50) {
            message = 'Good effort! Keep learning about fish! 🎣';
        } else {
            message = 'Keep exploring and learning about aquatic life! 💧';
        }
        
        quizScore.innerHTML = `
            <div class="score-circle">
                <span class="score-number">${score}/${questions.length}</span>
                <span class="score-percent">${percentage}%</span>
            </div>
            <p class="score-message">${message}</p>
        `;
    }

    // Initialize the quiz
    async function initQuiz() {
        const dataLoaded = await fetchFishData();
        
        if (!dataLoaded || fishData.length === 0) {
            quizQuestion.innerHTML = '<div class="error-message">Unable to load quiz questions. Please try again later.</div>';
            return;
        }
        
        startQuizBtn.addEventListener('click', async function() {
            quizStart.style.display = 'none';
            quizContent.style.display = 'block';
            
            // Reset quiz state
            currentQuestion = 0;
            score = 0;
            
            // Generate new questions
            generateQuestions();
            
            // Show first question
            showQuestion();
        });
        
        nextQuestionBtn.addEventListener('click', function() {
            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        });
        
        retakeQuizBtn.addEventListener('click', function() {
            quizResults.style.display = 'none';
            quizContent.style.display = 'block';
            
            // Reset quiz state
            currentQuestion = 0;
            score = 0;
            
            // Generate new questions
            generateQuestions();
            
            // Show first question
            showQuestion();
        });
    }

    // Start the quiz initialization
    if (startQuizBtn) {
        initQuiz();
    }
});
