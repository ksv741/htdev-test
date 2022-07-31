export const getTimeZoneListFromApi = new Promise<string[]>((res, rej) => {
  try {
    setTimeout(() => {
      fetch('https://worldtimeapi.org/api/timezone')
        .then(result => result.json())
        .then(data => res(data))
        .catch(() => rej(new Error('Error get timezone')));
    }, 2000);
  } catch (e) {
    rej(e);
  }
});
