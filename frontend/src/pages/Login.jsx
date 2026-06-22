import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Text from '../components/text.jsx';

import Input from '../components/input.jsx';
import Button from '../components/button.jsx';
import FinanceAppSvg from '../assets/finance-app.svg?react';
import LogoIcon from '../components/LogoIcon.jsx';
import { loginRequest, saveAuthData } from '../services/authService';
export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginRequest({
        email: formData.email,
        password: formData.password,
      });

      saveAuthData({
        token: data.token,
        user: data.user,
      });

      navigate('/home');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Email ou senha inválidos.';

      setErrors((prev) => ({
        ...prev,
        api: message,
      }));
    }
  };

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground md:flex-row'>
      {/* 🟢 LADO ESQUERDO (SVG / ILUSTRAÇÃO) */}
      <div className='flex w-full items-center justify-center bg-primary-light p-6 md:w-1/2'>
        <div className='w-full max-w-xl'>
          <FinanceAppSvg className='animated mx-auto h-auto w-full max-w-[95rem]' />

          <div className='mt-6 text-center'>
            <Text
              as='h3'
              size='lg'
              weight='semibold'
            >
              Calcule. Compare. Economize.
            </Text>
            <Text
              size='sm'
              className='mt-2 text-gray-600'
            >
              Descubra se vale mais a pena ser PJ ou PF e pague menos impostos.
            </Text>
          </div>
        </div>
      </div>

      {/* ⚪ LADO DIREITO (FORM) */}
      <div className='flex w-full md:w-1/2 items-center justify-center p-6'>
        <div className='w-full max-w-md'>
          {/* LOGO */}
          {/* <div className='mb-8 flex items-center gap-4'>
            <MoneyIcon className='h-15 w-15 text-primary' />

            <div className='leading-tight'>
              <Text
                as='span'
                size='xl'
                className='block text-foreground'
              >
                Calculadora
              </Text>

              <Text
                as='span'
                size='2xl'
                weight='bold'
                className='block !text-primary font-bold'
              >
                Tributária
              </Text>
            </div>
          </div> */}

          <LogoIcon />

          {/* HEADER */}
          <div className='mb-8'>
            <Text
              as='h1'
              size='5xl'
              weight='bold'
            >
              Bem-vind@ de volta!
            </Text>
            <Text
              size='sm'
              className='mt-2 text-gray-500'
            >
              Acesse sua conta para continuar simulando seus impostos
            </Text>
          </div>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className='mb-4'>
              <Text
                as='label'
                htmlFor='login-email'
                size='sm'
                className='mb-1 block'
              >
                E-mail
              </Text>
              <Input
                id='login-email'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                variant={errors.email ? 'error' : 'default'}
                className='focus:border-primary focus:ring-primary/30'
              />
            </div>

            {/* SENHA */}
            <div className='mb-6'>
              <Text
                as='label'
                htmlFor='login-password'
                size='sm'
                className='mb-1 block'
              >
                Senha
              </Text>
              <Input
                id='login-password'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                variant={errors.password ? 'error' : 'default'}
                className='focus:border-primary focus:ring-primary/30'
              />
            </div>

            {/* BOTÃO */}
            <Button
              type='submit'
              variant='primary'
              className='w-full rounded-xl'
            >
              Entrar
            </Button>
            {errors.api && (
              <p className='mt-2 text-sm text-red-500'>{errors.api}</p>
            )}
          </form>

          {/* FOOTER */}
          <Text
            as='p'
            size='sm'
            className='mt-5 text-center text-gray-500'
          >
            Não tem conta?{' '}
            <Link
              to='/register'
              className='font-medium text-primary/90 underline-offset-2 hover:text-primary-dark hover:underline'
            >
              Criar conta
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
