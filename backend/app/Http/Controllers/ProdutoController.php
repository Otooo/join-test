<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProdutoRequest;
use App\Http\Requests\UpdateProdutoRequest;
use App\Http\Resources\ProdutoResource;
use Illuminate\Http\Request;
use App\Services\ProdutoService;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProdutoController extends Controller
{
    protected $produtoService;

    public function __construct(ProdutoService $produtoService)
    {
        $this->produtoService = $produtoService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);

        $produtos = $this->produtoService->index($perPage);

        return ProdutoResource::collection($produtos);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProdutoRequest $request)
    {
        $dadosValidados = $request->validated();

        try {
            $produto = $this->produtoService->store($dadosValidados);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar registrar o produto.',
                'error' => $ex->getMessage()
            ], 500);
        }

        return new ProdutoResource($produto);
    }

    /**
     * Display the specified resource.
     */
    public function show($idProduto)
    {
        try {
            $produto = $this->produtoService->show($idProduto);
        } catch (ModelNotFoundException $ex) {
            return response()->json([
                'message' => 'Produto não localizado.',
                'error' => $ex->getMessage()
            ], 404);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar obter o produto.',
                'error' => $ex->getMessage()
            ], 500);
        }

        return new ProdutoResource($produto);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProdutoRequest $request, $idProduto)
    {
        $dadosValidados = $request->validated();

        try {
            $produto = $this->produtoService->update($dadosValidados, $idProduto);
        } catch (ModelNotFoundException $ex) {
            return response()->json([
                'message' => 'Produto não localizado.',
                'error' => $ex->getMessage()
            ], 404);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar atualizar o produto.',
                'error' => $ex->getMessage()
            ], 500);
        }

        return new ProdutoResource($produto);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idProduto)
    {
        try {
            $this->produtoService->destroy($idProduto);
        } catch (ModelNotFoundException $ex) {
            return response()->json([
                'message' => 'Produto não localizado.',
                'error' => $ex->getMessage()
            ], 404);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar remover o produto.',
                'error' => $ex->getMessage()
            ], 500);
        }

        return response()->json('Produto removido com sucesso.', 200);
    }
}
