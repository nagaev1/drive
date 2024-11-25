<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\UploadedFile;
use App\Models\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;


class FileController extends Controller
{
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'files' => 'required|array',
            'files.*' => 'file|max:10240', // Validate each file in the array
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $files = $request->file('files'); // Get the array of uploaded files
        $uploadedFiles = [];

        foreach ($files as $file) {
            $originalName = $file->getClientOriginalName();
            $mimeType = $file->getMimeType();
            $fileType = $this->getFileType($mimeType);
            $path = $file->store('uploads');

            $newFile = File::create([
                'name' => $originalName,
                'path' => $path,
                'type' => $fileType,
                'owner_id' => Auth::id(),
                'parent_id' => $request->parent_id ?: null
            ]);
            $uploadedFiles[] = $newFile;
        }

        return response()->json(['files' => $uploadedFiles], 201);
    }

    private function getFileType(string $mimeType): string
    {
        if (strpos($mimeType, 'image') === 0) {
            return 'image';
        } elseif (strpos($mimeType, 'video') === 0) {
            return 'video';
        } else {
            return 'text file';
        }
    }


    public function download($id)
    {
        $file = File::findOrFail($id);
        if (!Storage::exists($file->path)) {
            return response()->json(['error' => 'File not found'], 404);
        }
        if ($file->owner_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $fileContent = Storage::get($file->path);
        $mimeType = Storage::mimeType($file->path); // Get mimetype from Storage
        $response = response($fileContent, 200)
        ->header('Content-Type', $mimeType); //Set the content-type from storage

        return $response;
    }

    public function delete($id)
    {
        $file = File::findOrFail($id);
        if (!Storage::exists($file->path)) {
            return response()->json(['error' => 'File not found'], 404);
        }
        if ($file->owner_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        Storage::delete($file->path);
        $file->delete();
        return response()->json(['message' => 'File deleted']);
    }

    public function listFiles(Request $request) {
        $files = File::where('owner_id', Auth::id())->where('parent_id', $request->folder ?: null)->get();
        $formattedFiles = $files->map(function ($file) {
            $filePath = $file->path;
            if ($file->type === 'image') {
                $imageData = Storage::get($filePath);
                $base64Image = base64_encode($imageData);
                $file->data = 'data:' . $file->type . ';base64,' . $base64Image;
            }
            return $file;
        });

        return response()->json($formattedFiles->toArray());
    }

    public function rename(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'newName' => ['required', 'string', 'max:255', Rule::unique('files', 'name')->ignore($id)], //странная фигня которая игнорит имя файла
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $file = File::findOrFail($id);
        if ($file->owner_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $oldPath = $file->path;
        $newFileName = $request->input('newName');
        $newPath = str_replace(basename($oldPath), $newFileName, $oldPath);
        Storage::move($oldPath, $newPath);
        $file->update(['name' => $newFileName, 'path' => $newPath]);
        return response()->json(['file' => $file]);
    }
}
