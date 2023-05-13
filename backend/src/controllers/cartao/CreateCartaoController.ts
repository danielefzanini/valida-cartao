import { Request, Response } from "express";
import { CreateCartaoService } from "../../services/cartao/CreateCartaoService";

class CreateCartaoController {
  async handle(req: Request, res: Response) {
    const { nome_titular, cpf_titular, num_cartao, cvv } = req.body;

    const createCartaoService = new CreateCartaoService();
    const cartao = await createCartaoService.execute({
      nome_titular,
      cpf_titular,
      num_cartao,
      cvv,
    });

    return res.json(cartao);
  }
}

export { CreateCartaoController };
