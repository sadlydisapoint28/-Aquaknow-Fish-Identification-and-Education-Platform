// Enhanced fish data structure
const fishData = [
    {
        id: 1,
        commonName: 'Clownfish',
        scientificName: 'Amphiprioninae',
        family: 'Pomacentridae',
        habitat: 'Coral Reef',
        category: 'Marine',
        size: {
            min: 10,
            max: 18,
            unit: 'cm'
        },
        distribution: ['Indo-Pacific', 'Red Sea', 'Great Barrier Reef'],
        diet: ['Zooplankton', 'Algae'],
        conservationStatus: 'Least Concern',
        behavior: 'Lives symbiotically with sea anemones for protection',
        image: 'images/clownfish.jpg',
        description: 'The clownfish is a small, brightly colored fish known for its symbiotic relationship with sea anemones.',
        funFacts: [
            'Can change gender if needed',
            'Immune to anemone stings',
            'Forms hierarchical groups'
        ]
    },
    {
        id: 2,
        commonName: 'Blue Tang',
        scientificName: 'Paracanthurus hepatus',
        family: 'Acanthuridae',
        habitat: 'Coral Reef',
        category: 'Marine',
        size: {
            min: 15,
            max: 31,
            unit: 'cm'
        },
        distribution: ['Indo-Pacific', 'East Africa', 'Japan'],
        diet: ['Plankton', 'Algae'],
        conservationStatus: 'Least Concern',
        behavior: 'Travels in schools during the day, solitary at night',
        image: 'images/blue-tang.jpg',
        description: 'The blue tang is a species of Indo-Pacific surgeonfish, known for its bright blue coloration and yellow tail.',
        funFacts: [
            'Changes color at night',
            'Has a retractable spine',
            'Can live up to 20 years'
        ]
    },
    {
        id: 3,
        commonName: 'Angelfish',
        scientificName: 'Pterophyllum',
        family: 'Cichlidae',
        habitat: 'Freshwater',
        category: 'Freshwater',
        size: {
            min: 15,
            max: 25,
            unit: 'cm'
        },
        distribution: ['Amazon Basin', 'Orinoco Basin', 'Essequibo River'],
        diet: ['Small invertebrates', 'Plant matter'],
        conservationStatus: 'Least Concern',
        behavior: 'Forms pairs when breeding, territorial',
        image: 'images/angelfish.jpg',
        description: 'The angelfish is a popular freshwater aquarium fish known for its distinctive shape and elegant swimming pattern.',
        funFacts: [
            'Has a flattened body to hide among plants',
            'Can live up to 10 years in captivity',
            'Very protective of their young'
        ]
    },
    {
        id: 4,
        commonName: 'Great White Shark',
        scientificName: 'Carcharodon carcharias',
        family: 'Lamnidae',
        habitat: 'Open Ocean',
        category: 'Marine',
        size: {
            min: 400,
            max: 600,
            unit: 'cm'
        },
        distribution: ['Global', 'Temperate and tropical waters'],
        diet: ['Fish', 'Seals', 'Sea lions'],
        conservationStatus: 'Vulnerable',
        behavior: 'Solitary, migratory predator',
        image: 'images/great-white-shark.jpg',
        description: 'The great white shark is one of the most formidable predators in the ocean, known for its size and powerful jaws.',
        funFacts: [
            'Can detect blood in water from great distances',
            'Has multiple rows of teeth that are continually replaced',
            'Can breach completely out of water when hunting'
        ]
    }
    // Add more fish data as needed
];

// DOM Elements
const fishSearch = document.getElementById('fishSearch');
const fishGrid = document.getElementById('fishGrid');
const familyFilter = document.getElementById('familyFilter');
const habitatFilter = document.getElementById('habitatFilter');
const categoryFilter = document.getElementById('categoryFilter');
const fishOfTheDay = document.getElementById('fishOfTheDay');

// Fish of the Day Feature
function getFishOfTheDay() {
    const today = new Date();
    const index = today.getDate() % fishData.length;
    return fishData[index];
}

function displayFishOfTheDay() {
    const fish = getFishOfTheDay();
    const fishOfTheDayHTML = `
        <div class="fish-of-the-day">
            <h2>Fish of the Day</h2>
            <div class="fish-card featured">
                <img src="${fish.image}" alt="${fish.commonName}">
                <h3>${fish.commonName}</h3>
                <p class="scientific-name"><em>${fish.scientificName}</em></p>
                <div class="fish-details">
                    <p><strong>Size:</strong> ${fish.size.min}-${fish.size.max} ${fish.size.unit}</p>
                    <p><strong>Habitat:</strong> ${fish.habitat}</p>
                    <p><strong>Distribution:</strong> ${fish.distribution.join(', ')}</p>
                    <p><strong>Conservation:</strong> ${fish.conservationStatus}</p>
                </div>
                <div class="fun-facts">
                    <h4>Fun Facts:</h4>
                    <ul>
                        ${fish.funFacts.map(fact => `<li>${fact}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    fishOfTheDay.innerHTML = fishOfTheDayHTML;
}

// Enhanced filter and display functions
function populateFilters() {
    const families = [...new Set(fishData.map(fish => fish.family))];
    const habitats = [...new Set(fishData.map(fish => fish.habitat))];
    const categories = [...new Set(fishData.map(fish => fish.category))];

    families.forEach(family => {
        const option = document.createElement('option');
        option.value = family;
        option.textContent = family;
        familyFilter.appendChild(option);
    });

    habitats.forEach(habitat => {
        const option = document.createElement('option');
        option.value = habitat;
        option.textContent = habitat;
        habitatFilter.appendChild(option);
    });

    if (categoryFilter) {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }
}

