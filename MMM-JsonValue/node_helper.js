'use strict';

/* Magic Mirror
 * Module: MMM-JsonValue
 *
 * By Chris Klinger, http://chrisklinger.de
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const fetch = require("node-fetch");
const jp = require('jsonpath');

module.exports = NodeHelper.create({

	start: function() {
		this.subscribers = {};
	},

	getData: function(instanceID) {
		//console.log("getData("+  instanceID + ")");
		var self = this;
		var requester = self.subscribers[instanceID]
		self.doCall(requester.config.apiBase, requester.config.method, requester.config.headers,  function(response) {
			self.sendSocketNotification("DATA", {instanceID: instanceID, data: self.parseData(response, requester.config.jsonPath)});
		})

		setTimeout(function() { self.getData(instanceID); }, requester.config.refreshInterval);
	},

parseData: function(data, jsonPath) {
	let str = ""
	const jsonArray = JSON.parse(JSON.stringify(data))
	for (var i = 0; i < jsonArray.length; i++){
			if (jsonArray[i].route.id === "6"){
					for (var j = 0; j < jsonArray[i].values.length; j++){
						str += (jsonArray[i].values[j].minutes )
						if (j < jsonArray[i].values.length - 1){
							str += ", "
						}
					}
			}
	}
	str += " mins"
	return str
},

	doCall: function(urlToCall, httpMethod, httpHeaders, callback) {
		var fetchOptions = { method: httpMethod, headers: httpHeaders };
		fetch(urlToCall, fetchOptions)
		    .then(res => res.json())
		    .then(json => callback(json))
		    .catch(error => console.log(error));
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		var instanceID = payload.instanceID;
		//console.log(instanceID);
		//console.log(self.subscribers);
		if (notification === 'CONFIG' && !(instanceID in self.subscribers)) {
			self.subscribers[instanceID] = {};
			self.subscribers[instanceID].config = payload;
			self.sendSocketNotification("STARTED", {instanceID: instanceID, started: true});
			self.getData(instanceID);
			self.subscribers[instanceID].started = true;
		}
	}
});
