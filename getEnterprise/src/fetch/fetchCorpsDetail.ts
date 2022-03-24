import { API_KEY, FinalcialStateURL } from "../assets/config";

import { CorpsFinancialType } from "../types/type";
import axios from "axios";

const fetchCorpsDetail = async (
  corp_code: string,
  bsns_year: number,
  reprt_code: number
): Promise<CorpsFinancialType> => {
  const params = {
    crtfc_key: API_KEY,
    corp_code: corp_code,
    bsns_year: bsns_year,
    reprt_code: reprt_code,
    fs_div: "CFS",
  };

  const data: any = await axios.get(FinalcialStateURL, {
    params: params,
  });

  const financialData: CorpsFinancialType = data.data;

  return financialData;
};

export default fetchCorpsDetail;
