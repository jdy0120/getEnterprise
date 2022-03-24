import { Corps, CorpsFinancialType, Financial } from "src/types/type";

import fetchCorpsDetail from "../fetch/fetchCorpsDetail";

const filterInDetail = (corpDetailList: Financial[]) => {
  const revenu = corpDetailList.find(
    (el) =>
      el.account_id === "ifrs-full_Revenue" || el.account_id === "ifrs_Revenue"
  );
  const income = corpDetailList.find(
    (el) => el.account_id === "dart_OperatingIncomeLoss"
  );

  return { revenu: revenu?.thstrm_amount, income: income?.thstrm_amount };
};

/**
 * 매출액 또는 영업이익이 음수이거나
 * 영업이익률이 음수인 경우 false리턴
 */
const OPMRate = (corpDetail: CorpsFinancialType): boolean => {
  if (corpDetail.list === undefined) {
    return false;
  }

  const { revenu, income } = filterInDetail(corpDetail.list);

  if (!revenu || !income) {
    return false;
  }

  if (revenu <= 0 || income <= 0) {
    return false;
  }

  const opmRate = (income / revenu) * 100;

  if (opmRate < 0) {
    return false;
  }

  return true;
};

const OPMGrowRate = (
  corpDetailPrev: CorpsFinancialType,
  corpDetailCurnt: CorpsFinancialType
): boolean => {
  if (corpDetailPrev.list === undefined || corpDetailCurnt.list === undefined) {
    return false;
  }

  const { ...prev } = filterInDetail(corpDetailPrev.list);

  if (prev.income === undefined || prev.revenu === undefined) {
    return false;
  }

  const opmPrev = (prev.income / prev.revenu) * 100;

  const { ...curnt } = filterInDetail(corpDetailCurnt.list);

  if (curnt.income === undefined || curnt.revenu === undefined) {
    return false;
  }

  const opmCrunt = (curnt.income / curnt.revenu) * 100;

  const opmGrowRate = ((opmCrunt - opmPrev) / opmPrev) * 100;

  if (opmGrowRate > 0) {
    return true;
  }

  return false;
};

const CashFlow = () => {};

const CashRate = () => {};

export const FilterFunc = async (corpsList: Corps[], nowYear: number) => {
  const yearArray = Array.from({ length: 4 }, (_, start) => 2017 + start);

  for (let j = 0; j < corpsList.length; j++) {
    const corp = corpsList[j].corp_code;

    let flag = [true, true];

    for (let i = 0; i < yearArray.length - 1; i++) {
      const prev = await fetchCorpsDetail(corp, yearArray[i], 11011);
      const curnt = await fetchCorpsDetail(corp, yearArray[i + 1], 11011);

      if (!OPMRate(prev) || !OPMRate(curnt)) {
        flag[0] = false;
        break;
      }

      if (!OPMGrowRate(prev, curnt)) {
        flag[1] = false;
      }
    }
    if (flag[0] && flag[1]) {
      console.log(`좋은기업: ${corpsList[j].corp_name}`);
    }
  }
};

export default FilterFunc;
