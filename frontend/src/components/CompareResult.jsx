/**
 * CompareResult — exibe o resultado da simulação PF × PJ após o utilizador submeter o formulário na Home.
 *
 * Origem dos dados:
 * - `result` vem de Home: junta o retorno de compareTaxes() (pacote util/tax) com `input` extra
 *   (renda, custos, profissão) guardado no estado da página.
 *
 * Estrutura esperada de `result`:
 * - `PF`, `PJ` — objetos numéricos devolvidos por compareTaxes (impostos, líquidos, flags).
 * - `PJ.dasRowLabel` — texto da primeira linha da coluna PJ (DAS conforme Anexo).
 * - `PJ.cppPatronal` — CPP patronal (advocacia); 0 nas demais profissões.
 *
 * Este componente só apresenta dados; não recalcula impostos.
 */
import React, { useState } from 'react';
import GraficoComparativo from './GraficoComparativo.jsx';
import Text from './text.jsx';
import Button from './button.jsx';
import { gerarPDF } from '../util/pdf/gerarPdfResultado.js';

export default function CompareResult({ result, onBack }) {
  const [pdfLoading, setPdfLoading] = useState(false);

  if (!result) return null;

  const { PF, PJ, input } = result;

  const dasTitulo =
    PJ.dasRowLabel ||
    'DAS (Simples Nacional)';

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
      {/* Bloco capturado pelo html2canvas → jsPDF (título, resumo, tabela, conclusão, gráfico). */}
      <div id='resultado' style={{ width: '100%', boxSizing: 'border-box' }}>
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
        <Text size='caption' color='text'>
          <span className='font-semibold text-[var(--color-primary-dark)]'>
            Profissão:
          </span>{' '}
          {input.profissao}
        </Text>
        <Text size='caption' color='text'>
          <span className='font-semibold text-[var(--color-primary-dark)]'>
            Renda informada:
          </span>{' '}
          R$ {input.rendaMensal}
        </Text>
        <Text size='caption' color='text'>
          <span className='font-semibold text-[var(--color-primary-dark)]'>
            Custos mensais:
          </span>{' '}
          R$ {input.custosMensais}
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
            {/* DAS do Simples — rótulo depende da profissão (Anexo III vs IV). */}
            <tr className='hover:bg-primary-light/20'>
              <td className='px-4 py-3 font-medium text-gray-800'>{dasTitulo}</td>
              <td className='px-4 py-3 text-gray-700'>—</td>
              <td className='px-4 py-3 text-gray-700'>
                R$ {PJ.dasMensal ?? PJ.simples6}
              </td>
            </tr>
            <tr className='hover:bg-primary-light/20'>
              <td className='px-4 py-3 font-medium text-gray-800'>
                INSS (sócio / autônomo)
              </td>
              <td className='px-4 py-3 text-gray-700'>R$ {PF.inss}</td>
              <td className='px-4 py-3 text-gray-700'>R$ {PJ.inss}</td>
            </tr>
            {/* CPP patronal — apenas advocacia (material 2026); nas outras profissões não há linha separada. */}
            <tr className='hover:bg-primary-light/20'>
              <td className='px-4 py-3 font-medium text-gray-800'>
                CPP patronal (20% sobre pró-labore)
              </td>
              <td className='px-4 py-3 text-gray-700'>—</td>
              <td className='px-4 py-3 text-gray-700'>
                {PJ.cppPatronal > 0 ? `R$ ${PJ.cppPatronal}` : '—'}
              </td>
            </tr>
            <tr className='hover:bg-primary-light/20'>
              <td className='px-4 py-3 font-medium text-gray-800'>
                Imposto de Renda
              </td>
              <td className='px-4 py-3 text-gray-700'>
                {PF.isentoIR ? 'Isento' : `R$ ${PF.ir}`}
              </td>
              <td className='px-4 py-3 text-gray-700'>
                {PJ.isentoIR ? 'Isento' : `R$ ${PJ.ir}`}
              </td>
            </tr>
            <tr className='hover:bg-primary-light/20'>
              <td className='px-4 py-3 font-medium text-gray-800'>
                Total de impostos
              </td>
              <td className='px-4 py-3 text-gray-700'>R$ {PF.imposto}</td>
              <td className='px-4 py-3 text-gray-700'>R$ {PJ.totalImpostos}</td>
            </tr>
            <tr className='bg-primary-light/40 font-semibold'>
              <td className='px-4 py-3 text-[var(--color-primary-dark)]'>
                Renda líquida
              </td>
              <td className='px-4 py-3 text-gray-900'>R$ {PF.liquido}</td>
              <td className='px-4 py-3 text-gray-900'>R$ {PJ.liquido}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='mt-6 rounded-xl border border-[var(--color-border)] bg-gray-50/80 p-4'>
        <Text size='md' color='text'>
          <span className='font-bold text-[var(--color-primary-dark)]'>
            Conclusão:
          </span>{' '}
          {PJ.liquido > PF.liquido
            ? 'PJ compensa mais neste cenário.'
            : 'PF compensa mais neste cenário.'}
        </Text>
      </div>

      <div className='my-8 h-px bg-[var(--color-border)]' />

      <GraficoComparativo PF={PF} PJ={PJ} />

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
        <Button type='button' variant='secondary' onClick={onBack}>
          Voltar
        </Button>
      </div>
    </div>
  );
}
