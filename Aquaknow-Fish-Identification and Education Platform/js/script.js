// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const modal = document.getElementById('fishModal');
    const closeModal = document.querySelector('.close');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Modal functionality
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        // Restore body scroll when modal is closed
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            // Restore body scroll when modal is closed
            document.body.style.overflow = 'auto';
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe fish cards for animation
    document.querySelectorAll('.fish-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe education cards for animation
    document.querySelectorAll('.education-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

/**
 * AQUAKNOW FISH IDENTIFICATION PLATFORM - MAIN SCRIPT
 *
 * This file contains all the core functionality for the Aquaknow platform:
 *
 * 🐟 FISH DATABASE (fishData object):
 *    - Contains detailed information for 17 featured fish species from the Philippines' 200+ marine species
 *    - Each fish has: name, scientific name, image, habitat, diet, size, weight,
 *      lifespan, water temperature, nutrition facts, interesting facts,
 *      conservation status, and cooking tips
 *
 * 🔍 SEARCH FUNCTIONALITY:
 *    - Hero search: Allows users to search fish by name or scientific name
 *    - Real-time suggestions appear as user types
 *    - Filters fish database and shows matching results
 *    - Includes "no results found" handling
 *
 * 🖼️ MODAL SYSTEM:
 *    - Fish details modal: Shows comprehensive information about selected fish
 *    - Fish gallery modal: Displays all fish species in a grid layout
 *    - Navigation arrows: Users can browse through fish without closing modal
 *    - Prevents page scrolling when modal is open
 *
 * 🎨 ANIMATIONS & INTERACTIONS:
 *    - Scroll-triggered animations for fish cards
 *    - Header transparency effects on scroll
 *    - Hover effects and transitions
 *    - Mobile-responsive navigation
 *
 * 📱 RESPONSIVE FEATURES:
 *    - Mobile hamburger menu
 *    - Touch-friendly modal navigation
 *    - Responsive grid layouts
 *    - Optimized for all screen sizes
 */

// Fish details data with accurate information for Philippines marine life (17 featured species from 200+ total)
const fishData = {
    tilapia: {
        name: "Tilapia",
        scientificName: "Oreochromis niloticus",
        image: "images/tilapia.jpg",
        habitat: "Freshwater lakes, rivers, ponds, and aquaculture farms",
        diet: "Omnivorous - algae, aquatic plants, small invertebrates, and detritus",
        size: "20-35 cm (8-14 inches)",
        weight: "0.5-2 kg (1-4 lbs)",
        lifespan: "6-10 years",
        waterTemp: "20-30°C (68-86°F)",
        nutrition: "High in protein (26g per 100g), low in fat, rich in phosphorus, selenium, and vitamin B12",
        facts: [
            "Native to Africa and the Middle East, now farmed in over 100 countries",
            "Can survive in both fresh and brackish water",
            "Third most important fish in aquaculture after carp and salmon",
            "Fast-growing and disease-resistant, reaching market size in 6-8 months",
            "Can tolerate low oxygen levels and poor water quality",
            "Excellent source of lean protein with mild, sweet flavor"
        ],
        conservation: "Least Concern - widely farmed and sustainable when properly managed",
        cookingTips: "Best grilled, fried, or steamed. Mild flavor pairs well with Asian and Latin seasonings."
    },
    milkfish: {
        name: "Milkfish (Bangus)",
        scientificName: "Chanos chanos",
        image: "images/milkfish.jpg",
        habitat: "Coastal waters, estuaries, mangroves, and freshwater ponds",
        diet: "Herbivorous - algae, soft aquatic plants, small invertebrates, and plankton",
        size: "100-180 cm (3-6 feet)",
        weight: "3-14 kg (6-30 lbs)",
        lifespan: "15-20 years",
        waterTemp: "26-32°C (79-90°F)",
        nutrition: "High in protein (20g per 100g), omega-3 fatty acids, vitamin B12, and selenium",
        facts: [
            "National fish of the Philippines and important cultural symbol",
            "Anadromous - can migrate between saltwater and freshwater",
            "One of the fastest-growing fish species in aquaculture",
            "Has a distinctive silvery, torpedo-shaped body with forked tail",
            "Can reach speeds up to 60 km/h when escaping predators",
            "Eyes are covered by transparent adipose tissue (fat layer)",
            "Highly prized for its delicate, milky white flesh"
        ],
        conservation: "Least Concern - sustainably farmed across Southeast Asia",
        cookingTips: "Popular grilled, fried, or in soups. Remove many small bones carefully. Best marinated in vinegar or calamansi."
    },
    "lapu-lapu": {
        name: "Lapu-Lapu (Grouper)",
        scientificName: "Epinephelus spp.",
        image: "images/lapu-lapu.jpg",
        habitat: "Coral reefs, rocky coastal areas, and deep waters up to 200m",
        diet: "Carnivorous - fish, crustaceans, cephalopods, and smaller reef fish",
        size: "30-150 cm (1-5 feet) depending on species",
        weight: "2-50 kg (4-110 lbs)",
        lifespan: "15-40+ years",
        waterTemp: "24-28°C (75-82°F)",
        nutrition: "Excellent source of lean protein (24g per 100g), low in mercury, rich in selenium and vitamin D",
        facts: [
            "Named after Filipino hero Lapu-Lapu who defeated Magellan",
            "Highly prized for their firm, white, flaky meat with mild flavor",
            "Important apex predators that help maintain reef ecosystem balance",
            "Many species are protogynous hermaphrodites (change from female to male)",
            "Can live over 40 years and grow very large",
            "Ambush predators that swallow prey whole with powerful suction"
        ],
        conservation: "Varies by species - many are overfished and need protection due to slow growth",
        cookingTips: "Excellent steamed, grilled, or in soups. Sweet, delicate flavor. Popular in Chinese and Filipino cuisine."
    },
    dalag: {
        name: "Dalag (Snakehead)",
        scientificName: "Channa striata",
        image: "images/Dalag (Snakehead).jpg",
        habitat: "Freshwater swamps, rivers, rice fields, and shallow ponds",
        diet: "Carnivorous - fish, frogs, aquatic insects, and small crustaceans",
        size: "25-100 cm (10-40 inches)",
        weight: "1-7 kg (2-15 lbs)",
        lifespan: "8-15 years",
        waterTemp: "22-30°C (72-86°F)",
        nutrition: "High in protein (25g per 100g), low in fat, rich in amino acids and iron",
        facts: [
            "Can breathe air using a primitive lung and survive out of water for 4+ hours",
            "Important food fish in Southeast Asia, especially Philippines and Thailand",
            "Believed to have healing properties in traditional medicine",
            "Aggressive predator with excellent parental care - guards eggs and fry",
            "Can move across land to find new water bodies during dry seasons",
            "Has excellent vision and can hunt in murky water"
        ],
        conservation: "Least Concern - highly adaptable and widely distributed",
        cookingTips: "Popular in soups and stews. Firm, white meat with mild flavor. Often used in medicinal soups for recovery."
    },
    tuna: {
        name: "Tuna",
        scientificName: "Thunnus spp.",
        image: "images/tuna.jpg",
        habitat: "Open ocean waters worldwide, from surface to 250m depth",
        diet: "Carnivorous - fish, squid, crustaceans, and cephalopods",
        size: "30-300 cm (1-10 feet) depending on species",
        weight: "1-250 kg (2-550 lbs)",
        lifespan: "15-50+ years",
        waterTemp: "15-25°C (59-77°F)",
        nutrition: "Extremely high in protein (30g per 100g), omega-3 fatty acids, vitamin D, and selenium",
        facts: [
            "Can swim at speeds up to 75 km/h (47 mph) - among fastest fish",
            "Warm-blooded fish that can regulate body temperature",
            "Highly migratory, traveling thousands of miles across oceans",
            "Bluefin tuna can sell for over $1 million at Tokyo fish markets",
            "Have excellent vision and can see in color",
            "Heart-shaped swimming muscles generate tremendous power"
        ],
        conservation: "Varies by species - Atlantic Bluefin is critically endangered, others are overfished",
        cookingTips: "Best served raw (sashimi/sushi) or lightly seared. Rich, meaty flavor. Avoid overcooking."
    },
    mackerel: {
        name: "Mackerel",
        scientificName: "Scomber scombrus",
        image: "images/makarel.jpg",
        habitat: "Coastal and offshore waters, temperate and tropical seas",
        diet: "Carnivorous - small fish, zooplankton, crustaceans, and squid",
        size: "25-60 cm (10-24 inches)",
        weight: "0.5-2 kg (1-4 lbs)",
        lifespan: "17-20 years",
        waterTemp: "8-20°C (46-68°F)",
        nutrition: "Very high in omega-3 fatty acids, vitamin B12, selenium, and vitamin D",
        facts: [
            "Distinctive dark wavy stripes and metallic blue-green back",
            "Forms massive schools of thousands for protection and feeding",
            "Important commercial fish species worldwide",
            "Excellent source of healthy fats - higher omega-3 than salmon",
            "Fast swimmers that can reach speeds of 35 km/h",
            "Migrate seasonally following food sources and temperature"
        ],
        conservation: "Generally stable but some populations face fishing pressure",
        cookingTips: "Rich, oily fish best grilled, smoked, or pickled. Strong flavor pairs well with acidic ingredients."
    },
    catfish: {
        name: "Catfish (Hito)",
        scientificName: "Clarias batrachus",
        image: "images/catfish (hito).jpg",
        habitat: "Freshwater rivers, ponds, rice fields, and muddy waters",
        diet: "Omnivorous - plants, insects, small fish, detritus, and organic matter",
        size: "20-45 cm (8-18 inches)",
        weight: "0.5-2 kg (1-4 lbs)",
        lifespan: "8-20 years",
        waterTemp: "20-30°C (68-86°F)",
        nutrition: "Good source of protein (17g per 100g), vitamin B12, phosphorus, and selenium",
        facts: [
            "Has 4 pairs of whisker-like barbels for sensing food in murky water",
            "Can survive in low-oxygen environments and even out of water briefly",
            "Important aquaculture species across Asia and Africa",
            "Scaleless with smooth, slimy skin that helps with movement",
            "Can breathe air using modified gills when water oxygen is low",
            "Excellent bottom feeder that helps clean aquaculture ponds"
        ],
        conservation: "Least Concern - widely farmed and highly adaptable to various conditions",
        cookingTips: "Popular fried, grilled, or in curries. Firm, white meat with mild flavor. Remove skin before cooking."
    },
    dilis: {
        name: "Dilis (Anchovies)",
        scientificName: "Stolephorus spp.",
        image: "images/dilis (anchovies).jpg",
        habitat: "Coastal marine waters, bays, and estuaries",
        diet: "Planktivorous - zooplankton, phytoplankton, and small organisms",
        size: "5-15 cm (2-6 inches)",
        weight: "5-30 grams",
        lifespan: "2-4 years",
        waterTemp: "24-30°C (75-86°F)",
        nutrition: "High in protein (20g per 100g), calcium, omega-3 fatty acids, and vitamin B12",
        facts: [
            "Form massive schools of millions for protection from predators",
            "Critical base of marine food webs - food for larger fish, seabirds, and marine mammals",
            "Used to make fish sauce (patis) and dried fish (tuyo) in Philippines",
            "Small but extremely nutritionally dense with high calcium content",
            "Short lifespan but reproduce quickly to maintain populations",
            "Filter feeders that help maintain water quality"
        ],
        conservation: "Generally stable but sensitive to climate change and overfishing",
        cookingTips: "Usually dried, salted, or made into fish sauce. Fresh ones can be fried whole or used in soups."
    },
    pufferfish: {
        name: "Pufferfish",
        scientificName: "Tetraodontidae",
        image: "images/pufferfish.jpg",
        habitat: "Tropical and subtropical waters, coral reefs, and coastal areas",
        diet: "Omnivorous - algae, small invertebrates, coral, mollusks, and crustaceans",
        size: "2.5-60 cm (1-24 inches) depending on species",
        weight: "10g-30kg depending on species",
        lifespan: "4-10 years",
        waterTemp: "24-28°C (75-82°F)",
        nutrition: "Contains tetrodotoxin - potentially lethal if not prepared by licensed chefs",
        facts: [
            "Can inflate body to 2-3 times normal size by swallowing water or air",
            "Most species contain tetrodotoxin, one of the most potent neurotoxins",
            "Considered ultimate delicacy (fugu) in Japan - requires special license to prepare",
            "Have beak-like teeth that continuously grow and need wearing down",
            "No stomach - food goes directly from esophagus to intestine",
            "Some species can change color and pattern for camouflage"
        ],
        conservation: "Varies by species - some face habitat loss due to coral reef destruction",
        cookingTips: "DANGEROUS - Only eat if prepared by licensed fugu chef. Extremely toxic if prepared incorrectly."
    },
    salmon: {
        name: "Salmon",
        scientificName: "Salmo salar",
        image: "images/salmon.jpg",
        habitat: "Anadromous - freshwater rivers for spawning, ocean for adult life",
        diet: "Carnivorous - insects and zooplankton (young), fish, squid, and crustaceans (adults)",
        size: "60-150 cm (2-5 feet)",
        weight: "2-30 kg (4-66 lbs)",
        lifespan: "2-8 years",
        waterTemp: "6-14°C (43-57°F)",
        nutrition: "Excellent source of omega-3s (2.3g per 100g), protein (25g), vitamin D, and astaxanthin",
        facts: [
            "Anadromous - born in freshwater, migrate to ocean, return to spawn",
            "Navigate back to exact birthplace using sense of smell",
            "Culturally and economically important to Pacific Northwest peoples",
            "Pink-red flesh color comes from eating krill and shrimp (astaxanthin)",
            "Can jump up to 3.7 meters high to overcome waterfalls",
            "Die after spawning, providing nutrients to forest ecosystems"
        ],
        conservation: "Many wild populations declining due to habitat loss, dams, and climate change",
        cookingTips: "Versatile fish - excellent grilled, baked, smoked, or raw. Rich, buttery flavor with firm texture."
    },
    "maya-maya": {
        name: "Maya-maya (Red Snapper)",
        scientificName: "Lutjanus campechanus",
        image: "images/Maya-maya (Red Snapper).jpg",
        habitat: "Coral reefs, rocky bottoms, and offshore waters up to 200m depth",
        diet: "Carnivorous - fish, crustaceans, squid, and marine worms",
        size: "35-100 cm (14-40 inches)",
        weight: "2-15 kg (4-33 lbs)",
        lifespan: "20-50+ years",
        waterTemp: "24-28°C (75-82°F)",
        nutrition: "High in protein (26g per 100g), low in fat, rich in selenium and vitamin D",
        facts: [
            "Highly prized fish in Filipino cuisine with sweet, firm white meat",
            "Can live over 50 years and grow quite large",
            "Important commercial and recreational fish species",
            "Changes color from bright red to pink depending on depth",
            "Excellent table fare with delicate, flaky texture",
            "Often confused with other snapper species"
        ],
        conservation: "Overfished in many areas - size and bag limits enforced",
        cookingTips: "Excellent steamed whole, grilled, or fried. Sweet, delicate flavor. Popular in Chinese-style preparations."
    },
    galunggong: {
        name: "Galunggong (Round Scad)",
        scientificName: "Decapterus macrosoma",
        image: "images/Galunggong (Round Scad).jpg",
        habitat: "Coastal waters, open ocean, and near coral reefs",
        diet: "Carnivorous - small fish, zooplankton, and crustaceans",
        size: "15-35 cm (6-14 inches)",
        weight: "100-500 grams",
        lifespan: "3-5 years",
        waterTemp: "26-30°C (79-86°F)",
        nutrition: "High in protein (18g per 100g), omega-3 fatty acids, and vitamin B12",
        facts: [
            "One of the most popular and affordable fish in the Philippines",
            "Forms large schools that migrate seasonally",
            "Important source of protein for Filipino families",
            "Has distinctive lateral line and forked tail",
            "Fast-growing species that reaches maturity quickly",
            "Often caught using purse seine nets"
        ],
        conservation: "Stable but subject to seasonal availability",
        cookingTips: "Popular fried, grilled, or in soups. Remove scales before cooking. Mild, slightly oily flavor."
    },
    tanigue: {
        name: "Tanigue (Spanish Mackerel)",
        scientificName: "Scomberomorus commerson",
        image: "images/Tanigue (Spanish Mackerel).jpg",
        habitat: "Coastal waters, coral reefs, and open ocean",
        diet: "Carnivorous - fish, squid, and crustaceans",
        size: "50-200 cm (20-80 inches)",
        weight: "5-45 kg (11-99 lbs)",
        lifespan: "15-20 years",
        waterTemp: "24-30°C (75-86°F)",
        nutrition: "High in protein (25g per 100g), omega-3 fatty acids, and selenium",
        facts: [
            "Large, fast-swimming predatory fish with excellent eating quality",
            "Can reach speeds up to 60 km/h when hunting",
            "Has distinctive wavy lines and spots on sides",
            "Important game fish for sport fishing",
            "Firm, white meat with rich flavor",
            "Migrates seasonally following baitfish schools"
        ],
        conservation: "Generally stable but some populations face pressure",
        cookingTips: "Excellent grilled, baked, or made into steaks. Rich, meaty flavor. Remove dark meat for milder taste."
    },
    talakitok: {
        name: "Talakitok (Giant Trevally)",
        scientificName: "Caranx ignobilis",
        image: "images/Talakitok (Giant Trevally).jpg",
        habitat: "Coral reefs, lagoons, and coastal waters",
        diet: "Carnivorous - fish, crustaceans, and cephalopods",
        size: "50-170 cm (20-67 inches)",
        weight: "5-80 kg (11-176 lbs)",
        lifespan: "15-25 years",
        waterTemp: "24-30°C (75-86°F)",
        nutrition: "High in protein (24g per 100g), low in fat, rich in selenium",
        facts: [
            "Powerful predator known for aggressive feeding behavior",
            "Can grow to massive sizes - largest trevally species",
            "Important in both commercial and recreational fishing",
            "Has distinctive steep forehead and silver coloration",
            "Excellent fighting fish popular with anglers",
            "Forms schools when young, becomes solitary when large"
        ],
        conservation: "Stable but large specimens are becoming rare",
        cookingTips: "Firm, white meat excellent grilled or fried. Mild flavor. Smaller fish are better eating."
    },
    barramundi: {
        name: "Barramundi (Asian Sea Bass)",
        scientificName: "Lates calcarifer",
        image: "images/barramundi.jpg",
        habitat: "Coastal waters, estuaries, and freshwater rivers",
        diet: "Carnivorous - fish, crustaceans, and aquatic insects",
        size: "60-200 cm (24-79 inches)",
        weight: "3-60 kg (7-132 lbs)",
        lifespan: "15-20 years",
        waterTemp: "26-32°C (79-90°F)",
        nutrition: "High in protein (25g per 100g), omega-3 fatty acids, and vitamin D",
        facts: [
            "Catadromous - spawns in saltwater, grows in freshwater",
            "All barramundi are born male and change to female as they mature",
            "Excellent aquaculture species with fast growth",
            "Has large mouth and can swallow prey up to 60% of its length",
            "Prized for its white, flaky meat and mild flavor",
            "Can jump out of water when hooked"
        ],
        conservation: "Stable - widely farmed and sustainably managed",
        cookingTips: "Versatile fish - excellent grilled, baked, or pan-fried. Mild, buttery flavor with firm texture."
    },
    pompano: {
        name: "Pompano",
        scientificName: "Trachinotus carolinus",
        image: "images/Pompano.jpg",
        habitat: "Coastal waters, sandy beaches, and near-shore areas",
        diet: "Carnivorous - small fish, crustaceans, and marine worms",
        size: "25-60 cm (10-24 inches)",
        weight: "1-4 kg (2-9 lbs)",
        lifespan: "3-4 years",
        waterTemp: "20-28°C (68-82°F)",
        nutrition: "High in protein (23g per 100g), omega-3 fatty acids, and selenium",
        facts: [
            "Considered one of the finest eating fish in the ocean",
            "Has distinctive diamond-shaped, compressed body",
            "Fast-growing species that reaches maturity quickly",
            "Popular target for surf fishing and light tackle",
            "Commands high prices in restaurants",
            "Migrates seasonally along coastlines"
        ],
        conservation: "Generally stable but subject to fishing pressure",
        cookingTips: "Premium eating fish - excellent grilled whole, baked, or pan-seared. Rich, buttery flavor."
    },
    "longhorn-cowfish": {
        name: "Longhorn Cowfish",
        scientificName: "Lactoria cornuta",
        image: "images/Longhorn Cowfish.jpg",
        habitat: "Coral reefs, lagoons, and coastal waters in tropical Indo-Pacific",
        diet: "Omnivorous - algae, small invertebrates, sponges, and coral polyps",
        size: "15-50 cm (6-20 inches)",
        weight: "200g-2 kg (0.4-4 lbs)",
        lifespan: "8-15 years",
        waterTemp: "24-28°C (75-82°F)",
        nutrition: "Low in fat, moderate protein content, not commonly consumed as food",
        facts: [
            "Named for the distinctive horn-like projections above their eyes",
            "Box-shaped body provides protection but limits swimming ability",
            "Can release toxic mucus when stressed or threatened",
            "Popular in marine aquariums but require expert care",
            "Slow swimmers that rely on camouflage and toxins for protection",
            "Have a unique beak-like mouth for picking at coral and small prey",
            "Males guard eggs until they hatch"
        ],
        conservation: "Least Concern but vulnerable to coral reef destruction",
        cookingTips: "Popular ornamental fish in marine aquariums. Best appreciated for its unique appearance and behavior rather than as food."
    }
};

// Current fish being displayed in modal
let currentModalFish = '';
let allFishKeys = Object.keys(fishData);

/**
 * FISH DETAILS MODAL FUNCTION
 *
 * Purpose: Displays comprehensive information about a selected fish
 *
 * Parameters:
 * - fishType: String key from fishData object (e.g., 'tilapia', 'milkfish')
 *
 * Features:
 * - Shows full-size fish image
 * - Displays all fish information (habitat, diet, facts, etc.)
 * - Navigation arrows to browse other fish
 * - Prevents page scrolling when open
 * - Responsive design for mobile
 * - Error handling for missing fish data
 *
 * Information displayed:
 * - Fish name and scientific name
 * - Size, weight, lifespan, water temperature
 * - Natural habitat description
 * - Diet and feeding behavior
 * - Nutritional value
 * - Fascinating facts
 * - Conservation status
 * - Cooking tips (if applicable)
 */
function showFishDetails(fishType) {
    const fish = fishData[fishType];
    if (!fish) return;

    // Store current fish for navigation
    currentModalFish = fishType;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <!-- Modal Navigation Arrows -->
        <button class="modal-nav-arrow modal-nav-left" onclick="navigateModalFish(-1)">
            <span>‹</span>
        </button>
        <button class="modal-nav-arrow modal-nav-right" onclick="navigateModalFish(1)">
            <span>›</span>
        </button>

        <img src="${fish.image}" alt="${fish.name}" class="modal-fish-image">
        <div class="modal-fish-content">
            <h2 class="modal-fish-title">${fish.name}</h2>
            <p class="modal-scientific-name"><em>${fish.scientificName}</em></p>

            <div class="fish-stats">
                <div class="stat-item">
                    <span class="stat-value">${fish.size}</span>
                    <span class="stat-label">Size Range</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${fish.weight || 'Varies'}</span>
                    <span class="stat-label">Weight Range</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${fish.lifespan}</span>
                    <span class="stat-label">Lifespan</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${fish.waterTemp || 'Varies'}</span>
                    <span class="stat-label">Water Temperature</span>
                </div>
            </div>

            <div class="fish-detail-section">
                <h3>🏠 Natural Habitat</h3>
                <p>${fish.habitat}</p>
            </div>

            <div class="fish-detail-section">
                <h3>🍽️ Diet & Feeding</h3>
                <p>${fish.diet}</p>
            </div>

            <div class="fish-detail-section">
                <h3>🥗 Nutritional Value</h3>
                <p>${fish.nutrition}</p>
            </div>

            <div class="fish-detail-section">
                <h3>🔍 Fascinating Facts</h3>
                <ul>
                    ${fish.facts.map(fact => `<li>${fact}</li>`).join('')}
                </ul>
            </div>

            <div class="fish-detail-section">
                <h3>🌍 Conservation Status</h3>
                <p>${fish.conservation}</p>
            </div>

            ${fish.cookingTips ? `
            <div class="fish-detail-section">
                <h3>👨‍🍳 Cooking Tips</h3>
                <p>${fish.cookingTips}</p>
            </div>
            ` : ''}
        </div>
    `;

    document.getElementById('fishModal').style.display = 'block';
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Modal Fish Navigation Function
function navigateModalFish(direction) {
    if (!currentModalFish) return;

    const currentIndex = allFishKeys.indexOf(currentModalFish);
    let newIndex = currentIndex + direction;

    // Handle wrapping
    if (newIndex < 0) {
        newIndex = allFishKeys.length - 1;
    } else if (newIndex >= allFishKeys.length) {
        newIndex = 0;
    }

    const newFishType = allFishKeys[newIndex];
    showFishDetails(newFishType);
}

// Add CSS for modal content
const modalStyles = `
    /* Modal Content Container */
    #modalContent {
        position: relative;
        min-height: 400px;
    }

    /* Modal Navigation Arrows */
    .modal-nav-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: linear-gradient(135deg, var(--ocean-blue), var(--tropical-teal));
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        z-index: 1001;
    }

    .modal-nav-left {
        left: 20px;
    }

    .modal-nav-right {
        right: 20px;
    }

    .modal-nav-arrow:hover {
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        background: linear-gradient(135deg, var(--tropical-teal), var(--sea-foam));
    }

    .modal-nav-arrow:active {
        transform: translateY(-50%) scale(0.95);
    }

    /* Modal Arrow Responsive */
    @media (max-width: 768px) {
        .modal-nav-arrow {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
        }

        .modal-nav-left {
            left: 10px;
        }

        .modal-nav-right {
            right: 10px;
        }
    }

    .fish-detail-section {
        margin: 1.5rem 0;
    }

    .fish-detail-section h3 {
        color: #2c5aa0;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }

    .fish-detail-section ul {
        padding-left: 1.5rem;
    }

    .fish-detail-section li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }

    .scientific-name {
        color: #5a7ba8;
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
    }

    /* All Fish Modal Styles */
    .all-fish-modal {
        padding: 2rem;
    }

    .all-fish-title {
        font-family: 'Playfair Display', serif;
        font-size: 2.5rem;
        color: var(--deep-ocean);
        text-align: center;
        margin-bottom: 1rem;
        font-weight: 700;
    }

    .all-fish-subtitle {
        text-align: center;
        color: #64748b;
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }

    .all-fish-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .all-fish-card {
        background: linear-gradient(135deg, var(--soft-blue) 0%, var(--coral-light) 100%);
        padding: 1.5rem;
        border-radius: 16px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        position: relative;
        overflow: hidden;
    }

    .all-fish-card:hover {
        transform: translateY(-5px);
        border-color: var(--ocean-blue);
        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15);
    }

    .all-fish-image {
        width: 100%;
        height: 120px;
        margin-bottom: 1rem;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
    }

    .modal-fish-thumb {
        width: 150%;
        height: 120%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.3s ease;
        border-radius: 12px;
    }

    .all-fish-card:hover .modal-fish-thumb {
        transform: scale(1.1);
    }

    .all-fish-card h4 {
        color: var(--deep-ocean);
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        font-weight: 700;
        font-family: 'Playfair Display', serif;
    }

    .all-fish-scientific {
        color: var(--ocean-blue);
        font-size: 0.9rem;
        font-style: italic;
        margin-bottom: 1rem;
        opacity: 0.8;
    }

    .view-fish-btn {
        display: inline-block;
        background: linear-gradient(135deg, var(--ocean-blue), var(--tropical-teal));
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .all-fish-card:hover .view-fish-btn {
        background: linear-gradient(135deg, var(--tropical-teal), var(--sea-foam));
        transform: translateY(-1px);
    }

    .all-fish-footer {
        text-align: center;
        padding: 1.5rem;
        background: var(--soft-blue);
        border-radius: 12px;
        margin-top: 1rem;
    }

    .all-fish-footer p {
        color: var(--deep-ocean);
        font-size: 1rem;
        margin: 0;
        opacity: 0.8;
    }

    /* Image loading placeholder */
    .image-loading {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        background: linear-gradient(135deg, var(--soft-blue), var(--pearl-white));
        border-radius: 12px;
        color: var(--ocean-blue);
        animation: pulse 1.5s ease-in-out infinite;
    }

    /* Fish emoji fallback for missing images */
    .fish-emoji {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        background: linear-gradient(135deg, var(--soft-blue), var(--coral-light));
        border-radius: 12px;
        color: var(--deep-ocean);
    }



    @keyframes pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

/**
 * SHOW ALL FISH GALLERY FUNCTION
 *
 * Purpose: Displays all fish species in a modal gallery view
 *
 * Features:
 * - Creates a grid of all 17 featured fish species (from Philippines' 200+ marine species)
 * - Each card shows fish image, name, and scientific name
 * - Clickable cards open detailed fish information
 * - Handles missing images with fallback emoji
 * - Responsive grid layout
 * - Loading optimization with lazy loading
 */
function showAllFish() {
    const allFishNames = Object.keys(fishData);
    const modalContent = document.getElementById('modalContent');

    let fishCardsHTML = '';
    allFishNames.forEach(fishKey => {
        const fish = fishData[fishKey];
        fishCardsHTML += `
            <div class="all-fish-card" onclick="showFishDetails('${fishKey}')">
                <div class="all-fish-image">
                    <img src="${fish.image}"
                         alt="${fish.name}"
                         class="modal-fish-thumb"
                         loading="lazy"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                         style="display: block;">
                    <div class="image-fallback" style="display: none;">🐟</div>
                </div>
                <h4>${fish.name}</h4>
                <p class="all-fish-scientific">${fish.scientificName}</p>
                <span class="view-fish-btn">View Details</span>
            </div>
        `;
    });

    modalContent.innerHTML = `
        <div class="all-fish-modal">
            <h2 class="all-fish-title">Fish Species Gallery</h2>
            <p class="all-fish-subtitle">Discover 17 featured species from the Philippines' 200+ marine fish species</p>
            <div class="all-fish-grid">
                ${fishCardsHTML}
            </div>
            <div class="all-fish-footer">
                <p>Click on any fish to view detailed information including habitat, diet, and cooking tips!</p>
            </div>
        </div>
    `;

    document.getElementById('fishModal').style.display = 'block';
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Function to show fish preview animation
function showFishPreview() {
    const previewItems = document.querySelectorAll('.fish-preview-item');
    let currentIndex = 0;

    // Remove active class from all items
    previewItems.forEach(item => item.classList.remove('active'));

    // Add rotating animation
    const rotateInterval = setInterval(() => {
        previewItems.forEach(item => item.classList.remove('active', 'rotating'));

        previewItems[currentIndex].classList.add('active', 'rotating');
        currentIndex = (currentIndex + 1) % previewItems.length;

        if (currentIndex === 0) {
            clearInterval(rotateInterval);
            // Reset to first item after animation
            setTimeout(() => {
                previewItems.forEach(item => item.classList.remove('rotating'));
                previewItems[0].classList.add('active');
            }, 500);
        }
    }, 800);
}



// Card Navigation System for About Page
let currentCardIndex = {
    values: 0
};



function navigateCards(section, direction) {
    const cards = document.querySelectorAll(`#${section}Grid .value-card, #${section}Track .value-card`);
    const indicators = document.querySelectorAll(`#${section}Indicators .indicator`);

    if (!cards.length) return;

    // Update current index
    currentCardIndex[section] += direction;

    // Handle wrapping
    if (currentCardIndex[section] < 0) {
        currentCardIndex[section] = cards.length - 1;
    } else if (currentCardIndex[section] >= cards.length) {
        currentCardIndex[section] = 0;
    }

    // Update cards
    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentCardIndex[section]) {
            card.classList.add('active');
        }
    });

    // Update indicators
    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentCardIndex[section]) {
                indicator.classList.add('active');
            }
        });
    }

    // Add animation effect
    cards[currentCardIndex[section]].style.transform = 'scale(1.05)';
    setTimeout(() => {
        cards[currentCardIndex[section]].style.transform = 'scale(1)';
    }, 200);
}

