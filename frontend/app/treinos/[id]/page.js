import Link from 'next/link';
import { getTreinoById } from '@/app/actions/treinos';

export default async function DetalhesTreinoPage({ params }) {
  const { id } = await params;
  const treino = await getTreinoById(id);

  if (!treino) {
    return <p className="text-white">Treino não encontrado.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-lg text-gray-800">
      <h2 className="text-xl font-bold mb-4">Detalhes do Treino</h2>
      
      <div className="space-y-2">
        <p><strong>ID:</strong> {treino.id}</p>
        <p><strong>Nome do Treino:</strong> {treino.nomeTreino || treino.nome || 'Não informado'}</p>
        <p><strong>Status:</strong> {treino.ativo !== undefined ? (treino.ativo ? 'Ativo' : 'Inativo') : (treino.status || 'Ativo')}</p>
        <p><strong>Data Fim:</strong> {treino.dataFim || 'Não informada'}</p>
      </div>

      <div className="mt-6 flex gap-2">
        <Link 
          href={`/treinos/${id}/editar`} 
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
        >
          Editar
        </Link>
        <Link 
          href="/treinos" 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}