const { stdout } = require('process');

const createErrorContainer = () => {
  const state = {
    errors: []
  };

  const printErrors = () => {
    if (state.errors.length === 0) {
      return stdout.write('⚠️  No error stored ⚠️ \n');
    }

    state.errors.forEach(({ keys, tokenId, validationError }) => {
      stdout.write(`❗ Validation error occured for token #${tokenId} ❗\n`);
      keys.forEach((key) => {
        const error = validationError.errors[key]?.message;

        if (error) {
          stdout.write(`❗ ${error} ❗\n`);
        }
      });
      stdout.write('\n');
    });
  };

  const storeErrors = (errors) => {
    state.errors = errors;
    return true;
  };

  const addError = (error) => {
    state.errors = state.errors.concat(error);
    return true;
  };

  const getErrors = () => state.errors;

  const hasError = () => state.errors.length > 0;

  return Object.freeze({
    addError,
    getErrors,
    hasError,
    printErrors,
    storeErrors
  });
};

module.exports = { createErrorContainer };
