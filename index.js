const express = require("express");
const urlRoute = require("./routes/url.js");
const URL = require("./model/url.js");
const { connectToMongoDB } = require("./connect.js");

const app = express();
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongodb Connected")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entery = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entery.redirectURL)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
