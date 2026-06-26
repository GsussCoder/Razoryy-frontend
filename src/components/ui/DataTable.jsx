import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

/**
 * Componente de tabla reutilizable con paginación y búsqueda.
 * El scroll horizontal queda contenido dentro de la tabla (nunca desborda la página).
 *
 * @param {Array} data - Array de objetos con los datos a mostrar
 * @param {Array} columns - Array de definiciones de columnas
 *   Cada columna: { header: string, accessor: string, render?: (value, row) => ReactNode }
 * @param {number} itemsPerPage - Número de items por página (default: 10)
 * @param {string} emptyMessage - Mensaje cuando no hay datos (default: 'No hay registros')
 * @param {boolean} searchable - Mostrar buscador (default: false)
 * @param {string} searchPlaceholder - Placeholder del input de búsqueda
 * @param {Array<string>} searchFields - Campos en los que buscar (default: todos)
 * @param {ReactNode} actions - Botones/acciones personalizadas arriba de la tabla
 * @param {number} minWidth - Ancho mínimo en px de la tabla interna (default: 640).
 *   Pasa 0 para mini-tablas de pocas columnas que no necesitan scroll forzado.
 */
export default function DataTable({
  data = [],
  columns = [],
  itemsPerPage = 10,
  emptyMessage = 'No hay registros',
  searchable = false,
  searchPlaceholder = 'Buscar...',
  searchFields = [],
  actions = null,
  minWidth = 640,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter(row => {
      const fieldsToSearch = searchFields.length > 0
        ? searchFields
        : columns.map(col => col.accessor);

      return fieldsToSearch.some(field => {
        const value = row[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, searchFields, columns]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // En pantallas chicas mostramos menos números de página para que el
  // bloque de paginación nunca sea el que obligue a la tabla a crecer.
  const getPageNumbers = (maxVisible) => {
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (maxVisible <= 3) {
      if (currentPage > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages) pages.push(currentPage + 1);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  if (columns.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
        <p className="text-slate-400">No se han definido columnas para la tabla</p>
      </div>
    );
  }

  return (
    // w-full + min-w-0: evita que este componente fuerce a sus contenedores
    // padres (ej. un <main className="flex-1">) a crecer más allá del viewport.
    <div className="w-full min-w-0 space-y-4">
      {(searchable || actions) && (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {searchable && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>
          )}

          {actions && (
            <div className="flex gap-2 flex-wrap">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Tabla — el scroll horizontal vive aquí adentro, no afuera */}
      <div className="w-full min-w-0 bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden">
        <div className="w-full max-w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <table className="w-full" style={minWidth ? { minWidth: `${minWidth}px` } : undefined}>
            <thead className="bg-slate-700/50 border-b border-slate-700">
              <tr>
                {columns.map((column, idx) => (
                  <th
                    key={idx}
                    className="text-left px-4 py-3 text-sm font-medium text-slate-300 whitespace-nowrap"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-slate-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                currentData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-slate-700/30 transition-colors">
                    {columns.map((column, colIdx) => (
                      <td key={colIdx} className="px-4 py-3 text-sm text-slate-200 whitespace-nowrap">
                        {column.render
                          ? column.render(row[column.accessor], row)
                          : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación — se apila en móvil, en línea desde sm: */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-2">
          <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredData.length)} de {filteredData.length}
            {searchTerm && filteredData.length !== data.length && (
              <span className="ml-1 text-indigo-400">(filtrado de {data.length})</span>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex items-center gap-1">
              {getPageNumbers(3).map((page, idx) => (
                <button
                  key={`mobile-${idx}`}
                  onClick={() => typeof page === 'number' && goToPage(page)}
                  disabled={page === '...'}
                  className={`sm:hidden px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    page === currentPage
                      ? 'bg-indigo-600 text-white'
                      : page === '...'
                      ? 'text-slate-500 cursor-default'
                      : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  }`}
                >
                  {page}
                </button>
              ))}
              {getPageNumbers(5).map((page, idx) => (
                <button
                  key={`desktop-${idx}`}
                  onClick={() => typeof page === 'number' && goToPage(page)}
                  disabled={page === '...'}
                  className={`hidden sm:inline-block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    page === currentPage
                      ? 'bg-indigo-600 text-white'
                      : page === '...'
                      ? 'text-slate-500 cursor-default'
                      : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}