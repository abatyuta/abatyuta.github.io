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
const SERVER_URL = 'https://batyuta-web-push-server.herokuapp.com';
const HOSTNAME = 'a.batyuta.com';

/* Push notification logic. */

async function unregisterServiceWorker() {
    navigator.serviceWorker.getRegistration()
        .then(serviceWorker =>
            serviceWorker.unregister()
                .then(() =>
                    console.log(`Service Worker was Unregistered`)
                )
        )
        .catch(reason =>
            console.log(`Service Worker Unregistering was failed with reason: ${JSON.stringify(reason)}`)
        );
}

async function subscribe() {
    navigator.serviceWorker.getRegistration()
        .then(registration => {
                if (!registration) {
                    navigator.serviceWorker.register('service-worker.js')
                        .then(_registration =>
                            _subscribe(_registration)
                        )
                        .catch(reason =>
                            console.log(`Service Worker registration was failed with reason: ${JSON.stringify(reason)}`)
                        );
                } else {
                    _subscribe(registration);
                }
            }
        )
        .catch(reason =>
            console.log(`Service Worker getting was failed with reason: ${JSON.stringify(reason)}`)
        );
}

async function _subscribe(registration) {
    Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                __subscribe(registration)
                    .then(() =>
                        console.log('Notification has been subscribed')
                    );
            } else {
                unregisterServiceWorker()
                    .then(() =>
                        console.log('Notification is not allowed!')
                    );
            }
        }
    )
}

async function __subscribe(registration) {
    registration.pushManager.getSubscription().then(subscription => {
        if (!subscription) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: VAPID_PUBLIC_KEY
            }).then(subscription =>
                postToServer(SERVER_URL + '/add-subscription', {
                    data: subscription,
                    hostname: HOSTNAME
                }).then(() =>
                    console.log('Service Worker got Subscription ' + JSON.stringify(subscription))
                )
            );
        }
    });
}

function onStartUp() {
    subscribe()
        .then(() =>
            console.log('Notify to subscribe')
        );
}
