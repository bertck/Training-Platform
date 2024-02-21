const idDOM = document.querySelector('.activity-id')
const sportDOM = document.querySelector("#sports")
const dateDOM = document.querySelector("#date")
const titleDOM = document.querySelector("#title")
const hoursDOM = document.querySelector("#hours")
const minutesDOM = document.querySelector("#minutes")
const secondsDOM = document.querySelector("#seconds")
const distanceDOM = document.querySelector("#distance")
const elevationDOM = document.querySelector("#elevation")
const editFormDOM = document.querySelector('.single-activity-form')
const editBtnDOM = document.querySelector('.activity-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showActivity = async () => {
  try {
    const {
      data: { activity },
    } = await axios.get(`/api/v1/activities/${id}`)
    const { _id: activityID, sport, date, title, time, distance, elevation } = activity

    const dateObj = new Date(date)
    const fullYear = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    const duration = new Date(time)

    idDOM.textContent = activityID
    sportDOM.value = sport
    dateDOM.value = `${fullYear}-${month}-${day}`
    titleDOM.value = title
    hoursDOM.value = duration.getHours()
    minutesDOM.value = duration.getMinutes()
    secondsDOM.value = duration.getSeconds()
    distanceDOM.value = distance
    elevationDOM.value = elevation

  } catch (error) {
    console.log(error)
  }
}

showActivity()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const sportValue = sportDOM.value
    const dateValue = dateDOM.value
    const titleValue = titleDOM.value
    const hoursValue = hoursDOM.value
    const minutesValue = minutesDOM.value
    const secondsValue = secondsDOM.value
    const distanceValue = parseFloat(distanceDOM.value)
    const elevationValue = parseFloat(elevationDOM.value)

    let timeValue = new Date()
    timeValue.setHours(hoursValue, minutesValue, secondsValue)
    timeValue = timeValue.toISOString()

    await axios.patch(`/api/v1/activities/${id}`, {
      sport: sportValue,
      date: dateValue,
      title: titleValue,
      time: timeValue,
      distance: distanceValue,
      elevation: elevationValue
    })

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `Successfully edited an activity`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Encountered an error`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
