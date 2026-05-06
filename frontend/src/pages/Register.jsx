import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Text from '../components/text.jsx';
import Input from '../components/input.jsx';
import Button from '../components/button.jsx';

export default function Register() {
  const api = axios.create({
    baseURL: 'http://localhost:5000/auth',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      api
        .post('/register', {
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log('Registro:', formData);
      navigate('/login');
    }
  };

  return (
    /* Mesmo padrão visual do Login, reaproveitando componentes da base */
    <div className='animate__animated animate__fadeInUp flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-300 p-4'>
      <div className='w-full max-w-md rounded-[20px] bg-white p-6 shadow-lg'>
        <Text
          as='h2'
          size='xl'
          weight='bold'
          color='black'
          className='mb-6 text-center'
        >
          Registro
        </Text>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <Text
              as='label'
              htmlFor='register-name'
              size='sm'
              weight='medium'
              color='black'
              className='mb-1 block'
            >
              Nome:
            </Text>
            <Input
              id='register-name'
              type='text'
              placeholder='Seu Nome Completo'
              name='name'
              value={formData.name}
              onChange={handleChange}
              variant={errors.name ? 'error' : 'default'}
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={errors.name ? 'register-name-error' : undefined}
            />
            {errors.name && (
              <Text
                as='p'
                id='register-name-error'
                role='alert'
                size='sm'
                className='mt-1 !text-red-600'
              >
                {errors.name}
              </Text>
            )}
          </div>
          <div className='mb-4'>
            <Text
              as='label'
              htmlFor='register-email'
              size='sm'
              weight='medium'
              color='black'
              className='mb-1 block'
            >
              Email:
            </Text>
            <Input
              id='register-email'
              type='email'
              placeholder='seu@email.com'
              name='email'
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              variant={errors.email ? 'error' : 'default'}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'register-email-error' : undefined}
            />
            {errors.email && (
              <Text
                as='p'
                id='register-email-error'
                role='alert'
                size='sm'
                className='mt-1 !text-red-600'
              >
                {errors.email}
              </Text>
            )}
          </div>
          <div className='mb-4'>
            <Text
              as='label'
              htmlFor='register-password'
              size='sm'
              weight='medium'
              color='black'
              className='mb-1 block'
            >
              Senha:
            </Text>
            <Input
              id='register-password'
              type='password'
              name='password'
              autoComplete='new-password'
              value={formData.password}
              onChange={handleChange}
              variant={errors.password ? 'error' : 'default'}
              aria-invalid={errors.password ? 'true' : undefined}
              aria-describedby={
                errors.password ? 'register-password-error' : undefined
              }
            />
            <Text as='p' size='sm' className='mt-1 !text-gray-500'>
              Sua senha deve ter entre 8 e 20 caracteres, conter letras e números e não deve conter espaços, caracteres especiais ou emojis.
            </Text>
            {errors.password && (
              <Text
                as='p'
                id='register-password-error'
                role='alert'
                size='sm'
                className='mt-1 !text-red-600'
              >
                {errors.password}
              </Text>
            )}
          </div>
          <div className='mb-4'>
            <Text
              as='label'
              htmlFor='register-confirm-password'
              size='sm'
              weight='medium'
              color='black'
              className='mb-1 block'
            >
              Confirmar Senha:
            </Text>
            <Input
              id='register-confirm-password'
              type='password'
              name='confirmPassword'
              autoComplete='new-password'
              value={formData.confirmPassword}
              onChange={handleChange}
              variant={errors.confirmPassword ? 'error' : 'default'}
              aria-invalid={errors.confirmPassword ? 'true' : undefined}
              aria-describedby={
                errors.confirmPassword
                  ? 'register-confirm-password-error'
                  : undefined
              }
            />
            {errors.confirmPassword && (
              <Text
                as='p'
                id='register-confirm-password-error'
                role='alert'
                size='sm'
                className='mt-1 !text-red-600'
              >
                {errors.confirmPassword}
              </Text>
            )}
          </div>
          <div className='mb-2'>
            <Button type='submit' variant='primary' className='w-full'>
              Registrar
            </Button>
          </div>
        </form>

        <Text
          as='p'
          size='md'
          color='black'
          className='mt-6 text-center'
        >
          Já tem uma conta?{' '}
          <Link
            to='/login'
            className='font-semibold text-violet-600 underline-offset-2 hover:underline'
          >
            Faça login
          </Link>
        </Text>
      </div>
    </div>
  );
}