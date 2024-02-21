const activitiesDOM = document.querySelector('.activities')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.activity-form')
const formAlertDOM = document.querySelector('.form-alert')
const sportDOM = document.querySelector("#sports")
const dateDOM = document.querySelector("#date")
const titleDOM = document.querySelector("#title")
const hoursDOM = document.querySelector("#hours")
const minutesDOM = document.querySelector("#minutes")
const secondsDOM = document.querySelector("#seconds")
const distanceDOM = document.querySelector("#distance")
const elevationDOM = document.querySelector("#elevation")

const showActivities = async () => {
  loadingDOM.style.display = 'block'
  try {
    const { data: { activities } } = await axios.get('/api/v1/activities')
    if (activities.length < 1) {
      activitiesDOM.innerHTML = '<h5 class="empty-list">No Activities Added</h5>'
      loadingDOM.style.display = 'none'
      return
    }
    const allActivities = activities.map((activity) => {
      const { _id: activityID, sport, date, title, time, distance, elevation } = activity
      const dateObj = new Date(date)
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const timeObj = new Date(time)
      const h = timeObj.getHours()
      const m = String(timeObj.getMinutes()).padStart(2, '0')
      const s = String(timeObj.getSeconds()).padStart(2, '0')
      return `<tr><td>${sport}</td><td>${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}</td><td>${title}</td><td>${h}:${m}:${s}</td><td>${distance} km</td><td>${elevation} m</td>
<td>
<div class="edit-link">
<a href="edit.html?id=${activityID}"  class="edit-link">Edit
</a>
</div>
<div class="del">
<button type="button" class="delete-btn" data-id="${activityID}">Delete
</button></div></td></tr>`
    })
      .join('')
    activitiesDOM.innerHTML = "<p>" + activities.length + " Activities</p>" + `<div class="activity-table"><table>
      <thead>
        <tr>
          <th class="col-type">Sport</th>
          <th class="col-date">
            Date
          </th>
          <th class="col-title">
            Title
          </th>
          <th class="col-time">
            Time
          </th>
          <th class="col-dist">
            Distance
          </th>
          <th class="col-elev">
            Elevation
          </th>
          <th class="col-actions"></th>
        </tr>
      </thead>
      <tbody>`+ allActivities +
      `</tbody>
</table></div>`;



  } catch (error) {
    activitiesDOM.innerHTML =
      '<h5 class="empty-list">Error</h5>'
  }
  loadingDOM.style.display = 'none'
}

showActivities()

activitiesDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.classList.contains('delete-btn')) {
    loadingDOM.style.display = "block"
    const id = el.dataset.id
    try {
      await axios.delete(`/api/v1/activities/${id}`)
      showActivities()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.display = "none"
})


formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()

  const sport = sportDOM.value
  const date = dateDOM.value
  const title = titleDOM.value
  const hours = hoursDOM.value
  const minutes = minutesDOM.value
  const seconds = secondsDOM.value
  const distance = parseFloat(distanceDOM.value)
  const elevation = parseFloat(elevationDOM.value)

  let time = new Date()
  time.setHours(hours, minutes, seconds)
  time = time.toISOString()

  try {
    await axios.post('/api/v1/activities', { sport, date, title, time, distance, elevation })
    showActivities()
    sportDOM.value = ''
    dateDOM.value = ''
    titleDOM.value = ''
    hoursDOM.value = ''
    minutesDOM.value = ''
    secondsDOM.value = ''
    distanceDOM.value = ''
    elevationDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `Successfully added a new acctivity`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Encountered an error`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
