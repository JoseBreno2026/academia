'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getExercicios, deletarExercicio } from '@/app/actions/exercicios';

export default function ExerciciosPage() {
  const [exercicios, setExercicios] = useState([]);

  async function carregar() {
    const data = await getExercicios();
    setExercicios(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleDeletar(id) {
    if (confirm('Deseja realmente excluir este exercício?')) {
      const res = await deletarExercicio(id);
      if (res.success) {
        carregar();
      } else {
        alert('Erro ao excluir exercício.');
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Exercícios Configurados</h1>
        <Link
          href="/exercicios/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Novo Exercício
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-sm text-gray-500">ID</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Exercício</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Séries x Repetições</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Carga</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Descanso</th>
              <th className="p-4 font-semibold text-sm text-gray-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {exercicios.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Nenhum exercício cadastrado.
                </td>
              </tr>
            ) : (
              exercicios.map((ex) => (
                <tr key={ex.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-700">{ex.id}</td>
                  <td className="p-4 font-medium text-gray-900">{ex.nome || 'Não especificado'}</td>
                  <td className="p-4 text-gray-700">{ex.series}x{ex.repeticoes}</td>
                  <td className="p-4 text-gray-700">{ex.carga} kg</td>
                  <td className="p-4 text-gray-700">{ex.descansoSegundos}s</td>
                  <td className="p-4 text-right space-x-3 font-medium">
                    <Link
                      href={`/exercicios/${ex.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </Link>
                    <Link
                      href={`/exercicios/${ex.id}/editar`}
                      className="text-amber-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeletar(ex.id)}
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