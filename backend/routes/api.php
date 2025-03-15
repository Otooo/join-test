<?php

use App\Http\Controllers\CategoriaProdutoController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\ResumoController;
use Illuminate\Support\Facades\Route;

Route::prefix('categorias')->group(function () {
    Route::get('/', [CategoriaProdutoController::class, 'index']);
    Route::post('/', [CategoriaProdutoController::class, 'store']);
    Route::get('{id}', [CategoriaProdutoController::class, 'show']);
    Route::put('{id}', [CategoriaProdutoController::class, 'update']);
    Route::delete('{id}', [CategoriaProdutoController::class, 'destroy']);
});

Route::prefix('produtos')->group(function () {
    Route::get('/', [ProdutoController::class, 'index']);
    Route::post('/', [ProdutoController::class, 'store']);
    Route::get('{id}', [ProdutoController::class, 'show']);
    Route::put('{id}', [ProdutoController::class, 'update']);
    Route::delete('{id}', [ProdutoController::class, 'destroy']);
});

Route::prefix('resumo')->group(function () {
    Route::get('total-categorias', [ResumoController::class, 'totalCategoriaProdutos']);
    Route::get('total-produtos', [ResumoController::class, 'totalProduto']);
    Route::get('recentes/{qtd}', [ResumoController::class, 'itensRecentes']);
});
