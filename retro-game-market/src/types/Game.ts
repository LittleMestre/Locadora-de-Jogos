
export interface Game {
  codigo: number;
  nome: string;
  genero: string;
  classificacao: number;
  disponibilidade: string;
  preco: number;
  quantidade: number;
  imagem?: string;
  descricao?: string;
}

export interface CartItem {
  produto: Game;
  quantidade: number;
}

export interface PaymentOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}
