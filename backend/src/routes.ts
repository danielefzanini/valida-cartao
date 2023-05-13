import { Router } from "express";
import { isAuthenticated } from "./middlewares/isAuthenticated";

//* Controllers imports
import { AuthCartaoController } from "./controllers/cartao/AuthCartaoController";
import { CreateCartaoController } from "./controllers/cartao/CreateCartaoController";

const router = Router();

router.post("/cartao/adicionar", new CreateCartaoController().handle);
router.post("/cartao/auth", new AuthCartaoController().handle);
router.get("/simular-compra", isAuthenticated, (request, response) => {
  return response.json({ message: "Compra simulada com sucesso!" });
});

export { router };
