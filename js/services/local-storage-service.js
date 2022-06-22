export const storageService = {
  saveToLocalStorage,
  loadFromLocalStorage,
}

function saveToLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromLocalStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}
