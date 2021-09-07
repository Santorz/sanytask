export const setIntervalAsync = (fn, ms) => {
  fn().then(() => {
    setTimeout(() => setIntervalAsync(fn, ms), ms);
    clearTimeout(setIntervalAsync);
  });
};
