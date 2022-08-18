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
