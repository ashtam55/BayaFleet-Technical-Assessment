const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://hiashtam:pXpSWZYsd24FWVAd@wms-test-1.m37oc6h.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Mongoose Schema
const VehicleSchema = new mongoose.Schema({
  type: String,
  lock_status: Boolean,
  current_speed: Number,
  battery_level: Number,
  status: String,
  location: String,
  last_updated: { type: Date, default: Date.now }
});

// Mongoose Model
const Vehicle = mongoose.model('Vehicle', VehicleSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/vehicles', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).send('Vehicle not found');
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/vehicles/:id', async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/vehicles/:id', async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) return res.status(404).send('Vehicle not found');
    res.status(200).send('Vehicle deleted');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
