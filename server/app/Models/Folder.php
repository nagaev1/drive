<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $fillable = ['owner_id', 'parent_id', 'name'];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function parent() {
        return $this->belongsTo(Folder::class, 'parent_id');
    }

    public function children() {
        return $this->hasMany(Folder::class, 'parent_id');
    }

    public function files() {
        return $this->hasMany(File::class, 'parent_id');
    }
}