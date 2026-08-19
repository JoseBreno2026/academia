import Link from 'next/link';

async function getInstrutores() {
  try {
    const res = await fetch('http://localhost:8081/instrutores/', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function InstrutoresPage() {
  const instrutores = await getInstrutores();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestão de Instrutores</h1>
        <Link href="/instrutores/novo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Novo Instrutor
        </Link>
      </div>

      <table className="w-full border-collapse border bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">Nome</th>
            <th className="border p-2">CREF</th>
            <th className="border p-2">Especialidade</th>
            <th className="border p-2">Salário</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {instrutores.map((ins) => (
            <tr key={ins.id}>
              <td className="border p-2">{ins.nome}</td>
              <td className="border p-2">{ins.cref}</td>
              <td className="border p-2">{ins.especialidade}</td>
              <td className="border p-2">R$ {ins.salario}</td>
              <td className="border p-2 space-x-2">
                <Link href={`/instrutores/${ins.id}`} className="text-blue-600 hover:underline">Ver</Link>
                <Link href={`/instrutores/${ins.id}/editar`} className="text-amber-600 hover:underline">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}