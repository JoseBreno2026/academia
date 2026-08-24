import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';
import { getInstrutores } from '@/app/actions/instrutores';

export default async function InstrutoresPage() {
  const instrutores = await getInstrutores();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Instrutores</h1>
        <Link href="/instrutores/novo" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          + Novo Instrutor
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-sm text-gray-500">Nome</th>
              <th className="p-4 font-semibold text-sm text-gray-500">CREF</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Especialidade</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Salário</th>
              <th className="p-4 font-semibold text-sm text-gray-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {instrutores.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Nenhum instrutor cadastrado.
                </td>
              </tr>
            ) : (
              instrutores.map((ins) => (
                <tr key={ins.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{ins.nome}</td>
                  <td className="p-4 text-gray-700">{ins.cref}</td>
                  <td className="p-4 text-gray-700">{ins.especialidade}</td>
                  <td className="p-4 text-gray-700">R$ {ins.salario}</td>
                  <td className="p-4 text-right space-x-3 font-medium">
                    <Link href={`/instrutores/${ins.id}`} className="text-blue-600 hover:underline">
                      Ver
                    </Link>
                    <Link href={`/instrutores/${ins.id}/editar`} className="text-amber-600 hover:underline">
                      Editar
                    </Link>
                    <BotaoExcluir endpoint="instrutores" id={ins.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}