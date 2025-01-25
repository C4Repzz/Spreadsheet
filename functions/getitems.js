const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, '../data.json');

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data' }),
    };
  }
};
