/* Utility functions. */

// Convert a base64 string to Uint8Array.
// Must do this so the server can understand the VAPID_PUBLIC_KEY.
const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const VAPID_PUBLIC_KEY = urlB64ToUint8Array('BJvDtrL7VyLdBfx_yKq6p5wagwN9V5aPoGXD_R_wVoEQHNepGE26LTbFfoufPIb4Dofl0wyfXC2dHMYJgJOvIyM');

/* Push notification logic. */

async function registerServiceWorker() {
    navigator.serviceWorker.register('js/service-worker.js')
        .then((serviceWorker) => console.log(`Service Worker was Registered ${serviceWorker}`))
        .catch(reason => console.log(`Service Worker registration was failed with reason: ${JSON.stringify(reason)}`))
    ;
}

async function unregisterServiceWorker() {
    await navigator.serviceWorker.getRegistration()
        .then((serviceWorker) => serviceWorker.unregister().then(() => console.log(`Service Worker was Registered`)))
        .catch(reason => console.log(`Service Worker registration was failed with reason: ${JSON.stringify(reason)}`))
}

async function subscribe() {
    registerServiceWorker().then(() => {
            Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        navigator.serviceWorker.getRegistration()
                            .then(registration => {
                                    registration.showNotification(
                                        '@abatyuta Instagram Collection',
                                        {
                                            requireInteraction: true,
                                            actions: [
                                                {
                                                    action: 'add-subscription',
                                                    title: 'Subscribe',
                                                }
                                            ],
                                            data: {
                                                publicKey: VAPID_PUBLIC_KEY
                                            },
                                            icon: 'https://a.batyuta.com/media/avatar.jpg',
                                            body: 'Подпишись на обновления нажав кноку <b>Subscribe</b>'
                                        }
                                    );
                                }
                            );
                    } else {
                        unregisterServiceWorker()
                            .then(() => {
                                    alert('Notification is not allowed');
                                }
                            )
                    }
                }
            )
        }
    );
}
