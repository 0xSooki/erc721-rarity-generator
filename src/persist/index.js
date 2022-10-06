export { connectToDatabase } from './db/connect.js';
export { addMultipleNFTs, addSingletonNFT } from './db/actions.js';
export {
  prepareBaseFolderStructure,
  saveErrorsToJson,
  saveErrorsToZip,
  saveNFTsToJson,
  saveNFTsToZip,
  saveCalculationsToJson,
  saveCalculationsToZip
} from './local/index.js';
