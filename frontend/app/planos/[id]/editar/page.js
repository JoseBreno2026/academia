import { redirect } from 'next/navigation';
import { getPlanoPorId, atualizarPlano } from '@/app/actions/planos';
import CampoInput from '@/components/CampoInput';

export default async function EditarPlanoPage({ params }) {
  const { id } = await params;
  const plano = await getPlanoPorId(id);

  if (!plano) redirect('/planos');

  async function handleSubmit(formData) {
    'use server';
    const res = await atualizarPlano(id, formData);
    if (res.success) redirect('/planos');
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Plano #{id}</h1>
      <form action={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <CampoInput label="Nome do Plano" name="nomePlano" defaultValue={plano.nomePlano} required />
        <CampoInput label="Preço (R$)" name="preco" type="number" step="0.01" defaultValue={plano.preco} required />
        <CampoInput label="Modalidade" name="modalidade" defaultValue={plano.modalidade} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Atualizar
        </button>
      </form>
    </div>
  );
}