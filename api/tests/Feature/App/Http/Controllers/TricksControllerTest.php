<?php

namespace Tests\Feature\App\Http\Controllers;

use App\Models\User;
use Database\Seeders\TrickSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Passport\Passport;
use Tests\TestCase;

class TricksControllerTest extends TestCase
{
    protected $seed = true;

    protected $seeder = TrickSeeder::class;

    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_a_user_can_not_generate_a_trick_without_being_authenticated(): void
    {
        $response = $this->getJson('/api/v1/tricks');

        $response->assertStatus(401);
    }

    public function test_a_user_can_generate_a_trick_successfully(): void
    {
      
        Passport::actingAs(
            User::factory()->create(),
            ['*']
        );

        $response = $this->getJson('api/v1/tricks', []);

        $trick_name = $response->decodeResponseJson()['trick']['name'];

        $this->assertDatabaseHas('tricks', [
            'name' => $trick_name
        ]);

        $response
            ->assertStatus(200);
    }
}
