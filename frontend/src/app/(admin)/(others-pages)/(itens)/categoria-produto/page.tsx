'use client';

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableTwo from "@/components/tables/BasicTableTwo";
import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { destroyCategoria, indexCategorias, storeCategoria, updateCategoria } from "@/utils/api";
import { Metadata } from "next";
import React from "react";
import { useState, useEffect } from 'react';
import Alert from "@/components/ui/alert/Alert";
import CategoriaDados from "@/components/dados/CategoriaDados";
import { Categoria } from "@/hooks/Interfaces";

// export const metadata: Metadata = {
//   title: "Categorias",
//   description: "JOIN Test Ações em Categorias",
// };

const tableHeader = [
  {
    title: '#ID',
    is_show: false,
    value: 'id',
    is_action: false
  },
  {
    title: 'Categoria',
    is_show: true,
    value: 'nome',
    is_action: false
  },
  {
    title: 'Ações',
    is_show: true,
    value: null,
    is_action: true
  },
];

export default function CategoriaTables() {

  const [per_page, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selected_categoria, setSelectedCategoria] = useState<Categoria>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [alet_status, setAletStatus] = useState<string>("success");
  const [alert_visible, setAlertVisible] = useState<boolean>(false);
  const [force_update, setForceUpdate] = useState<boolean>(false);
  const [is_open_categoria_dados, setIsOpenCategoriaDados] = useState<boolean>(false);

  const handleCategorias = async () => {
    indexCategorias(per_page, page)
    .then((data) => { setCategorias(data) })
    .catch(console.log);
  }

  useEffect(() => {
    setLoading(true);

    handleCategorias()
      .catch(console.log)
      .finally(() => { setLoading(false); })
  }, [page, force_update]);

  const handleOperation = (promise: Promise<any>) => {
    promise
    .then(() => {
      setAletStatus("success");
      setAlertVisible(true);
      setForceUpdate(!force_update);
    })
    .catch((err) => {
      setAletStatus("error");
      setAlertVisible(true);
    })
    .finally(() => {
      setIsOpenCategoriaDados(false)
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    });
  }

  const onEdit = (data: Categoria) => {
    setSelectedCategoria(data)
    setIsOpenCategoriaDados(true)
  }

  const edit = (data: Categoria) => {
    const formatted_data = {
      nome_categoria: data.nome,
    }

    handleOperation(updateCategoria(data.id, formatted_data))
  }

  const del = (id: number) => {
    handleOperation(destroyCategoria(id))
  }

  const onCreate = () => {
    setSelectedCategoria({
      id: 0,
      nome: '',
    } as Categoria);

    setIsOpenCategoriaDados(true);
  }

  const create = (data: Categoria) => {
    const formatted_data = {
      nome_categoria: data.nome,
    }

    handleOperation(storeCategoria(formatted_data))
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Categorias" />
      <div className="space-y-6">
        <ComponentCard title="Lista de Categorias">

          <div
            className={`shadow-lg transition-all transform duration-500 ease-in-out ${
              alert_visible ? 'opacity-100 translate-y-4 h-auto' : 'opacity-0 translate-y-0 h-0 overflow-hidden'
            }`}>
            <Alert
              variant={alet_status}
              title={`${"success" === alet_status? "Operação realizada com sucesso!" : "Operação não realizada!"}`}
              message=""
            />
          </div>

          <div className="flex justify-between" >
            <Button
              onClick={onCreate}
              size="md"
              variant="primary"
              startIcon={<PlusIcon />}
            >
              Nova Categoria
            </Button>

            <Pagination
              currentPage={categorias?.meta?.current_page ?? 1}
              totalPages={categorias?.meta?.last_page ?? 1}
              onPageChange={setPage}
            />
          </div>

          <BasicTableTwo
            tableHeader={tableHeader}
            tableData={categorias.data}
            onEdit={onEdit}
            del={del}
            loading={loading}
          />

        </ComponentCard>
      </div>

      <CategoriaDados
        id={selected_categoria.id}
        data={selected_categoria}
        is_open={is_open_categoria_dados}
        save={0 === selected_categoria.id? create: edit}
        close={() => { setIsOpenCategoriaDados(false) }}
      />
    </div>
  );
}
