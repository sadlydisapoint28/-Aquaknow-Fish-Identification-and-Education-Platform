<?php
// Include database connection
require_once 'database/config.php';

// Get the fish of the day (based on today's date)
$day = date('j'); // Current day of month
$fishOfTheDayQuery = "SELECT * FROM fish ORDER BY id LIMIT 1 OFFSET " . ($day % 4);
$fishOfTheDayStmt = $pdo->query($fishOfTheDayQuery);
$fishOfTheDay = $fishOfTheDayStmt->fetch();

// Get fish of the day fun facts
$funFactsQuery = "SELECT fact FROM fish_fun_facts WHERE fish_id = ?";
$funFactsStmt = $pdo->prepare($funFactsQuery);
$funFactsStmt->execute([$fishOfTheDay['id']]);
$funFacts = $funFactsStmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aquaknow - Fish Identification and Education Platform</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="glass-effect">
        <nav>
            <div class="logo">
                <h1>Aquaknow</h1>
            </div>
            <div class="nav-links">
                <a href="#home">Home</a>
                <a href="#database">Database</a>
                <a href="#education">Learn</a>
                <a href="#quiz">Quiz</a>
                <a href="#about">About</a>
            </div>
            <div class="nav-controls">
                <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
                    <i class="fas fa-moon"></i>
                </button>
                <button class="mobile-menu" id="mobileMenu" aria-label="Toggle menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="hero-content">
                <h1 class="floating">Discover the Underwater World</h1>
                <p class="hero-subtitle">Explore and learn about various fish species through our comprehensive database powered by AI</p>
                <div class="search-container glass-effect">
                    <input type="text" id="fishSearch" placeholder="Search for a fish species...">
                    <button aria-label="Search"><i class="fas fa-search"></i></button>
                </div>
                <div class="hero-stats">
                    <div class="stat-item">
                        <span class="stat-number">1000+</span>
                        <span class="stat-label">Fish Species</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">50+</span>
                        <span class="stat-label">Habitats</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">24/7</span>
                        <span class="stat-label">AI Support</span>
                    </div>
                </div>
            </div>
            <div class="hero-scroll-indicator">
                <span>Scroll to explore</span>
                <i class="fas fa-chevron-down"></i>
            </div>
        </section>

        <section id="fishOfTheDay" class="fish-of-the-day-section">
            <div class="section-header">
                <h2>Fish of the Day</h2>
                <div class="section-line"></div>
            </div>
            <div class="fish-of-the-day">
                <div class="fish-card featured">
                    <img src="<?php echo htmlspecialchars($fishOfTheDay['image']); ?>" alt="<?php echo htmlspecialchars($fishOfTheDay['common_name']); ?>" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image+Available'">
                    <h3><?php echo htmlspecialchars($fishOfTheDay['common_name']); ?></h3>
                    <p class="scientific-name"><em><?php echo htmlspecialchars($fishOfTheDay['scientific_name']); ?></em></p>
                    <div class="fish-details">
                        <p><strong>Size:</strong> <?php echo htmlspecialchars($fishOfTheDay['size_min'] . '-' . $fishOfTheDay['size_max'] . ' ' . $fishOfTheDay['size_unit']); ?></p>
                        <p><strong>Habitat:</strong> <?php echo htmlspecialchars($fishOfTheDay['habitat']); ?></p>
                        <p><strong>Conservation:</strong> <?php echo htmlspecialchars($fishOfTheDay['conservation_status']); ?></p>
                    </div>
                    <div class="fun-facts">
                        <h4>Fun Facts:</h4>
                        <ul>
                            <?php foreach ($funFacts as $fact): ?>
                                <li><?php echo htmlspecialchars($fact['fact']); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section id="database" class="fish-database">
            <div class="section-header">
                <h2>Explore Fish Database</h2>
                <div class="section-line"></div>
            </div>
            <div class="filters glass-effect">
                <select id="categoryFilter" class="modern-select">
                    <option value="">All Categories</option>
                    <?php
                    // Get unique categories
                    $categoryQuery = "SELECT DISTINCT category FROM fish ORDER BY category";
                    $categoryStmt = $pdo->query($categoryQuery);
                    while ($category = $categoryStmt->fetch()) {
                        echo '<option value="' . htmlspecialchars($category['category']) . '">' . 
                             htmlspecialchars($category['category']) . '</option>';
                    }
                    ?>
                </select>
                <select id="familyFilter" class="modern-select">
                    <option value="">All Families</option>
                    <?php
                    // Get unique families
                    $familyQuery = "SELECT DISTINCT family FROM fish ORDER BY family";
                    $familyStmt = $pdo->query($familyQuery);
                    while ($family = $familyStmt->fetch()) {
                        echo '<option value="' . htmlspecialchars($family['family']) . '">' . 
                             htmlspecialchars($family['family']) . '</option>';
                    }
                    ?>
                </select>
                <select id="habitatFilter" class="modern-select">
                    <option value="">All Habitats</option>
                    <?php
                    // Get unique habitats
                    $habitatQuery = "SELECT DISTINCT habitat FROM fish ORDER BY habitat";
                    $habitatStmt = $pdo->query($habitatQuery);
                    while ($habitat = $habitatStmt->fetch()) {
                        echo '<option value="' . htmlspecialchars($habitat['habitat']) . '">' . 
                             htmlspecialchars($habitat['habitat']) . '</option>';
                    }
                    ?>
                </select>
            </div>
            <div class="fish-grid" id="fishGrid">
                <!-- Fish cards will be dynamically added here via AJAX -->
            </div>
        </section>

        <section id="education" class="education">
            <div class="section-header">
                <h2>Educational Resources</h2>
                <div class="section-line"></div>
            </div>
            <div class="education-grid">
                <div class="edu-card glass-effect">
                    <div class="card-icon">
                        <i class="fas fa-book"></i>
                    </div>
                    <h3>Fish Taxonomy</h3>
                    <p>Learn about scientific classification and nomenclature</p>
                    <a href="taxonomy.php" class="modern-button">Start Learning</a>
                </div>
                <div class="edu-card glass-effect">
                    <div class="card-icon">
                        <i class="fas fa-water"></i>
                    </div>
                    <h3>Habitats</h3>
                    <p>Explore different aquatic ecosystems</p>
                    <a href="habitats.php" class="modern-button">Explore</a>
                </div>
                <div class="edu-card glass-effect">
                    <div class="card-icon">
                        <i class="fas fa-fish"></i>
                    </div>
                    <h3>Species Guide</h3>
                    <p>Detailed information about fish species</p>
                    <a href="guide.php" class="modern-button">View Guide</a>
                </div>
            </div>
        </section>

        <section id="quiz" class="quiz-section">
            <div class="section-header">
                <h2>Test Your Knowledge</h2>
                <div class="section-line"></div>
            </div>
            <div class="quiz-container glass-effect">
                <div id="quizStart" class="quiz-start">
                    <div class="quiz-icon">
                        <i class="fas fa-brain"></i>
                    </div>
                    <h3>Fish Identification Quiz</h3>
                    <p>Challenge yourself with our interactive quiz</p>
                    <button id="startQuiz" class="modern-button">Start Quiz</button>
                </div>
                <div id="quizContent" class="quiz-content" style="display: none;">
                    <div id="quizQuestion"></div>
                    <div id="quizOptions" class="modern-options"></div>
                    <div id="quizFeedback"></div>
                    <button id="nextQuestion" class="modern-button">Next Question</button>
                </div>
                <div id="quizResults" class="quiz-results" style="display: none;">
                    <h3>Quiz Results</h3>
                    <div id="quizScore"></div>
                    <button id="retakeQuiz" class="modern-button">Retake Quiz</button>
                </div>
            </div>
        </section>
    </main>

    <footer class="modern-footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>About Aquaknow</h3>
                <p>A comprehensive platform for fish identification and education powered by advanced AI technology</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#database">Database</a></li>
                    <li><a href="#education">Education</a></li>
                    <li><a href="#quiz">Quiz</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Connect With Us</h3>
                <div class="social-links">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                </div>
                <p class="contact-email">info@aquaknow.com</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Aquaknow. All rights reserved.</p>
        </div>
    </footer>

    <script src="js/theme.js"></script>
    <script src="js/main-php.js"></script>
    <script src="js/quiz-php.js"></script>
</body>
</html>
