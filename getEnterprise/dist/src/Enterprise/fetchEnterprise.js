import { API_KEY, EnterpriseInherenceURL } from "../assets/config";
import fetch from "node-fetch";
export const getEnterprise = async () => {
    const getUrl = `${EnterpriseInherenceURL}?crtfc_key=${API_KEY}`;
    console.log(getUrl);
    const data = await fetch(getUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(data);
    return data;
};
