<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    public function run()
    {
        $courses = [
            ['nombre' => 'Matemáticas Avanzadas', 'horario' => 'Lunes y Miércoles 10:00 - 12:00', 'fecha_inicio' => '2024-01-10', 'fecha_fin' => '2024-07-10', 'tipo' => 'Presencial'],
            ['nombre' => 'Historia del Arte', 'horario' => 'Martes y Jueves 14:00 - 16:00', 'fecha_inicio' => '2024-01-11', 'fecha_fin' => '2024-07-11', 'tipo' => 'Virtual'],
            ['nombre' => 'Biología Marina', 'horario' => 'Viernes 09:00 - 11:00', 'fecha_inicio' => '2024-01-12', 'fecha_fin' => '2024-07-12', 'tipo' => 'Presencial'],
            ['nombre' => 'Física Cuántica', 'horario' => 'Martes y Jueves 17:00 - 19:00', 'fecha_inicio' => '2024-01-13', 'fecha_fin' => '2024-07-13', 'tipo' => 'Virtual'],
            ['nombre' => 'Literatura Moderna', 'horario' => 'Lunes, Miércoles y Viernes 12:00 - 14:00', 'fecha_inicio' => '2024-01-14', 'fecha_fin' => '2024-07-14', 'tipo' => 'Presencial'],
            ['nombre' => 'Estadística Aplicada', 'horario' => 'Martes y Jueves 08:00 - 10:00', 'fecha_inicio' => '2024-01-15', 'fecha_fin' => '2024-07-15', 'tipo' => 'Virtual'],
        ];

        DB::table('cursos')->insert($courses);
    }
}
