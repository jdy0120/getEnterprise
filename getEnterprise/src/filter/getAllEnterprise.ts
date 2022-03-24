import { Request, Response } from "express";

import CheckEnterprise from "../fetch/checkEnterprise";
import { CorpsType } from "../types/type";
import { appendFile } from "fs";
import { readFileSync } from "fs";

const getAllEnterprise = async (req: Request, res: Response) => {
  const corpsJsonFile = readFileSync(
    "/Users/gaebalja/workspace/myProject/financialstatements/corpsList/corps.json",
    "utf8"
  );

  const corpsJsonData: CorpsType = JSON.parse(corpsJsonFile);
  const corpsList = corpsJsonData.corpsList;

  let count = 0;

  for (let i = 0; i < corpsList.length; i++) {
    console.log(`${corpsList[i].corp_code}(${corpsList[i].corp_name}) 검색 중`);

    const check = await CheckEnterprise(corpsList[i].corp_code);

    if (check) {
      count += 1;
      console.log(
        `최신재무제표가 있습니다. ${corpsList[i].corp_name}, ${corpsList[i].corp_code}`
      );
      const data = `{"corp_name":"${corpsList[i].corp_name}","corp_code":"${corpsList[i].corp_code}"},`;

      appendFile("./checkedCorpList.json", data, (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log('The "data to append" was appended to file!');
      });
    }
  }

  res.send(`재무제표 검색되는 기업은 ${count}개입니다.`);
};

export default getAllEnterprise;
