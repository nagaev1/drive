<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = ['owner_id', 'parent_id', 'name', 'path', 'type'];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function parent() {
        return $this->belongsTo(Folder::class, 'parent_id');
    }
}
