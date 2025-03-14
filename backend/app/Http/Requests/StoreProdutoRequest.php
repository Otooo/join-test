<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class StoreProdutoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_categoria_produto' => 'required|exists:tb_categoria_produto,id_categoria_planejamento',
            'nome_produto' => 'required|string|max:150',
            'valor_produto' => 'required|numeric',
        ];
    }

    public function messages(): array
    {
        return [
            'id_categoria_produto.required' => 'A categoria do produto é obrigatória.',
            'id_categoria_produto.exists' => 'A categoria do produto não existe.',
            'nome_produto.required' => 'O nome do produto é obrigatório.',
            'valor_produto.required' => 'O valor do produto é obrigatório.',
            'valor_produto.numeric' => 'O valor do produto deve ser um número.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ValidationException($validator, response()->json([
            'success' => false,
            'message' => 'A validação falhou.',
            'errors' => $validator->errors()
        ], 422));
    }
}
