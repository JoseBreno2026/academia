'use client';

import { deletarAluno } from '@/app/actions/alunos';
import { deletarInstrutor } from '@/app/actions/instrutores';
import { deletarTreino } from '@/app/actions/treinos';
import { deletarExercicio } from '@/app/actions/exercicios';
import { deletarTipoExercicio } from '@/app/actions/tiposExercicios';

export default function BotaoExcluir({ endpoint = 'alunos', id }) {
  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir o registro #${id}?`)) return;

    let res = { success: false };

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
      case 'alunos':
      default:
        res = await deletarAluno(id);
        break;
    }

    if (!res.success) {
      alert(res.error || 'Erro ao excluir registro. Verifique se existem itens dependentes associados antes de excluir.');
    } else {
      window.location.reload();
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline cursor-pointer">
      Excluir
    </button>
  );
}