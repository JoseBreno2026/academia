import Link from 'next/link';
import { getPlanos } from '@/app/actions/planos';
import BotaoExcluir from '@/components/BotaoExcluir';

export default async function PlanosPage() {
  const planos = await getPlanos();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Planos</h1>
        <Link
          href="/planos/novo"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
        >
          Novo Plano
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-500 text-sm font-semibold">
              <th className="p-4">ID</th>
              <th className="p-4">Nome</th>
              <th className="p-4">Preço</th>
              <th className="p-4">Modalidade</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
            {planos.map((plano) => (
              <tr key={plano.id} className="hover:bg-gray-50">
                <td className="p-4">{plano.id}</td>
                <td className="p-4 font-medium text-gray-900">{plano.nomePlano}</td>
                <td className="p-4">R$ {plano.preco?.toFixed(2)}</td>
                <td className="p-4">{plano.modalidade}</td>
                <td className="p-4 text-right space-x-3">
                  <Link href={`/planos/${plano.id}`} className="text-sky-500 hover:underline">
                    Ver
                  </Link>
                  <Link href={`/planos/${plano.id}/editar`} className="text-amber-500 hover:underline">
                    Editar
                  </Link>
                  <BotaoExcluir endpoint="planos" id={plano.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}