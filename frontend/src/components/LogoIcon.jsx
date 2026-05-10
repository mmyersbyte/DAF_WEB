import React from 'react';
import Text from './text.jsx';
import MoneyIcon from '../assets/money-manager-svgrepo-com.svg?react';

export default function LogoIcon() {
  return (
    <div className='mb-8 flex items-center gap-4'>
      <MoneyIcon className='h-18 w-18 text-primary' />

      <div className='leading-tight'>
        <Text
          as='span'
          size='lg'
          className='block text-foreground'
        >
          Calculadora
        </Text>

        <Text
          as='span'
          size='lg'
          weight='bold'
          className='block !text-primary font-bold'
        >
          Tributária
        </Text>
      </div>
    </div>
  );
}
