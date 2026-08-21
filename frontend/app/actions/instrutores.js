'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://localhost:8081/instrutores';

export async function getInstrutores() {
  try {
    const res = await fetch(`${API_URL}/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Erro em getInstrutores:', err);
    return [];
  }
}

export async function getInstrutorById(id) {
  try {
    const res = await fetch(`${API_URL}/id/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Erro em getInstrutorById:', err);
    return null;
  }
}

export async function criarInstrutor(formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;
    
    const data = {
      ...rawData,
      salario: Number(rawData.salario) || 0
    };

    console.log('Dados do Instrutor enviados ao Backend:', data);

    const res = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath('/instrutores');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro do Spring Boot (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro no fetch de criarInstrutor:', err);
    return { success: false };
  }
}

export async function atualizarInstrutor(id, formData) {
  try {
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;
    
    const data = {
      ...rawData,
      salario: Number(rawData.salario) || 0
    };

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath('/instrutores');
      return { success: true };
    }

    const erroSpring = await res.text();
    console.error(`Erro ao atualizar Instrutor no Spring (${res.status}):`, erroSpring);
    return { success: false, error: erroSpring };
  } catch (err) {
    console.error('Erro em atualizarInstrutor:', err);
    return { success: false };
  }
}

export async function deletarInstrutor(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      revalidatePath('/instrutores');
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error('Erro em deletarInstrutor:', err);
    return { success: false };
  }
}