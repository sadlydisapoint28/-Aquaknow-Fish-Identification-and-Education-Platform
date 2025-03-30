// DOM Elements
const fishSearch = document.getElementById('fishSearch');
const fishGrid = document.getElementById('fishGrid');
const familyFilter = document.getElementById('familyFilter');
const habitatFilter = document.getElementById('habitatFilter');
const categoryFilter = document.getElementById('categoryFilter');

// Global variables
let allFish = [];

// Fetch all fish data from API
async function fetchFishData(filters = {}) {
    try {
        // Construct URL with filters
        let url = 'api/fish.php?action=getAll';
        
        if (filters.search) {
            url += `&search=${encodeURIComponent(filters.search)}`;
        }
        
        if (filters.family) {
            url += `&family=${encodeURIComponent(filters.family)}`;
        }
        
        if (filters.habitat) {
            url += `&habitat=${encodeURIComponent(filters.habitat)}`;
        }
        
        if (filters.category) {
            url += `&category=${encodeURIComponent(filters.category)}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            console.error('Error fetching fish data:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch fish data:', error);
        return [];
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
async function showFishDetails(fishId) {
    try {
        // Fetch detailed information from the API
        const response = await fetch(`api/fish.php?action=getById&id=${fishId}`);
        const result = await response.json();
        
        if (!result.success) {
            console.error('Error fetching fish details:', result.message);
            return;
        }
        
        const fish = result.data;
        
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
    } catch (error) {
        console.error('Error showing fish details:', error);
    }
}

// Filter and display fish
async function filterAndDisplayFish() {
    const searchTerm = fishSearch ? fishSearch.value.toLowerCase() : '';
    const selectedFamily = familyFilter ? familyFilter.value : '';
    const selectedHabitat = habitatFilter ? habitatFilter.value : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    
    const filters = {
        search: searchTerm,
        family: selectedFamily,
        habitat: selectedHabitat,
        category: selectedCategory
    };
    
    const filteredFish = await fetchFishData(filters);
    
    fishGrid.innerHTML = '';
    
    if (filteredFish.length === 0) {
        fishGrid.innerHTML = '<div class="no-results">No fish found matching your criteria</div>';
        return;
    }
    
    filteredFish.forEach(fish => {
        const card = createFishCard(fish);
        fishGrid.appendChild(card);
    });
}

// Initialize the page
async function initialize() {
    // Load initial fish data
    await filterAndDisplayFish();
    
    // Set up event listeners
    if (fishSearch) {
        fishSearch.addEventListener('input', filterAndDisplayFish);
    }
    
    if (familyFilter) {
        familyFilter.addEventListener('change', filterAndDisplayFish);
    }
    
    if (habitatFilter) {
        habitatFilter.addEventListener('change', filterAndDisplayFish);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndDisplayFish);
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initialize);
