"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Produto } from "@/hooks/Interfaces";
import { useEffect, useState } from 'react';
import Select from "@/components/form/Select";

interface ProdutoDadosProps {
  id: number;
  data: Produto;
  categorias: any[]
  is_open: boolean;
  save: (data: Produto) => void;
  close: () => void;
}

export default function ProdutoDados({
  id,
  data,
  categorias = [],
  is_open = false,
  save,
  close,
}: ProdutoDadosProps) {

  const produtoModal = useModal();
  const [form_data, setFormData] = useState<Produto>(data);
  const [opcoes_categorias, setOpcoesCategorias] = useState<any[]>(categorias);
  const [errors, setErrors] = useState<any>({ nome: "", valor: "", categoria: "" });

  useEffect(() => {
    setOpcoesCategorias(categorias.map(categoria => {
      categoria.value = categoria.id;
      categoria.label = categoria.nome;
      return categoria;
    }))
  }, [])

  useEffect(() => {
    if (is_open) {
      produtoModal.openModal();
      setFormData(data)
    } else {
      produtoModal.closeModal();
      setErrors({ nome: "", valor: "", categoria: "" })
      setFormData({})
    }
  }, [is_open]);

  const validate = () => {
    let errors = { nome: "", valor: "", categoria: "" };

    if (!form_data.nome?.trim()) errors.nome = "Nome do Produto é obrigatório";
    if (!!isNaN(form_data.valor as number) || (typeof form_data.valor === "string" && !form_data.valor?.trim())) errors.valor = "Valor do produto é obrigatório";
    if (!form_data.categoria_id) errors.categoria = "Categoria do produto é obrigatória";

    setErrors(errors);
    return Object.values(errors).every((e) => e === "");
  };

  const handleSave = () => {
    if (validate()) {
      save(form_data)
      close();
    }
  };

  return (
    <div>
      <Modal isOpen={produtoModal.isOpen} onClose={close} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {!!data.id
                ? `Dados do Produto #${data.id}`
                : 'Insira os dados do novo produto'
              }
            </h4>
          </div>

          <div className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      defaultValue={data.nome}
                      onChange={(e) => {
                        setFormData({ ...form_data, nome: e.target.value });
                        validate();
                      }}
                      error={!!errors.nome?.trim()}
                      hint={errors.nome}
                      />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Valor</Label>
                    <Input
                      type="number"
                      step={0.01}
                      defaultValue={data.valor}
                      onChange={(e) => {
                        setFormData({ ...form_data, valor: e.target.value });
                        validate();
                      }}
                      error={!!errors.valor?.trim()}
                      hint={errors.valor}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Categoria</Label>
                    <Select
                      options={opcoes_categorias}
                      defaultValue={data.categoria_id}
                      onChange={(value) => {
                        setFormData({ ...form_data, categoria_id: value });
                        validate();
                      }}
                      placeholder="Selecione uma categoria"
                      className="dark:bg-dark-900"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" onClick={handleSave}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
