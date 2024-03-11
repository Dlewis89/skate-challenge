<?php

namespace Database\Seeders;

use App\Models\Trick;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrickSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tricks = [
            'KickFlip',
            'HeelFlip',
            'Pop Shuv it',
            'HardFlip',
            'Varial KickFlip',
            'Varial HeelFlip',
            '180',
            '360'
        ];

        // Resets the table before we seed to avoid duplication and new ids for each trick
        Trick::query()->truncate();

        foreach($tricks as $trick) {
            Trick::insert(['name' => $trick]);
        }
    }
}
