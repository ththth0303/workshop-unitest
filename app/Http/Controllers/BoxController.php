<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BoxController extends Controller
{

    public function __construct($foo = null)
    {
        $this->arr = $foo;
    }

    public function has($value = '')
    {
        if (in_array($value, $this->arr)) {
            return $value;
        }

        return false;
    }
}
