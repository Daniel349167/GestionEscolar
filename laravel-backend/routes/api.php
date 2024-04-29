<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;

// Rutas para administradores
Route::apiResource('administradores', AdministradorController::class);

// Rutas para estudiantes
Route::apiResource('estudiantes', EstudianteController::class);
Route::get('estudiantes/{estudiante}/cursos', [EstudianteController::class, 'listarCursos']);

// Rutas para cursos
Route::apiResource('cursos', CursoController::class);
Route::post('cursos/{curso}/estudiantes/{estudiante}', [CursoController::class, 'asignarEstudiante']);

Route::get('dashboard', [DashboardController::class, 'index']);


Route::post('/login', [AuthController::class, 'login'])->middleware('web');
