<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/files/upload', [FileController::class, 'upload']);
    Route::delete('/files/{id}', [FileController::class, 'delete']);
    Route::get('/files/{id}', [FileController::class, 'download']);
    Route::get('/files', [FileController::class, 'listFiles']);
    Route::put('/files/{id}/rename', [FileController::class, 'rename']);

    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::patch('/user', [AuthController::class, 'userPatch'])->middleware('auth:sanctum');

    Route::post('/folders', [FolderController::class, 'store']);
    Route::delete('/folders/{id}', [FolderController::class, 'delete']);
    Route::get('/folders/{id}/', [FolderController::class, 'getFolderPath']);
    Route::get('/folders', [FolderController::class, 'listFolders']);
    Route::put('/folders/{id}/rename', [FolderController::class, 'rename']);
});
