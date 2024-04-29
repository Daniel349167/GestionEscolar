<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Estudiante extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellido',
        'edad',
        'cedula',
        'email'
    ];

    public function cursos()
    {
        return $this->belongsToMany(Curso::class)->withTimestamps();
    }

    public static function rules()
    {
        return [
            'nombre' => 'required|string|max:100',
            'apellido' => 'string|max:100|nullable',
            'edad' => 'required|integer|min:18',
            'cedula' => 'required|string|max:11',
            'email' => 'required|string|email|max:255|unique:estudiantes'
        ];
    }
}
