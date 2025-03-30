<?php
// Include database configuration
require_once '../database/config.php';

// Set headers for JSON response
header('Content-Type: application/json');

// Get parameters from request
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Handle different actions
switch ($action) {
    case 'getAll':
        // Get all fish with filtering options
        $category = isset($_GET['category']) ? sanitize($_GET['category']) : '';
        $family = isset($_GET['family']) ? sanitize($_GET['family']) : '';
        $habitat = isset($_GET['habitat']) ? sanitize($_GET['habitat']) : '';
        $search = isset($_GET['search']) ? sanitize($_GET['search']) : '';
        
        $query = "SELECT * FROM fish WHERE 1=1";
        $params = [];
        
        // Add filters if provided
        if (!empty($category)) {
            $query .= " AND category = ?";
            $params[] = $category;
        }
        
        if (!empty($family)) {
            $query .= " AND family = ?";
            $params[] = $family;
        }
        
        if (!empty($habitat)) {
            $query .= " AND habitat = ?";
            $params[] = $habitat;
        }
        
        if (!empty($search)) {
            $query .= " AND (common_name LIKE ? OR scientific_name LIKE ?)";
            $searchParam = "%$search%";
            $params[] = $searchParam;
            $params[] = $searchParam;
        }
        
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $fishes = $stmt->fetchAll();
        
        // Get related data for each fish
        $result = [];
        foreach ($fishes as $fish) {
            // Get distribution
            $distributionStmt = $pdo->prepare("SELECT location FROM fish_distribution WHERE fish_id = ?");
            $distributionStmt->execute([$fish['id']]);
            $distribution = array_column($distributionStmt->fetchAll(), 'location');
            
            // Get diet
            $dietStmt = $pdo->prepare("SELECT food_item FROM fish_diet WHERE fish_id = ?");
            $dietStmt->execute([$fish['id']]);
            $diet = array_column($dietStmt->fetchAll(), 'food_item');
            
            // Get fun facts
            $funFactsStmt = $pdo->prepare("SELECT fact FROM fish_fun_facts WHERE fish_id = ?");
            $funFactsStmt->execute([$fish['id']]);
            $funFacts = array_column($funFactsStmt->fetchAll(), 'fact');
            
            // Combine all data
            $fishData = [
                'id' => (int)$fish['id'],
                'commonName' => $fish['common_name'],
                'scientificName' => $fish['scientific_name'],
                'family' => $fish['family'],
                'habitat' => $fish['habitat'],
                'category' => $fish['category'],
                'size' => [
                    'min' => (float)$fish['size_min'],
                    'max' => (float)$fish['size_max'],
                    'unit' => $fish['size_unit']
                ],
                'distribution' => $distribution,
                'diet' => $diet,
                'conservationStatus' => $fish['conservation_status'],
                'behavior' => $fish['behavior'],
                'image' => $fish['image'],
                'description' => $fish['description'],
                'funFacts' => $funFacts
            ];
            
            $result[] = $fishData;
        }
        
        echo json_encode(['success' => true, 'data' => $result]);
        break;
        
    case 'getById':
        // Get a specific fish by ID
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        
        if ($id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid fish ID']);
            exit;
        }
        
        $stmt = $pdo->prepare("SELECT * FROM fish WHERE id = ?");
        $stmt->execute([$id]);
        $fish = $stmt->fetch();
        
        if (!$fish) {
            echo json_encode(['success' => false, 'message' => 'Fish not found']);
            exit;
        }
        
        // Get distribution
        $distributionStmt = $pdo->prepare("SELECT location FROM fish_distribution WHERE fish_id = ?");
        $distributionStmt->execute([$id]);
        $distribution = array_column($distributionStmt->fetchAll(), 'location');
        
        // Get diet
        $dietStmt = $pdo->prepare("SELECT food_item FROM fish_diet WHERE fish_id = ?");
        $dietStmt->execute([$id]);
        $diet = array_column($dietStmt->fetchAll(), 'food_item');
        
        // Get fun facts
        $funFactsStmt = $pdo->prepare("SELECT fact FROM fish_fun_facts WHERE fish_id = ?");
        $funFactsStmt->execute([$id]);
        $funFacts = array_column($funFactsStmt->fetchAll(), 'fact');
        
        // Combine all data
        $fishData = [
            'id' => (int)$fish['id'],
            'commonName' => $fish['common_name'],
            'scientificName' => $fish['scientific_name'],
            'family' => $fish['family'],
            'habitat' => $fish['habitat'],
            'category' => $fish['category'],
            'size' => [
                'min' => (float)$fish['size_min'],
                'max' => (float)$fish['size_max'],
                'unit' => $fish['size_unit']
            ],
            'distribution' => $distribution,
            'diet' => $diet,
            'conservationStatus' => $fish['conservation_status'],
            'behavior' => $fish['behavior'],
            'image' => $fish['image'],
            'description' => $fish['description'],
            'funFacts' => $funFacts
        ];
        
        echo json_encode(['success' => true, 'data' => $fishData]);
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}
?>
