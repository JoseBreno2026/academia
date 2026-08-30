'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://localhost:8081/api/treinos';

export async function getTreinos() {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Erro em getTreinos:', err);
    return [];
  }
}

export async function getTreinoById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Erro em getTreinoById:', err);
    return null;
  }
}

export async function criarTreino(payload) {
  try {
    let data = payload;
    if (payload instanceof FormData) {
      const rawData = Object.fromEntries(payload.entries());
      data = {
        nomeTreino: rawData.nomeTreino,
        dataCriacao: rawData.dataCriacao || null,
        dataFim: rawData.dataFim || null,
        ativo: rawData.ativo === 'true',
        instrutorId: rawData.instrutorId ? Number(rawData.instrutorId) : null,
        exerciciosIds: payload.getAll('exerciciosIds').map(Number),
      };
    }

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath('/treinos');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro do Spring Boot (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro em criarTreino:', err);
    return { success: false };
  }
}

export async function atualizarTreino(id, payload) {
  try {
    let data = payload;
    if (payload instanceof FormData) {
      const rawData = Object.fromEntries(payload.entries());

      data = {
        nomeTreino: rawData.nomeTreino,
        dataFim: rawData.dataFim || null,
        ativo: rawData.ativo === 'true',
        exerciciosIds: payload.getAll('exerciciosIds').map(Number),
      };

      // Só envia dataCriacao se ela realmente existir no formulário
      if (rawData.dataCriacao) {
        data.dataCriacao = rawData.dataCriacao;
      }

      // Só envia instrutorId se o campo existir no formulário
      if (rawData.instrutorId) {
        data.instrutorId = Number(rawData.instrutorId);
      }
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath('/treinos');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro ao atualizar Treino (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro em atualizarTreino:', err);
    return { success: false };
  }
}

export async function deletarTreino(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      revalidatePath('/treinos');
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error('Erro em deletarTreino:', err);
    return { success: false };
  }
}