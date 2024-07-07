const e = require("express"),
dotenv = require("dotenv");

const cfg = dotenv.config();
const app = e();

app.get("/", function (req, res) {
    res.status(200).json({
        error:false,
        success:true
    })
})

app.listen(process.env.PORT);
