require("dotenv").config();
const axios = require("axios");
const Partner = require("./../models/partner");

module.exports = {
  addPartner: async (req, res) => {
    const { partnerName, partnerLogo, campaignId, slashTag, destinationUrl } =
      req.body;

    const headers = {
      "Content-Type": "application/json",
      apikey: process.env.REBRAND_API_KEY,
    };
    let endpoint = "https://api.rebrandly.com/v1/links";

    let linkRequest = {
      destination: destinationUrl,
      domain: { fullName: "get.dentalintel.net" },
      slashtag: slashTag,
    };

    const apiCall = {
      method: "post",
      url: endpoint,
      data: linkRequest,
      headers: headers,
    };

    try {
      let apiResponse = await axios(apiCall);
      let link = apiResponse.data;
      const partner = new Partner({
        partner_name: partnerName,
        partner_logo: partnerLogo,
        long_url: destinationUrl,
        short_url: link.shortUrl,
        campaign_id: campaignId,
        visits: 0,
        submissions: 0,
      });

      partner
        .save()
        .then((result) => {
            res.status(200).send(link.shortUrl);
        })
        .catch((err) => console.log(err));

      console.log(link.shortUrl);
    } catch (err) {
      res.status(403).send(err);
    }
  },
};