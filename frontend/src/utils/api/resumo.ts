import api from "./axios";

export const totalCategorias = async () => {
  const response = await api.get('/resumo/total-categorias');
  return response.data;
};

export const totalProdutos = async () => {
  const response = await api.get('/resumo/total-produtos');
  return response.data;
};

export const recentes = async (qtd: number) => {
  const response = await api.get(`/resumo/recentes/${qtd}`);
  return response.data;
};