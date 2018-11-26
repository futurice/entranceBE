
const Meeting = require('../models/meeting.model.js')

module.exports = function(app, db) {

	app.post('/meetings', (req, res) => {
		if(!req.body.host || !req.body.meeting || !req.body.room) {
			return res.status(400).send({
				message: "Meeting content can not be empty"
			});
		}

		const meeting = new Meeting({
			host: req.body.host,
			meeting: req.body.meeting,
			room: req.body.room
		});

		// Save Meeting in the database
		meeting.save()
			.then(data => {
				res.send(data);
			}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Meeting."
			});
		});

});
	app.get('/meetings', (req, res) => {
		Meeting.find()
			.then(meetings => {
				res.send(meetings);
			}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving meetings."
			});
		});
	});

	app.delete('/meetings/:id', (req, res) => {
		Meeting.findByIdAndRemove(req.params.id)
			.then(meeting => {
				if(!meeting) {
					return res.status(404).send({
						message: "Meeting not found with id " + req.params.id
					});
				}
				res.send({message: "Meeting deleted successfully!"});
			}).catch(err => {
			if(err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "Meeting not found with id " + req.params.id
				});
			}
			return res.status(500).send({
				message: "Could not delete meeting with id " + req.params.id
			});
		});
	});

};