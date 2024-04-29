<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CursoEstudianteSeeder extends Seeder
{
    public function run()
    {
        // Obtener todos los IDs de cursos y estudiantes
        $cursos = DB::table('cursos')->pluck('id')->toArray();
        $estudiantes = DB::table('estudiantes')->pluck('id')->toArray();

        // Crear relaciones más variadas y múltiples
        $relaciones = [
            ['curso_id' => $cursos[0], 'estudiante_id' => $estudiantes[0]],
            ['curso_id' => $cursos[1], 'estudiante_id' => $estudiantes[1]],
            ['curso_id' => $cursos[2], 'estudiante_id' => $estudiantes[2]],
            ['curso_id' => $cursos[0], 'estudiante_id' => $estudiantes[3]],
            ['curso_id' => $cursos[1], 'estudiante_id' => $estudiantes[4]],
            ['curso_id' => $cursos[2], 'estudiante_id' => $estudiantes[5]],
            ['curso_id' => $cursos[3], 'estudiante_id' => $estudiantes[1]],
            ['curso_id' => $cursos[4], 'estudiante_id' => $estudiantes[2]],
            ['curso_id' => $cursos[5], 'estudiante_id' => $estudiantes[3]],
            ['curso_id' => $cursos[3], 'estudiante_id' => $estudiantes[4]],
            ['curso_id' => $cursos[4], 'estudiante_id' => $estudiantes[5]],
            ['curso_id' => $cursos[5], 'estudiante_id' => $estudiantes[0]],
            ['curso_id' => $cursos[1], 'estudiante_id' => $estudiantes[0]],
            ['curso_id' => $cursos[0], 'estudiante_id' => $estudiantes[1]],
            ['curso_id' => $cursos[2], 'estudiante_id' => $estudiantes[3]],
            ['curso_id' => $cursos[0], 'estudiante_id' => $estudiantes[4]],
            ['curso_id' => $cursos[1], 'estudiante_id' => $estudiantes[5]],
        ];

        // Insertar las relaciones en la base de datos
        DB::table('curso_estudiante')->insert($relaciones);
    }
}
