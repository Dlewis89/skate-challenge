<?php

namespace Tests\Feature\App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_a_user_can_login_successfully(): void
    {
        $user = User::factory()->create();

        \Artisan::call('passport:install --force');

        $response = $this->postJson('/auth/api/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'status',
                'message',
                'user'
            ]);
    }

    public function test_a_user_can_not_login_without_email(): void
    {
        $user = User::factory()->create();

        \Artisan::call('passport:install --force');

        $response = $this->postJson('/auth/api/login', [
            'password' => 'password'
        ]);

        $response
            ->assertUnprocessable()
            ->assertJson([
                'message' => 'The email field is required.',
                'errors' => [
                    'email' => [
                        'The email field is required.'
                    ]
                ]
            ]);
    }


    public function test_a_user_can_not_login_without_password(): void
    {
        $user = User::factory()->create();

        \Artisan::call('passport:install --force');

        $response = $this->postJson('/auth/api/login', [
            'email' => $user->email
        ]);

        $response
            ->assertUnprocessable()
            ->assertJson([
                'message' => 'The password field is required.',
                'errors' => [
                    'password' => [
                        'The password field is required.'
                    ]
                ]
            ]);
    }
}
