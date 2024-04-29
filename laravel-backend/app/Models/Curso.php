<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'horario',
        'fecha_inicio',
        'fecha_fin',
        'tipo'
    ];

    public function estudiantes()
    {
        return $this->belongsToMany(Estudiante::class)->withTimestamps();
    }

    public static function rules()
    {
        return [
            'nombre' => 'required|string|max:50',
            'horario' => 'required|string', 
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'tipo' => 'required|in:Presencial,Virtual'
        ];
    }
}
