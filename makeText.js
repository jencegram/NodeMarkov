/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

async function generateTextFromFile(filePath) {
  try {
      let fileContent = fs.readFileSync(filePath, 'utf8');
      let markovMachine = new MarkovMachine(fileContent);
      console.log(markovMachine.makeText());
  } catch (error) {
      console.error(`Error reading file: ${error}`);
      process.exit(1);
  }
}

async function generateTextFromURL(url) {
  try {
      let response = await axios.get(url);
      let markovMachine = new MarkovMachine(response.data);
      console.log(markovMachine.makeText());
  } catch (error) {
      console.error(`Error fetching URL: ${error}`);
      process.exit(1);
  }
}

let type = process.argv[2];
let source = process.argv[3];

if (type === "file") {
    generateTextFromFile(source);
} else if (type === "url") {
    generateTextFromURL(source);
} else {
    console.error("Invalid command. Use 'file' or 'url'.");
    process.exit(1);
}
