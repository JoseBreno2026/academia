export default async function DetalhesInstrutorPage({ params }) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Detalhes do Instrutor #{id}</h1>
      <p className="text-gray-600">Exibindo informações detalhadas do instrutor de ID {id}.</p>
    </div>
  );
}