<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class FolderController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255', Rule::unique('folders', 'name')->where(function ($query) use ($request) {
                return $query->where('owner_id', Auth::id())->where('parent_id', $request->input('parent_id'));
            })],
            'parent_id' => 'nullable|exists:folders,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $folder = Folder::create([
            'owner_id' => Auth::id(),
            'parent_id' => $request->input('parent_id'),
            'name' => $request->input('name'),
        ]);

        return response()->json(['folder' => $folder], 201);
    }

    public function delete($id)
    {
        $folder = Folder::findOrFail($id);
        if ($folder->owner_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $folder->delete();
        return response()->json(['message' => 'Folder deleted']);
    }

    public function listFolders(Request $request)
    {
        $parentId = $request->input('parent_id', null); //Get parent_id from request or set to null
        $folders = Folder::where('owner_id', Auth::id())
                        ->when($parentId !== null, function ($query) use ($parentId) {
                            return $query->where('parent_id', $parentId);
                        })->where('parent_id', $request->folder ?: null)
                        ->get();

        return response()->json($folders);
    }


    public function rename(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'newName' => ['required', 'string', 'max:255', Rule::unique('folders', 'name')->ignore($id)],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $folder = Folder::findOrFail($id);
        if ($folder->owner_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $folder->update(['name' => $request->input('newName')]);
        return response()->json(['folder' => $folder]);
    }

    public function getFolderPath($id)
    {
        $folder = Folder::findOrFail($id);
        if ($folder->owner_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $path = $this->buildFolderPath($folder);
        return response()->json($folder);
    }

    private function buildFolderPath(Folder $folder): array
    {
        $path = [];
        $currentFolder = $folder;

        while ($currentFolder) {
            $currentFolder = $currentFolder->parent;
        }

        return $path;
    }
}
