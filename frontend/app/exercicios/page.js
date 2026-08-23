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
        <h1 className="text-2xl font-bold">Exercícios Configurados</h1>
        <Link
          href="/exercicios/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Exercício
        </Link>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 font-semibold">ID</th>
              <th className="p-3 font-semibold">Exercício</th>
              <th className="p-3 font-semibold">Séries x Repetições</th>
              <th className="p-3 font-semibold">Carga</th>
              <th className="p-3 font-semibold">Descanso</th>
              <th className="p-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {exercicios.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Nenhum exercício cadastrado.
                </td>
              </tr>
            ) : (
              exercicios.map((ex) => (
                <tr key={ex.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{ex.id}</td>
                  <td className="p-3 font-medium">{ex.nome || 'Não especificado'}</td>
                  <td className="p-3">{ex.series}x{ex.repeticoes}</td>
                  <td className="p-3">{ex.carga} kg</td>
                  <td className="p-3">{ex.descansoSegundos}s</td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      href={`/exercicios/${ex.id}`}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Ver
                    </Link>
                    <Link
                      href={`/exercicios/${ex.id}/editar`}
                      className="text-amber-600 hover:underline mr-2"
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