function goToCard(section, index) {
    const cards = document.querySelectorAll(`#${section}Grid .value-card, #${section}Track .value-card`);
    const indicators = document.querySelectorAll(`#${section}Indicators .indicator`);

    if (!cards.length || index < 0 || index >= cards.length) return;

    currentCardIndex[section] = index;

    // Update cards
    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });

    // Update indicators
    if (indicators.length) {
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });
    }
}



/**
 * HERO SEARCH FUNCTIONALITY
 *
 * Purpose: Provides real-time fish search in the hero section
 *
 * How it works:
 * 1. User types in search input
 * 2. Function filters fish database by name or scientific name
 * 3. Shows matching suggestions in dropdown
 * 4. Handles "no results found" cases
 * 5. Provides clear button to reset search
 *
 * Features:
 * - Case-insensitive search
 * - Searches both common and scientific names
 * - Real-time suggestions
 * - Click to view fish details
 * - Responsive design
 */
function searchFishFromHero() {
    const searchTerm = document.getElementById('heroFishSearchInput').value.toLowerCase().trim();
    const clearBtn = document.getElementById('heroClearBtn');
    const suggestionsDiv = document.getElementById('heroSearchSuggestions');

    // Show/hide clear button
    if (searchTerm) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
        suggestionsDiv.style.display = 'none';
        return;
    }

    // Get fish data
    const fishCards = Object.keys(fishData);
    let matchingFish = [];

    fishCards.forEach(fishKey => {
        const fish = fishData[fishKey];
        const fishName = fish.name.toLowerCase();
        const scientificName = fish.scientificName.toLowerCase();

        if (fishName.includes(searchTerm) || scientificName.includes(searchTerm)) {
            matchingFish.push({key: fishKey, fish: fish});
        }
    });

    // Show suggestions
    if (matchingFish.length > 0) {
        showHeroSearchSuggestions(searchTerm, matchingFish);
    } else {
        showHeroNoResults(searchTerm);
    }
}

