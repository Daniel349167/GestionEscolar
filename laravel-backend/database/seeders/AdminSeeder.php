<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        $admins = [
            ['nombre' => 'Lucía', 'apellido' => 'Fernández', 'email' => 'lucia.fernandez@example.com', 'password' => Hash::make('Password@5')],
            ['nombre' => 'Carlos', 'apellido' => 'Garcia', 'email' => 'carlos.garcia@example.com', 'password' => Hash::make('Password@6')],
            ['nombre' => 'Admin', 'apellido' => 'User', 'email' => 'admin@example.com', 'password' => Hash::make('password123')],
        ];

        DB::table('administradores')->insert($admins);
    }
}

