import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import { getAlunoById } from '@/app/actions/alunos';

export default async function DetalhesAlunoPage({ params }) {
  const { id } = await params;
  const aluno = await getAlunoById(id);

  if (!aluno) return <p className="text-red-500">Erro ao carregar dados do aluno #{id}.</p>;

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow border border-gray-100 space-y-3 text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Detalhes do Aluno</h1>
      <p><strong className="text-gray-900">Nome:</strong> {aluno.nome}</p>
      <p><strong className="text-gray-900">CPF:</strong> {aluno.cpf}</p>
      <p><strong className="text-gray-900">E-mail:</strong> {aluno.email}</p>
      <p><strong className="text-gray-900">Telefone:</strong> {aluno.telefone}</p>
      <p><strong className="text-gray-900">Matrícula:</strong> {aluno.matricula}</p>
      <p><strong className="text-gray-900">Data de Matrícula:</strong> {aluno.dataMatricula}</p>
      <div className="flex items-center space-x-2">
        <strong className="text-gray-900">Status:</strong>
        <StatusBadge status={aluno.statusMatricula} />
      </div>

      <div className="pt-4 space-x-3">
        <Link href={/alunos/${id}/editar} className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 inline-block font-medium">
          Editar
        </Link>
        <Link href="/alunos" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 inline-block font-medium">
          Voltar
        </Link>
      </div>
    </div>
  );
}