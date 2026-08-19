export default async function EditarInstrutorPage({ params }) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Editar Instrutor #{id}</h1>
      <p className="text-gray-600">Formulário de alteração de dados do instrutor {id}.</p>
    </div>
  );
}