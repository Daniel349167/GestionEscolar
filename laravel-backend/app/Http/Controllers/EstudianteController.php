<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Http\Requests\StoreEstudianteRequest;
use Illuminate\Http\Response;

class EstudianteController extends Controller
{
    public function index()
    {
        $estudiantes = Estudiante::all();
        return response()->json($estudiantes);
    }

    public function store(StoreEstudianteRequest $request)
    {
        // Crear el estudiante
        $estudiante = Estudiante::create($request->validated());

        // Asignar cursos al estudiante
        $estudiante->cursos()->sync($request->cursos);

        return response()->json($estudiante, Response::HTTP_CREATED);
    }

    public function show(Estudiante $estudiante)
    {
        return response()->json($estudiante);
    }

    public function update(StoreEstudianteRequest $request, Estudiante $estudiante)
    {
        // Actualizar la información del estudiante con los datos validados
        $estudiante->update($request->validated());

        // Sincronizar los cursos asociados al estudiante
        // Esto eliminará cualquier curso no incluido en el array y añadirá los nuevos
        $estudiante->cursos()->sync($request->input('cursos', []));

        return response()->json($estudiante);
    }


    public function destroy(Estudiante $estudiante)
    {
        $estudiante->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function listarCursos($estudianteId)
    {
        // Obtener y devolver los cursos asociados al estudiante
        // Debes tener un modelo Estudiante con una relación cursos que puedas llamar aquí
        $estudiante = Estudiante::with('cursos')->findOrFail($estudianteId);
        return response()->json($estudiante->cursos);
    }
}
