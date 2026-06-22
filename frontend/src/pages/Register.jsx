import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerRequest } from '../services/authService';
import Text from '../components/text.jsx';
import Input from '../components/input.jsx';
import Button from '../components/button.jsx';
import FinanceAppSvg from '../assets/finance-app.svg?react';
import LogoIcon from '../components/LogoIcon.jsx';
export default function Register() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await registerRequest({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate('/login');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Não foi possível criar sua conta.';

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
              weight='medium'
            >
              Crie. Organize. Simule.
            </Text>
            <Text
              size='sm'
              className='mt-2 text-gray-600'
            >
              Cadastre-se para comparar cenários tributários e acompanhar seus
              resultados.
            </Text>
          </div>
        </div>
      </div>

      {/* ⚪ LADO DIREITO (FORM) */}
      <div className='flex w-full items-center justify-center p-6 md:w-1/2'>
        <div className='w-full max-w-md'>
          {/* LOGO */}
          <LogoIcon />

          {/* HEADER */}
          <div className='mb-8'>
            <Text
              as='h1'
              size='5xl'
              weight='bold'
            >
              Criar conta
            </Text>
            <Text
              size='sm'
              className='mt-2 text-gray-500'
            >
              Preencha os dados abaixo para começar suas simulações
            </Text>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <Text
                as='label'
                htmlFor='register-name'
                size='sm'
                className='mb-1 block'
              >
                Nome
              </Text>
              <Input
                id='register-name'
                type='text'
                placeholder='Seu nome completo'
                name='name'
                value={formData.name}
                onChange={handleChange}
                variant={errors.name ? 'error' : 'default'}
                className='focus:border-primary focus:ring-primary/30'
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={
                  errors.name ? 'register-name-error' : undefined
                }
              />
              {errors.name && (
                <Text
                  as='p'
                  id='register-name-error'
                  role='alert'
                  size='sm'
                  className='mt-1 !text-danger'
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
                className='mb-1 block'
              >
                E-mail
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
                className='focus:border-primary focus:ring-primary/30'
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={
                  errors.email ? 'register-email-error' : undefined
                }
              />
              {errors.email && (
                <Text
                  as='p'
                  id='register-email-error'
                  role='alert'
                  size='sm'
                  className='mt-1 !text-danger'
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
                className='mb-1 block'
              >
                Senha
              </Text>
              <Input
                id='register-password'
                type='password'
                name='password'
                autoComplete='new-password'
                value={formData.password}
                onChange={handleChange}
                variant={errors.password ? 'error' : 'default'}
                className='focus:border-primary focus:ring-primary/30'
                aria-invalid={errors.password ? 'true' : undefined}
                aria-describedby={
                  errors.password ? 'register-password-error' : undefined
                }
              />
              <Text
                as='p'
                size='sm'
                className='mt-1 text-gray-500'
              >
                Sua senha deve ter entre 8 e 20 caracteres e conter letras e
                números.
              </Text>
              {errors.password && (
                <Text
                  as='p'
                  id='register-password-error'
                  role='alert'
                  size='sm'
                  className='mt-1 !text-danger'
                >
                  {errors.password}
                </Text>
              )}
            </div>

            <div className='mb-6'>
              <Text
                as='label'
                htmlFor='register-confirm-password'
                size='sm'
                className='mb-1 block'
              >
                Confirmar senha
              </Text>
              <Input
                id='register-confirm-password'
                type='password'
                name='confirmPassword'
                autoComplete='new-password'
                value={formData.confirmPassword}
                onChange={handleChange}
                variant={errors.confirmPassword ? 'error' : 'default'}
                className='focus:border-primary focus:ring-primary/30'
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
                  className='mt-1 !text-danger'
                >
                  {errors.confirmPassword}
                </Text>
              )}
            </div>

            <Button
              type='submit'
              variant='primary'
              className='w-full rounded-xl'
            >
              Registrar
            </Button>
            {errors.api && (
              <p className='mt-2 text-sm text-red-500'>{errors.api}</p>
            )}
          </form>

          <Text
            as='p'
            size='sm'
            className='mt-5 text-center text-gray-500'
          >
            Já tem conta?{' '}
            <Link
              to='/login'
              className='font-medium text-primary/90 underline-offset-2 hover:text-primary-dark hover:underline'
            >
              Faça login
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
