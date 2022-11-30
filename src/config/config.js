/**
 * Application configuration settings
 * Not set by user, imported from env
 */

import { writable } from 'svelte/store'

// export const Configuration = writable({
//   exhibitsIndexDomain: ELASTIC_SERVER_EXHIBITS,
//   exhibitsIndexName: ELASTIC_INDEX_EXHIBITS, 
//   repositoryIndexDomain : ELASTIC_SERVER_REPOSITORY,
//   repositoryIndexName : ELASTIC_INDEX_REPOSITORY,
//   externalIIIFManifestUrl: EXTERNAL_IIIF_MANIFEST_URL,
//   repositoryDomain : REPOSITORY_DOMAIN
// })

export const Configuration = {
  exhibitsIndexDomain: ELASTIC_SERVER_EXHIBITS,
  exhibitsIndexName: ELASTIC_INDEX_EXHIBITS, 
  repositoryIndexDomain : ELASTIC_SERVER_REPOSITORY,
  repositoryIndexName : ELASTIC_INDEX_REPOSITORY,
  externalIIIFManifestUrl: EXTERNAL_IIIF_MANIFEST_URL,
  repositoryDomain : REPOSITORY_DOMAIN
}

