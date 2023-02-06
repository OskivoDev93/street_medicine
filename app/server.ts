import { connectDB } from "./database/db";
import * as express from "express";
import { PORT } from "./utils/config";
import { errorHandler } from "./middleware/error-middleware";
import * as Colors from "colors.ts";
Colors.colors("", "");

connectDB();

const app = express();
app.use(express.json());

app.use("/user", require("./routes/users-routes"));
app.use("/item", require("./routes/item-routes"));

app.use(errorHandler);
app.listen(PORT, () => console.log(`listening to ${PORT}`));
