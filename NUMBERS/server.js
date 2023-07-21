const express = require("express");
const app = express();
const cors = require("cors");
const { resolver } = require("./resolver");
const { union } = require("lodash");

app.use(express.json({ extendend: true }));
app.use(cors());

const port = 8008;

function mergeArrays(...arrays) {
  return union(...arrays);
}

app.get("/numbers", async (req, res) => {
  try {
    const { url } = req.query;

    if (typeof url === "string") {
      const response = await resolver(url);
      return res.status(200).json(response);
    } else {
      const proimses = await Promise.allSettled(url.map((u) => resolver(u)));

      const resolvedpromises = proimses.map((p) => {
        if (p.status === "fulfilled") {
          return p.value.numbers;
        }
      });

      return res
        .status(200)
        .json({ numbers: mergeArrays(...resolvedpromises) });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});

app.listen(port, () => {
  console.log("SERVER WORKING", port);
});
