import { getEnterprise } from "./fetchEnterprise";
const getEnterpriseList = async (req, res) => {
    console.log(getEnterprise());
    res.send("Application");
};
export default getEnterpriseList;
