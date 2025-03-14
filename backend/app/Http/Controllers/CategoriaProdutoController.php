<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoriaProdutoRequest;
use App\Http\Requests\UpdateCategoriaProdutoRequest;
use App\Http\Resources\CategoriaProdutoResource;
use App\Services\CategoriaProdutoService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CategoriaProdutoController extends Controller
{
    protected $categoriaProdutoService;

    public function __construct(CategoriaProdutoService $categoriaProdutoService)
    {
        $this->categoriaProdutoService = $categoriaProdutoService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);

        $categorias = $this->categoriaProdutoService->index($perPage);

        return CategoriaProdutoResource::collection($categorias);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriaProdutoRequest $request)
    {
        $dadosValidados = $request->validated();

        try {
            $categoria = $this->categoriaProdutoService->store($dadosValidados);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar registrar a categoria do produto.',
                'error' => $ex->getMessage()
            ], 500);
        }

        return new CategoriaProdutoResource($categoria);
    }

    /**
     * Display the specified resource.
     */
    public function show($idCategoriaProduto)
    {
        try {
            $categoria = $this->categoriaProdutoService->show($idCategoriaProduto);
        } catch (ModelNotFoundException $ex) {
            return response()->json([
                'message' => 'Categoria do produto não localizada.',
                'error' => $ex->getMessage()
            ], 404);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar obter a categoria do produto.',
                'error' => $ex->getMessage()
            ], 500);
        }

        return new CategoriaProdutoResource($categoria);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriaProdutoRequest $request, $idCategoriaProduto)
    {
        $dadosValidados = $request->validated();

        try {
            $categoria = $this->categoriaProdutoService
                ->update($dadosValidados, $idCategoriaProduto);
        } catch (ModelNotFoundException $ex) {
            return response()->json([
                'message' => 'Categoria do produto não localizada.',
                'error' => $ex->getMessage()
            ], 404);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar atualizar a categoria do produto.',
                'error' => $ex->getMessage()
            ], 500);
        }

        return new CategoriaProdutoResource($categoria);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idCategoriaProduto)
    {
        try {
            $this->categoriaProdutoService->destroy($idCategoriaProduto);
        } catch (ModelNotFoundException $ex) {
            return response()->json([
                'message' => 'Categoria do produto não localizada.',
                'error' => $ex->getMessage()
            ], 404);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar remover a categoria do produto.',
                'error' => $ex->getMessage()
            ], 500);
        }

        return response()->json('Categoria de produto removido com sucesso.', 200);
    }
}
