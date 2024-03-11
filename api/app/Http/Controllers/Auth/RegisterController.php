<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRegistrationRequest;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;


class RegisterController extends Controller
{
    public function create(UserRegistrationRequest $request) : JsonResponse
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!empty($user)) {
                throw new Exception('User with this email already exists', 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)    
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User is created successfully',
            ], 201);
        } catch(Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], $e->getCode());
        }
        
    }
}
