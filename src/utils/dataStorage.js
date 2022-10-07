export class DataStorage {
  #nftData = [];
  #calculationData = [];

  cleanData = () => {
    this.#nftData = [];
    this.#calculationData = [];
  };

  getCalculationData = () => this.#calculationData;
  getNftData = () => this.#nftData;

  hasCalculationData = () => this.#calculationData.length > 0;
  hasNftData = () => this.#nftData.length > 0;

  storeNfts = (nftData) => {
    this.#nftData = nftData;
    return this;
  };

  storeCalculations = (calculationData) => {
    this.#calculationData = calculationData;
    return this;
  };
}
