<?php

namespace Database\Seeders;

use App\Models\CategoriaProduto;
use Illuminate\Database\Seeder;

class CategoriaProdutoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CategoriaProduto::insert([
            [
                'nome_categoria' => 'Produtos de limpeza'
            ],
            [
                'nome_categoria' => 'Doces'
            ],
            [
                'nome_categoria' => 'Brinquedos'
            ],
            [
                'nome_categoria' => 'Eletronicos'
            ],
            [
                'nome_categoria' => 'Material escolar'
            ],
            [
                'nome_categoria' => 'Saúde'
            ],
        ]);
    }
}
