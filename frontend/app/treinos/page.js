'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTreinos, deletarTreino } from '@/app/actions/treinos';

export default function TreinosPage() {
  const [treinos, setTreinos] = useState([]);

  async function carregar() {
    const data = await getTreinos();
    setTreinos(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleDeletar(id) {
    if (confirm('Deseja realmente excluir este treino?')) {
      const res = await deletarTreino(id);
      if (res.success) {
        carregar();
      } else {
        alert('Erro ao excluir treino.');
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Treinos Cadastrados</h1>
        <Link
          href="/treinos/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Treino
        </Link>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 font-semibold">ID</th>
              <th className="p-3 font-semibold">Nome do Treino</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Data Fim</th>
              <th className="p-3 font-semibold">Qtd. Exercícios</th>
              <th className="p-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {treinos.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Nenhum treino cadastrado.
                </td>
              </tr>
            ) : (
              treinos.map((tr) => (
                <tr key={tr.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{tr.id}</td>
                  <td className="p-3 font-medium">{tr.nomeTreino}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded font-semibold ${
                        tr.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tr.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-3">{tr.dataFim || 'Não informada'}</td>
                  <td className="p-3">{tr.listaExercicios ? tr.listaExercicios.length : 0}</td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      href={`/treinos/${tr.id}`}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Ver
                    </Link>
                    <Link
                      href={`/treinos/${tr.id}/editar`}
                      className="text-amber-600 hover:underline mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeletar(tr.id)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}