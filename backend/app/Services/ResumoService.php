<?php

namespace App\Services;

use App\Http\Resources\ProdutoResource;
use App\Models\CategoriaProduto;
use App\Models\Produto;

class ResumoService
{
    public function totalCategoriaProdutos()
    {
        return CategoriaProduto::count();
    }

    public function totalProduto()
    {
        return Produto::count();
    }

    public function itensRecentes($quantidade = 5)
    {
        $produtos = Produto::with('categoria')
            ->orderBy('id_produto', 'desc')
            ->limit($quantidade)
            ->get();

        return ProdutoResource::collection($produtos);
    }

}
