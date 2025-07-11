# humanLike-autoType

A Node.js script that types out a block of text in a human-like manner using [robotjs](https://github.com/octalmage/robotjs). Useful for simulating human typing in any application window.

## Features
- Types text with random delays to mimic human typing
- Handles newlines and indentation
- Easy to configure the text to be typed

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [robotjs](https://github.com/octalmage/robotjs) (installed automatically with npm)
- **Note:** `robotjs` may require additional build tools on your system. See [robotjs installation docs](https://github.com/octalmage/robotjs#installation) if you encounter issues.

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/nileXrana/humanLike-autoType.git
   cd humanLike-autoType
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage
1. **Configure the text to type:**
   - Edit the `TEXT_TO_TYPE` variable in `human_auto_type.js` to your desired text.

2. **Run the script:**
   ```bash
   node human_auto_type.js
   ```
   - The script will display a countdown (default: 5 seconds).
   - **Quickly switch to the window** where you want the text to be typed before the countdown ends.

3. **Watch as the text is typed out automatically!**

## Customization
- **Change the delay:** Modify `START_DELAY_SECONDS` in `human_auto_type.js` for a longer or shorter countdown.
- **Change typing speed:** Adjust the delay values in the `humanType` function for faster or slower typing.

## Troubleshooting
- **robotjs install errors:**
  - On macOS, you may need to run:
    ```bash
    xcode-select --install
    ```
  - On Windows, install [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) if you encounter build errors.
- **Nothing is typed:**
  - Make sure the target window is focused before the countdown ends.
  - Some applications may block simulated keystrokes for security reasons.

## License
MIT LICENSE
