import fs from 'fs';
import path from 'path';

// Get the directory name of the current module
const filePath =  './data/url.data.json';

// Read to JSON file
const readData = () => {
  try {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return [];
  }
};

// Write to JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to JSON file:', error);
  }
};

export { readData, writeData };
