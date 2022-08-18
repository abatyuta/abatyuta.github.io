const SERVER_URL = 'https://batyuta-web-push-server.herokuapp.com';
const HOSTNAME = 'a.batyuta.com';

// const SERVER_URL = 'http://localhost:8080';

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
// @deprecated
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'add-subscription') {
    const publicKey = event.notification.data.publicKey;
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKey
    }).then(subscription=> postToServer(SERVER_URL + '/add-subscription', {data:subscription, hostname: HOSTNAME})
        .then(() => console.log('Service Worker got Subscription ' + JSON.stringify(subscription) )));
  }
}, false);
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
