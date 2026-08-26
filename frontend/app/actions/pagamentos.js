'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://localhost:8081/api/pagamentos';

export async function getPagamentos() {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    
    // LOG PARA INSPEÇÃO NO TERMINAL DO VS CODE
    console.log('--- PAYLOAD DE PAGAMENTOS RECEBIDO DA API ---');
    console.log(JSON.stringify(data[0] || data, null, 2));

    return data;
  } catch (error) {
    console.error('Erro em getPagamentos:', error);
    return [];
  }
}

export async function getPagamentoPorId(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Erro em getPagamentoPorId:', error);
    return null;
  }
}

export async function criarPagamento(formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;
    
    // Mapeamento prevendo o modelo comum do Spring Boot (Aluno como Objeto ou ID)
    const payload = {
      dataPagamento: rawData.dataPagamento || new Date().toISOString().split('T')[0],
      valorPago: Number(rawData.valorPago) || 0,
      dataVencimento: rawData.dataVencimento,
      status: rawData.status || 'PENDENTE',
      aluno: rawData.alunoId ? { id: Number(rawData.alunoId) } : undefined,
      plano: rawData.planoId ? { id: Number(rawData.planoId) } : undefined,
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

    revalidatePath('/pagamentos');
    return { success: true };
  } catch (error) {
    console.error('Erro em criarPagamento:', error);
    return { success: false, error: 'Erro de conexão com o servidor.' };
  }
}

export async function atualizarPagamento(id, formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;

    const payload = {
      dataPagamento: rawData.dataPagamento,
      valorPago: Number(rawData.valorPago) || 0,
      dataVencimento: rawData.dataVencimento,
      status: rawData.status,
      aluno: rawData.alunoId ? { id: Number(rawData.alunoId) } : undefined,
      plano: rawData.planoId ? { id: Number(rawData.planoId) } : undefined,
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

    revalidatePath('/pagamentos');
    return { success: true };
  } catch (error) {
    console.error('Erro em atualizarPagamento:', error);
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

    revalidatePath('/pagamentos');
    return { success: true };
  } catch (error) {
    console.error('Erro em deletarPagamento:', error);
    return { success: false, error: 'Erro de conexão com o servidor.' };
  }
}