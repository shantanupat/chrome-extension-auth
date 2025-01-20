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