const {FBJWTClientWithSecret} = require('@ministryofjustice/fb-jwt-client-node')
class FBSubmitterClientError extends FBJWTClientWithSecret.prototype.ErrorClass {}

// endpoint urls
const endpoints = {
  submit: '/submission',
  getStatus: '/submission/:submissionId'
}

/**
 * Creates submitter client
 * @class
 */
class FBSubmitterClient extends FBJWTClientWithSecret {
  /**
   * Initialise submitter client
   *
   * @param {string} serviceSecret
   * Service secret
   *
   * @param {string} serviceToken
   * Service token
   *
   * @param {string} serviceSlug
   * Service slug
   *
   * @param {string} submitterUrl
   * Submitter microservice URL
   *
   * @return {object}
   * Submitter client
   *
   **/
  constructor (serviceSecret, serviceToken, serviceSlug, submitterUrl) {
    super(serviceSecret, serviceToken, serviceSlug, submitterUrl, FBSubmitterClientError)
  }

  /**
   * Get status of submission
   *
   * @param {string} submissionId
   * Submission ID
   *
   * @return {promise<object>}
   * Promise resolving to object containing submission status
   *
   **/
  getStatus (submissionId) {
    const urlPattern = endpoints.getStatus
    // const serviceSlug = this.serviceSlug

    return this.sendGet(urlPattern, {submissionId})
  }

  /**
   * Submit user data
   *
   * @param {string} userId
   * User ID
   *
   * @param {string} userToken
   * User token
   *
   * @param {array} submissions
   * List of output instructions
   *
   * @return {promise<undefined>}
   *
   **/
  submit (userId, userToken, submissions) {
    const urlPattern = endpoints.submit

    /* eslint-disable camelcase */
    const service_slug = this.serviceSlug
    const encrypted_user_id_and_token = this.encryptUserIdAndToken(userId, userToken)
    /* eslint-enable camelcase */

    const instructions = Object.assign({
      service_slug,
      encrypted_user_id_and_token
    }, {
      submission_details: submissions
    })

    return this.sendPost(urlPattern, {}, instructions)
      .then(() => {})
  }
}

module.exports = FBSubmitterClient
