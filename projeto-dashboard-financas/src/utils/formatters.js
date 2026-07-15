/**
 * Formata um valor numerico para o formato monetario brasileiro (BRL)
 * @param {number} value
 * @returns {string}
 */
export function formatCurrency(value) {
  if (value === undefined || value === null || isNaN(value)) {
    return 'R$ 0,00';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
