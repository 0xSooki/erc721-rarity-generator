import { stdout } from 'node:process';

export const createErrorStorage = () => {
  const state = {
    errors: []
  };

  return Object.freeze({
    addError: function (error) {
      state.errors = state.errors.concat(error);

      return this;
    },
    cleanErrors: function () {
      state.errors = [];
    },
    getErrors: function () {
      return state.errors;
    },
    hasError: function () {
      return state.errors.length > 0;
    },
    printErrors: function () {
      if (!this.hasError()) {
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

      return this;
    },

    storeErrors: function (errors) {
      state.errors = errors;

      return this;
    }
  });
};
