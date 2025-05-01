const City = require("../models/cityModel");
// Create a new city
exports.createCity = async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).send(city);
  } catch (error) {
    res.status(400).send(error);
  }
};
// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
};
// Get a single city by ID
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).send();
    }
    res.status(200).send(city);
  } catch (error) {
    res.status(500).send(error);
  }
};
// Update a city
exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!city) {
      return res.status(404).send();
    }
    res.status(200).send(city);
  } catch (error) {
    res.status(400).send(error);
  }
};
// Delete a city
exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).send();
    }
    res.status(200).send(city);
  } catch (error) {
    res.status(500).send(error);
  }
};
