import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getPagamentoPorId } from '@/app/actions/pagamentos';
import StatusBadge from '@/components/StatusBadge';

export default async function DetalhesPagamentoPage({ params }) {
  const { id } = await params;
  const pagamento = await getPagamentoPorId(id);

  if (!pagamento) redirect('/pagamentos');

  return (
    <div className="max-w-md bg-white rounded-lg p-6 shadow-md text-gray-800 space-y-3">
      <h1 className="text-xl font-bold mb-4">Detalhes do Pagamento</h1>

      <p><span className="font-bold">ID:</span> {pagamento.id}</p>
      <p><span className="font-bold">Valor Pago:</span> R$ {pagamento.valorPago?.toFixed(2)}</p>
      <p><span className="font-bold">Data de Pagamento:</span> {pagamento.dataPagamento}</p>
      <p><span className="font-bold">Data de Vencimento:</span> {pagamento.dataVencimento}</p>
      <div className="flex items-center gap-2">
        <span className="font-bold">Status:</span>
        <StatusBadge status={pagamento.status} />
      </div>

      <div className="flex space-x-3 pt-4">
        <Link
          href={`/pagamentos/${pagamento.id}/editar`}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2 rounded"
        >
          Editar
        </Link>
        <Link
          href="/pagamentos"
          className="bg-slate-500 hover:bg-slate-600 text-white font-medium px-5 py-2 rounded"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}