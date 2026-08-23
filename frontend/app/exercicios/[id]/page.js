import Link from 'next/link';
import { getExercicioById } from '@/app/actions/exercicios';

export default async function DetalhesExercicioPage({ params }) {
  const { id } = await params;
  const exercicio = await getExercicioById(id);

  if (!exercicio) {
    return <p className="text-white">Exercício não encontrado.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md text-gray-800">
      <h2 className="text-xl font-bold mb-4">Detalhes do Exercício</h2>
      
      <div className="space-y-2">
        <p><strong>ID:</strong> {exercicio.id}</p>
        <p><strong>Exercício:</strong> {exercicio.nome || exercicio.tipoExercicio?.nome || 'Não especificado'}</p>
        <p><strong>Séries x Repetições:</strong> {exercicio.series}x{exercicio.repeticoes}</p>
        <p><strong>Carga:</strong> {exercicio.carga} kg</p>
        <p><strong>Descanso:</strong> {exercicio.descansoSegundos ?? exercicio.tempoDescanso ?? 0}s</p>
      </div>

      <div className="mt-6 flex gap-2">
        <Link 
          href={`/exercicios/${id}/editar`} 
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
        >
          Editar
        </Link>
        <Link 
          href="/exercicios" 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}