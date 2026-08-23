import Link from 'next/link';
import { getTipoExercicioById } from '@/app/actions/tiposExercicios'; // Ajuste o nome da sua Server Action

export default async function DetalhesTipoExercicioPage({ params }) {
  const { id } = await params;
  const tipo = await getTipoExercicioById(id);

  if (!tipo) {
    return <p className="text-white">Tipo de Exercício não encontrado.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md text-gray-800">
      <h2 className="text-xl font-bold mb-4">Detalhes do Tipo de Exercício</h2>
      
      <div className="space-y-2">
        <p><strong>ID:</strong> {tipo.id}</p>
        <p><strong>Nome:</strong> {tipo.nome}</p>
        <p><strong>Grupo Muscular:</strong> {tipo.grupoMuscular || 'Não informado'}</p>
      </div>

      <div className="mt-6 flex gap-2">
        <Link 
          href={`/tipos-exercicios/${id}/editar`} 
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
        >
          Editar
        </Link>
        <Link 
          href="/tipos-exercicios" 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}