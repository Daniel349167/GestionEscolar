<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimestampsToCursoEstudianteTable extends Migration
{
    public function up()
    {
        Schema::table('curso_estudiante', function (Blueprint $table) {
            $table->timestamps();  // Esta línea añade las columnas created_at y updated_at
        });
    }

    public function down()
    {
        Schema::table('curso_estudiante', function (Blueprint $table) {
            $table->dropColumn(['created_at', 'updated_at']);  // Elimina las columnas
        });
    }
}
