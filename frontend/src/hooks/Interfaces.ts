export interface Produto {
  id: number;
  categoria_id: number;
  data_cadastro: string | null;
  nome: string;
  categoria: string;
  valor: number;
};

export interface Categoria {
  id: number;
  nome: string;
};

