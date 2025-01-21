# chrome-extension-auth
A Chrome extension for user authentication.
Here are the steps:


### Step 1: Add Project Files

1. **Add the following content to each file:**

- `manifest.json`:

  ```json
  {
    "manifest_version": 3,
    "name": "User Authentication Extension",
    "version": "1.0",
    "description": "A Chrome extension to authenticate users based on a unique ID.",
    "permissions": [
      "storage",
      "identity"
    ],
    "background": {
      "service_worker": "background.js"
    },
    "action": {
      "default_popup": "popup.html"
    },
    "icons": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  }
  ```

- `background.js`:

  ```javascript
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['uniqueID'], (result) => {
      if (!result.uniqueID) {
        // Generate a new unique ID
        const uniqueID = 'id-' + Math.random().toString(36).substr(2, 9);
        // Store the unique ID in local storage
        chrome.storage.local.set({ uniqueID: uniqueID }, () => {
          console.log('Unique ID generated and stored:', uniqueID);
        });
      } else {
        console.log('Unique ID already exists:', result.uniqueID);
      }
    });
  });
  ```

- `popup.html`:

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <title>User Authentication</title>
    <script src="popup.js"></script>
  </head>
  <body>
    <h1>User Authentication</h1>
    <button id="checkAuth">Check Authentication</button>
  </body>
  </html>
  ```

- `popup.js`:

  ```javascript
  document.getElementById('checkAuth').addEventListener('click', () => {
    chrome.storage.local.get(['uniqueID'], (result) => {
      const uniqueID = result.uniqueID;
      if (uniqueID) {
        // Call the API to check if the ID exists in the database
        fetch(`https://your-api.com/check-id?uniqueID=${uniqueID}`)
          .then(response => response.json())
          .then(data => {
            if (data.exists) {
              // Redirect to login page
              window.location.href = 'https://your-website.com/login';
            } else {
              // Redirect to registration page
              window.location.href = 'https://your-website.com/register';
            }
          })
          .catch(error => console.error('Error:', error));
      } else {
        console.error('Unique ID not found.');
      }
    });
  });
  ```

### Step 2: Add Icons

Don't forget to add icons for your extension. You can create `icon16.png`, `icon48.png`, and `icon128.png` or download them from an icon resource website and place them in the root directory of your project.

### Step 3: Load and Test the Extension

1. **Open Chrome and go to `chrome://extensions/`.**
2. **Enable "Developer mode" by toggling the switch in the top right corner.**
3. **Click "Load unpacked" and select the directory of your extension.**

Your Chrome extension should now be ready for testing!