function showHeroSearchSuggestions(searchTerm, matchingFish) {
    const suggestionsDiv = document.getElementById('heroSearchSuggestions');

    let suggestionsHTML = '<div class="hero-suggestions-header">🐠 Found fish species:</div>';

    matchingFish.slice(0, 5).forEach(item => {
        suggestionsHTML += `
            <div class="hero-suggestion-item" onclick="selectHeroFishSuggestion('${item.key}', '${item.fish.name}')">
                <div class="hero-suggestion-content">
                    <span class="hero-suggestion-name">${item.fish.name}</span>
                    <span class="hero-suggestion-scientific">${item.fish.scientificName}</span>
                </div>
                <span class="hero-suggestion-action">View Details →</span>
            </div>
        `;
    });

    if (matchingFish.length > 5) {
        suggestionsHTML += `<div class="hero-suggestions-more">+${matchingFish.length - 5} more fish found</div>`;
    }

    suggestionsDiv.innerHTML = suggestionsHTML;
    suggestionsDiv.style.display = 'block';
}

function showHeroNoResults(searchTerm) {
    const suggestionsDiv = document.getElementById('heroSearchSuggestions');

    suggestionsDiv.innerHTML = `
        <div class="hero-no-results">
            <div class="hero-no-results-icon">🔍</div>
            <div class="hero-no-results-text">No fish found for "${searchTerm}"</div>
            <div class="hero-quick-suggestions">
                <span onclick="searchHeroForFish('tilapia')">Tilapia</span>
                <span onclick="searchHeroForFish('tuna')">Tuna</span>
                <span onclick="searchHeroForFish('salmon')">Salmon</span>
            </div>
        </div>
    `;
    suggestionsDiv.style.display = 'block';
}

