<?php

namespace Database\Seeders;

use App\Models\Stance;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stances = [
            'Standard',
            'Nollie',
            'Fakie',
            'Switch'
        ];

        Stance::query()->truncate();

        foreach($stances as $stance) {
            Stance::insert(['name' => $stance]);
        }
    }
}
