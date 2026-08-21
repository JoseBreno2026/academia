export default function StatusBadge({ status }) {
  const cores = {
    ATIVO: 'bg-green-100 text-green-800 border-green-300',
    INATIVO: 'bg-red-100 text-red-800 border-red-300',
    PENDENTE: 'bg-amber-100 text-amber-800 border-amber-300',
  };

  const estilo = cores[status?.toUpperCase()] || 'bg-gray-100 text-gray-800 border-gray-300';

  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${estilo}`}>
      {status}
    </span>
  );
}