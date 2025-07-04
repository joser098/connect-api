import express from 'express';
import cors from "cors";
import router from "./routes/index.js";

const whitelist = [
  "http://localhost:4200",
  "https://development.gruposdeconexion.info",
  "https://gruposdeconexion.info",
  "http://localhost:4321",
];

const app = express();

//Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.includes(origin) || !origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    }
  })
);

app.options('/*', cors());
app.disable("x-powered-by");
app.use(express.json());

//Router
app.use("/", router);


export default app;