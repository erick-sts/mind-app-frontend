import axios from 'axios';

const baseURL = 'http://localhost:4200';

const api = axios.create({
  baseURL,
});

// Função para fazer login
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para realizar operações CRUD
// ...

// Exporte o serviço para ser utilizado em outros lugares
export default api;