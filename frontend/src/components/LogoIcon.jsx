import React from 'react';
import Text from './text.jsx';
import MoneyIcon from '../assets/money-manager-svgrepo-com.svg?react';

export default function LogoIcon() {
  return (
    <div className='mb-8 flex items-center gap-4'>
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
    </div>
  );
}
