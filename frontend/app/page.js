import Link from 'next/link';

export default function Home() {
  const modulos = [
    { titulo: 'Alunos', desc: 'Gerencie matrículas e perfis', href: '/alunos', icon: '👥' },
    { titulo: 'Instrutores', desc: 'Cadastro de equipe técnica', href: '/instrutores', icon: '🧘' },
    { titulo: 'Planos', desc: 'Planos de assinatura', href: '/planos', icon: '💳' },
    { titulo: 'Pagamentos', desc: 'Histórico e recebimentos', href: '/pagamentos', icon: '💵' },
    { titulo: 'Treinos', desc: 'Montagem de rotinas', href: '/treinos', icon: '⚡' },
    { titulo: 'Exercícios', desc: 'Catálogo de exercícios', href: '/exercicios', icon: '🏋️' },
    { titulo: 'Tipos de Exercício', desc: 'Grupos musculares', href: '/tipos-exercicios', icon: '📋' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-4">
      
      {/* Hero / Apresentação Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121824] via-[#1a2332] to-[#121824] border border-gray-800/80 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-block bg-[#a3e635]/10 text-[#a3e635] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-[#a3e635]/20">
            Painel Operacional • Ironcore
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            Transforme a Gestão da sua <span className="text-[#a3e635]">Academia</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Bem-vindo ao sistema de alta performance <b>IRONCORE</b>. Controle alunos, acompanhe pagamentos, configure fichas de treino e gerencie sua equipe de instrutores em um só lugar.
          </p>
          <div className="pt-2 flex gap-4">
            <Link
              href="/alunos"
              className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/20"
            >
              Acessar Alunos
            </Link>
            <Link
              href="/treinos"
              className="bg-gray-800/80 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider border border-gray-700 transition-all duration-200"
            >
              Ver Treinos
            </Link>
          </div>
        </div>
      </div>

      {/* Seção Módulos do Sistema */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">
            Acesso Rápido aos Módulos
          </h2>
          <p className="text-sm text-gray-400">
            Navegue diretamente para a seção desejada da sua plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modulos.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="bg-[#121824] hover:bg-[#161e2e] border border-gray-800/80 rounded-xl p-5 transition-all duration-200 hover:border-[#a3e635]/40 group flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-gray-800/80 flex items-center justify-center text-xl text-white group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#a3e635] transition-colors">
                    {m.titulo}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{m.desc}</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-[#a3e635] group-hover:translate-x-1 transition-transform">
                <span>Gerenciar</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}