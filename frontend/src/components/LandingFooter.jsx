import React from 'react';
import Text from './text.jsx';

export default function LandingFooter() {
  return (
    <footer className='border-t border-[var(--color-border)] bg-primary-dark/95 px-6 py-10 text-white'>
      <div className='mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-4'>
        <div>
          <Text size='lg' weight='bold' className='mb-2 !text-white'>
            Calculadora Tributária
          </Text>
          <Text size='sm' className='text-green-100'>
            Plataforma acadêmica para simulação comparativa de encargos PF e PJ.
          </Text>
        </div>

        <div>
          <Text size='sm' weight='bold' className='mb-2 uppercase tracking-wide !text-white'>
            Serviços
          </Text>
          <ul className='space-y-1 text-sm text-green-100'>
            <li>Comparativo de tributação PF x PJ</li>
            <li>Estimativa de IR e INSS</li>
            <li>Resumo de carga tributária mensal</li>
            <li>Visualização de cenário mais vantajoso</li>
          </ul>
        </div>

        <div>
          <Text size='sm' weight='bold' className='mb-2 uppercase tracking-wide !text-white'>
            Suporte
          </Text>
          <ul className='space-y-1 text-sm text-green-100'>
            <li>Encaminhamento de dúvidas ao NAF</li>
            <li>Interface focada em uso educacional</li>
            <li>Base para evolução acadêmica do sistema</li>
            <li>Projeto voltado a profissionais autônomos</li>
          </ul>
        </div>

        <div>
          <Text size='sm' weight='bold' className='mb-2 uppercase tracking-wide !text-white'>
            Avisos
          </Text>
          <Text size='sm' className='text-green-100'>
            © {new Date().getFullYear()} UNICHRISTUS. Uso educativo: não substitui orientação
            contábil oficial.
          </Text>
        </div>
      </div>
    </footer>
  );
}
