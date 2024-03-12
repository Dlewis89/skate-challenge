<?php

namespace Tests\Feature\App\Http\Controllers;

use App\Models\User;
use Database\Seeders\TrickSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Passport\Passport;
use SebastianBergmann\Type\VoidType;
use Tests\TestCase;

class TricksControllerTest extends TestCase
{
    protected $seed = true;

    protected String $tricks_route = '/api/v1/tricks';

    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }
    /**
     * A basic feature test example.
     */
    public function test_a_user_can_not_generate_a_trick_without_being_authenticated(): void
    {
        $response = $this->getJson($this->tricks_route);

        $response->assertStatus(401);
    }

    public function test_a_user_can_generate_a_trick_successfully(): void
    {
      
        Passport::actingAs(
            User::factory()->create(),
            ['*']
        );

        $response = $this->getJson($this->tricks_route);

        $trick_name = $response->decodeResponseJson()['trick']['name'];

        $this->assertDatabaseHas('tricks', [
            'name' => $trick_name
        ]);

        $response
            ->assertStatus(200);
    }

    public function test_a_user_can_generate_a_stance_successfully(): void
    {
      
        Passport::actingAs(
            User::factory()->create(),
            ['*']
        );

        $response = $this->getJson($this->tricks_route);

        $stance_name = $response->decodeResponseJson()['stance']['name'];

        $this->assertDatabaseHas('stances', [
            'name' => $stance_name
        ]);

        $response
            ->assertStatus(200);
    }
}
