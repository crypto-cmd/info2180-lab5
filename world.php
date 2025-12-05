<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
// Read country from GET query parameter
$country = isset($_GET['country']) ? trim($_GET['country']) : '';
$lookup = isset($_GET['lookup']) ? trim($_GET['lookup']) : '';

if ($lookup === 'cities') {
    if ($country !== '') {
        $stmt = $conn->prepare(
            "SELECT cities.name AS city_name, cities.district, cities.population
             FROM cities
             INNER JOIN countries ON cities.country_code = countries.code
             WHERE countries.name LIKE :country"
        );
        $stmt->execute([':country' => "%$country%"]);
    } else {
        $stmt = $conn->query(
            "SELECT cities.name AS city_name, cities.district, cities.population
             FROM cities"
        );
    }

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    ?>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>District</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
      <?php foreach ($results as $row): ?>
        <tr>
          <td><?= htmlspecialchars($row['city_name']) ?></td>
          <td><?= htmlspecialchars($row['district']) ?></td>
          <td><?= htmlspecialchars($row['population']) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    <?php
} else {
    if ($country !== '') {
        // Use prepared statement with LIKE for partial matches
        $stmt = $conn->prepare("SELECT name, continent, independence_year, head_of_state FROM countries WHERE name LIKE :country");
        $stmt->execute([':country' => "%$country%"]);
    } else {
        // Fallback: list all countries if no country provided
        $stmt = $conn->query("SELECT name, continent, independence_year, head_of_state FROM countries");
    }

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    ?>
    <table>
      <thead>
        <tr>
          <th>Country Name</th>
          <th>Continent</th>
          <th>Independence Year</th>
          <th>Head of State</th>
        </tr>
      </thead>
      <tbody>
      <?php foreach ($results as $row): ?>
        <tr>
          <td><?= htmlspecialchars($row['name']) ?></td>
          <td><?= htmlspecialchars($row['continent']) ?></td>
          <td><?= htmlspecialchars($row['independence_year']) ?></td>
          <td><?= htmlspecialchars($row['head_of_state']) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    <?php
}
