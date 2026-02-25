<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['items.product'])
            ->latest()
            ->get();

        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();
        $itemsData = $data['items'];

        $order = DB::transaction(function () use ($data, $itemsData) {
            $total = 0;
            $preparedItems = [];

            foreach ($itemsData as $item) {
                $product = Product::lockForUpdate()->findOrFail($item['product_id']);
                $quantity = $item['quantity'];

                if ($product->stock_quantity < $quantity) {
                    throw ValidationException::withMessages([
                        'items' => [
                            "Insufficient stock for product {$product->name}. Available: {$product->stock_quantity}",
                        ],
                    ]);
                }

                $product->decrement('stock_quantity', $quantity);

                $unitPrice = $product->price;
                $subtotal = $unitPrice * $quantity;
                $total += $subtotal;

                $preparedItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                ];
            }

            $order = Order::create([
                'customer_name' => $data['customer_name'],
                'total_amount' => $total,
                'status' => Order::STATUS_PENDING,
            ]);

            foreach ($preparedItems as $item) {
                $order->items()->create($item);
            }

            return $order->load(['items.product']);
        });

        return (new OrderResource($order))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['items.product']);

        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderStatusRequest $request, Order $order)
    {
        $data = $request->validated();
        $newStatus = $data['status'];
        $oldStatus = $order->status;

        if ($newStatus === $oldStatus) {
            return new OrderResource($order->load(['items.product']));
        }

        $order = DB::transaction(function () use ($order, $oldStatus, $newStatus) {
            if ($oldStatus === Order::STATUS_CANCELLED && $newStatus !== Order::STATUS_CANCELLED) {
                throw ValidationException::withMessages([
                    'status' => ['Cancelled orders cannot be re-opened.'],
                ]);
            }

            if ($newStatus === Order::STATUS_CANCELLED && $oldStatus !== Order::STATUS_CANCELLED) {
                $order->loadMissing('items.product');

                foreach ($order->items as $item) {
                    if ($item->product) {
                        $item->product->increment('stock_quantity', $item->quantity);
                    }
                }
            }

            $order->update(['status' => $newStatus]);

            return $order->load(['items.product']);
        });

        return new OrderResource($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return response()->noContent();
    }
}
