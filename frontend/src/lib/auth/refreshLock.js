export const createRefreshLock = (runner) => {
  let inFlight = null;

  const run = async () => {
    if (!inFlight) {
      inFlight = Promise.resolve()
        .then(() => runner())
        .finally(() => {
          inFlight = null;
        });
    }
    return inFlight;
  };

  const isRunning = () => Boolean(inFlight);

  return { run, isRunning };
};

