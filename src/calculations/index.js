import { getNftsAndMetaData } from '../alchemy/index.js';
import {
  calculateTotalRaritybase,
  generateTally,
  getNftImage,
  resolveLink,
  roundToHundredth
} from '../utils/index.js';
import { stdout } from 'node:process';
import { NftModel } from '../persist/db/schemas.js';
import {
  RarityGeneratorSpinner,
  RarityGeneratorErrors,
  RarityGeneratorData
} from '../utils/constants.js';
import { postCalculationPrompt } from '../utils/prompts.js';

export const generateRarity = async (contractAddress) => {
  stdout.write('\n');
  // Start the spinner
  RarityGeneratorSpinner.start('👾 Generating NFT Rarity ');

  const [metadataList, allNfts] = await getNftsAndMetaData(contractAddress);

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

    // Validate data
    const validationError = new NftModel(nft).validateSync();

    // If there is an error we save the error and move to the next datum
    if (validationError) {
      RarityGeneratorErrors.addError({
        keys: Object.keys(nft),
        tokenId: nft.token_id,
        validationError
      });
    } else {
      nftArr.push(nft);
    }
  }

  nftArr.sort((a, b) => b.rarity - a.rarity);

  // Stop the spinner
  RarityGeneratorSpinner.stop();

  // Prompt the user about any validation error
  if (RarityGeneratorErrors.hasError()) {
    const errorCount = RarityGeneratorErrors.getErrors().length;
    stdout.write(`\n⚠️  ${errorCount} error(s) occured during data validation. ⚠️\n`);
  }

  stdout.write(`\n📈 ${nftArr.length}/${allNfts.length} rarity data ready to be saved\n`);

  RarityGeneratorData.storeCalculations(nftArr).storeNfts(allNfts);

  await postCalculationPrompt();
};
