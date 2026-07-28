import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

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
  
  // NUEVA PROP: Alterna entre filtrado local y paginación en servidor
  serverSide = false,

  // PROPS PARA EL SERVIDOR
  page = 1,              // Página actual recibida del back
  totalPage = 1,         // Total de páginas calculadas por el back (page.totalPages)
  totalElements = 0,     // Total de registros globales (page.totalElements)
  pageSize = 8,         // Tamaño de página actual
  hasNext = false,
  hasPrevious = false,
  onPageChange,          // Callback (newPage) => fetch()
  onSearchChange,        // Callback (searchTerm) => fetch() opcional si buscas en el back
  isLoading = false,
}) {
  // Lógica local para cuando serverSide = false
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // ---------------------------------------------------------------------------
  // 1. FILTRADO DE DATOS (CLIENTE VS SERVIDOR)
  // ---------------------------------------------------------------------------
  
  // TODO: [MIGRACIÓN FINAL] Eliminar completamente este useMemo cuando todo el backend
  // soporne Pageable, ya que el filtrado ocurrirá en la base de datos via Spring.
  const filteredData = useMemo(() => {
    if (serverSide) return data; // En serverSide los datos ya vienen filtrados por la API
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
  }, [data, searchTerm, searchFields, columns, serverSide]);

  // Manejo del input de búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (serverSide) {
      // Si es serverSide, le avisamos al padre para que re-ejecute la consulta al back
      if (onSearchChange) onSearchChange(value);
      if (onPageChange) onPageChange(1); // Reiniciamos a la página 1
    } else {
      // TODO: [MIGRACIÓN FINAL] Eliminar este else (setCurrentPage(1)) cuando sea 100% serverSide
      setCurrentPage(1);
    }
  };

  // ---------------------------------------------------------------------------
  // 2. CÁLCULO DE PAGINACIÓN Y SEGMENTACIÓN DE FILAS
  // ---------------------------------------------------------------------------
  
  // TODO: [MIGRACIÓN FINAL] Eliminar estas variables locales (effectiveTotalPages, startIndex, etc.)
  // y usar directamente las props del servidor (totalPage, totalElements, page, pageSize).
  const effectiveTotalPages = serverSide ? totalPage : Math.ceil(filteredData.length / itemsPerPage);
  const effectiveCurrentPage = serverSide ? page : currentPage;
  const effectivePageSize = serverSide ? pageSize : itemsPerPage;
  const effectiveTotalElements = serverSide ? totalElements : filteredData.length;

  // Calculamos los rangos de visualización "Mostrando X-Y de Z"
  const startIndex = (effectiveCurrentPage - 1) * effectivePageSize;
  const endIndex = startIndex + effectivePageSize;

  // TODO: [MIGRACIÓN FINAL] Eliminar esta segmentación slice(). 
  // En serverSide 'data' ya contiene ÚNICAMENTE la página actual enviada por Spring.
  const currentData = serverSide ? data : filteredData.slice(startIndex, endIndex);

  // Cambio de página
  const goToPage = (newPage) => {
    const targetPage = Math.max(1, Math.min(newPage, effectiveTotalPages));
    if (serverSide) {
      if (onPageChange) onPageChange(targetPage);
    } else {
      // TODO: [MIGRACIÓN FINAL] Eliminar este setCurrentPage
      setCurrentPage(targetPage);
    }
  };

  const getPageNumbers = (maxVisible) => {
    const pages = [];

    if (effectiveTotalPages <= maxVisible) {
      for (let i = 1; i <= effectiveTotalPages; i++) pages.push(i);
    } else if (maxVisible <= 3) {
      if (effectiveCurrentPage > 1) pages.push(effectiveCurrentPage - 1);
      pages.push(effectiveCurrentPage);
      if (effectiveCurrentPage < effectiveTotalPages) pages.push(effectiveCurrentPage + 1);
    } else if (effectiveCurrentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', effectiveTotalPages);
    } else if (effectiveCurrentPage >= effectiveTotalPages - 2) {
      pages.push(1, '...', effectiveTotalPages - 3, effectiveTotalPages - 2, effectiveTotalPages - 1, effectiveTotalPages);
    } else {
      pages.push(1, '...', effectiveCurrentPage - 1, effectiveCurrentPage, effectiveCurrentPage + 1, '...', effectiveTotalPages);
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

      <div className="relative w-full min-w-0 bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden">
        
        {/* Indicador de carga cuando la API está pidiendo datos al backend */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center z-10">
            <div className="flex items-center gap-2 text-indigo-400 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 shadow-lg">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Cargando...</span>
            </div>
          </div>
        )}

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

      {/* Paginación */}
      {effectiveTotalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-2">
          <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
            Mostrando {startIndex + 1}-{Math.min(endIndex, effectiveTotalElements)} de {effectiveTotalElements}
            
            {/* TODO: [MIGRACIÓN FINAL] Eliminar este bloque condicional del filtro de datos local */}
            {!serverSide && searchTerm && filteredData.length !== data.length && (
              <span className="ml-1 text-indigo-400">(filtrado de {data.length})</span>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => goToPage(effectiveCurrentPage - 1)}
              disabled={serverSide ? !hasPrevious && effectiveCurrentPage === 1 : effectiveCurrentPage === 1}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex items-center gap-1">
              {getPageNumbers(3).map((pageNum, idx) => (
                <button
                  key={`mobile-${idx}`}
                  onClick={() => typeof pageNum === 'number' && goToPage(pageNum)}
                  disabled={pageNum === '...'}
                  className={`sm:hidden px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    pageNum === effectiveCurrentPage
                      ? 'bg-indigo-600 text-white'
                      : pageNum === '...'
                      ? 'text-slate-500 cursor-default'
                      : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              {getPageNumbers(5).map((pageNum, idx) => (
                <button
                  key={`desktop-${idx}`}
                  onClick={() => typeof pageNum === 'number' && goToPage(pageNum)}
                  disabled={pageNum === '...'}
                  className={`hidden sm:inline-block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pageNum === effectiveCurrentPage
                      ? 'bg-indigo-600 text-white'
                      : pageNum === '...'
                      ? 'text-slate-500 cursor-default'
                      : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(effectiveCurrentPage + 1)}
              disabled={serverSide ? !hasNext && effectiveCurrentPage === effectiveTotalPages : effectiveCurrentPage === effectiveTotalPages}
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