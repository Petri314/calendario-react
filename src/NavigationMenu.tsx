import React, { useState } from 'react';

const NavigationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Mi Sitio</div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
          <div className="text-sm lg:flex-grow">
            <a href="#inicio" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
              Inicio
            </a>
            <a href="#repo" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
              Repo
            </a>
            <a href="#nosotros" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400">
              Nosotros
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
