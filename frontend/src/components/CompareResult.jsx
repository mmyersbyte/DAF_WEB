import React, { useState } from 'react';
import GraficoComparativo from './GraficoComparativo.jsx';
import Text from './text.jsx';
import Button from './button.jsx';
import { gerarPDF } from '../util/pdf/gerarPdfResultado.js';

export default function CompareResult({ result, onBack }) {
  const [pdfLoading, setPdfLoading] = useState(false);

  if (!result) return null;

  const { PF, PJ, input } = result;

  const dasTitulo = PJ.dasRowLabel || 'DAS (Simples Nacional)';

  const conclusion =
    result.bestOption === 'PJ'
      ? 'PJ compensa mais neste cenário.'
      : result.bestOption === 'PF'
        ? 'PF compensa mais neste cenário.'
        : result.bestOption === 'EMPATE'
          ? 'PF e PJ apresentam o mesmo resultado neste cenário.'
          : PJ.liquido > PF.liquido
            ? 'PJ compensa mais neste cenário.'
            : 'PF compensa mais neste cenário.';

  function formatCurrency(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return '—';
    }

    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  async function handleBaixarPdf() {
    setPdfLoading(true);

    try {
      await gerarPDF('resultado');
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <div className='rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-xl shadow-gray-900/10 md:p-8'>
      {/* Bloco capturado pelo html2canvas → jsPDF. */}
      <div
        id='resultado'
        style={{ width: '100%', boxSizing: 'border-box' }}
      >
        <Text
          as='h2'
          size='title'
          weight='bold'
          color='primaryDark'
          className='mb-6'
        >
          Resultado da simulação
        </Text>

        <div className='mb-6 space-y-2 rounded-2xl bg-primary-light/30 p-4'>
          <Text
            size='caption'
            color='text'
          >
            <span className='font-semibold text-[var(--color-primary-dark)]'>
              Profissão:
            </span>{' '}
            {input.profissao}
          </Text>

          <Text
            size='caption'
            color='text'
          >
            <span className='font-semibold text-[var(--color-primary-dark)]'>
              Renda informada:
            </span>{' '}
            {formatCurrency(input.rendaMensal)}
          </Text>

          <Text
            size='caption'
            color='text'
          >
            <span className='font-semibold text-[var(--color-primary-dark)]'>
              Custos mensais:
            </span>{' '}
            {formatCurrency(input.custosMensais)}
          </Text>
        </div>

        <div className='overflow-x-auto rounded-xl'>
          <table
            className='min-w-full divide-y divide-[var(--color-border)] text-left text-sm'
            style={{ width: '100%' }}
          >
            <thead className='bg-[var(--color-primary-dark)] text-white'>
              <tr>
                <th className='px-4 py-3 font-semibold'>Categoria</th>
                <th className='px-4 py-3 font-semibold'>PF</th>
                <th className='px-4 py-3 font-semibold'>PJ</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-[var(--color-border)] bg-white'>
              <tr className='hover:bg-primary-light/20'>
                <td className='px-4 py-3 font-medium text-gray-800'>
                  {dasTitulo}
                </td>
                <td className='px-4 py-3 text-gray-700'>—</td>
                <td className='px-4 py-3 text-gray-700'>
                  {formatCurrency(PJ.dasMensal ?? PJ.simples6)}
                </td>
              </tr>

              <tr className='hover:bg-primary-light/20'>
                <td className='px-4 py-3 font-medium text-gray-800'>
                  INSS (sócio / autônomo)
                </td>
                <td className='px-4 py-3 text-gray-700'>
                  {formatCurrency(PF.inss)}
                </td>
                <td className='px-4 py-3 text-gray-700'>
                  {formatCurrency(PJ.inss)}
                </td>
              </tr>

              <tr className='hover:bg-primary-light/20'>
                <td className='px-4 py-3 font-medium text-gray-800'>
                  CPP patronal (20% sobre pró-labore)
                </td>
                <td className='px-4 py-3 text-gray-700'>—</td>
                <td className='px-4 py-3 text-gray-700'>
                  {PJ.cppPatronal > 0 ? formatCurrency(PJ.cppPatronal) : '—'}
                </td>
              </tr>

              <tr className='hover:bg-primary-light/20'>
                <td className='px-4 py-3 font-medium text-gray-800'>
                  Imposto de Renda
                </td>
                <td className='px-4 py-3 text-gray-700'>
                  {PF.isentoIR ? 'Isento' : formatCurrency(PF.ir)}
                </td>
                <td className='px-4 py-3 text-gray-700'>
                  {PJ.isentoIR ? 'Isento' : formatCurrency(PJ.ir)}
                </td>
              </tr>

              <tr className='hover:bg-primary-light/20'>
                <td className='px-4 py-3 font-medium text-gray-800'>
                  Total de impostos
                </td>
                <td className='px-4 py-3 text-gray-700'>
                  {formatCurrency(PF.imposto)}
                </td>
                <td className='px-4 py-3 text-gray-700'>
                  {formatCurrency(PJ.totalImpostos)}
                </td>
              </tr>

              <tr className='bg-primary-light/40 font-semibold'>
                <td className='px-4 py-3 text-[var(--color-primary-dark)]'>
                  Renda líquida
                </td>
                <td className='px-4 py-3 text-gray-900'>
                  {formatCurrency(PF.liquido)}
                </td>
                <td className='px-4 py-3 text-gray-900'>
                  {formatCurrency(PJ.liquido)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='mt-6 rounded-xl border border-[var(--color-border)] bg-gray-50/80 p-4'>
          <Text
            size='md'
            color='text'
          >
            <span className='font-bold text-[var(--color-primary-dark)]'>
              Conclusão:
            </span>{' '}
            {conclusion}
          </Text>
        </div>

        <div className='my-8 h-px bg-[var(--color-border)]' />

        <GraficoComparativo
          PF={PF}
          PJ={PJ}
        />
      </div>

      <div className='my-8 h-px bg-[var(--color-border)]' />

      <div className='flex flex-wrap gap-3'>
        <Button
          type='button'
          variant='secondary'
          disabled={pdfLoading}
          className='px-4'
          onClick={handleBaixarPdf}
        >
          {pdfLoading ? 'Gerando…' : 'Baixar PDF'}
        </Button>

        <Button
          type='button'
          variant='secondary'
          onClick={onBack}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}
