<?php

namespace App\Http\Controllers;

use App\Services\ResumoService;
use Illuminate\Http\Request;

class ResumoController extends Controller
{

    protected $resumoService;

    public function __construct(ResumoService $resumoService)
    {
        $this->resumoService = $resumoService;
    }

    public function totalCategoriaProdutos()
    {
        return $this->processamentoPadrao(
            fn() => $this->resumoService->totalCategoriaProdutos()
        );
    }

    public function totalProduto()
    {
        return $this->processamentoPadrao(
            fn() => $this->resumoService->totalProduto()
        );
    }

    public function itensRecentes($qtd)
    {
        return $this->processamentoPadrao(
            fn() => $this->resumoService->itensRecentes($qtd)
        );
    }

    private function processamentoPadrao(callable $servico)
    {
        try {
            $resultado = $servico();
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar recuperar esta informação.',
                'error' => $ex->getMessage()
            ], 500);
        }

        return response()->json($resultado, 200);
    }
}
