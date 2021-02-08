const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
  'Morning Up Stairs': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
  'Morning Down Stairs': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
  'Morning Parking Lot': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
  'Lunch A': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
  'Lunch B': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
  'Lunch C': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
  'Lunch D': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
  'Afternoon Up Stairs': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
  'Afternoon Down Stairs': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
  'Afternoon Parking Lot': {
    Monday: { type: String, default: '' },
    Tuesday: { type: String, default: '' },
    Wednesday: { type: String, default: '' },
    Thursday: { type: String, default: '' },
    Friday: { type: String, default: '' },
  },
});

module.exports = mongoose.model('schedule', ScheduleSchema);
