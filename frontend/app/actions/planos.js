'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://localhost:8081/api/planos';

export async function getPlanos() {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Erro em getPlanos:', error);
    return [];
  }
}

export async function getPlanoPorId(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Erro em getPlanoPorId:', error);
    return null;
  }
}

export async function criarPlano(formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;
    const payload = {
      nomePlano: rawData.nomePlano,
      preco: Number(rawData.preco) || 0,
      modalidade: rawData.modalidade,
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

    revalidatePath('/planos');
    return { success: true };
  } catch (error) {
    console.error('Erro em criarPlano:', error);
    return { success: false, error: 'Erro de conexão com o servidor.' };
  }
}

export async function atualizarPlano(id, formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;
    const payload = {
      nomePlano: rawData.nomePlano,
      preco: Number(rawData.preco) || 0,
      modalidade: rawData.modalidade,
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

    revalidatePath('/planos');
    return { success: true };
  } catch (error) {
    console.error('Erro em atualizarPlano:', error);
    return { success: false, error: 'Erro de conexão com o servidor.' };
  }
}

export async function deletarPlano(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const errorMsg = await res.text();
      return { success: false, error: errorMsg };
    }

    revalidatePath('/planos');
    return { success: true };
  } catch (error) {
    console.error('Erro em deletarPlano:', error);
    return { success: false, error: 'Erro de conexão com o servidor.' };
  }
}