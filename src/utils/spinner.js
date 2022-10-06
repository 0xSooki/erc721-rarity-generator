const cliSpinners = require('cli-spinners');
const { stdout } = require('process');

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

module.exports = { createSpinner };
