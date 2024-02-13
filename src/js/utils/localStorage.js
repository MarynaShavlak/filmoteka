export function setValueInLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getValueFromLocalStorage(key) {
  return localStorage.getItem(key) ?? '';
}

export function resetValueInLocalStorage(key) {
  localStorage.removeItem(key);
}
