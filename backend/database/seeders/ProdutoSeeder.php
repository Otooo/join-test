<?php

namespace Database\Seeders;

use App\Models\Produto;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProdutoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Produto::insert([
            [
                'id_categoria_produto' => 1,
                'data_cadastro' => Carbon::now(),
                'nome_produto' => 'Vassoura',
                'valor_produto' => 7.59
            ],
            [
                'id_categoria_produto' => 1,
                'data_cadastro' => Carbon::now(),
                'nome_produto' => 'Lixeira',
                'valor_produto' => 10.09
            ],
            [
                'id_categoria_produto' => 2,
                'data_cadastro' => Carbon::now(),
                'nome_produto' => 'Barra de chocolate',
                'valor_produto' => 25.50
            ],
            [
                'id_categoria_produto' => 3,
                'data_cadastro' => Carbon::now(),
                'nome_produto' => 'Carrinho',
                'valor_produto' => 5.00
            ],
            [
                'id_categoria_produto' => 4,
                'data_cadastro' => Carbon::now(),
                'nome_produto' => 'Fone de ouvido',
                'valor_produto' => 99.99
            ],
            [
                'id_categoria_produto' => 5,
                'data_cadastro' => Carbon::now(),
                'nome_produto' => 'Caderno',
                'valor_produto' => 200
            ],
        ]);
    }
}
