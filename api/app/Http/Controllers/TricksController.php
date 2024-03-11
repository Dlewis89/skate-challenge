<?php

namespace App\Http\Controllers;

use App\Models\Trick;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TricksController extends Controller
{
    public function index(Request $request) : JsonResponse
    {
        return response()->json([
            'trick' => Trick::inRandomOrder()->limit(1)->get()
        ]);
    }
}
