<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Estudiante;
use App\Http\Requests\StoreCursoRequest;
use App\Http\Requests\UpdateCursoRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;


class CursoController extends Controller
{
    public function index()
    {
        $cursos = Curso::with('estudiantes')->get();
        return response()->json($cursos);
    }

    public function store(StoreCursoRequest $request)
    {
        $curso = Curso::create($request->validated());
        return response()->json($curso, Response::HTTP_CREATED);
    }

    public function show(Curso $curso)
    {
        return response()->json($curso->load('estudiantes'));
    }

    public function update(UpdateCursoRequest $request, Curso $curso)
    {
        $curso->update($request->validated());
        return response()->json($curso);
    }

    public function destroy(Curso $curso)
    {
        $curso->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function asignarEstudiante(Request $request, Curso $curso, Estudiante $estudiante)
    {
        $curso->estudiantes()->syncWithoutDetaching([$estudiante->id]);
        return response()->json(['mensaje' => 'Estudiante asignado al curso correctamente'], Response::HTTP_OK);
    }

    // Asumiendo que este método existiría en otro controlador, como DashboardController
    public function dashboard()
    {
        // Esta lógica dependerá de cómo quieras implementar el cálculo y la consulta
        // del top 3 de cursos y estudiantes, entre otros datos para el dashboard.
    }
}
