// DO YOUR MAGIC
const express = require("express")
const Car = require("./cars-model")
const mw = require("./cars-middleware")

const router = express.Router()

router.get("/", (req, res) => {
    Car.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err =>{
            console.log(err)
        })
})

router.get("/:id", mw.checkCarId, (req, res) => {
    Car.getById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err =>{
            console.log(err)
        })
})

router.post("/", 
 mw.checkCarPayload, 
 mw.checkVinNumberValid, 
 mw.checkVinNumberUnique,
 (req, res) => {
    Car.create(req.body)
        .then(newCar => {
            res.status(201).json(newCar)
        })
        .catch(err =>{
            res.status(500).json({ message: err.message })
        })
})

module.exports = router