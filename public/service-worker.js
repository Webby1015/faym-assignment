
self.addEventListener('install', event => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {
  console.log('Service Worker received message:', event.data);

  fetch('http://localhost:5001/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event.data)
  })
    .then(response => {
      if (!response.ok) {
        console.error('Failed to send event to backend');
      } else {
        console.log('Event sent successfully');
      }
    })
    .catch(err => {
      console.error('Error sending event to backend:', err);
    });
});
