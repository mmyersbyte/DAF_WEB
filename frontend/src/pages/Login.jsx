import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Text from '../components/text.jsx';
import Input from '../components/input.jsx';
import Button from '../components/button.jsx';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: futura integracao com POST /auth/login
    navigate('/home');
  };

  return (
    /* Fundo em gradiente + centralizacao da cartao de login */
    <div className='animate__animated animate__fadeInUp flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-300 p-4'>
      {/* Cartao branco: limite de largura alinhado ao layout anterior (~400px) */}
      <div className='w-full max-w-md rounded-[20px] bg-white p-6 shadow-lg'>
        {/* Titulo da pagina: Text como heading para semantica correta */}
        <Text
          as='h2'
          size='xl'
          weight='bold'
          color='black'
          className='mb-6 text-center'
        >
          Login
        </Text>

        <form onSubmit={handleSubmit}>
          {/* Campo email: label semantico via Text as="label" + htmlFor */}
          <div className='mb-4'>
            <Text
              as='label'
              htmlFor='login-email'
              size='sm'
              weight='medium'
              color='black'
              className='mb-1 block'
            >
              Email:
            </Text>
            <Input
              id='login-email'
              type='email'
              name='email'
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              variant={errors.email ? 'error' : 'default'}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
            {errors.email && (
              <Text
                as='p'
                id='login-email-error'
                role='alert'
                size='sm'
                className='mt-1 !text-red-600'
              >
                {errors.email}
              </Text>
            )}
          </div>

          {/* Campo senha */}
          <div className='mb-4'>
            <Text
              as='label'
              htmlFor='login-password'
              size='sm'
              weight='medium'
              color='black'
              className='mb-1 block'
            >
              Senha:
            </Text>
            <Input
              id='login-password'
              type='password'
              name='password'
              autoComplete='current-password'
              value={formData.password}
              onChange={handleChange}
              variant={errors.password ? 'error' : 'default'}
              aria-invalid={errors.password ? 'true' : undefined}
              aria-describedby={
                errors.password ? 'login-password-error' : undefined
              }
            />
            {errors.password && (
              <Text
                as='p'
                id='login-password-error'
                role='alert'
                size='sm'
                className='mt-1 !text-red-600'
              >
                {errors.password}
              </Text>
            )}
          </div>

          {/* Submit via componente Button (variant primary alinhado ao design system) */}
          <div className='mb-2'>
            <Button
              type='submit'
              variant='primary'
              className='w-full'
            >
              Entrar
            </Button>
          </div>
        </form>

        {/* Rodape: Text como paragrafo; Link do router para cadastro */}
        <Text
          as='p'
          size='md'
          color='black'
          className='mt-6 text-center'
        >
          Não tem conta?{' '}
          <Link
            to='/register'
            className='font-semibold text-violet-600 underline-offset-2 hover:underline'
          >
            Cadastre-se
          </Link>
        </Text>
      </div>
    </div>
  );
}
