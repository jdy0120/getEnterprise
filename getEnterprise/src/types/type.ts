export interface Corps {
  corp_code: string;
  corp_name: string;
}

export interface CorpsType {
  updateDate: Date;
  corpsList: Corps[];
}

export interface Financial {
  rcept_no: number;
  reprt_code: number;
  bsns_year: number;
  corp_code: number;
  sj_div: string;
  sj_nm: string;
  account_id: string;
  account_nm: string;
  account_detail: string;
  thstrm_nm: string;
  thstrm_amount: number;
  frmtrm_nm: string;
  frmtrm_amount: number;
  bfefrmtrm_nm: string;
  bfefrmtrm_amount: number;
  ord: number;
}

export interface CorpsFinancialType {
  status: string;
  message: string;
  list?: Financial[];
}
