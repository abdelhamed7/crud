<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'        => $request->id,
            'name' => $request->name,
            'description'     => $request->description,
            'image'=>           $request->image,
            'author_id'=>$request->author_id
        ];
    
    }
}
