'use client';

export default function BotaoExcluir({ endpoint, id, onSuccess }) {
  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja excluir o registro #${id}?`)) {
      const res = await fetch(`http://localhost:8081/${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Excluído com sucesso!');
        if (onSuccess) onSuccess();
      } else {
        alert('Erro ao excluir registro.');
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline">
      Excluir
    </button>
  );
}