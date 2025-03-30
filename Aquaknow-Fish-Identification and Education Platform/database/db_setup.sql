-- Create the database
CREATE DATABASE IF NOT EXISTS aquaknow;

-- Use the database
USE aquaknow;

-- Create fish table
CREATE TABLE IF NOT EXISTS fish (
    id INT AUTO_INCREMENT PRIMARY KEY,
    common_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(100) NOT NULL,
    family VARCHAR(100) NOT NULL,
    habitat VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    size_min FLOAT NOT NULL,
    size_max FLOAT NOT NULL,
    size_unit VARCHAR(10) NOT NULL,
    conservation_status VARCHAR(50) NOT NULL,
    behavior TEXT NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create distribution table (one-to-many)
CREATE TABLE IF NOT EXISTS fish_distribution (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fish_id INT NOT NULL,
    location VARCHAR(100) NOT NULL,
    FOREIGN KEY (fish_id) REFERENCES fish(id) ON DELETE CASCADE
);

-- Create diet table (one-to-many)
CREATE TABLE IF NOT EXISTS fish_diet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fish_id INT NOT NULL,
    food_item VARCHAR(100) NOT NULL,
    FOREIGN KEY (fish_id) REFERENCES fish(id) ON DELETE CASCADE
);

-- Create fun facts table (one-to-many)
CREATE TABLE IF NOT EXISTS fish_fun_facts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fish_id INT NOT NULL,
    fact TEXT NOT NULL,
    FOREIGN KEY (fish_id) REFERENCES fish(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO fish (common_name, scientific_name, family, habitat, category, size_min, size_max, size_unit, conservation_status, behavior, image, description)
VALUES 
('Clownfish', 'Amphiprioninae', 'Pomacentridae', 'Coral Reef', 'Marine', 10, 18, 'cm', 'Least Concern', 'Lives symbiotically with sea anemones for protection', 'images/clownfish.jpg', 'The clownfish is a small, brightly colored fish known for its symbiotic relationship with sea anemones.'),
('Blue Tang', 'Paracanthurus hepatus', 'Acanthuridae', 'Coral Reef', 'Marine', 15, 31, 'cm', 'Least Concern', 'Travels in schools during the day, solitary at night', 'images/blue-tang.jpg', 'The blue tang is a species of Indo-Pacific surgeonfish, known for its bright blue coloration and yellow tail.'),
('Angelfish', 'Pterophyllum', 'Cichlidae', 'Freshwater', 'Freshwater', 15, 25, 'cm', 'Least Concern', 'Forms pairs when breeding, territorial', 'images/angelfish.jpg', 'The angelfish is a popular freshwater aquarium fish known for its distinctive shape and elegant swimming pattern.'),
('Great White Shark', 'Carcharodon carcharias', 'Lamnidae', 'Open Ocean', 'Marine', 400, 600, 'cm', 'Vulnerable', 'Solitary, migratory predator', 'images/great-white-shark.jpg', 'The great white shark is one of the most formidable predators in the ocean, known for its size and powerful jaws.');

-- Insert distribution data
INSERT INTO fish_distribution (fish_id, location) VALUES 
(1, 'Indo-Pacific'), (1, 'Red Sea'), (1, 'Great Barrier Reef'),
(2, 'Indo-Pacific'), (2, 'East Africa'), (2, 'Japan'),
(3, 'Amazon Basin'), (3, 'Orinoco Basin'), (3, 'Essequibo River'),
(4, 'Global'), (4, 'Temperate and tropical waters');

-- Insert diet data
INSERT INTO fish_diet (fish_id, food_item) VALUES 
(1, 'Zooplankton'), (1, 'Algae'),
(2, 'Plankton'), (2, 'Algae'),
(3, 'Small invertebrates'), (3, 'Plant matter'),
(4, 'Fish'), (4, 'Seals'), (4, 'Sea lions');

-- Insert fun facts
INSERT INTO fish_fun_facts (fish_id, fact) VALUES 
(1, 'Can change gender if needed'),
(1, 'Immune to anemone stings'),
(1, 'Forms hierarchical groups'),
(2, 'Changes color at night'),
(2, 'Has a retractable spine'),
(2, 'Can live up to 20 years'),
(3, 'Has a flattened body to hide among plants'),
(3, 'Can live up to 10 years in captivity'),
(3, 'Very protective of their young'),
(4, 'Can detect blood in water from great distances'),
(4, 'Has multiple rows of teeth that are continually replaced'),
(4, 'Can breach completely out of water when hunting');
