export function setToLS(key: string, value: any) {
  if (!key || !value) return;

  const state = getFromLS('htdev-test') || {};
  state[key] = value;

  localStorage.setItem('htdev-test', JSON.stringify(state));
}

export function getFromLS(key: string): any {
  if (!key) return;

  const fromLS = localStorage.getItem('htdev-test');
  if (!fromLS) return;

  // eslint-disable-next-line consistent-return
  return JSON.parse(fromLS)[key];
}
