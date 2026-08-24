'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTiposExercicios, deletarTipoExercicio } from '@/app/actions/tiposExercicios';

export default function TiposExerciciosPage() {
  const [tipos, setTipos] = useState([]);

  async function carregar() {
    const data = await getTiposExercicios();
    setTipos(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleDeletar(id) {
    if (confirm('Deseja realmente excluir este tipo de exercício?')) {
      const res = await deletarTipoExercicio(id);
      if (res.success) {
        carregar();
      } else {
        alert(res.error || 'Erro ao excluir tipo de exercício.');
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tipos de Exercícios</h1>
        <Link
          href="/tipos-exercicios/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Novo Tipo
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-sm text-gray-500">ID</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Nome</th>
              <th className="p-4 font-semibold text-sm text-gray-500">Grupo Muscular</th>
              <th className="p-4 font-semibold text-sm text-gray-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {tipos.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Nenhum tipo de exercício cadastrado.
                </td>
              </tr>
            ) : (
              tipos.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-700">{t.id}</td>
                  <td className="p-4 font-medium text-gray-900">{t.nome}</td>
                  <td className="p-4 text-gray-700">{t.grupoMuscular}</td>
                  <td className="p-4 text-right space-x-3 font-medium">
                    <Link
                      href={`/tipos-exercicios/${t.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </Link>
                    <Link
                      href={`/tipos-exercicios/${t.id}/editar`}
                      className="text-amber-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeletar(t.id)}
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