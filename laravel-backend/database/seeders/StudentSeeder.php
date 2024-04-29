<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    public function run()
    {
        $students = [
            ['nombre' => 'Ana', 'apellido' => 'Lopez', 'edad' => 22, 'cedula' => '12345678901', 'email' => 'ana.lopez@example.com'],
            ['nombre' => 'Carlos', 'apellido' => 'Martinez', 'edad' => 24, 'cedula' => '12345678902', 'email' => 'carlos.martinez@example.com'],
            ['nombre' => 'Julia', 'apellido' => 'Gomez', 'edad' => 23, 'cedula' => '12345678903', 'email' => 'julia.gomez@example.com'],
            ['nombre' => 'Marcos', 'apellido' => 'Ruiz', 'edad' => 25, 'cedula' => '12345678904', 'email' => 'marcos.ruiz@example.com'],
            ['nombre' => 'Sara', 'apellido' => 'Jimenez', 'edad' => 26, 'cedula' => '12345678905', 'email' => 'sara.jimenez@example.com'],
            ['nombre' => 'Miguel', 'apellido' => 'Hernandez', 'edad' => 27, 'cedula' => '12345678906', 'email' => 'miguel.hernandez@example.com'],
        ];

        DB::table('estudiantes')->insert($students);
    }
}
