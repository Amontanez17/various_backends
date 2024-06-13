let backendUrl = "https://dragonball-api.com/api/characters";
const axios = require("axios");
const fs = require("fs");
const characters = [];

async function fecthCharacters() {
  try {
    if (!backendUrl) {
      fs.writeFileSync("char.json", JSON.stringify(characters, null, 2));
      return;
    }
    const response = await axios.get(backendUrl);
    console.log(response);
    characters.push(...response.data.items);
    console.log(`We now have ${characters.length} characters`);
    backendUrl = response.data.links.next;
    await sleep(1000);
    fecthCharacters;
  } catch (error) {
    console.log(error);
  }
}

async function sleep(time) {
  return new Promise((accept) => {
    setTimeout(() => {
      accept();
    }, time);
  });
}

fecthCharacters();
