import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token = localStorage.getItem("token");

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Registers a user and stores the token on the JoblyApi class and then returns that token*/

  static async register(userData){
    let res = await this.request('auth/register', userData, 'post');
    JoblyApi.token = res.token;
    return res.token;
  }

  /** Logs a user in and stores the token on the JoblyApi class and then returns that token*/

  static async authenticate(userData){
    console.log(userData)
    let res = await this.request('auth/authenticate', userData, 'post');
    JoblyApi.token = res.token;
    return res.token;
  }
  /** Gets all companies */

  static async getAllCompanies(filter={}) {
    let res = await this.request(`companies`, filter);
    return res.companies;
  }

   /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Gets all jobs */

  static async getAllJobs(filter={}) {
    let res = await this.request(`jobs`, filter);
    return res.jobs;
  }

  /** Apply to a job */

  static async apply(username, jobId){
    console.log(username, jobId)
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
    return res.applied;
  }

  /**  Gets and returns a user based on their username. Mainly used to get the current user */
  static async getUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Takes an object and username and then updates that user with the data */
  static async updateUser(username, data){
    let res = await this.request(`users/${username}`, data, 'patch')
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class)

export default JoblyApi;