function selectHeroFishSuggestion(fishKey, fishName) {
    document.getElementById('heroFishSearchInput').value = fishName;
    document.getElementById('heroSearchSuggestions').style.display = 'none';

    // Scroll to fish section and show details
    document.getElementById('fish-list').scrollIntoView({
        behavior: 'smooth'
    });

    setTimeout(() => {
        showFishDetails(fishKey);
    }, 800);
}

function searchHeroForFish(fishName) {
    document.getElementById('heroFishSearchInput').value = fishName;
    searchFishFromHero();
}

function clearHeroSearch() {
    document.getElementById('heroFishSearchInput').value = '';
    document.getElementById('heroClearBtn').style.display = 'none';
    document.getElementById('heroSearchSuggestions').style.display = 'none';
}

// Old fish search functionality (for about page)
function searchFish() {
    const searchTerm = document.getElementById('fishSearch').value.toLowerCase();
    const fishCards = document.querySelectorAll('.quick-fish-card');

    fishCards.forEach(card => {
        const fishName = card.querySelector('h4').textContent.toLowerCase();
        const fishType = card.querySelector('p').textContent.toLowerCase();

        if (fishName.includes(searchTerm) || fishType.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });

    // Show "no results" message if no cards are visible
    const visibleCards = Array.from(fishCards).filter(card => card.style.display !== 'none');
    const gridContainer = document.getElementById('fishQuickGrid');

    // Remove existing no-results message
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (visibleCards.length === 0 && searchTerm.trim() !== '') {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.innerHTML = `
            <div class="no-results-icon">🔍</div>
            <h4>No fish found</h4>
            <p>Try searching for "tilapia", "tuna", "salmon", etc.</p>
        `;
        gridContainer.appendChild(noResultsMessage);
    }
}

// Go to Fish Function
function goToFish(fishType) {
    // Store the fish type in sessionStorage to show it when redirected
    sessionStorage.setItem('selectedFish', fishType);
    // Redirect to main page and show fish details
    window.location.href = `index.html#fish-list`;

    // If we're already on the same domain, we can directly show the fish
    setTimeout(() => {
        if (typeof showFishDetails === 'function') {
            showFishDetails(fishType);
        }
    }, 500);
}

// Contact Form Submission
function submitContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const successDiv = document.getElementById('formSuccess');

    // Show loading state
    submitBtn.innerHTML = `
        <span class="btn-text">Sending...</span>
        <span class="btn-icon">⏳</span>
    `;
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        successDiv.style.display = 'block';
        successDiv.style.animation = 'fadeIn 0.5s ease';

        // Reset form after 3 seconds
        setTimeout(() => {
            form.style.display = 'block';
            successDiv.style.display = 'none';
            form.reset();
            submitBtn.innerHTML = `
                <span class="btn-text">Send Message</span>
                <span class="btn-icon">📤</span>
            `;
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
}

// Auto-rotate cards (optional)
function startCardAutoRotation(section, interval = 5000) {
    setInterval(() => {
        navigateCards(section, 1);
    }, interval);
}

// Initialize card navigation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the home page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Add keyboard navigation for fish cards
        document.addEventListener('keydown', function(e) {
            // Check if modal is open
            const modal = document.getElementById('fishModal');
            const isModalOpen = modal && modal.style.display === 'block';

            if (isModalOpen) {
                // Modal navigation
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    navigateModalFish(-1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    navigateModalFish(1);
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    modal.style.display = 'none';
                }
            }
        });

        // Optional: Start auto-rotation for fish cards
        // startFishAutoRotation(8000);
    }

    // Check if we're on the about page
    if (window.location.pathname.includes('about.html')) {
        // Optional: Start auto-rotation for values cards
        // startCardAutoRotation('values', 6000);

        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                navigateCards('values', -1);
            } else if (e.key === 'ArrowRight') {
                navigateCards('values', 1);
            }
        });
    }

    // Check if we need to show a specific fish (from sessionStorage)
    const selectedFish = sessionStorage.getItem('selectedFish');
    if (selectedFish && typeof showFishDetails === 'function') {
        sessionStorage.removeItem('selectedFish');
        setTimeout(() => {
            showFishDetails(selectedFish);
        }, 1000);
    }
});

