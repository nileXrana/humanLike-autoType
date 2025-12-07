// Human-like auto typer using robotjs
// How to run:
//   1. Install dependencies: npm install robotjs
//   2. Rename this file to .mjs or add "type": "module" to package.json
//   3. Run: node human_auto_type.mjs
//   4. Switch to the window where you want the text to be typed before the countdown ends.

import robot from "robotjs";

const TEXT_TO_TYPE = `#include <bits/stdc++.h>
using namespace std;

vector<long long> solution(int rows, int cols, vector<vector<int>> black) {
    unordered_map<long long,int> cnt;
    cnt.reserve(black.size()*4 + 10);
    for (auto &b : black) {
        int r = b[0], c = b[1];
        for (int dr = -1; dr <= 0; ++dr)
            for (int dc = -1; dc <= 0; ++dc) {
                int ur = r + dr, uc = c + dc;
                if (ur < 0 || uc < 0 || ur >= rows-1 || uc >= cols-1) continue;
                long long key = (long long)ur * cols + uc;
                ++cnt[key];
            }
    }

    vector<long long> ans(5, 0);
    for (auto &p : cnt) {
        int k = p.second; // number of black cells in that 2x2
        if (k >= 1 && k <= 4) ans[k]++;
    }
    long long total = (long long)(rows - 1) * (cols - 1);
    long long sum = ans[1] + ans[2] + ans[3] + ans[4];
    ans[0] = total - sum;
    return ans;
}

`;

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
        delay = randomBetween(200, 400);
      } else {
        delay = randomBetween(300, 600);
      }

      if (',.;:!?{}()[]'.includes(char)) {
        delay += randomBetween(200, 400);
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
