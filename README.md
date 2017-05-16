# Pet Shop Front End

## Get started

Requirements: Node installed on your machine, I used v7.5.0.

1. clone project
2. cd into directory
1. `npm install -g grunt-cli` - install grunt cli on command line
2. `npm install` - install npm dependencies
3. `grunt develop` - builds project, opens browser with welcome page, and watches files for changes
4. Navigate to http://localhost:4000/ in your browser

Make sure you have https://github.com/sterowney/PetShopRestService running on localhost:8080

### Developing

`grunt develop` is all you need, and an editor of your choice to change the files.

### Production
`grunt build:production` will output files to `dist/` directory, copy them files, zip them up and deploy it to your webserver.
