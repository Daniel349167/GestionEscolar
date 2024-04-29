<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Configura el middleware global y las excepciones de rutas aquí
        $middleware->validateCsrfTokens(except: [
           '/api/login',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Configurar cómo se manejan las excepciones globalmente
    })->create();
