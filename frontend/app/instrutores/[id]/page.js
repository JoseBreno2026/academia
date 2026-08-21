import Link from 'next/link';
import { getInstrutorById } from '@/app/actions/instrutores';

export default async function DetalhesInstrutorPage({ params }) {
  const { id } = await params;
  const instrutor = await getInstrutorById(id);

  if (!instrutor) return <p className="text-red-500">Erro ao carregar dados do instrutor #{id}.</p>;

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow space-y-3">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Instrutor</h1>
      <p><strong>Nome:</strong> {instrutor.nome}</p>
      <p><strong>CPF:</strong> {instrutor.cpf}</p>
      <p><strong>E-mail:</strong> {instrutor.email}</p>
      <p><strong>Telefone:</strong> {instrutor.telefone}</p>
      <p><strong>CREF:</strong> {instrutor.cref}</p>
      <p><strong>Especialidade:</strong> {instrutor.especialidade}</p>
      <p><strong>Salário:</strong> R$ {instrutor.salario}</p>

      <div className="pt-4 space-x-3">
        <Link href={`/instrutores/${id}/editar`} className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600">
          Editar
        </Link>
        <Link href="/instrutores" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Voltar
        </Link>
      </div>
    </div>
  );
}