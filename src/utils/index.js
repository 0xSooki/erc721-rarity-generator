const resolveLink = (url) => {
  if (!url || !url.includes('ipfs://')) return url;
  return url.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
};

const roundToHundredth = (num) => Math.round(100 * num) / 100;

const extractTraitsAndValues = (metadata) => {
  return metadata.reduce(
    (traitsAndValues, meta) => {
      return {
        ...traitsAndValues,
        traits: [...traitsAndValues.traits, meta.trait_type],
        values: [...traitsAndValues.values, meta.value]
      };
    },
    { traits: [], values: [] }
  );
};

const generateTally = (metadataList) => {
  return metadataList.reduce(
    (tally, meta) => {
      const { traits, values } = extractTraitsAndValues(meta);
      const numOfTraits = traits.length;

      if (tally.TraitCount[numOfTraits]) {
        tally.TraitCount[numOfTraits]++;
      } else {
        tally.TraitCount[numOfTraits] = 1;
      }

      traits.forEach((trait, index) => {
        if (tally[trait]) {
          tally[trait].occurences++;
        } else {
          tally[trait] = { occurences: 1 };
        }

        const traitValue = values[index];
        if (tally[trait][traitValue]) {
          tally[trait][traitValue]++;
        } else {
          tally[trait][traitValue] = 1;
        }
      });

      return tally;
    },
    { TraitCount: {} }
  );
};

// This will calculate the base rarity score
// and mutate the 'rarityScore' on the passed in meta list reference
const calculateTotalRaritybase = (meta, tally, totalMetadata) => {
  return meta.reduce((totalRarity, currentMeta, index) => {
    const { trait_type, value } = currentMeta;
    const rarityScore = 1 / (tally[trait_type][value] / totalMetadata);

    meta[index].rarityScore = roundToHundredth(rarityScore);
    return totalRarity + rarityScore;
  }, 0);
};

const getNftImage = async (tokenUri) => {
  try {
    return await fetch(tokenUri)
      .then((res) => res.json())
      .then((data) => resolveLink(data.image));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  calculateTotalRaritybase,
  extractTraitsAndValues,
  generateTally,
  getNftImage,
  resolveLink,
  roundToHundredth
};
