import { redirect } from 'next/navigation';
import { getPagamentoPorId, atualizarPagamento } from '@/app/actions/pagamentos';
import CampoInput from '@/components/CampoInput';

export default async function EditarPagamentoPage({ params }) {
  const { id } = await params;
  const pagamento = await getPagamentoPorId(id);

  if (!pagamento) redirect('/pagamentos');

  async function handleSubmit(formData) {
    'use server';
    const res = await atualizarPagamento(id, formData);
    if (res.success) redirect('/pagamentos');
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Editar Pagamento #{id}</h1>
      <form action={handleSubmit} className="bg-white p-6 rounded shadow border border-gray-100 space-y-4 text-gray-800">
        <CampoInput label="Data de Pagamento" name="dataPagamento" type="date" defaultValue={pagamento.dataPagamento} required />
        <CampoInput label="Valor Pago (R$)" name="valorPago" type="number" step="0.01" defaultValue={pagamento.valorPago} required />
        <CampoInput label="Data de Vencimento" name="dataVencimento" type="date" defaultValue={pagamento.dataVencimento} required />
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select name="status" defaultValue={pagamento.status} required className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="PAGO">PAGO</option>
            <option value="PENDENTE">PENDENTE</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>
        <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded transition w-full">
          Atualizar
        </button>
      </form>
    </div>
  );
}