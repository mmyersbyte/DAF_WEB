import React from 'react';
import Text from './text.jsx';

/** Card da landing: ícone + título + descrição  */
export default function FeatureCard({
  icon,
  title,
  description,
  className = '',
}) {
  return (
    <article
      className={`flex flex-col rounded-2xl bg-white p-6 shadow-md shadow-gray-900/5 ${className}`.trim()}
    >
      <div className='mb-4 flex h-12 w-12 shrink-0 items-center justify-start [&_svg]:h-10 [&_svg]:w-full [&_svg]:max-w-[2.75rem]'>
        {icon}
      </div>
      <Text
        as='h3'
        size='lg'
        weight='bold'
        color='text'
        className='mb-2'
      >
        {title}
      </Text>
      <Text
        size='md'
        className='text-gray-600'
      >
        {description}
      </Text>
    </article>
  );
}
