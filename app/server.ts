import * as express from "express";
import { PORT } from "./utils/config";
import { errorHandler } from "./middleware/error-middleware";

const app = express();
app.use(express.json());

app.use("/user", require("./routes/users-routes"));

app.use(errorHandler);
app.listen(PORT, () => console.log(`listening to ${PORT}`));
