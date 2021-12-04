<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'name', 'description','author_id','image'
    ];
    public function author(){
        return $this->belongsTo('App\User','author_id','id');
    }

    public function setImageAttribute($image)
    {

        $name = time().'.'.$image->getClientOriginalExtension();
        $destinationPath = public_path('/image');
        $image->move($destinationPath, $name);
        $this->attributes['image'] ="/image/".$name;
    }
}
