import axios from "axios";
export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { token } = req.body;
      const  {data}  = req.body;

      console.log(token,data,"token data here")
      var config = {
        method: "post",
        url: "http://134.122.64.108:4005/api/v1/useradmin/addclientdetail",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      };
      await axios(config).then((response) => {
        res.status(200).json({ data: response.data });
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
