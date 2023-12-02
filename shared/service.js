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
// Create
export const createCurso = async (cursoData) => {
  try {
    const response = await api.post('/Create', cursoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Read (Listar todos os cursos)
export const getCursos = async () => {
  try {
    const response = await api.get('/List');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Read (Obter um curso por ID)
export const getCursoById = async (cursoId) => {
  try {
    const response = await api.get(`/cursos/${cursoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update
export const updateCurso = async (cursoId, cursoData) => {
  try {
    const response = await api.put(`/Update/${cursoId}`, cursoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete
export const deleteCurso = async (cursoId) => {
  try {
    const response = await api.delete(`/Delete/${cursoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;