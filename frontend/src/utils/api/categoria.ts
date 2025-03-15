import api from "./axios";

export const indexCategorias = async (per_page:number = 10, page:number = 1) => {
  const response = await api.get('/categorias', {
    params: { per_page, page }
  });
  return response.data;
};

export const storeCategoria = async (data: any) => {
  const response = await api.post('/categorias', data);
  return response.data;
};

export const showCategoria = async (id: number) => {
  const response = await api.get(`/categorias/${id}`);
  return response.data;
};

export const updateCategoria = async (id: number, data: any) => {
  const response = await api.put(`/categorias/${id}`, data);
  return response.data;
};

export const destroyCategoria = async (id: number) => {
  const response = await api.delete(`/categorias/${id}`);
  return response.data;
};