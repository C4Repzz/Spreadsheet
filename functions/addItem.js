const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, '../data.json');

  try {
    // Read the current data from the file
    const data = fs.readFileSync(filePath, 'utf8');
    const items = JSON.parse(data);

    // Get the new item from the request body
    const newItem = JSON.parse(event.body);

    // Add the new item to the existing list
    items.push(newItem);

    // Save the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(newItem),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error adding item' }),
    };
  }
};
