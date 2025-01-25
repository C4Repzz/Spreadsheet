const bcrypt = require('bcryptjs');

exports.handler = async function(event, context) {
  const authorization = event.headers['authorization'];

  if (!authorization) {
    return {
      statusCode: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"'
      },
      body: 'Authentication required'
    };
  }

  const base64Credentials = authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // Check username and password against .htpasswd
  const validUsername = 'Hasse'; // Replace with your username
  const validPasswordHash = '$apr1$air852dn$3NNFaM7tkxPSP2YONre6r0'; // Replace with your hashed password

  if (username !== validUsername || !bcrypt.compareSync(password, validPasswordHash)) {
    return {
      statusCode: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"'
      },
      body: 'Authentication failed'
    };
  }

  // If authenticated, allow access to the requested resource
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Authenticated!' })
  };
};
