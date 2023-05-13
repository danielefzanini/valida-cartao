import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../../prisma";
import env from "../../variables";
interface AuthRequest {
  num_cartao: string;
  cvv: string;
}

class AuthCartaoService {
  async execute({ num_cartao, cvv }: AuthRequest) {
    const cartao = await prismaClient.cartao.findFirst({
      where: {
        num_cartao: num_cartao,
      },
    });

    if (!cartao) {
      throw new Error("Cartão não encontrado");
    }

    const cvvMatch = await compare(cvv, cartao.cvv);

    if (!cvvMatch) {
      throw new Error("Número do cartão e cvv incorreta");
    }

    const token = sign(
      {
        num_cartao: cartao.num_cartao,
        cvv: cartao.cvv,
      },
      env.JWT_SECRET,
      {
        subject: cartao.id,
        expiresIn: "30d",
      }
    );

    return {
      id: cartao.id,
      num_cartao: cartao.num_cartao,
      cvv: cartao.cvv,
      token: token,
    };
  }
}

export { AuthCartaoService };
