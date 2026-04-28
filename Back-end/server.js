import express from "express";
import cors from "cors";

import produtosRoutes from "./src/routes/produtosRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/produtos", produtosRoutes);

app.listen(3000, () => {
  console.log("🚀 API rodando em http://localhost:3000");
});