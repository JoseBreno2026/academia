import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getPlanoPorId } from '@/app/actions/planos';

export default async function DetalhesPlanoPage({ params }) {
  const { id } = await params;
  const plano = await getPlanoPorId(id);

  if (!plano) redirect('/planos');

  return (
    <div className="max-w-md bg-white rounded-lg p-6 shadow-md text-gray-800 space-y-3">
      <h1 className="text-xl font-bold mb-4">Detalhes do Plano</h1>

      <p><span className="font-bold">ID:</span> {plano.id}</p>
      <p><span className="font-bold">Nome:</span> {plano.nomePlano}</p>
      <p><span className="font-bold">Preço:</span> R$ {plano.preco?.toFixed(2)}</p>
      <p><span className="font-bold">Modalidade:</span> {plano.modalidade}</p>

      <div className="flex space-x-3 pt-4">
        <Link
          href={`/planos/${plano.id}/editar`}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2 rounded"
        >
          Editar
        </Link>
        <Link
          href="/planos"
          className="bg-slate-500 hover:bg-slate-600 text-white font-medium px-5 py-2 rounded"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}