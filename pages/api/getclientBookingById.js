import axios from "axios";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const clientId = req.body;
      const { token } = req.body;
      var config = {
        method: "post",
        url: "http://134.122.64.108:4005/api/v1/useradmin/getclientbookingbyid",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: clientId,
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
