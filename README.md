# exhibits-frontend

## Deploy App

### Local environment

0. Configure external services:

cantaloupe image server

exhibits backend elastic index

1. Clone repo: https://github.com/dulibrarytech/exhibits-frontend

2. cd into project folder

3. run 'npm i'

4. Set environment variables

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

http.port = {8182 or cantaloupe port}
(or if ssl) https.port = 

delegate_script.enabled = true
delegate_script.pathname = delegates.rb

source.static = FilesystemSource

FilesystemSource.BasicLookupStrategy.path_prefix = {path/to/exhibits/app}/client/public/storage/

FilesystemCache.pathname = /var/cache/{cache location}

#### delegates script

copy 'delegates.rb' file into cantaloupe root folder (replace if existing file)

#### start_server.sh

Update with Cantaloupe path

## App Configuration 

### Environment variables

.env - see 'env-sample' file

NODE_ENV={development|production}
NODE_PORT={node port of app}
EXHIBITS_INDEX_DOMAIN={domain of exhibits app elastic server}
EXHIBITS_INDEX_NAME={name of elastic index}
REPOSITORY_DOMAIN={repository domain e.g.: "https://digital-repository.domain.edu/"}
REPOSITORY_DATASTREAM_ENDPOINT={datastream url for repository item e.g.: 'item/{item_id}/datastream/{datastream_id}'}
REPOSITORY_THUMBNAIL_DATASTREAM_ENDPOINT={thumbnail datastream url for repository item e.g.: 'item/{item_id}/datastream/thumbnail'}
REPOSITORY_ITEM_DATA_ENDPOINT={data url for repository items. Insert item id as '{item_id}' e.g.: '/data/{item_id}'}
IIIF_MANIFEST_URL={iiif manifest url. e.g.: 'https://iiif.manifest.server/{item_id}/manifest'}
IIIF_IMAGE_SERVER_URL={url to image tile server (for zoomable large images)}
RESOURCE_LOCATION={location of local storage for media files. this folder must be located in the /public folder}

### Settings

settings.js

### User Templates

#### Exhibit Templates

#### Hero Banners

'banner_1': hero image with title/subtitle overlay, description text block appears below hero image
'banner_2': hero image has no text overlay, title/subtitle and description appear below the hero image


