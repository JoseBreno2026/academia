'use server';

const API_URL = 'http://localhost:8081/api/pagamentos';

export async function getPagamentos() {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getPagamentoPorId(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function criarPagamento(formData) {
  try {
    const payload = {
      dataPagamento: formData.get('dataPagamento'),
      valorPago: Number(formData.get('valorPago')),
      dataVencimento: formData.get('dataVencimento'),
      status: formData.get('status'),
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      return { success: false, error: errorMsg };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' };
  }
}

export async function atualizarPagamento(id, formData) {
  try {
    const payload = {
      dataPagamento: formData.get('dataPagamento'),
      valorPago: Number(formData.get('valorPago')),
      dataVencimento: formData.get('dataVencimento'),
      status: formData.get('status'),
    };

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      return { success: false, error: errorMsg };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' };
  }
}

export async function deletarPagamento(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const errorMsg = await res.text();
      return { success: false, error: errorMsg };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' };
  }
}