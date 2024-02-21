const express = require('express')
const router = express.Router()

const {
    getAllActivities,
    createActivity,
    getActivity,
    updateActivity,
    deleteActivity
} = require('../controllers/activities')

router.route('/').get(getAllActivities).post(createActivity)
router.route('/:id').get(getActivity).patch(updateActivity).delete(deleteActivity)

module.exports = router