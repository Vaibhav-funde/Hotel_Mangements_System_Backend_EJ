const express = require("express");
const app = express();
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.listen(4000, () => {
  console.log("Server running on port 4000");
});