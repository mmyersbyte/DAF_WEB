import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Text from '../components/text.jsx';

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

  // classes compartilhadas dos inputs (Tailwind); estado invalido destaca borda em vermelho
  const inputClassName = (field) =>
    [
      'w-full rounded-lg border px-3 py-2 font-sans text-gray-900 outline-none transition',
      'placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30',
      errors[field] ? 'border-red-500' : 'border-gray-300',
    ].join(' ');

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
            <input
              id='login-email'
              type='email'
              name='email'
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              className={inputClassName('email')}
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
            <input
              id='login-password'
              type='password'
              name='password'
              autoComplete='current-password'
              value={formData.password}
              onChange={handleChange}
              className={inputClassName('password')}
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

          {/* Botao nativo (nao eh componente Button); estilo espelha o primario roxo do projeto */}
          <div className='mb-2'>
            <button
              type='submit'
              className='w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-400 px-5 py-2.5 font-sans font-bold text-white shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:brightness-95'
            >
              Entrar
            </button>
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
