const resolveLink = (url) => {
  if (!url || !url.includes('ipfs://')) return url;
  return url.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
};

const roundToHundredth = (num) => Math.round(100 * num) / 100;

module.exports = { resolveLink, roundToHundredth };
