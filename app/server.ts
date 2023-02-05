import * as express from "express";
import { PORT } from "./utils/config";

const app = express();
app.use(express.json());

app.use("/user", require("./routes/users-routes"));

app.listen(PORT, () => console.log(`listening to ${PORT}`));
