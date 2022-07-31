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

export const getTimeZoneObject = (timezone: string) => {
  return new Promise((res, rej) => {
    if (!timezone) rej(new Error('Not choose timezone'));

    try {
      fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
        .then(result => result.json())
        .then(data => res(data))
        .catch(() => rej(new Error(`Error get ${timezone} timezone object`)));
    } catch (e) {
      rej(e);
    }
  });
};
