import api from '../config';

export async function compareTaxesRequest({
  rendaMensal,
  custosMensais,
  profissao,
}) {
  const { data } = await api.post('/tax/compare', {
    rendaMensal: Number(rendaMensal),
    custosMensais: Number(custosMensais),
    profissao,
  });

  return data.result;
}

export async function getTaxComparisonsRequest() {
  const { data } = await api.get('/tax/comparisons');

  return data;
}

export async function getTaxComparisonByIdRequest(id) {
  const { data } = await api.get(`/tax/comparisons/${id}`);

  return data;
}
