<?php

// En Laravel, crea un nuevo controlador llamado DashboardController
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Curso;
use App\Models\Estudiante;

class DashboardController extends Controller
{
    public function index()
    {
        // Top 3 cursos con más estudiantes
        $topCourses = Curso::withCount('estudiantes')
                           ->orderBy('estudiantes_count', 'desc')
                           ->take(3)
                           ->get(['nombre as name', 'estudiantes_count as studentCount']);

        // Top 3 estudiantes con más cursos
        $topStudents = Estudiante::withCount('cursos')
                                 ->orderBy('cursos_count', 'desc')
                                 ->take(3)
                                 ->get(['nombre as name', 'cursos_count as courseCount']);

        // Totales
        $totalCourses = Curso::count();
        $totalStudents = Estudiante::count();

        return response()->json([
            'topCourses' => $topCourses,
            'topStudents' => $topStudents,
            'totalCourses' => $totalCourses,
            'totalStudents' => $totalStudents
        ]);
    }
}
