import { API_KEY, FinalcialStateURL } from "../assets/config";
import { Request, Response } from "express";

import { CorpsFinancialType } from "../types/type";
import axios from "axios";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const CheckEnterprise = async (corp_code: string): Promise<boolean> => {
  await sleep(500);

  const params = {
    crtfc_key: API_KEY,
    corp_code: corp_code,
    bsns_year: 2021,
    reprt_code: "11013",
    fs_div: "CFS",
  };

  const check: any = await axios.get(FinalcialStateURL, {
    params,
  });

  const checkData: CorpsFinancialType = check.data;

  return checkData.status !== "000" ? false : true;
};

export default CheckEnterprise;
