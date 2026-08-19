export default async function DetalhesAlunoPage({ params }) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Detalhes do Aluno #{id}</h1>
      <p className="text-gray-600">Exibindo informações detalhadas do aluno de ID {id}.</p>
    </div>
  );
}