// Human-like auto typer using robotjs
// How to run:
//   1. Install dependencies: npm install robotjs
//   2. Rename this file to .mjs or add "type": "module" to package.json
//   3. Run: node human_auto_type.mjs
//   4. Switch to the window where you want the text to be typed before the countdown ends.

import robot from "robotjs";

const TEXT_TO_TYPE = `write your text here !`;

const START_DELAY_SECONDS = 5;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function humanType(text) {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '\n') {
      robot.keyTap("enter");
      await sleep(50);

      if (i + 1 < text.length && (text[i + 1] === ' ' || text[i + 1] === '\t')) {
        robot.keyTap("home");
        await sleep(20);
      }

      await sleep(30);
    } else {
      robot.typeString(char);

      let delay;
      if (char === ' ' || char === '\t') {
        delay = randomBetween(20, 50);
      } else {
        delay = randomBetween(50, 80);
      }

      if (',.;:!?{}()[]'.includes(char)) {
        delay += randomBetween(50, 80);
      }

      await sleep(delay);
    }
  }
}

(async () => {
  console.log(`Switch to your target window. Typing will start in ${START_DELAY_SECONDS} seconds...`);
  await sleep(START_DELAY_SECONDS * 1000);
  await humanType(TEXT_TO_TYPE);
})();
