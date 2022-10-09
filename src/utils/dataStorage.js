export const createDataStorage = () => {
  const state = {
    calculationData: [],
    nftData: []
  };

  return Object.freeze({
    cleanData: function () {
      state.nftData = [];
      state.calculationData = [];
    },
    getCalculationData: function () {
      return state.calculationData;
    },
    getNftData: function () {
      return state.nftData;
    },
    hasCalculationData: function () {
      return state.calculationData.length > 0;
    },
    hasNftData: function () {
      return state.nftData.length > 0;
    },
    storeNfts: function (nftData) {
      state.nftData = nftData;
      return this;
    },
    storeCalculations: function (calculationData) {
      state.calculationData = calculationData;
      return this;
    }
  });
};
