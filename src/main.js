const basePath = process.cwd();
require('dotenv').config();
const fs = require('fs');
const { contractAddress, fileName, logPages } = require(`${basePath}/src/config.js`);
const buildDir = `${basePath}/build`;
const { Network, Alchemy } = require('alchemy-sdk');

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);

const getNFTsForCollectionOnce = async (pageKey) => {
  const response = await alchemy.nft.getNftsForContract(contractAddress, {
    pageKey: pageKey,
    withMetadata: true
  });
  return response;
};

const resolveLink = (url) => {
  if (!url || !url.includes('ipfs://')) return url;
  return url.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
};

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
};

function roundToHundredth(num) {
  return Math.round(100 * num) / 100;
}

const generateRarity = async () => {
  let metadata = [];
  let allNfts = [];

  let nextPage = '';
  while (nextPage || nextPage === '') {
    const { nfts, pageKey } = await getNFTsForCollectionOnce(nextPage);
    if (logPages) {
      console.log(nfts);
    }
    for (const token of nfts) {
      if (token.rawMetadata.attributes) {
        metadata.push(token.rawMetadata.attributes);
        allNfts.push(token);
      }
    }
    nextPage = pageKey;
  }
  let total = metadata.length;
  let tally = { TraitCount: {} };
  for (let i = 0; i < metadata.length; i++) {
    if (metadata[i]) {
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

    let rarityScoreNumTraits = 8 * (1 / (tally.TraitCount[Object.keys(current).length] / total));
    current.push({
      trait_type: 'TraitCount',
      value: Object.keys(current).length,
      rarityScore: roundToHundredth(rarityScoreNumTraits)
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
          rarityScore: roundToHundredth(rarityScoreNull)
        });
        totalRarity += rarityScoreNull;
      });
    }

    if (allNfts[i]?.metadata) {
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
      token_id: parseInt(allNfts[i].tokenId),
      image: allNfts[i].rawMetadata.image
    });
  }

  nftArr.sort((a, b) => b.Rarity - a.Rarity);

  // Save data as JSON file
  let data = JSON.stringify(nftArr);
  fs.writeFileSync(`${basePath}/build/json/${fileName}.json`, data);
  console.log(`${fileName}.json saved at ${basePath}/build/json`);
  return true;
};

module.exports = {
  buildSetup,
  generateRarity
};
