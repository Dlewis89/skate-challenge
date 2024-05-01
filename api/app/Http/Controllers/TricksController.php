<?php

namespace App\Http\Controllers;


use App\Models\Stance;
use App\Models\Trick;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TricksController extends Controller
{
    public function index(Request $request) : JsonResponse
    {

        return response()->json([
            'user' => Auth::user(),
            'stance' => Stance::inRandomOrder()->limit(1)->first(),
            'trick' => Trick::inRandomOrder()->limit(1)->first()
        ]);
    }
}
