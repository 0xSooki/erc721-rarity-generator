require('dotenv').config();

const { getNftsAndMetaData } = require('./alchemy');
const { addNFT } = require('./mongo');
const { saveData } = require('./persist');
const {
  calculateTotalRaritybase,
  generateTally,
  getNftImage,
  resolveLink,
  roundToHundredth
} = require('./utils');

const generateRarity = async () => {
  const [metadataList, allNfts] = await getNftsAndMetaData();

  const totalMetadata = metadataList.length;

  const tally = generateTally(metadataList);

  const collectionAttributes = Object.keys(tally);
  const nftArr = [];

  for (let i = 0; i < metadataList.length; i++) {
    const currentMeta = [...metadataList[i]];

    let totalRarity = calculateTotalRaritybase(currentMeta, tally, totalMetadata);

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

    const currentNft = allNfts[i];
    if (currentNft?.metadata) {
      currentNft.image = resolveLink(currentNft.metadata?.image);
    } else if (currentNft.token_uri) {
      allNfts[i].image = await getNftImage(currentNft.token_uri);
    }

    const nft = {
      attributes: currentMeta,
      rarity: Math.round(100 * totalRarity) / 100,
      token_id: parseInt(currentNft.tokenId),
      image: currentNft.rawMetadata.image
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
