import { Financial } from "../types/type";

//이자보상배율 구함
const InterstRatio = (financialData: Financial[]): number => {
  let financialExpenses_amount = 0;
  let operatingProfit_amount = 0;
  financialData.map((el: Financial) => {
    const accountID = el.account_id;

    if (accountID === "ifrs-full_FinanceCosts") {
      financialExpenses_amount = el.thstrm_amount;
    } else if (accountID === "dart_OperatingIncomeLoss") {
      operatingProfit_amount = el.thstrm_amount;
    }
  });

  if (financialExpenses_amount == 0) {
    return 0;
  }

  console.log(
    `영업이익: ${operatingProfit_amount}, 금융비용: ${financialExpenses_amount} 이자보상배율${
      operatingProfit_amount / financialExpenses_amount
    }`
  );

  return operatingProfit_amount / financialExpenses_amount;
};

//Interest Coverage Ratio 이자보상배율
const InterestCoverRatio = (financialData: Financial[]) => {
  const operateingProfitAmount = InterstRatio(financialData);

  return operateingProfitAmount;
};

export default InterestCoverRatio;
