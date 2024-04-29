<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreEstudianteRequest extends FormRequest
{
    public function authorize()
    {
        // Consider setting this to 'true' if you handle authorization elsewhere
        return true;
    }

    public function rules()
{
    $estudiante = $this->route('estudiante');

    return [
        'nombre' => 'required|string|max:100',
        'apellido' => 'nullable|string|max:100',
        'edad' => 'required|integer|min:18',
        'cedula' => 'required|string|max:11',
        'email' => ['required', 'string', 'email', 'max:255', Rule::unique('estudiantes')->ignore($estudiante)],
        'cursos' => 'sometimes|required|array',   // 'sometimes' para que sea necesario solo en algunas situaciones
        'cursos.*' => 'exists:cursos,id'  // Cada elemento del array debe ser un ID existente en la tabla cursos
    ];
}
}
