"use client";
import React from "react";
import { useEffect, useState } from "react";
import { BoxIconLine, GridIcon } from "@/icons";
import { totalCategorias, totalProdutos } from '@/utils/api';

interface Resumo {
  total_categorias: number
  total_produtos: number
}

export const EcommerceMetrics = () => {

  const [resumo, setResumo] = useState<Resumo>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleResumo = async () => {
    const resumo: Resumo = {
      total_categorias: 0,
      total_produtos: 0,
    };

    const promises = [
      totalCategorias()
        .then((data: number) => { resumo.total_categorias = data; })
        .catch(console.log),

      totalProdutos()
        .then((data: number) => { resumo.total_produtos = data; })
        .catch(console.log)
    ];

    return Promise.allSettled(promises).then(() => { setResumo(resumo) });
  }

  useEffect(() => {
    setLoading(true);

    handleResumo()
      .catch(console.log)
      .finally(() => { setLoading(false); })
  }, []);

  if (loading) return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Carregando Informações...
        </span>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GridIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total de Categorias de Produto
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            { resumo.total_categorias }
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total de Produtos
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            { resumo.total_produtos }
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
