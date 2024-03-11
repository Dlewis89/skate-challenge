<?php

namespace Tests\Feature\App\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TricksControllerTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_a_user_can_not_generate_a_trick_without_being_authenticated(): void
    {
        $response = $this->getJson('/api/v1/tricks');

        $response->assertStatus(401);
    }
}
