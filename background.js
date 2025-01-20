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