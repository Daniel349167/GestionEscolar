<?php

// StoreCursoRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCursoRequest extends FormRequest
{
    public function authorize()
    {
        // Aquí deberás retornar true si el usuario tiene permiso para realizar esta acción.
        // La autorización específica depende de tu lógica de autenticación y autorización.
        return true;
    }

    public function rules()
    {
        return [
            'nombre' => 'required|string|max:50',
            'horario' => 'nullable|string', // Define una validación más específica si es necesario.
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
            'tipo' => 'required|in:Presencial,Virtual',
        ];
    }
}
