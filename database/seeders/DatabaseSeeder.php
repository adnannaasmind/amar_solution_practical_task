<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample products
        Product::create([
            'name' => 'Laptop',
            'sku' => 'LAP-001',
            'price' => 999.99,
            'stock_quantity' => 50,
        ]);

        Product::create([
            'name' => 'Mouse',
            'sku' => 'MOU-001',
            'price' => 29.99,
            'stock_quantity' => 200,
        ]);

        Product::create([
            'name' => 'Keyboard',
            'sku' => 'KEY-001',
            'price' => 79.99,
            'stock_quantity' => 150,
        ]);

        Product::create([
            'name' => 'Monitor',
            'sku' => 'MON-001',
            'price' => 299.99,
            'stock_quantity' => 75,
        ]);

        Product::create([
            'name' => 'Headphones',
            'sku' => 'HEA-001',
            'price' => 149.99,
            'stock_quantity' => 100,
        ]);

        Product::create([
            'name' => 'USB Cable',
            'sku' => 'USB-001',
            'price' => 9.99,
            'stock_quantity' => 500,
        ]);

        Product::create([
            'name' => 'Webcam',
            'sku' => 'WEB-001',
            'price' => 89.99,
            'stock_quantity' => 60,
        ]);

        Product::create([
            'name' => 'Desk Lamp',
            'sku' => 'LAM-001',
            'price' => 39.99,
            'stock_quantity' => 120,
        ]);
    }
}
