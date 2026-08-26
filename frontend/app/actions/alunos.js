'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://localhost:8081/alunos';

export async function getAlunos() {
  try {
    const res = await fetch(`${API_URL}/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Erro em getAlunos:', err);
    return [];
  }
}

export async function getAlunoById(id) {
  try {
    const res = await fetch(`${API_URL}/id/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Erro em getAlunoById:', err);
    return null;
  }
}

export async function criarAluno(formData) {
  try {
    let payload = {};

    if (formData instanceof FormData) {
      payload = Object.fromEntries(formData.entries());
    } else {
      payload = { ...formData };
    }

    // Se a data de matrícula não for informada no formulário, gera a data atual (YYYY-MM-DD)
    if (!payload.dataMatricula || payload.dataMatricula.trim() === '') {
      payload.dataMatricula = new Date().toISOString().split('T')[0];
    }

    console.log('Dados enviados ao Backend:', payload);

    const res = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      revalidatePath('/alunos');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro do Spring Boot (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro no fetch de criarAluno:', err);
    return { success: false };
  }
}

export async function atualizarAluno(id, formData) {
  try {
    const data = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath('/alunos');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro ao atualizar no Spring (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro em atualizarAluno:', err);
    return { success: false };
  }
}

export async function deletarAluno(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      revalidatePath('/alunos');
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error('Erro em deletarAluno:', err);
    return { success: false };
  }
}