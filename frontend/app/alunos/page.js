import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';
import StatusBadge from '@/components/StatusBadge';
import { getAlunos } from '@/app/actions/alunos';

export default async function AlunosPage() {
  const alunos = await getAlunos();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Alunos</h1>
        <Link href="/alunos/novo" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          + Novo Aluno
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-sm text-gray-500">Nome</th>
              <th className="p-4 font-semibold text-sm text-gray-500">CPF</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Matrícula</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Status</th>
              <th className="p-4 font-semibold text-sm text-gray-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {alunos.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Nenhum aluno cadastrado.
                </td>
              </tr>
            ) : (
              alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{aluno.nome}</td>
                  <td className="p-4 text-gray-700">{aluno.cpf}</td>
                  <td className="p-4 text-gray-700">{aluno.matricula}</td>
                  <td className="p-4">
                    <StatusBadge status={aluno.statusMatricula} />
                  </td>
                  <td className="p-4 text-right space-x-3 font-medium">
                    <Link href={`/alunos/${aluno.id}`} className="text-blue-600 hover:underline">
                      Ver
                    </Link>
                    <Link href={`/alunos/${aluno.id}/editar`} className="text-amber-600 hover:underline">
                      Editar
                    </Link>
                    <BotaoExcluir id={aluno.id} />
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