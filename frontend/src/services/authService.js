import api from '../config';

export async function registerRequest({ name, email, password }) {
  const { data } = await api.post('/auth/register', {
    name,
    email,
    password,
  });

  return data;
}

export async function loginRequest({ email, password }) {
  const { data } = await api.post('/auth/login', {
    email,
    password,
  });

  return data;
}

export function saveAuthData({ token, user }) {
  localStorage.setItem('@daf_web:token', token);
  localStorage.setItem('@daf_web:user', JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem('@daf_web:token');
  localStorage.removeItem('@daf_web:user');
}

export function getToken() {
  return localStorage.getItem('@daf_web:token');
}
