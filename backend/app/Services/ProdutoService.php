<?php

namespace App\Services;

use App\Models\Produto;

class ProdutoService
{
    /**
     * Display a listing of the resource.
     */
    public function index($perPage = 10)
    {
        return Produto::paginate($perPage);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data)
    {
        $data['data_cadastro'] = $data['data_cadastro'] ?? now();
        return Produto::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show($idProduto)
    {
        return Produto::findOrFail($idProduto);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update($data, $idProduto)
    {
        $produto = Produto::findOrFail($idProduto);

        $produto['data_cadastro'] = $data['data_cadastro'] ?? $produto['data_cadastro'];
        $produto->update($data);

        return $produto->refresh();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idProduto)
    {
        return Produto::findOrFail($idProduto)
            ->delete();
    }
}
