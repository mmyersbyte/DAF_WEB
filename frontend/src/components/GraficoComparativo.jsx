import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const COLOR_PF = '#16a34a';
const COLOR_PJ = '#86efac';
const COLOR_PF_BORDER = '#15803d';
const COLOR_PJ_BORDER = '#22c55e';

export default function GraficoComparativo({ PF, PJ }) {
  const data = useMemo(() => {
    const dasPJ = PJ.dasMensal ?? PJ.simples6 ?? 0;
    const cppPJ = PJ.cppPatronal ?? 0;

    return {
      labels: [
        'DAS (PJ)',
        'INSS',
        'CPP patronal',
        'IRPF',
        'Total de impostos',
        'Renda líquida',
      ],
      datasets: [
        {
          label: 'PF',
          backgroundColor: COLOR_PF,
          borderColor: COLOR_PF_BORDER,
          borderWidth: 1,
          borderRadius: 6,
          data: [
            0,
            PF.inss ?? 0,
            0,
            PF.ir ?? 0,
            PF.imposto ?? 0,
            PF.liquido ?? 0,
          ],
        },
        {
          label: 'PJ',
          backgroundColor: COLOR_PJ,
          borderColor: COLOR_PJ_BORDER,
          borderWidth: 1,
          borderRadius: 6,
          data: [
            dasPJ,
            PJ.inss ?? 0,
            cppPJ,
            PJ.ir ?? 0,
            PJ.totalImpostos ?? 0,
            PJ.liquido ?? 0,
          ],
        },
      ],
    };
  }, [PF, PJ]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 16,
            font: { size: 13, family: 'Inter, system-ui, sans-serif' },
            color: '#374151',
          },
        },
        title: {
          display: true,
          text: 'Comparativo PF × PJ',
          font: {
            size: 18,
            weight: '600',
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#166534',
          padding: { bottom: 12 },
        },
        tooltip: {
          backgroundColor: 'rgba(255,255,255,0.96)',
          titleColor: '#166534',
          bodyColor: '#374151',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => {
              const v = ctx.raw;
              if (v == null || Number.isNaN(v))
                return `${ctx.dataset.label}: —`;
              return `${ctx.dataset.label}: R$ ${Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            },
          },
        },
      },
      scales: {
        x: {
          type: 'category',
          grid: { display: false },
          ticks: { color: '#6b7280', maxRotation: 45, minRotation: 0 },
        },
        y: {
          type: 'linear',
          beginAtZero: true,
          grid: { color: 'rgba(34, 197, 94, 0.08)' },
          ticks: {
            color: '#6b7280',
            callback: (value) =>
              `R$ ${Number(value).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`,
          },
        },
      },
    }),
    [],
  );

  return (
    <section
      className='rounded-2xl border border-[var(--color-border)] bg-gradient-to-b from-white to-primary-light/15 p-4 shadow-inner md:p-6'
      aria-labelledby='grafico-comparativo-title'
    >
      <h3
        id='grafico-comparativo-title'
        className='sr-only'
      >
        Gráfico comparativo entre PF e PJ
      </h3>
      <div className='relative h-[360px] w-full md:h-[400px]'>
        <Bar
          data={data}
          options={options}
        />
      </div>
    </section>
  );
}
