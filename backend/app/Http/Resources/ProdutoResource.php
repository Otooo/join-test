<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProdutoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_produto,
            'categoria_id' => $this->id_categoria_produto,
            'categoria' => $this->categoria->nome_categoria,
            'nome' => $this->nome_produto,
            'valor' => $this->valor_produto,
            'data_cadastro' => $this->data_cadastro,
        ];
    }
}
