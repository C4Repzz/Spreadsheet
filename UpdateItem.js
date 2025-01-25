// /functions/updateItem.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Parse the incoming request body (the updated item data)
    const body = JSON.parse(event.body);
    const filePath = path.resolve(__dirname, '../data.json');
    
    // Read the existing data from the file
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Find the index of the item to update (for example, by matching the name)
    const itemIndex = data.findIndex(item => item.name === body.name);
    
    if (itemIndex === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Item not found' }),
      };
    }

    // Update the item properties
    data[itemIndex] = { ...data[itemIndex], ...body };

    // Save the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item updated successfully' }),
    };
  } catch (err) {
    console.error('Error updating item:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update item' }),
    };
  }
};
