"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Categoria } from "@/hooks/Interfaces";
import { useEffect, useState } from 'react';

interface CategoriaDadosProps {
  id: number;
  data: Categoria;
  is_open: boolean;
  save: (data: Categoria) => void;
  close: () => void;
}

export default function CategoriaDados({
  id,
  data,
  is_open = false,
  save,
  close,
}: CategoriaDadosProps) {

  const categoriaModal = useModal();
  const [form_data, setFormData] = useState<Categoria>(data);
  const [errors, setErrors] = useState<any>({ nome: ""});

  useEffect(() => {
    if (is_open) {
      categoriaModal.openModal();
      setFormData(data)
    } else {
      categoriaModal.closeModal();
      setErrors({ nome: ""})
      setFormData({})
    }
  }, [is_open]);

  const validate = () => {
    let errors = { nome: ""};

    if (!form_data.nome?.trim()) errors.nome = "Nome da Categoria é obrigatória";

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
      <Modal isOpen={categoriaModal.isOpen} onClose={close} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {!!data.id
                ? `Dados da Categoria do Produto #${data.id}`
                : 'Insira os dados da nova categoria de produto'
              }
            </h4>
          </div>

          <div className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
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
