import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";

interface CartaoRequest {
  nome_titular: string;
  cpf_titular: string;
  num_cartao: string;
  cvv: string;
}

class CreateCartaoService {
  async execute({ nome_titular, cpf_titular, num_cartao, cvv }: CartaoRequest) {
    const hashCvv = await hash(cvv, 8);

    const cartao = await prismaClient.cartao.create({
      data: {
        nome_titular: nome_titular,
        cpf_titular: cpf_titular,
        num_cartao: num_cartao,
        cvv: hashCvv,
      },
      select: {
        id: true,
        num_cartao: true,
        cvv: true,
      },
    });

    return "Cartão salvo com sucesso!";
  }
}

export { CreateCartaoService };
