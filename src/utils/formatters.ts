export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getAnnualAcademicTotal(
  tuition: number,
  labFee: number,
  examFee: number
): number {
  return tuition + labFee + examFee;
}
