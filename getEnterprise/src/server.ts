import { Request, Response } from "express";

import FilterMain from "./filter/FilterMain";
import express from "express";
import getAllEnterprise from "./filter/getAllEnterprise";

const app = express();

app.get("/getAllEnterprise", getAllEnterprise);

app.get("/Filter", FilterMain);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
