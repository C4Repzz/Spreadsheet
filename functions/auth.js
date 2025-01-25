// functions/auth.js

const { Buffer } = require('buffer');

exports.handler = async (event, context) => {
  const authHeader = event.headers.authorization;
  
  // Define username and password directly in the code
  const username = 'Hasse';
  const passwordHash = '$2y$10$9n5Oeeul2IMWoSHRkIQ77ewJCjklGSb7ymnuwGBFwyCYiqfYO23eq'; // bcrypt hash of the password
  
  // If the Authorization header is missing or doesn't start with 'Basic ', send a 401 response
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return {
      statusCode: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Restricted Area"'
      },
      body: 'Unauthorized'
    };
  }

  // Decode the base64-encoded credentials
  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
  const [enteredUsername, enteredPassword] = decodedCredentials.split(':');

  // Compare entered credentials with the expected ones
  if (enteredUsername === username && enteredPassword === passwordHash) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Authorized' })
    };
  }

  // If the credentials don't match, send a 401 response
  return {
    statusCode: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Restricted Area"'
    },
    body: 'Unauthorized'
  };
};
