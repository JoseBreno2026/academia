'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://localhost:8081/api/exercicios';

export async function getExercicios() {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Erro em getExercicios:', err);
    return [];
  }
}

export async function getExercicioById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Erro em getExercicioById:', err);
    return null;
  }
}

export async function criarExercicio(formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;

    const data = {
      series: Number(rawData.series),
      repeticoes: Number(rawData.repeticoes),
      carga: Number(rawData.carga),
      descansoSegundos: Number(rawData.descansoSegundos),
      tipoExercicioId: Number(rawData.tipoExercicioId),
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath('/exercicios');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro do Spring Boot (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro em criarExercicio:', err);
    return { success: false };
  }
}

export async function atualizarExercicio(id, formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;

    const data = {
      series: Number(rawData.series),
      repeticoes: Number(rawData.repeticoes),
      carga: Number(rawData.carga),
      descansoSegundos: Number(rawData.descansoSegundos),
      tipoExercicioId: Number(rawData.tipoExercicioId),
    };

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath('/exercicios');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro ao atualizar Exercicio (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro em atualizarExercicio:', err);
    return { success: false };
  }
}

export async function deletarExercicio(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      revalidatePath('/exercicios');
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error('Erro em deletarExercicio:', err);
    return { success: false };
  }
}