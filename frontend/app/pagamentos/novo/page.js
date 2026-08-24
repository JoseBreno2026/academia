import { redirect } from 'next/navigation';
import { criarPagamento } from '@/app/actions/pagamentos';
import CampoInput from '@/components/CampoInput';

export default function NovoPagamentoPage() {
  async function handleSubmit(formData) {
    'use server';
    const res = await criarPagamento(formData);
    if (res.success) redirect('/pagamentos');
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Registrar Pagamento</h1>
      <form action={handleSubmit} className="bg-white p-6 rounded shadow border border-gray-100 space-y-4 text-gray-800">
        <CampoInput label="Data de Pagamento" name="dataPagamento" type="date" required />
        <CampoInput label="Valor Pago (R$)" name="valorPago" type="number" step="0.01" required />
        <CampoInput label="Data de Vencimento" name="dataVencimento" type="date" required />
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select name="status" required className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="PAGO">PAGO</option>
            <option value="PENDENTE">PENDENTE</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition w-full">
          Salvar
        </button>
      </form>
    </div>
  );
}