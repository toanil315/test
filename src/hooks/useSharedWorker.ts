import { useEffect, useState } from 'react';

export const useSharedWorker = (worker: Function) => {
  const [sharedWorker, setSharedWorker] = useState<SharedWorker>();

  useEffect(() => {
    const url = convertHandlerToObjectUrl(worker);
    if (url) {
      const webWorker = new SharedWorker(url);
      setSharedWorker(webWorker);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [worker.toString()]);

  const convertHandlerToObjectUrl = (worker: Function) => {
    const code = worker.toString();
    if (code) {
      const blob = new Blob(['(' + code + ')()']);
      const objectUrl = URL.createObjectURL(blob);
      return objectUrl;
    }
    return null;
  };

  return sharedWorker;
};
