const Activity = require('../models/Activity')
const asyncWrapper = require('../middleware/asyncWrapper')

const getAllActivities = asyncWrapper(async (req, res) => {
    const activities = await Activity.find({})
    res.status(200).json({ activities })
})

const createActivity = asyncWrapper(async (req, res) => {
    const activity = await Activity.create(req.body)
    res.status(201).json({ activity })
})

const getActivity = asyncWrapper(async (req, res) => {
    const { id: activityID } = req.params
    const activity = await Activity.findOne({ _id: activityID })
    if (!activity) {
        return res.status(404).json({ msg: `Nie znaleziono aktywności z ID = ${activityID}` })
    }
    res.status(200).json({ activity })
})

const updateActivity = asyncWrapper(async (req, res) => {
    const { id: activityID } = req.params
    const activity = await Activity.findByIdAndUpdate({ _id: activityID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!activity) {
        return res.status(404).json({ msg: `Nie znaleziono aktywności z ID = ${activityID}` })
    }
    res.status(200).json({ activity })
})

const deleteActivity = asyncWrapper(async (req, res) => {
    const { id: activityID } = req.params
    const activity = await Activity.findOneAndDelete({ _id: activityID })
    if (!activity) {
        return res.status(404).json({ msg: `Nie znaleziono aktywności z ID = ${activityID}` })
    }
    res.status(200).json({ activity })
})

module.exports = {
    getAllActivities,
    createActivity,
    getActivity,
    updateActivity,
    deleteActivity
}