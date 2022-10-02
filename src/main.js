require('dotenv').config();

const { getNftsAndMetaData } = require('./alchemy');
const { addNFT } = require('./mongo');
const { saveData } = require('./persist');
const { generateTally, resolveLink, roundToHundredth } = require('./utils');

const generateRarity = async () => {
  const [metadataList, allNfts] = await getNftsAndMetaData();

  const totalMetadata = metadataList.length;

  const tally = generateTally(metadataList);

  const collectionAttributes = Object.keys(tally);
  const nftArr = [];

  for (let i = 0; i < metadataList.length; i++) {
    const currentMeta = [...metadataList[i]];
    let totalRarity = 0;

    for (let j = 0; j < currentMeta.length; j++) {
      const { trait_type, value } = currentMeta[j];
      const rarityScore = 1 / (tally[trait_type][value] / totalMetadata);

      currentMeta[j].rarityScore = roundToHundredth(rarityScore);
      totalRarity += rarityScore;
    }

    const rarityScoreNumTraits =
      8 * (1 / (tally.TraitCount[Object.keys(currentMeta).length] / totalMetadata));

    currentMeta.push({
      trait_type: 'TraitCount',
      value: Object.keys(currentMeta).length,
      rarityScore: roundToHundredth(rarityScoreNumTraits)
    });

    totalRarity += rarityScoreNumTraits;

    if (currentMeta.length < collectionAttributes.length) {
      const attributes = currentMeta.map((e) => e.trait_type);
      const absent = collectionAttributes.filter((e) => !attributes.includes(e));

      absent.forEach((type) => {
        const rarityScoreNull = 1 / ((totalMetadata - tally[type].occurences) / totalMetadata);

        currentMeta.push({
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

    const nft = {
      Attributes: currentMeta,
      Rarity: Math.round(100 * totalRarity) / 100,
      token_id: parseInt(allNfts[i].tokenId),
      image: allNfts[i].rawMetadata.image,
      attributes: current
    };

    nftArr.push(nft);
    addNFT(nft);
  }

  nftArr.sort((a, b) => b.Rarity - a.Rarity);

  return saveData(nftArr);
};

module.exports = {
  generateRarity
};
