// curso.model.ts
export interface Curso {
    id: number;
    nombre: string;
    horario: string;
    fecha_inicio: string;
    fecha_fin: string;
    tipo: 'Presencial' | 'Virtual';
    [key: string]: any;
}

