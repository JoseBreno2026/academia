import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';
import { getInstrutores, criarInstrutor } from '@/app/actions/instrutores';

export default async function InstrutoresPage({ searchParams }) {
  const params = await searchParams;
  const cpfBusca = params?.cpf || '';

  let instrutores = await getInstrutores();

  if (cpfBusca.trim() !== '') {
    const cpfLimpo = cpfBusca.replace(/\D/g, '');
    instrutores = instrutores.filter((ins) => {
      const insCpfLimpo = (ins.cpf || '').replace(/\D/g, '');
      return insCpfLimpo.includes(cpfLimpo);
    });
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            INSTRUTORES
          </h1>
          <p className="text-sm text-gray-400">
            Cadastro, consulta por CPF e gestão da equipe técnica.
          </p>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tabela de Instrutores */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase mb-4">
              VER INSTRUTORES {cpfBusca && <span className="text-[#a3e635] font-normal">(Filtrado por CPF)</span>}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="pb-3 px-2">ID</th>
                    <th className="pb-3 px-2">Nome</th>
                    <th className="pb-3 px-2">CPF</th>
                    <th className="pb-3 px-2">CREF</th>
                    <th className="pb-3 px-2">Especialidade</th>
                    <th className="pb-3 px-2">Salário</th>
                    <th className="pb-3 px-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50 text-xs">
                  {instrutores.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500">
                        Nenhum instrutor encontrado.
                      </td>
                    </tr>
                  ) : (
                    instrutores.map((ins) => (
                      <tr key={ins.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-2 font-mono text-gray-400">{ins.id}</td>
                        <td className="py-3 px-2 font-bold text-white">{ins.nome}</td>
                        <td className="py-3 px-2 text-gray-300 font-mono">{ins.cpf || '-'}</td>
                        <td className="py-3 px-2 text-gray-300 font-mono">{ins.cref}</td>
                        <td className="py-3 px-2 text-gray-400">{ins.especialidade || '-'}</td>
                        <td className="py-3 px-2 text-[#a3e635] font-mono">
                          R$ {Number(ins.salario || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/instrutores/${ins.id}/editar`}
                              className="p-1 hover:text-[#a3e635] text-gray-400 transition"
                              title="Editar"
                            >
                              ✏️
                            </Link>
                            <BotaoExcluir endpoint="instrutores" id={ins.id} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Coluna Lateral: Busca + Cadastro */}
        <div className="space-y-6">
          
          {/* Busca por CPF */}
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase mb-3">
              BUSCA POR CPF
            </h2>
            <form method="GET" action="/instrutores" className="flex gap-2">
              <input
                type="text"
                name="cpf"
                defaultValue={cpfBusca}
                placeholder="000.000.000-00"
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#a3e635]"
              />
              <button type="submit" className="bg-[#a3e635] text-black p-2 rounded-lg font-bold hover:bg-[#84cc16] transition cursor-pointer">
                🔍
              </button>
            </form>
          </div>

          {/* Form Criar Instrutor */}
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase">
              CRIAR INSTRUTOR
            </h2>

            <form action={criarInstrutor} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  NOME COMPLETO
                </label>
                <input
                  name="nome"
                  type="text"
                  required
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  CPF
                </label>
                <input
                  name="cpf"
                  type="text"
                  required
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  E-MAIL
                </label>
                <input
                  name="email"
                  type="email"
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
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  CREF
                </label>
                <input
                  name="cref"
                  type="text"
                  required
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  ESPECIALIDADE
                </label>
                <input
                  name="especialidade"
                  type="text"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  SALÁRIO (R$)
                </label>
                <input
                  name="salario"
                  type="number"
                  step="0.01"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#a3e635] hover:bg-[#84cc16] text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer"
              >
                Cadastrar Instrutor
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}