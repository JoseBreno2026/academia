import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';
import StatusBadge from '@/components/StatusBadge';
import { getAlunos } from '@/app/actions/alunos';

export default async function AlunosPage() {
  const alunos = await getAlunos();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestão de Alunos</h1>
        <Link href="/alunos/novo" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Novo Aluno
        </Link>
      </div>

      <table className="w-full border-collapse border bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">Nome</th>
            <th className="border p-2">CPF</th>
            <th className="border p-2">Matrícula</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td className="border p-2">{aluno.nome}</td>
              <td className="border p-2">{aluno.cpf}</td>
              <td className="border p-2">{aluno.matricula}</td>
              <td className="border p-2">
                <StatusBadge status={aluno.statusMatricula} />
              </td>
              <td className="border p-2 space-x-2">
                <Link href={`/alunos/${aluno.id}`} className="text-blue-600 hover:underline">
                  Ver
                </Link>
                <Link href={`/alunos/${aluno.id}/editar`} className="text-amber-600 hover:underline">
                  Editar
                </Link>
                <BotaoExcluir id={aluno.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}