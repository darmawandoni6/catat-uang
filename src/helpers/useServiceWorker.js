import React from 'react';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

const useServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = React.useState();
  const [showReload, setShowReload] = React.useState(false);

  const onSWUpdate = React.useCallback((registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  }, []);

  const reloadPage = React.useCallback(() => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload();
  }, [waitingWorker]);

  React.useEffect(() => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
    });
  }, []);

  return { waitingWorker, showReload, reloadPage };
};

export default useServiceWorker;
