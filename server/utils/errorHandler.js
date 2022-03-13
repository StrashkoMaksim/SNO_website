const {validationResult} = require("express-validator");
exports.errorHandler = (err, res, next) => {
    if (err.status) {
        res.status(err.status).json({ message: err.message })
    } else {
        console.error(err)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' })
    }
    if (next) {
        next(err)
    }
}

exports.errorValidator = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg
        })
    }
}