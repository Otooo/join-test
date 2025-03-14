<?php

use App\Http\Controllers\CategoriaProdutoController;
use App\Http\Controllers\ProdutoController;
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
