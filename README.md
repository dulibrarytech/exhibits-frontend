# exhibits-frontend

## Deploy App

### Local environment

0. Configure external services:

cantaloupe image server

exhibits backend elastic index

1. Clone repo: https://github.com/dulibrarytech/exhibits-frontend

2. cd into project folder

3. run 'npm i'

4. Set cantaloupe server url in exhibits app .env file

See .env_sample or App Configuration > Environment Variables section below for required fields

Create .env file in project root, add fields

5. run 'npm build'

6. run startup script: 'sh start_app.sh'

### Run app on included dev server:

From command line run 'npm run dev'

## External Services

### Cantaloupe Image Server

cantaloupe v5.0.4

#### cantaloupe.properties

##### activate the delegate script

delegate_script.enabled = true

##### fallback for image source (if needed)
source.static = FilesystemSource

FilesystemSource.BasicLookupStrategy.path_prefix = "{path/to/exhibits/app}/client/public/storage/"

#### delegates.rb script

copy 'delegates.rb' file into cantaloupe root folder (replace if existing file)

OR implement the delegates.rb hook functions per the included delegates.rb script

1. source()

2. filesystemsource_pathname()

#### start_server.sh

Update with Cantaloupe path

## App Configuration 

### Environment variables

.env - see 'env-sample' file

NODE_ENV={development|production}
NODE_PORT={node port of app}
EXHIBITS_API_KEY={hash string}
EXHIBITS_API_DOMAIN="http://localhost:5678/api/v1"
EXHIBITS_IIIF_IMAGE_SERVER_URL={url to image tile server (for zoomable large images)}
REPOSITORY_DOMAIN={digitaldu repository domain e.g.: "https://digital-repository.domain.edu/"} 
REPOSITORY_API_KEY={digitaldu repository api key}
REPOSITORY_IIIF_SERVER_URL={path to digitaldu repository iiif server}
RESOURCE_LOCATION={location of local storage for media files. this folder must be located in the /public folder}
RESOURCE_SERVER_URL={TODO if calling this directly from client, include here}

### Settings

settings.js

### User Templates

#### Exhibit Templates

#### Hero Banners

'banner_1': hero image with title/subtitle overlay, description text block appears below hero image
'banner_2': hero image has no text overlay, title/subtitle and description appear below the hero image


