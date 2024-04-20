const mariadb = require('mariadb');

// Configuration de la connexion
const pool = mariadb.createPool({
    host: 'localhost', // Remplacez par l'adresse de votre base de données
    user: 'matheo', // Remplacez par votre nom d'utilisateur
    password: 'matheo', // Remplacez par votre mot de passe
    database: 'myapi', // Remplacez par le nom de votre base de données
    connectionLimit: 5 // Limite du nombre de connexions dans le pool
});

async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Connexion à la base de données réussie!');
    } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } finally {
        if (conn) return conn.end();
    }
}

// Test de connexion
testConnection();

// Exportez le pool pour l'utiliser dans d'autres modules si nécessaire
module.exports = pool;
