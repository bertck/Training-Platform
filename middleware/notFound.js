const notFound = (req, res) => res.status(404).send("Podana strona nie istnieje")

module.exports = notFound