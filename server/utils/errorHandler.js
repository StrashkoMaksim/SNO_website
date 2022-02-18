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