import type { NextApiRequest, NextApiResponse } from "next";
import axios from "./ProvideAxios";

export default async function getMempoolTransactionList(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const URL = `/wallet/gettransactionlistfrompending`;
    const Headers = {
        "Content-Type": "application/json",
        "TRON-PRO-API-KEY": process.env.TRON_PRO_API_KEY,
    };
    const response = await axios.get(URL, Headers);
    res.status(200).json({ data: response.data });
}
