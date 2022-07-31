export function saveToLS(key: string, value: any) {
  if (!key || value == null) return;

  const state = getFromLS('') || {};
  state[key] = value;

  localStorage.setItem('htdev-test', JSON.stringify(state));
}

export function getFromLS(key: string): any {
  if (key == null) return;

  const fromLS = localStorage.getItem('htdev-test');
  if (!fromLS) return;

  // eslint-disable-next-line consistent-return
  if (key === '') return JSON.parse(fromLS);
  // eslint-disable-next-line consistent-return
  return JSON.parse(fromLS)[key];
}
