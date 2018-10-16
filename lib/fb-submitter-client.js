const FBJWTClient = require('@ministryofjustice/fb-jwt-client-node')
class FBSubmitterClientError extends FBJWTClient.prototype.ErrorClass {}

// endpoint urls
const endpoints = {
  submit: '/submission',
  getStatus: '/submission/:submissionId'
}

/**
 * Creates submitter client
 * @class
 */
class FBSubmitterClient extends FBJWTClient {
  /**
   * Initialise submitter client
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
   *
   **/
  constructor (serviceToken, serviceSlug, submitterUrl) {
    super(serviceToken, serviceSlug, submitterUrl, FBSubmitterClientError)
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
   * Encrypt user ID and token using service token
   *
   * @param {string} userId
   * User ID
   *
   * @param {string} userToken
   * User token
   *
   * @return {string}
   *
   **/
  encryptUserIdAndToken (userId, userToken) {
    const serviceToken = this.serviceToken
    return this.encrypt(serviceToken, {userId, userToken})
  }

  /**
   * Decrypt user ID and token using service token
   *
   * @param {string} encryptedData
   * Encrypted user ID and token
   *
   * @return {object}
   *
   **/
  decryptUserIdAndToken (encryptedData) {
    const serviceToken = this.serviceToken
    return this.decrypt(serviceToken, encryptedData)
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
      submissions
    })

    return this.sendPost(urlPattern, {}, instructions)
      .then(() => {})
  }
}

module.exports = FBSubmitterClient
