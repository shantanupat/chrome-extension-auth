# chrome-extension-auth
A Chrome extension for user authentication.
I'm unable to directly create a new project in your GitHub account. However, I can guide you through the process of creating a new repository for your Chrome extension project. Here are the steps:

### Step 1: Create a New Repository

1. **Log in to GitHub:** Go to [GitHub](https://github.com) and log in with your account.

2. **New Repository:**
   - Click on the `+` icon in the top right corner of the page.
   - Select `New repository`.

3. **Repository Details:**
   - **Repository Name:** Enter a name for your project, e.g., `chrome-extension-auth`.
   - **Description:** Optionally, add a description, e.g., `A Chrome extension for user authentication`.
   - **Public/Private:** Choose whether you want the repository to be public or private.
   - **Initialize Repository:** Check the box to initialize the repository with a README file.

4. **Create Repository:** Click the `Create repository` button.

### Step 2: Clone the Repository Locally

1. **Clone the Repository:**
   - Open a terminal or command prompt.
   - Clone the repository using the following command (replace `YOUR_USERNAME` with your GitHub username):

     ```sh
     git clone https://github.com/YOUR_USERNAME/chrome-extension-auth.git
     ```

2. **Navigate to the Project Directory:**

   ```sh
   cd chrome-extension-auth
   ```

### Step 3: Add Project Files

1. **Create the project structure:**

   ```sh
   mkdir chrome-extension-auth
   cd chrome-extension-auth
   touch manifest.json background.js popup.html popup.js
   ```

2. **Add the following content to each file:**

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

### Step 4: Commit and Push the Changes

1. **Commit the changes:**

   ```sh
   git add .
   git commit -m "Initial commit - Added Chrome extension files"
   ```

2. **Push the changes to GitHub:**

   ```sh
   git push origin main
   ```

### Step 5: Add Icons

Don't forget to add icons for your extension. You can create `icon16.png`, `icon48.png`, and `icon128.png` or download them from an icon resource website and place them in the root directory of your project.

### Step 6: Load and Test the Extension

1. **Open Chrome and go to `chrome://extensions/`.**
2. **Enable "Developer mode" by toggling the switch in the top right corner.**
3. **Click "Load unpacked" and select the directory of your extension.**

Your Chrome extension should now be ready for testing!
