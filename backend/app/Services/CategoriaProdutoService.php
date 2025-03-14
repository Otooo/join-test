<?php

namespace App\Services;

use App\Models\CategoriaProduto;

class CategoriaProdutoService
{
    /**
     * Display a listing of the resource.
     */
    public function index($perPage = 10)
    {
        return CategoriaProduto::paginate($perPage);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data)
    {
        return CategoriaProduto::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show($idCategoriaProduto)
    {
        return CategoriaProduto::findOrFail($idCategoriaProduto);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update($data, $idCategoriaProduto)
    {
        $categoria = CategoriaProduto::findOrFail($idCategoriaProduto);

        $categoria->update($data);

        return $categoria->refresh();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idCategoriaProduto)
    {
        return CategoriaProduto::findOrFail($idCategoriaProduto)
            ->delete();
    }
}
