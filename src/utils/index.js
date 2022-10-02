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

module.exports = { extractTraitsAndValues, generateTally, resolveLink, roundToHundredth };