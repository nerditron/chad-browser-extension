# Chad Browser Extension

![Chad Logo](src/chad_logo.png)

The Chad Browser Extension helps you catch far-left, woke language in your writing directly within your browser. Built as a fork of the [alex-browser-extension](https://github.com/Skn0tt/alex-browser-extension), Chad does the opposite of [alex](https://github.com/get-alex/alex). In other words, Chad flags terms and phrases associated with political correctness, communism, or overly progressive rhetoric, as defined by its underlying [retext-anti-woke](https://github.com/bbusenius/retext-anti-woke) rules. Whether you're drafting an email, posting on social media, or writing a blog, Chad provides real-time feedback to keep your language sharp and unfiltered.

## Privacy

Chad processes all text locally within your browser. No data is sent to external servers, ensuring your writing remains private and secure.

## Configuration Options

Chad allows customization through its options page. You can access it by clicking the Chad icon in your browser toolbar. The following settings are available:

- **No Binary Terms (`noBinary`)**: When enabled, flags terms that enforce binary gender assumptions (e.g., "men", "women") if you prefer to avoid them. Default: `false`.
- **Allow (`allow`)**: A comma-separated list of words or phrases to exclude from flagging, even if they match Chad’s rules. Example: `privilege, freedom`.
- **Deny (`deny`)**: A comma-separated list of words or phrases to always flag, overriding any allow rules. Example: `social-justice, woke`.

These options are saved via Chrome’s sync storage, so your preferences persist across devices when signed in.

## Building and Installing Locally

To try Chad during development or customize it yourself:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nerditron/chad-browser-extension.git
   cd chad-browser-extension
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Build the Extension**:
   ```bash
    make build
   ```
4. **Load in Chrome*:
  - Open Chrome and navigate to `chrome://extensions/`.
  - Enable "Developer mode" in the top right.
  - Click "Load unpacked" and select the src directory from this project.
5. **Load in Firefox*:
  - Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
  - Click "Load Temporary Add-on" and select the `src/manifest.json` file.

After loading, the Chad icon will appear in your toolbar, and it will begin analyzing text in input fields and textareas across websites.
