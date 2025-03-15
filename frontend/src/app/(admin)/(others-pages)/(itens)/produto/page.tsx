'use client';

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableTwo from "@/components/tables/BasicTableTwo";
import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { destroyProduto, indexCategorias, indexProdutos, storeProduto, totalCategorias, updateProduto } from "@/utils/api";
import { Metadata } from "next";
import React from "react";
import { useState, useEffect } from 'react';
import Alert from "@/components/ui/alert/Alert";
import ProdutoDados from "@/components/dados/ProdutoDados";
import { Produto } from "@/hooks/Interfaces";

// export const metadata: Metadata = {
//   title: "Produtos",
//   description: "JOIN Test Ações em Produtos",
// };

const tableHeader = [
  {
    title: '#ID',
    is_show: false,
    value: 'id',
    is_action: false
  },
  {
    title: '#CATEGORIA_ID',
    is_show: false,
    value: 'categoria_id',
    is_action: false
  },
  {
    title: 'Produto',
    is_show: true,
    value: 'nome',
    is_action: false
  },
  {
    title: 'Valor',
    is_show: true,
    value: 'valor',
    is_action: false
  },
  {
    title: 'Categoria',
    is_show: true,
    value: 'categoria',
    is_action: false
  },
  {
    title: 'Data Cadastro',
    is_show: true,
    value: 'data_cadastro',
    is_action: false
  },
  {
    title: 'Ações',
    is_show: true,
    value: null,
    is_action: true
  },
];

export default function ProdutoTables() {

  const [per_page, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selected_produto, setSelectedProduto] = useState<Produto>({});
  const [categorias, setCategorias] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [alet_status, setAletStatus] = useState<string>("success");
  const [alert_visible, setAlertVisible] = useState<boolean>(false);
  const [force_update, setForceUpdate] = useState<boolean>(false);
  const [is_open_produto_dados, setIsOpenProdutoDados] = useState<boolean>(false);

  const handleCategorias = async () => {
    totalCategorias()
    .then(indexCategorias)
    .then(({ data }) => { setCategorias(data) })
    .catch(console.log);
  }

  const handleProdutos = async () => {
    indexProdutos(per_page, page)
    .then((data) => { setProdutos(data) })
    .catch(console.log);
  }

  useEffect(() => {
    handleCategorias()
      .catch(console.log)
  }, []);

  useEffect(() => {
    setLoading(true);

    handleProdutos()
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
      setIsOpenProdutoDados(false)
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    });
  }

  const onEdit = (data: Produto) => {
    setSelectedProduto(data)
    setIsOpenProdutoDados(true)
  }

  const edit = (data: Produto) => {
    const formatted_data = {
      id_categoria_produto: data.categoria_id,
      nome_produto: data.nome,
      valor_produto: data.valor,
    }

    handleOperation(updateProduto(data.id, formatted_data))
  }

  const del = (id: number) => {
    handleOperation(destroyProduto(id))
  }

  const onCreate = () => {
    setSelectedProduto({
      id: 0,
      categoria_id: 0,
      data_cadastro: '',
      nome: '',
      categoria: '',
      valor: 0.0,
    } as Produto);

    setIsOpenProdutoDados(true);
  }

  const create = (data: Produto) => {
    const formatted_data = {
      id_categoria_produto: data.categoria_id,
      nome_produto: data.nome,
      valor_produto: data.valor,
    }

    handleOperation(storeProduto(formatted_data))
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Produtos" />
      <div className="space-y-6">
        <ComponentCard title="Lista de Produtos">

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
              disabled={!categorias.length}
            >
              Novo Produto
            </Button>

            <Pagination
              currentPage={produtos?.meta?.current_page ?? 1}
              totalPages={produtos?.meta?.last_page ?? 1}
              onPageChange={setPage}
            />
          </div>

          <BasicTableTwo
            tableHeader={tableHeader}
            tableData={produtos.data}
            onEdit={onEdit}
            del={del}
            loading={loading}
          />

        </ComponentCard>
      </div>

      { !!categorias.length &&
        <ProdutoDados
          id={selected_produto.id}
          data={selected_produto}
          categorias={categorias}
          is_open={is_open_produto_dados}
          save={0 === selected_produto.id? create: edit}
          close={() => { setIsOpenProdutoDados(false) }}
        />
      }
    </div>
  );
}
