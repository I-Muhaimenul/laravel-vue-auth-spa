<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Customer;

class CustomersController extends Controller
{
    public function index()
    {
        $customers = Customer::all();

        return response()->json([
            "customers" => $customers
        ], 200);
    }

    public function show($id)
    {
        $customer = Customer::whereId($id)->first();

        return response()->json([
            "customer" => $customer
        ], 200);
    }

    public function store(Request $request)
    {
        $customer = Customer::create($request->only(["name", "email", "phone"]));

        return response()->json([
            "customer" => $customer
        ], 200);
    }
}
