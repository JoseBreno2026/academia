'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletarAluno } from '@/app/actions/alunos';
import { deletarInstrutor } from '@/app/actions/instrutores';
import { deletarTreino } from '@/app/actions/treinos';
import { deletarExercicio } from '@/app/actions/exercicios';
import { deletarTipoExercicio } from '@/app/actions/tiposExercicios';
import { deletarPlano } from '@/app/actions/planos';
import { deletarPagamento } from '@/app/actions/pagamentos';

export default function BotaoExcluir({ endpoint = 'alunos', id }) {
  const router = useRouter();
  const [excluindo, setExcluindo] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir o registro #${id}?`)) return;

    setExcluindo(true);
    let res = { success: false };

    try {
      switch (endpoint) {
        case 'instrutores':
          res = await deletarInstrutor(id);
          break;
        case 'treinos':
          res = await deletarTreino(id);
          break;
        case 'exercicios':
          res = await deletarExercicio(id);
          break;
        case 'tipos-exercicios':
          res = await deletarTipoExercicio(id);
          break;
        case 'planos':
          res = await deletarPlano(id);
          break;
        case 'pagamentos':
          res = await deletarPagamento(id);
          break;
        case 'alunos':
        default:
          res = await deletarAluno(id);
          break;
      }

      if (!res.success) {
        alert(res.error || 'Erro ao excluir registro. Verifique se existem itens dependentes associados.');
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert('Erro inesperado ao excluir.');
    } finally {
      setExcluindo(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={excluindo}
      className="p-1 text-gray-400 hover:text-red-400 transition cursor-pointer disabled:opacity-50"
      title="Excluir"
    >
      {excluindo ? '⏳' : '🗑️'}
    </button>
  );
}