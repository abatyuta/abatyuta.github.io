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
const SERVER_URL = 'https://batyuta-web-push-server.herokuapp.com';
const HOSTNAME = 'a.batyuta.com';

/* Push notification logic. */

async function registerServiceWorker() {
    return navigator.serviceWorker.register('service-worker.js')
        .then((serviceWorker) =>
            console.log(`Service Worker was Registered ${serviceWorker}`)
        )
        .catch(reason =>
            console.log(`Service Worker registration was failed with reason: ${JSON.stringify(reason)}`)
        );
}

async function getRegistration() {
    return navigator.serviceWorker.getRegistration();
}

async function unregisterServiceWorker() {
    getRegistration()
        .then((serviceWorker) =>
            serviceWorker.unregister()
                .then(() =>
                    console.log(`Service Worker was Registered`)
                )
        )
        .catch(reason =>
            console.log(`Service Worker registration was failed with reason: ${JSON.stringify(reason)}`)
        );
}

async function subscribe() {
    getRegistration().then(registration => {
        if (!registration) {
            registerServiceWorker()
                .then(_registration =>
                    _subscribe(_registration)
                );
        } else {
            _subscribe(registration);
        }
    });
}

function _subscribe(registration) {
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

onStartUp();