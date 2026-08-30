import Link from 'next/link';
import { getInstrutorById } from '@/app/actions/instrutores';

export default async function DetalhesInstrutorPage({ params }) {
  const { id } = await params;
  const instrutor = await getInstrutorById(id);

  if (!instrutor) return <p className="text-red-500">Erro ao carregar dados do instrutor #{id}.</p>;

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow border border-gray-100 space-y-3 text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Detalhes do Instrutor</h1>
      <p><strong className="text-gray-900">Nome:</strong> {instrutor.nome}</p>
      <p><strong className="text-gray-900">CPF:</strong> {instrutor.cpf}</p>
      <p><strong className="text-gray-900">E-mail:</strong> {instrutor.email}</p>
      <p><strong className="text-gray-900">Telefone:</strong> {instrutor.telefone}</p>
      <p><strong className="text-gray-900">CREF:</strong> {instrutor.cref}</p>
      <p><strong className="text-gray-900">Especialidade:</strong> {instrutor.especialidade}</p>
      <p><strong className="text-gray-900">Salário:</strong> R$ {instrutor.salario}</p>

      <div className="pt-4 space-x-3">
        <Link href={/instrutores/${id}/editar} className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 inline-block font-medium">
          Editar
        </Link>
        <Link href="/instrutores" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 inline-block font-medium">
          Voltar
        </Link>
      </div>
    </div>
  );
}