import http from "./httpService";

const addContacts=(data)=>{
    return http.post(`./contacts`,data)
}
export default addContacts;