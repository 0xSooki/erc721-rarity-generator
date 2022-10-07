import { stdout } from 'node:process';

export class ErrorStorage {
  #errors = [];

  printErrors = () => {
    if (!this.hasError()) {
      return stdout.write('⚠️  No error stored ⚠️ \n');
    }

    this.#errors.forEach(({ keys, tokenId, validationError }) => {
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
  };

  storeErrors = (errors) => {
    this.#errors = errors;
    return this;
  };

  addError = (error) => {
    this.#errors = this.#errors.concat(error);
    return this;
  };

  getErrors = () => this.#errors;

  hasError = () => this.#errors.length > 0;

  cleanErrors = () => {
    this.#errors = [];
  };
}
