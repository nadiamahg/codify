const Classroom = require('../models/Classroom')

getClasses = async (req, res) => {
    await Classroom.find({teacher_username: req.params.teacher_username}, (err, classrooms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!classrooms.length) {
            return res
                .status(404)
                .json({ success: false, error: `Classes not found` })
        }
        return res.status(200).json({ success: true, data: classrooms })
    }).catch(err => console.log(err))
}

module.exports = {
    getClasses
}