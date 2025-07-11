// Human-like auto typer using robotjs
// How to run:
//   1. Install dependencies: npm install robotjs
//   2. Rename this file to .mjs or add "type": "module" to package.json
//   3. Run: node human_auto_type.mjs
//   4. Switch to the window where you want the text to be typed before the countdown ends.

import robot from "robotjs";

const TEXT_TO_TYPE = `#include <bits/stdc++.h>
using namespace std;
int main(){
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n,k;
    cin>>n>>k;
    vector<vector<int>> g(n+1);
    vector<int> in(n+1);
    for(int i=0;i<k;i++){
        vector<int> L(n);
        for(int j=0;j<n;j++) cin>>L[j];
        for(int j=1;j<n-1;j++){
            g[L[j]].push_back(L[j+1]);
            in[L[j+1]]++;
        }
    }
    queue<int> q;
    for(int i=1;i<=n;i++) if(in[i]==0) q.push(i);
    int cnt=0;
    while(!q.empty()){
        int u=q.front(); q.pop();
        cnt++;
        for(int v:g[u]){
            if(--in[v]==0) q.push(v);
        }
    }
    cout<<(cnt==n?"Yes":"No");
    return 0;
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
