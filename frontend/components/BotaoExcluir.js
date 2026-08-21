'use client';

import { deletarAluno } from '@/app/actions/alunos';
import { deletarInstrutor } from '@/app/actions/instrutores';

export default function BotaoExcluir({ endpoint = 'alunos', id }) {
  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja excluir o registro #${id}?`)) {
      let res;
      if (endpoint === 'instrutores') {
        const fetchRes = await fetch(`http://localhost:8081/instrutores/${id}`, { method: 'DELETE' });
        res = { success: fetchRes.ok };
      } else {
        res = await deletarAluno(id);
      }

      if (!res.success) {
        alert('Erro ao excluir registro.');
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline">
      Excluir
    </button>
  );
}