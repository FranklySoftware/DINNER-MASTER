### Getting started: Cognitive Dinner
1. Download, install and run the data scraping script.

2. Make sure you have the database running and you have the correct
   credentials in the .env (url with username + password)

3. Cd into the root of the project and run:
	"npm install"  AND  "bower install"

4. To start the dev environment use "npm run dev"
	This compliles ES6 on the fly using the .babelrc file

5. If you are editing css you will need to run "npm run watch-css"
	This runs Stylus watch

6. To build the production environment use "npm run build"
	This compiles the src folder to a new dist directory ready for a production server
	Use "npm run start" to use new environment

7. Path /registerGuest runs the tool which supports "Guest" input, Watson analysis and saving everything in MongoDB.
    The /dinnerGuest path renders the guest page with some more crunching in the personality module.

example:http://events.havas.com/dinnerGuest/Sami_Viitamaki_4qdo7h0em
---------
