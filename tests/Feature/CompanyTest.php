<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\Api\V1\CompaniesController;
use App\User;

class CompanyTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }
    
    public function testGetCompany()
    {
        $response = $this->get('api/v1/companies');
        $response->assertJsonStructure(
            [
                '*' => [
                    'address',
                    'created_at',
                    'email',
                    'id',
                    'name',
                    'updated_at',
                    'website'
                ]
            ]
        )->assertStatus(200);
    }

    public function testViewIndex()
    {
        $user = new User(array('name' => 'Th'));
        $this->be($user);
        $response = $this->get('/admin/');
        $response->assertViewIs('admin.companies.index');
    }
}
