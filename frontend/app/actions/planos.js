'use server';

const API_URL = 'http://localhost:8081/api/planos';

export async function getPlanos() {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getPlanoPorId(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function criarPlano(formData) {
  try {
    const payload = {
      nomePlano: formData.get('nomePlano'),
      preco: Number(formData.get('preco')),
      modalidade: formData.get('modalidade'),
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

export async function atualizarPlano(id, formData) {
  try {
    const payload = {
      nomePlano: formData.get('nomePlano'),
      preco: Number(formData.get('preco')),
      modalidade: formData.get('modalidade'),
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

export async function deletarPlano(id) {
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