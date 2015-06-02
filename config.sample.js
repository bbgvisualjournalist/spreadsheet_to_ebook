var config = {}

//The published google spreadsheet with the data.
config.spreadsheet = 'https://docs.google.com/spreadsheets/d/1dXbUkXlGb8GyVMdKpuJB__82MAI6-VWqhzcvq2A3rYY/pubhtml';

//List each sheet from the spreadsheet.
config.sheet = ['meta', 'titlepage', 'chapters', 'photos'];

//Change for local v. production
config.port = process.env.PORT || '8080';

//Timer for how often to update the JSON data
//20000 = 20 seconds; 60000 = 1 minute ; 300000 = 5 minutes
config.timer = 60000;

config.offline = false;

module.exports = config;