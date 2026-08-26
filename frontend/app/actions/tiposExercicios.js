'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://localhost:8081/api/tipos-exercicios';

export async function getTiposExercicios() {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Erro em getTiposExercicios:', err);
    return [];
  }
}

export async function getTipoExercicioById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Erro em getTipoExercicioById:', err);
    return null;
  }
}

export async function criarTipoExercicio(formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;

    const data = {
      nome: String(rawData.nome || '').trim(),
      grupoMuscular: String(rawData.grupoMuscular || '').trim(),
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath('/tipos-exercicios');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro do Spring Boot (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro em criarTipoExercicio:', err);
    return { success: false };
  }
}

export async function atualizarTipoExercicio(id, formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;

    const data = {
      nome: String(rawData.nome || '').trim(),
      grupoMuscular: String(rawData.grupoMuscular || '').trim(),
    };

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath('/tipos-exercicios');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro ao atualizar TipoExercicio (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro em atualizarTipoExercicio:', err);
    return { success: false };
  }
}

export async function deletarTipoExercicio(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      revalidatePath('/tipos-exercicios');
      return { success: true };
    }
    const msg = await res.text();
    return { success: false, error: msg };
  } catch (err) {
    console.error('Erro em deletarTipoExercicio:', err);
    return { success: false };
  }
}