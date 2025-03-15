import api from "./axios";

export const indexProdutos = async (per_page:number = 10, page:number = 1) => {
  const response = await api.get('/produtos', {
    params: { per_page, page }
  });
  return response.data;
};

export const storeProduto = async (data: any) => {
  const response = await api.post('/produtos', data);
  return response.data;
};

export const showProduto = async (id: number) => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const updateProduto = async (id: number, data: any) => {
  const response = await api.put(`/produtos/${id}`, data);
  return response.data;
};

export const destroyProduto = async (id: number) => {
  const response = await api.delete(`/produtos/${id}`);
  return response.data;
};