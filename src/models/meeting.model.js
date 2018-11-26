const mongoose = require('mongoose');

const MeetingSchema = mongoose.Schema({
	host: String,
	meeting: String,
	room: String,
}, {
	timestamps: true
});

module.exports = mongoose.model('Meeting', MeetingSchema);