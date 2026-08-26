import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'IRONCORE - Gestão de Academia',
  description: 'Sistema de gestão de alunos, instrutores, treinos, planos e pagamentos',
};

export default function RootLayout({ children }) {
  const navItems = [
    { label: 'Alunos', href: '/alunos', icon: '👥' },
    { label: 'Instrutores', href: '/instrutores', icon: '🧘' },
    { label: 'Planos', href: '/planos', icon: '💳' },
    { label: 'Pagamentos', href: '/pagamentos', icon: '💵' },
    { label: 'Treinos', href: '/treinos', icon: '⚡' },
    { label: 'Exercícios', href: '/exercicios', icon: '🏋️' },
    { label: 'Tipos de Exercício', href: '/tipos-exercicios', icon: '📋' },
  ];

  return (
    <html lang="pt-BR">
      <body className="bg-[#0b0e14] text-gray-100 min-h-screen flex">
        {/* Sidebar Esquerda */}
        <aside className="w-64 bg-[#121824] border-r border-gray-800/60 flex flex-col justify-between p-4 fixed top-0 bottom-0 left-0 z-50">
          <div>
            {/* Logo Ironcore com Link para Home / Apresentação */}
            <Link 
              href="/" 
              className="flex items-center gap-3 px-2 py-3 mb-6 rounded-xl hover:bg-gray-800/30 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#a3e635] text-black font-black flex items-center justify-center text-xl shadow-lg shadow-[#a3e635]/20 group-hover:scale-105 transition-transform">
                🏋️
              </div>
              <div>
                <h1 className="font-extrabold text-lg tracking-wider text-white uppercase leading-none">
                  IRONCORE
                </h1>
                <span className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">
                  Gestão de Academia
                </span>
              </div>
            </Link>

            {/* Links de Navegação */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-gray-400 hover:text-white hover:bg-gray-800/50"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 ml-64 p-8 bg-[#0b0e14]">
          {children}
        </main>
      </body>
    </html>
  );
}