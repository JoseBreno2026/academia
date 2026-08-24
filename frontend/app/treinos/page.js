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
        <h1 className="text-3xl font-bold text-gray-900">Treinos Cadastrados</h1>
        <Link
          href="/treinos/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Novo Treino
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-sm text-gray-500">ID</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Nome do Treino</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Status</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Data Fim</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Qtd. Exercícios</th>
              <th className="p-4 font-semibold text-sm text-gray-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {treinos.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Nenhum treino cadastrado.
                </td>
              </tr>
            ) : (
              treinos.map((tr) => (
                <tr key={tr.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-700">{tr.id}</td>
                  <td className="p-4 font-medium text-gray-900">{tr.nomeTreino}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 text-xs rounded-full font-semibold ${
                        tr.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tr.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{tr.dataFim || 'Não informada'}</td>
                  <td className="p-4 text-gray-700">{tr.listaExercicios ? tr.listaExercicios.length : 0}</td>
                  <td className="p-4 text-right space-x-3 font-medium">
                    <Link
                      href={`/treinos/${tr.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </Link>
                    <Link
                      href={`/treinos/${tr.id}/editar`}
                      className="text-amber-600 hover:underline"
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