/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				timeFormat: 12,
			}
		},
		{
			module: "weather",
			position: "bottom_left",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "San Francisco",
				timeFormat: 12,
				locationID: "5391959", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "9cd1a1a744ebe8b9b556ca9ba5cb4cc2",
				tempUnits: "imperial"
			}
		},
		{
			module: "MMM-JsonValue",
			position: "top_right",
			config: {
				apiBase: 'https://webservices.umoiq.com/api/pub/v1/agencies/sfmta-cis/stopcodes/13225/predictions?key=0be8ebd0284ce712a63f29dcaf7798c4',
				method: "GET",
		
				title: "Inbound - 9th Ave & Noriega St", // Widget Title, set to null if not needed
				icon: null, // Font Awesome icon, displayed before any text, set to null if not needed
				prefix: "6 Haight/Parnassus: ", // Text displayed before the value, can be a blank String ""
				suffix: "", // Text displayed after the value, can be a blank String ""		
				refreshInterval: 1000 * 60, // refresh every minute
				//skipPadding: true, // yo can un-comment this line if you want to display a related value below; using a second instance.
			}
		 },
		 {
			module: "MMM-JsonValue",
			position: "bottom_right",
			config: {
				apiBase: 'https://webservices.umoiq.com/api/pub/v1/agencies/sfmta-cis/stopcodes/15669/predictions?key=0be8ebd0284ce712a63f29dcaf7798c4',
				method: "GET",
		
				title: "Outbound - Market St & Drumm St", // Widget Title, set to null if not needed
				icon: null, // Font Awesome icon, displayed before any text, set to null if not needed
				prefix: "6 Haight/Parnassus: ", // Text displayed before the value, can be a blank String ""
				suffix: "", // Text displayed after the value, can be a blank String ""		
				refreshInterval: 1000 * 60, // refresh every minute
				//skipPadding: true, // yo can un-comment this line if you want to display a related value below; using a second instance.
			}
		 },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
