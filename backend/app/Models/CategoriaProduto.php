<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoriaProduto extends Model
{
    protected $table = 'tb_categoria_produto';

    protected $primaryKey = 'id_categoria_planejamento';

    protected $fillable = [
        'nome_categoria'
    ];

    public $timestamps = false;

    public function produtos()
    {
        return $this->hasMany(Produto::class, 'id_categoria_produto', 'id_categoria_planejamento');
    }
}
