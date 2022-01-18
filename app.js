require("dotenv/config");
require("./config/passport");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const friendRoute = require("./routes/friendRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const likeRoute = require("./routes/likeRoute");

//app & library init
const app = express();
app.use(cors());
app.use(express.json());
app.use("/static", express.static("public/images"));
app.use(morgan("tiny"));

//routes
app.use("/users", userRoute);
app.use("/friends", friendRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/likes", likeRoute);

// error handling middlewares
app.use((req, res) => {
	res.status(404).json({ message: "resource not found on this server" });
});
app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

// virtual server listener
const port = process.env.PORT || "8080";
app.listen(port, () => console.log("server now listening on port " + port));
