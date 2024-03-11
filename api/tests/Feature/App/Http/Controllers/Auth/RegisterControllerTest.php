<?php

namespace Tests\Feature\App\Http\Controllers\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterControllerTest extends TestCase
{
    use RefreshDatabase, withFaker;

    public function setUp(): void
    {
        parent::setUp();

        $password = $this->faker->password;

        $this->data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => $password,
            'password_confirmation' => $password
        ];
    }
    
    /**
     * A basic feature test example.
     */
    public function test_user_can_register_successfully(): void
    {
        $response = $this->postJson('api/v1/auth/register', $this->data);

        $response->assertStatus(201);
    }

    public function test_user_can_not_register_without_name(): void
    {
        unset($this->data['name']);

        $response = $this->postJson('/api/v1/auth/register', $this->data);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The name field is required.',
                'errors' => [
                    'name' => [
                        'The name field is required.'
                    ]
                ]
            ]);
    }

    public function test_user_can_not_register_without_email(): void
    {
        unset($this->data['email']);

        $response = $this->postJson('/api/v1/auth/register', $this->data);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The email field is required.',
                'errors' => [
                    'email' => [
                        'The email field is required.'
                    ]
                ]
            ]);
    }

    public function test_user_can_not_register_without_password(): void
    {
        unset($this->data['password']);

        $response = $this->postJson('/api/v1/auth/register', $this->data);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The password field is required.',
                'errors' => [
                    'password' => [
                        'The password field is required.'
                    ]
                ]
            ]);
    }

    public function test_user_can_not_register_without_password_confirmation(): void
    {
        unset($this->data['password_confirmation']);

        $response = $this->postJson('/api/v1/auth/register', $this->data);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The password field confirmation does not match.',
                'errors' => [
                    'password' => [
                        'The password field confirmation does not match.'
                    ]
                ]
            ]);
    }

    public function test_user_can_not_register_with_a_duplicate_email(): void
    {
        $this->postJson('/api/v1/auth/register', $this->data);

        $response = $this->postJson('/api/v1/auth/register', $this->data);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The email has already been taken.',
                'errors' => [
                    'email' => [
                        'The email has already been taken.'
                    ]
                ]
            ]);
    }
}
