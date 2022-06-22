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
  const elLocsTable = document.querySelector(".location-table")
  elLocsTable.classList.remove(".hidden")
  const strHTML = locs.map(
    ({ id, name, lat, lng, weather, updatedAt, createdAt }) => `
      <tbody>
        <td>#${id}</td>
        <td>${name}</td>
        <td>${lat}</td>
        <td>${lng}</td>
        <td>${weather}</td>
        <td>${presentDateTime(createdAt)}</td>
        <td>${updatedAt}</td>
        <td>
          <button onclick="onGoToLoc(${lat}, ${lng})">Go</button>
        </td>
        <td>
          <button onclick="onDeleteLoc(${id})">Delete</button>
        </td>
        </tbody>
    `
  )
  elLocsTable.innerHTML = strHTML.join("")
}

function presentDateTime(date) {
  console.log(date)
  let time = new Date(parseInt(date))
  return time.toLocaleString()
}

function onGoToLoc(lat, lng) {
  console.log("go to...", lat, lng)
  mapService.panTo(lat, lng)
  mapService.addMarker({ lat: lat, lng: lng })
  onGetLocs()
  return lat, lng
}

function onDeleteLoc(id) {
  console.log("delete...", id)
  locService.deleteLoc(id)
  onGetLocs()
  return id
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log("User position is:", pos.coords)
      onGoToLoc(pos.coords.latitude, pos.coords.longitude)
      mapService.addMarker({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
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
