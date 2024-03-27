<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Log;

use Illuminate\Support\Facades\Hash;



class LoginController extends Controller
{
    public function login(UserLoginRequest $request) : JsonResponse
    {

        try {
            $user = User::where('email', $request->email)->first();

            if(empty($user) || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'User email or password is incorrect.'
                ], 400);
            }

            $user_with_token = array_merge($user->toArray(), [
                'token' => $user->createToken(config('app.name'))->accessToken
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User has logged in successfully',
                'user' => $user_with_token
            ]);
        } catch(Exception $e) {
            Log::error('email or password is incorrect');

            return response()->json([
                'status' => false,
                'message' => 'email or password is incorrect'
            ], 500);
        }

        
    }
}
