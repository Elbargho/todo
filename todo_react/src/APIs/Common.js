import { showPopUp } from "../components/Common";

let baseUrl = window.location.origin;
if(baseUrl.includes("localhost")) {
  baseUrl = "http://127.0.0.1:5000";
}

const showErrorPopUp = (error) => {
    showPopUp("error", `Error - ${error}`);
}

export {
    baseUrl,
    showErrorPopUp
}