// Enhanced fish card creation
function createFishCard(fish) {
    const card = document.createElement('div');
    card.className = 'fish-card';
    
    // Check if image exists, if not use a placeholder
    const imgSrc = fish.image || 'https://via.placeholder.com/300x200?text=Fish+Image';
    
    card.innerHTML = `
        <img src="${imgSrc}" alt="${fish.commonName}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image+Available'">
        <h3>${fish.commonName}</h3>
        <p class="scientific-name"><em>${fish.scientificName}</em></p>
        <div class="fish-details">
            <p><strong>Family:</strong> ${fish.family}</p>
            <p><strong>Habitat:</strong> ${fish.habitat}</p>
            <p><strong>Size:</strong> ${fish.size.min}-${fish.size.max} ${fish.size.unit}</p>
            <p><strong>Conservation:</strong> ${fish.conservationStatus}</p>
        </div>
        <p class="description">${fish.description}</p>
        <button class="learn-more" onclick="showFishDetails(${fish.id})">Learn More</button>
    `;
    return card;
}

// Show detailed fish information
function showFishDetails(fishId) {
    const fish = fishData.find(f => f.id === fishId);
    if (!fish) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Check if image exists, if not use a placeholder
    const imgSrc = fish.image || 'https://via.placeholder.com/300x200?text=Fish+Image';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${fish.commonName}</h2>
            <p class="scientific-name"><em>${fish.scientificName}</em></p>
            <img src="${imgSrc}" alt="${fish.commonName}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image+Available'">
            <div class="fish-details">
                <h3>Details</h3>
                <p><strong>Family:</strong> ${fish.family}</p>
                <p><strong>Habitat:</strong> ${fish.habitat}</p>
                <p><strong>Size:</strong> ${fish.size.min}-${fish.size.max} ${fish.size.unit}</p>
                <p><strong>Distribution:</strong> ${fish.distribution.join(', ')}</p>
                <p><strong>Diet:</strong> ${fish.diet.join(', ')}</p>
                <p><strong>Conservation Status:</strong> ${fish.conservationStatus}</p>
                <p><strong>Behavior:</strong> ${fish.behavior}</p>
            </div>
            <div class="fun-facts">
                <h3>Fun Facts</h3>
                <ul>
                    ${fish.funFacts.map(fact => `<li>${fact}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    window.onclick = (event) => {
        if (event.target === modal) modal.remove();
    };
}

// Enhanced filter and display fish
function filterAndDisplayFish() {
    const searchTerm = fishSearch.value.toLowerCase();
    const selectedFamily = familyFilter.value;
    const selectedHabitat = habitatFilter.value;
    const selectedCategory = categoryFilter ? categoryFilter.value : '';

    const filteredFish = fishData.filter(fish => {
        const matchesSearch = fish.commonName.toLowerCase().includes(searchTerm) ||
                            fish.scientificName.toLowerCase().includes(searchTerm);
        const matchesFamily = !selectedFamily || fish.family === selectedFamily;
        const matchesHabitat = !selectedHabitat || fish.habitat === selectedHabitat;
        const matchesCategory = !selectedCategory || fish.category === selectedCategory;

        return matchesSearch && matchesFamily && matchesHabitat && matchesCategory;
    });

    fishGrid.innerHTML = '';
    filteredFish.forEach(fish => {
        fishGrid.appendChild(createFishCard(fish));
    });
}

// Event listeners
fishSearch.addEventListener('input', filterAndDisplayFish);
familyFilter.addEventListener('change', filterAndDisplayFish);
habitatFilter.addEventListener('change', filterAndDisplayFish);
if (categoryFilter) {
    categoryFilter.addEventListener('change', filterAndDisplayFish);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
    filterAndDisplayFish();
    displayFishOfTheDay();
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add CSS styles for enhanced features
const style = document.createElement('style');
style.textContent = `
    .fish-card {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        position: relative;
    }

    .fish-card:hover {
        transform: translateY(-5px);
    }

    .fish-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .fish-card h3 {
        padding: 1rem;
        margin: 0;
        color: var(--primary-color);
    }

    .fish-card .scientific-name {
        padding: 0 1rem;
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }

    .fish-card .fish-details {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .fish-card .description {
        padding: 0 1rem 1rem;
        margin: 0;
        font-size: 0.9rem;
    }

    .fish-card .learn-more {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        padding: 0.5rem 1rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .fish-card .learn-more:hover {
        background-color: var(--secondary-color);
    }

    .fish-of-the-day {
        margin: 2rem auto;
        max-width: 800px;
        padding: 0 1rem;
    }

    .fish-of-the-day h2 {
        text-align: center;
        margin-bottom: 1rem;
    }

    .fish-card.featured {
        margin: 0 auto;
        max-width: 600px;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }

    .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .fun-facts {
        margin-top: 1rem;
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 5px;
    }

    .fun-facts ul {
        list-style-type: disc;
        margin-left: 1.5rem;
    }

    @media screen and (max-width: 768px) {
        .fish-card.featured {
            max-width: 100%;
        }

        .modal-content {
            width: 95%;
            padding: 1rem;
        }
    }
`;
document.head.appendChild(style); 