export default function StatusBadge({ status }) {
  const cores = {
    PAGO: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    ATIVO: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    INATIVO: 'bg-rose-950 text-rose-400 border-rose-800',
    CANCELADO: 'bg-rose-950 text-rose-400 border-rose-800',
    PENDENTE: 'bg-amber-950 text-amber-400 border-amber-800',
  };

  const statusFormatado = status ? status.toUpperCase() : 'INATIVO';
  const estilo = cores[statusFormatado] || 'bg-gray-800 text-gray-300 border-gray-700';

  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold rounded border uppercase tracking-wide ${estilo}`}>
      {statusFormatado}
    </span>
  );
}