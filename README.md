# Form Builder Submitter client (Node)

Client for making requests to Form Builder platform submitter endpoints

## Requirements

Node

## Installation

`npm install @ministryofjustice/fb-submitter-client-node`

## Usage

### Loading and initialising

``` javascript
// load client
const FBSubmitterClient = require('@ministryofjustice/fb-submitter-client-node')

// initialise client
const submitterClient = new FBSubmitterClient(serviceToken, submitterUrl, serviceSlug)
```

### Fetching and storing

``` javascript
// get submission status
const status = await submitterClient.getStatus(submissionId)

// submit 
const status = await submitterClient.submit(userId, userToken, submissions)
```

