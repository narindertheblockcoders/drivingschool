import axios from "axios";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { token } = req.body;
      const { data } = req.body;
      console.log("data for only training-->",data,token);
      var config = {
        method: "post",
        url: "http://134.122.64.108:4005/api/v1/useradmin/clienttrainingonly",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
