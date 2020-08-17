import { updateAvailable } from './store'

if ('serviceWorker' in navigator) {
    if (process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                registration.addEventListener('updatefound', () => {
                    const worker = registration.installing
                    worker.addEventListener('statechange', () => {
                        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('[Service Worker] Update found')
                            updateAvailable.set(true)
                        }
                    })
                })
            })
    } else {
        navigator.serviceWorker.getRegistrations()
            .then((registrations) => {
                registrations.forEach((registration) => {
                    registration.unregister()
                })
                return registrations.length
            }).then((len) => {
                len > 0 && location.reload()
            })
    }
}
