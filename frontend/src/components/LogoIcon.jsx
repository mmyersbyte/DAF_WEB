import React from 'react';
import Text from './text.jsx';
import MoneyIcon from '../assets/money-manager-svgrepo-com.svg?react';

export default function LogoIcon() {
  return (
    <div className='flex items-center gap-3'>
      <MoneyIcon className='h-14 w-14 text-primary' />

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
