const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});

// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
  .query(`SELECT * FROM users WHERE email = $1`, [email])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.error(err.message);
  });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
  .query(`SELECT * FROM users WHERE id = $1`, [id])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.error(err.message);
  });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const {name, email, password} = user;

  return pool
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.error(err.message);
  });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
  .query(`SELECT reservations.*, properties.title, properties.cost_per_night
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  WHERE reservations.guest_id = $1
  ORDER BY reservations.start_date DESC
  LIMIT $2;`, [guest_id, limit])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.error(err.message);
  });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
const queryParams = [];
  
// Insert base query
let queryString = `
SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM properties
LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
`;

// Check filters and add query to string if exists in options object
// Add query to filter by city if exists
if (options.city) {
  queryParams.push(`%${options.city}%`);
  queryString += `WHERE city LIKE $${queryParams.length} `;
}

// Add query to filter by owner ID if exists
if (options.owner_id) {
  if (queryParams.length === 0) {
    queryString += `WHERE `;
  } else {
    queryString += `AND `;
  }
  queryParams.push(options.owner_id);
  queryString += `owner_id = $${queryParams.length} `;
}

// Add query to filter by price if max and min entered
if (options.minimum_price_per_night && options.maximum_price_per_night) {
  if (queryParams.length === 0) {
    queryString += `WHERE `;
  } else {
    queryString += `AND `;
  }
  // Cost is provided in cents
  queryParams.push(options.minimum_price_per_night * 100);
  queryParams.push(options.maximum_price_per_night * 100);
  queryString += `cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length} `;
}

queryString += `GROUP BY properties.id`;

// Add query to filter by min rating if exists
if (options.minimum_rating) {
  queryParams.push(options.minimum_rating);
  queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
}

queryParams.push(limit);
queryString += `
ORDER BY cost_per_night DESC
LIMIT $${queryParams.length};
`;

console.log(queryString, queryParams);

return pool
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.error(err.message);
  });

};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
