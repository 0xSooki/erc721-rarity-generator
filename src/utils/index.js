const cliSpinners = require('cli-spinners');
const fetch = require('node-fetch');
const { stdout } = require('process');

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

const createSpinner = (id) => {
  const state = {
    id,
    affix: null,
    currentFrame: 0,
    spinnerRef: null
  };

  const start = (affixOpt) => {
    if (state.spinnerRef === null) {
      state.spinnerRef = setInterval(() => {
        const { currentFrame } = state;
        state.affix = affixOpt ? affixOpt : null;

        stdout.clearLine();
        stdout.cursorTo(0);

        const text = affixOpt
          ? `${affixOpt} ${cliSpinners.dots.frames[currentFrame]} `
          : `${cliSpinners.dots.frames[currentFrame]} `;
        stdout.write(text);

        state.currentFrame = (currentFrame + 1) % cliSpinners.dots.frames.length;
      }, cliSpinners.dots.interval);
    } else {
      stdout.write(`\nSpinner ${state.id} is already running\n`);
    }
  };

  const stop = () => {
    if (state.spinnerRef) {
      clearInterval(state.spinnerRef);
      if (state.affix) {
        stdout.cursorTo(state.affix.length);
        stdout.write('  \n');
      } else {
        stdout.clearLine();
        stdout.cursorTo(0);
      }

      state.currentFrame = 0;
      state.affix = null;
    }
  };

  return Object.freeze({
    id,
    start,
    stop
  });
};

module.exports = {
  calculateTotalRaritybase,
  createSpinner,
  extractTraitsAndValues,
  generateTally,
  getNftImage,
  resolveLink,
  roundToHundredth
};
