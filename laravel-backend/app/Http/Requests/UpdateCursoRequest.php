<?php
// UpdateCursoRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCursoRequest extends FormRequest
{
    public function authorize()
    {
        // Al igual que antes, debes retornar true si el usuario tiene permiso para realizar esta acción.
        return true;
    }

    public function rules()
    {
        return [
            'nombre' => 'sometimes|required|string|max:50',
            'horario' => 'nullable|string', // Ajusta según tus necesidades.
            'fecha_inicio' => 'sometimes|required|date',
            'fecha_fin' => 'sometimes|required|date|after:fecha_inicio',
            'tipo' => 'sometimes|required|in:Presencial,Virtual',
        ];
    }
}
