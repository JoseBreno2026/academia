import Link from 'next/link';
import { getPagamentos } from '@/app/actions/pagamentos';
import StatusBadge from '@/components/StatusBadge';
import BotaoExcluir from '@/components/BotaoExcluir';

export default async function PagamentosPage() {
  const pagamentos = await getPagamentos();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Pagamentos</h1>
        <Link
          href="/pagamentos/novo"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
        >
          Novo Pagamento
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-500 text-sm font-semibold">
              <th className="p-4">ID</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Data Pagamento</th>
              <th className="p-4">Vencimento</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
            {pagamentos.map((pagamento) => (
              <tr key={pagamento.id} className="hover:bg-gray-50">
                <td className="p-4">{pagamento.id}</td>
                <td className="p-4 font-medium text-gray-900">R$ {pagamento.valorPago?.toFixed(2)}</td>
                <td className="p-4">{pagamento.dataPagamento}</td>
                <td className="p-4">{pagamento.dataVencimento}</td>
                <td className="p-4">
                  <StatusBadge status={pagamento.status} />
                </td>
                <td className="p-4 text-right space-x-3">
                  <Link href={`/pagamentos/${pagamento.id}`} className="text-sky-500 hover:underline">
                    Ver
                  </Link>
                  <Link href={`/pagamentos/${pagamento.id}/editar`} className="text-amber-500 hover:underline">
                    Editar
                  </Link>
                  <BotaoExcluir endpoint="pagamentos" id={pagamento.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}