'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAlunoById, atualizarAluno } from '@/app/actions/alunos';

export default function EditarAlunoPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    getAlunoById(id).then((data) => {
      setAluno(data);
      setCarregando(false);
    });
  }, [id]);

  async function handleAction(formData) {
    setSalvando(true);
    const res = await atualizarAluno(id, formData);
    setSalvando(false);
    
    if (res.success) {
      alert('Aluno atualizado com sucesso!');
      router.push('/alunos');
    } else {
      alert(`Erro ao atualizar aluno: ${res.error || 'Verifique os dados enviados.'}`);
    }
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-sm font-mono animate-pulse">Carregando dados do aluno #{id}...</p>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-[#121824] border border-red-500/30 rounded-xl text-center space-y-4">
        <p className="text-red-400 font-bold">Aluno não encontrado.</p>
        <Link href="/alunos" className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition">
          Voltar para a Lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            EDITAR ALUNO #{id}
          </h1>
          <p className="text-sm text-gray-400">Atualize as informações cadastrais do aluno.</p>
        </div>
        <Link 
          href="/alunos"
          className="px-3 py-1.5 bg-[#121824] border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg text-xs font-semibold transition"
        >
          ← Voltar
        </Link>
      </div>

      <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-6 shadow-xl">
        <form action={handleAction} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              NOME COMPLETO
            </label>
            <input
              name="nome"
              type="text"
              defaultValue={aluno.nome || ''}
              required
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                CPF
              </label>
              <input
                name="cpf"
                type="text"
                defaultValue={aluno.cpf || ''}
                required
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                MATRÍCULA
              </label>
              <input
                name="matricula"
                type="text"
                defaultValue={aluno.matricula || ''}
                required
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                E-MAIL
              </label>
              <input
                name="email"
                type="email"
                defaultValue={aluno.email || ''}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                TELEFONE
              </label>
              <input
                name="telefone"
                type="text"
                defaultValue={aluno.telefone || ''}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                DATA DA MATRÍCULA
              </label>
              <input
                name="dataMatricula"
                type="date"
                defaultValue={aluno.dataMatricula ? aluno.dataMatricula.split('T')[0] : ''}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635] [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                STATUS DA MATRÍCULA
              </label>
              <select
                name="statusMatricula"
                defaultValue={aluno.statusMatricula || 'ATIVO'}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              >
                <option value="ATIVO">ATIVO</option>
                <option value="INATIVO">INATIVO</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="w-full mt-4 bg-[#a3e635] hover:bg-[#84cc16] disabled:bg-gray-700 text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer"
          >
            {salvando ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
}