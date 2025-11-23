import Image from "next/image";

export function Header() {
        return (
          <header className="border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="text-4xl font-semibold tracking-wide">
                DOLY<span className="text-zinc-400 text-4xl" >.INDUSTRY</span>
              </div>
      
              <nav className="hidden md:flex gap-6 text-sm text-zinc-300">
                <a href="#" className="hover:text-white transition-colors">
                  Sneakers
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Vêtements
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Marques
                </a>
              </nav>
            </div>
          </header>
        );
      }
      

