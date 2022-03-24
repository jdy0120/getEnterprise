import { Corps, CorpsFinancialType } from "../types/type";
import { Request, Response } from "express";
import { appendFile, readFileSync } from "fs";

import FilterFunc from "./FilterFunc";
import InterestCoverRatio from "./InterestCoverR";
import fetchCorpsDetail from "../fetch/fetchCorpsDetail";

const FilterMain = async (req: Request, res: Response) => {
  const corpsListFile = readFileSync(
    "/Users/gaebalja/workspace/myProject/financialstatements/getEnterprise/checkedCorpList.json",
    "utf8"
  );

  const corpsList: Corps[] = JSON.parse(corpsListFile);

  const nowYear = 2021;

  console.log("FilterMain");

  FilterFunc(corpsList, nowYear);
  // for (let i = 0; i < corpsData.length; i++) {

  // }
};

export default FilterMain;
