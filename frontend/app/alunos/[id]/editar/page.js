export default async function EditarAlunoPage({ params }) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Editar Aluno #{id}</h1>
      <p className="text-gray-600">Formulário de alteração de dados do aluno {id}.</p>
    </div>
  );
}