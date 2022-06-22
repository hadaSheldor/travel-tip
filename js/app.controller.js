import { locService } from "./services/loc.service.js"
import { mapService } from "./services/map.service.js"

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGoToLoc = onGoToLoc
window.onDeleteLoc = onDeleteLoc

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log("Map is ready")
    })
    .catch(() => console.log("Error: cannot init map"))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log("Getting Pos")
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log("Adding a marker")
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log("Locations:", locs)
    renderLocsTable(locs)
    // document.querySelector(".locs").innerText = JSON.stringify(locs)
  })
}

function renderLocsTable(locs) {
  // ADD: loader
  const obj = {
    name: "ho",
    age: 12,
  }
  const { name, age } = obj
  const arr = [1, 2]
  const [a, b] = arr
  console.log(name)
  console.log(a, b)
  const elLocsTable = document.querySelector(".locs")
  const strHTML = locs.map(
    ({ id, name, lat, lng, weather, updatedAt, createdAt }) => `
        <table>
            <thead>
                <th>id:</th>
                <th>Name:</th>
                <th>Pos.lat:</th>
                <th>Pos.lng:</th>
                <th>Weather:</th>
                <th>Created:</th>
                <th>Updated:</th>
                <th>Go</th>
                <th>Delete</th>
            </thead>
            <tbody>
                <td>#${id}</td>
                <td>${name}</td>
                <td>${lat}</td>
                <td>${lng}</td>
                <td>${weather}</td>
                <td>${createdAt}</td>
                <td>${updatedAt}</td>
                <td>
                    <button onclick="onGoToLoc(${lat}, ${lng})">Go
                    </button>
                </td>
                <td>
                    <button onclick="onDeleteLoc(${id})">Delete
                    </button>
                </td>
            </tbody>
          </table>  
    `
  )
  elLocsTable.innerHTML = strHTML.join("")
}

function onGoToLoc(lat, lng) {
  console.log("go to...", lat, lng)
  return lat, lng
}

function onDeleteLoc(id) {
  console.log("delete...", id)
  locService.deleteLoc(id)
  return id
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log("User position is:", pos.coords)
      document.querySelector(
        ".user-pos"
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log("err!!!", err)
    })
}
function onPanTo() {
  console.log("Panning the Map")
  mapService.panTo(35.6895, 139.6917)
}
