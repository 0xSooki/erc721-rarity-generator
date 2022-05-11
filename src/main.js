const Moralis = require("moralis/node");
const basePath = process.cwd();
require("dotenv").config();
const fs = require("fs");
const {
  contractAddress,
  collectionName,
  upload,
  json,
  logUpload,
  logPages,
} = require(`${basePath}/src/config.js`);
const buildDir = `${basePath}/build`;

const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;

Moralis.start({ serverUrl, appId });

const resolveLink = (url) => {
  if (!url || !url.includes("ipfs://")) return url;
  return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
};

const buildSetup = () => {
  if (json) {
    if (fs.existsSync(buildDir)) {
      fs.rmdirSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
    if (json) {
      fs.mkdirSync(`${buildDir}/json`);
    }
  }
};

function roundToHundredth(num) {
  return Math.round(100 * num) / 100;
}

const generateRarity = async () => {
  let cursor = null;
  let metadata = [];
  let allNfts = [];

  do {
    const response = await Moralis.Web3API.token.getAllTokenIds({
      address: contractAddress,
      chain: "eth",
      limit: 500,
      cursor: cursor,
    });
    if (logPages) {
      console.log(
        `Got page ${response.page} of ${Math.ceil(
          response.total / response.page_size
        )}, ${response.total} total`
      );
    }

    for (const token of response.result) {
      if (token.metadata) {
        metadata.push(JSON.parse(token.metadata).attributes);
        allNfts.push(token);
      }
    }
    cursor = response.cursor;
  } while (cursor != "" && cursor != null);

  total = metadata.length;
  let tally = { TraitCount: {} };
  for (let i = 0; i < metadata.length; i++) {
    let traits = metadata[i].map((e) => e.trait_type);
    let values = metadata[i].map((e) => e.value);

    let numOfTraits = traits.length;

    if (tally.TraitCount[numOfTraits]) {
      tally.TraitCount[numOfTraits]++;
    } else {
      tally.TraitCount[numOfTraits] = 1;
    }
    for (let j = 0; j < traits.length; j++) {
      let current = traits[j];

      if (tally[current]) {
        tally[current].occurences++;
      } else {
        tally[current] = { occurences: 1 };
      }

      let currentValue = values[j];
      if (tally[current][currentValue]) {
        tally[current][currentValue]++;
      } else {
        tally[current][currentValue] = 1;
      }
    }
  }

  const collectionAttributes = Object.keys(tally);
  let nftArr = [];

  for (let i = 0; i < metadata.length; i++) {
    let current = metadata[i];
    let totalRarity = 0;

    for (let j = 0; j < current.length; j++) {
      let rarityScore = 1 / (tally[current[j].trait_type][current[j].value] / total);
      current[j].rarityScore = roundToHundredth(rarityScore);
      totalRarity += rarityScore;
    }

    let rarityScoreNumTraits =
      8 * (1 / (tally.TraitCount[Object.keys(current).length] / total));
    current.push({
      trait_type: "TraitCount",
      value: Object.keys(current).length,
      rarityScore: roundToHundredth(rarityScoreNumTraits),
    });
    totalRarity += rarityScoreNumTraits;

    if (current.length < collectionAttributes.length) {
      let attributes = current.map((e) => e.trait_type);
      let absent = collectionAttributes.filter((e) => !attributes.includes(e));
      absent.forEach((type) => {
        let rarityScoreNull = 1 / ((total - tally[type].occurences) / total);
        current.push({
          trait_type: type,
          value: null,
          rarityScore: roundToHundredth(rarityScoreNull),
        });
        totalRarity += rarityScoreNull;
      });
    }

    if (allNfts[i]?.metadata) {
      allNfts[i].metadata = JSON.parse(allNfts[i].metadata);
      allNfts[i].image = resolveLink(allNfts[i].metadata?.image);
    } else if (allNfts[i].token_uri) {
      try {
        await fetch(allNfts[i].token_uri)
          .then((res) => res.json())
          .then((data) => {
            allNfts[i].image = resolveLink(data.image);
          });
      } catch (err) {
        console.log(err);
      }
    }

    nftArr.push({
      Attributes: current,
      Rarity: Math.round(100 * totalRarity) / 100,
      token_id: allNfts[i].token_id,
      image: allNfts[i].image,
    });
  }

  nftArr.sort((a, b) => b.Rarity - a.Rarity);

  // Save data as JSON file
  if (json) {
    data = JSON.stringify(nftArr);
    fs.writeFileSync(`${basePath}/build/json/${collectionName}.json`, data);
    console.log(`${collectionName}.json saved at ${basePath}/build/json`);
  }

  // Upload data to Moralis database
  if (upload) {
    for (let i = 0; i < nftArr.length; i++) {
      nftArr[i].Rank = i + 1;
      const newClass = Moralis.Object.extend(collectionName);
      const newObject = new newClass();

      newObject.set("attributes", nftArr[i].Attributes);
      newObject.set("rarity", nftArr[i].Rarity);
      newObject.set("tokenId", nftArr[i].token_id);
      newObject.set("rank", nftArr[i].Rank);
      newObject.set("image", nftArr[i].image);

      await newObject.save();
      if (logUpload) {
        console.log(i);
      }
    }
    console.log(`Uploading of ${collectionName} to Moralis database finished`);
  }
  return true;
};

module.exports = {
  buildSetup,
  generateRarity,
};
