'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';

export default function InstrutoresPage() {
  const [instrutores, setInstrutores] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarInstrutores = () => {
    setCarregando(true);
    fetch('http://localhost:8081/instrutores/')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setInstrutores(data))
      .catch((err) => console.error(err))
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    carregarInstrutores();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestão de Instrutores</h1>
        <Link href="/instrutores/novo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Novo Instrutor
        </Link>
      </div>

      {carregando ? (
        <p>Carregando instrutores...</p>
      ) : (
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
                  <Link href={`/instrutores/${ins.id}`} className="text-blue-600 hover:underline">
                    Ver
                  </Link>
                  <Link href={`/instrutores/${ins.id}/editar`} className="text-amber-600 hover:underline">
                    Editar
                  </Link>
                  <BotaoExcluir endpoint="instrutores" id={ins.id} onSuccess={carregarInstrutores} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}