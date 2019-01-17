const mongoose = require('mongoose');

const MeetingSchema = mongoose.Schema({
	host: String,
	phone: String,
	meeting: String,
	room: String,
	date: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Meeting', MeetingSchema);