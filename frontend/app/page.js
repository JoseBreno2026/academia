import Link from 'next/link';

export default function Home() {
  const modulos = [
    { titulo: 'Alunos', desc: 'Gerencie matrículas e perfis de alunos', href: '/alunos', cor: 'bg-blue-600' },
    { titulo: 'Instrutores', desc: 'Cadastro de instrutores e equipe', href: '/instrutores', cor: 'bg-emerald-600' },
    { titulo: 'Treinos', desc: 'Montagem e gestão de rotinas de treino', href: '/treinos', cor: 'bg-purple-600' },
    { titulo: 'Exercícios', desc: 'Catálogo de exercícios cadastrados', href: '/exercicios', cor: 'bg-amber-600' },
    { titulo: 'Tipos de Exercício', desc: 'Categorias e grupos musculares', href: '/tipos-exercicios', cor: 'bg-rose-600' },
    { titulo: 'Planos', desc: 'Planos de assinatura e mensalidades', href: '/planos', cor: 'bg-cyan-600' },
    { titulo: 'Pagamentos', desc: 'Histórico e registro de pagamentos', href: '/pagamentos', cor: 'bg-indigo-600' },
  ];

  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Painel de Gestão da Academia</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Selecione uma das seções abaixo para gerenciar os cadastros e operações do sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulos.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-6 border border-gray-100 flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className={`w-3 h-3 rounded-full ${m.cor} mb-2`} />
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                {m.titulo}
              </h2>
              <p className="text-sm text-gray-600">{m.desc}</p>
            </div>
            <span className="text-sm font-semibold text-blue-600 mt-4 block group-hover:translate-x-1 transition-transform">
              Acessar Módulo &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}