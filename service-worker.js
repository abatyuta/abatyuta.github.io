self.addEventListener('push', (event) => {
  let notification = event.data.json();
  // const options = {
  //   body: notification.options.body,
  //   icon: image
  // }
  self.registration.showNotification(
    notification.title,
    notification.options
  );
  notification = JSON.stringify(notification);
  console.log(`Service Worker got Notification ${notification}`);
});

/* Utility functions. */
async function postToServer(url, data) {
  let request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (data !== undefined) {
    request.body = JSON.stringify(data);
  }
  return await fetch(url, request);
}
