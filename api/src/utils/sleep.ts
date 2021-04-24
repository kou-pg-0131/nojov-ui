export default async (
  miliSeconds: number,
  timeout: (callback: () => void, miliSeconds: number) => void = setTimeout,
): Promise<void> => {
  return new Promise(resolve => {
    timeout(() => {
      resolve();
    }, miliSeconds);
  });
};
