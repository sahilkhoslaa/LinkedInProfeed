# LinkedIn Profeed

This Chrome extension helps you customize your LinkedIn feed by hiding posts that are not relevant to your interests. You can define specific tags, and any post containing those tags in its content will be automatically hidden, providing you with a cleaner, more focused browsing experience.

## What it Does

The **LinkedIn ProFeed** extension operates directly within your browser to filter out unwanted content from your LinkedIn feed. It's a client-side tool, meaning all processing happens locally on your computer, and it does not collect or transmit any of your personal data.

## Features

* **Tag-Based Filtering:** Define a list of keywords or phrases (tags) that, if found in a LinkedIn post, will cause that post to be hidden.

* **Real-time Hiding:** Posts are hidden as they load, including dynamically loaded content as you scroll through your feed.

* **Persistent Settings:** Your defined tags are saved locally in your browser's storage and will persist across browser sessions.

* **One-time Acknowledgment:** The first time you open the extension's popup, you'll see an acknowledgment message. Once accepted, this message will not reappear.

## How to Install

Follow these steps to install the extension in your Chrome browser:

1.  **Download the Extension Files:**

    * Create a new folder on your computer (e.g., `LinkedIn_ProFeed`).

    * Save the following four files into this folder:

        * `manifest.json`
        * `popup.html`
        * `popup.js`
        * `content.js`

    * Inside the `LinkedIn_ProFeed` folder, create another subfolder named `icons`.

    * Place three placeholder image files (e.g., `icon16.png`, `icon48.png`, `icon128.png`) into the `icons` subfolder. These can be any small PNG images for now.

2.  **Open Chrome Extensions Page:**

    * Open your Google Chrome browser.

    * Type `chrome://extensions` into the address bar and press `Enter`.

3.  **Enable Developer Mode:**

    * On the Extensions page, locate the "Developer mode" toggle switch in the top right corner.

    * Click the toggle to turn it **On**.

4.  **Load the Extension:**

    * Click the "Load unpacked" button that appears after enabling Developer mode.

    * A file dialog will open. Navigate to and select the `LinkedIn_ProFeed` folder you created in Step 1.

    * Click "Select Folder" (or "Open" depending on your OS).

5.  **Verify Installation:**

    * The "LinkedIn ProFeed" extension should now appear in your list of installed extensions.

    * (Optional) To easily access the extension, click the puzzle piece icon (Extensions icon) in your Chrome toolbar. Find "LinkedIn ProFeed" in the dropdown list and click the pin icon next to it. This will make the extension's icon visible in your toolbar.

## How to Use

Once installed, using the extension is straightforward:

1.  **Open the Extension Popup:**

    * Click the "LinkedIn ProFeed" icon in your Chrome toolbar. This will open a small popup window.

2.  **Acknowledge Terms (First Time Only):**

    * The very first time you open the popup, you will see an "Important Acknowledgment" message.

    * Read the acknowledgment.

    * Check the "I understand and agree" checkbox.

    * The "Continue" button will become active. Click it to proceed. This acknowledgment will not appear on subsequent openings of the popup.

3.  **Enter Your Tags:**

    * In the text area provided, enter the keywords or phrases you want to hide.

    * **Separate each tag with a comma** (e.g., `hiring, job search, sales, marketing, recruitment`).

    * You can add as many tags as you like.

4.  **Save Your Tags:**

    * Click the "Save Tags" button.

    * You will see a "Tags saved!" message briefly appear, confirming your settings have been stored.

5.  **Browse LinkedIn:**

    * Navigate to `linkedin.com` in a new or existing tab. Ensure you are logged into your LinkedIn account.

    * Scroll through your LinkedIn feed. The extension will automatically hide any posts that contain the tags you've specified. You might notice gaps in your feed where posts would normally appear, or simply a less cluttered view.

6.  **Update Tags:**

    * To change your hidden tags, simply open the extension popup again, modify the text in the input field, and click "Save Tags." The changes will take effect immediately on your LinkedIn feed (you might need to refresh the page or scroll to load new content for the changes to apply to all posts).

Enjoy a more focused and relevant LinkedIn experience!
