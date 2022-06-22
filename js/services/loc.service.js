export const locService = {
  getLocs,
  addNewLoc,
  deleteLoc,
}
import { storageService } from "./local-storage-service.js"

const LOC_KEY = "locsDB"
const locs =
  storageService.loadFromLocalStorage(LOC_KEY) ||
  [
    //   { name: "Greatplace", lat: 32.047104, lng: 34.832384 },
    //   { name: "Neveragain", lat: 32.047201, lng: 34.832581 },
  ]

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}

function addNewLoc(newLoc) {
  const location = {
    id: _getRandomIntInclusive(1, 999),
    name: newLoc.name,
    lat: newLoc.lat,
    lng: newLoc.lng,
    weather: "",
    createdAt: Date.now(),
    updatedAt: "",
  }
  locs.push(location)
  storageService.saveToLocalStorage(LOC_KEY, locs)
  console.log(locs)
}

function deleteLoc(id) {
  const locForDelete = locs.map((loc) => {
    loc.id === id
  })
  locs.splice(locForDelete, 1)
  storageService.saveToLocalStorage(LOC_KEY, locs)
  return
}

function _getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}
