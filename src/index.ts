import axiosCookieJarSupport from "axios-cookiejar-support";
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import * as API from "./types";
import { CookieJar } from "tough-cookie";

export default class SakaiAPI {
    config: API.SakaiAPIConfig;
    cookieJar: CookieJar;
    request: AxiosInstance;

    constructor(config: API.SakaiAPIConfig = {}) {
        this.config = {
            baseUrl: config.baseUrl || "https://sakai.ug.edu.gh/",
        } as API.SakaiAPIConfig;

        this.cookieJar = new CookieJar();
        this.request = axios.create({
            baseURL: this.config.baseUrl,
            jar: this.cookieJar,
            withCredentials: true
        } as AxiosRequestConfig);

        axiosCookieJarSupport(this.request);
    }


    /**
     * Logs in with student id and password
     * @param {API.LoginRequest} params
     * @param {string} params.username
     * @param {string} params.password
     */
    login = (params: API.LoginRequest) => this.request.post("direct/session", null, {
        params: {
            _username: params.username,
            _password: params.password
        }
    }).then(res => {
        const [cookie] = res.headers["set-cookie"];
        this.request.defaults.headers.Cookie = cookie;
    });





    /**
      * Gets announcement for a specific site
      * @param {string} siteId
      * @returns {AxiosPromise<API.SiteAnnouncementResponse>}
      */
    getSiteAnnouncement = (siteId: string): AxiosPromise<API.SiteAnnouncementResponse> => this.request.get<API.SiteAnnouncementResponse>(`direct/announcement/site/${siteId}.json`);


    /**
      * Gets all announcement for current user
      * @return {AxiosPromise<API.MyAnnouncementResponse>}
      */
    getUserAnnouncement = (): AxiosPromise<API.MyAnnouncementResponse> => this.request.get<API.MyAnnouncementResponse>(`direct/announcement/user.json`);





    /**
     * Gets assignments for a specific site
     * @param {string} siteId
     * @returns {AxiosPromise<API.SiteAssignmentResponse>}
     */
    getSiteAssignment = (siteId: string): AxiosPromise<API.SiteAssignmentResponse> => this.request.get<API.SiteAssignmentResponse>(`direct/assignment/site/${siteId}.json`);


    /**
     * Gets an assignment
     * @param {string} assignmentId 
     * @return {AxiosPromise<API.ItemAssignmentResponse>}
     */
    getItemAssignment = (assignmentId: string): AxiosPromise<API.ItemAssignmentResponse> => this.request.get<API.ItemAssignmentResponse>(`direct/assignment/item/${assignmentId}.json`);


    /**
     * Gets all assignments for current user
     * @return {AxiosPromise<API.MyAssignmentResponse>}
     */
    getMyAssignment = (): AxiosPromise<API.MyAssignmentResponse> => this.request.get<API.MyAssignmentResponse>(`direct/assignment/my.json`);





    /**
     * Gets calendar for a specific site
     * @param {string} siteId
     * @returns {AxiosPromise<API.SiteCalendarResponse>}
     */
    getSiteCalendar = (siteId: string): AxiosPromise<API.SiteCalendarResponse> => this.request.get<API.SiteCalendarResponse>(`direct/calendar/site/${siteId}.json`);


    /**
     * Gets all calendars for current user
     * @returns {AxiosPromise<API.MyCalendarResponse>}
     */
    getMyCalendar = (): AxiosPromise<API.MyCalendarResponse> => this.request.get<API.MyCalendarResponse>(`direct/calendar/my.json`);


    /**
     * Gets calendar event for a specific site
     * @param {API.EventCalendarRequest} params
     * @param {string} params.siteId
     * @param {string} params.eventId
     * @returns {AxiosPromise<API.EventCalendarResponse>}
     */
    getEventCalendar = (params: API.EventCalendarRequest): AxiosPromise<API.EventCalendarResponse> => this.request.get<API.EventCalendarResponse>(`direct/calendar/event/${params.siteId}/${params.eventId}.json`);





    /**
     * Gets sites for current user
     * @returns {AxiosPromise<API.SiteResponse>}
     */
    getSite = (): AxiosPromise<API.SiteResponse> => this.request.get<API.SiteResponse>(`direct/site.json`);





    /**
    * Gets content for a specific site
    * @param {string} siteId
    * @returns {AxiosPromise<API.SiteContentResponse>}
    */
    getSiteContent = (siteId: string): AxiosPromise<API.SiteContentResponse> => this.request.get<API.SiteContentResponse>(`direct/content/site/${siteId}.json`);

    
    /**
    * Gets content for current user
    * @returns {AxiosPromise<API.MyContentResponse>}
    */
   getMyContent = (): AxiosPromise<API.MyContentResponse> => this.request.get<API.MyContentResponse>(`direct/content/my.json`);
}