<template>
    <div>
        <div class="form-group">
            <button class="btn btn-success" @click="dangerModal = true" >Create new category</button>
        </div>
 
        <div class="panel panel-default">
            <div class="panel-heading">categories list</div>
            <div class="panel-body">
                <vue-loading type="spiningDubbles" color="#2ab27b" :size="{ width: '50px', height: '50px' }" v-if="isLoading"></vue-loading>
                <table class="table table-bordered table-striped" v-else>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Website</th>
                        <th>Email</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(category, index) in categories" v-bind:key="category.id">
                        <td>{{ category.name }}</td>
                        <td>{{ category.address }}</td>
                        <td>{{ category.website }}</td>
                        <td>{{ category.email }}</td>
                        <td>
                            <router-link :to="{name: 'Edit', params: {id: category.id}}" class="btn btn-xs btn-warning">
                                Edit
                            </router-link>
                            <b-button type="button" variant="danger" @click="dangerModal = true;selectCompary.id = category.id; selectCompary.index = index">Delete</b-button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <b-modal title="Modal title" hide-backdrop="false" class="modal-danger" v-model="dangerModal" @ok="dangerModal = true;deleteEntry(selectCompary.id, selectCompary.index)" ok-variant="danger">
                <div class="card">
                    <div class="card-header">Create new categories</div>
                    <div class="card-body">
                        <form v-on:submit="saveForm()">
                            <div class="form-group row">
                                <label class="control-label">Company name</label>
                                <input type="text" v-model="category.name" class="form-control">
                            </div>
                            <div class="form-group row">
                                <label class="control-label">category parent</label>
                                <input type="text" v-model="category.parent_id" class="form-control">
                            </div>
                            <div class="form-group row">
                                <label class="control-label">category Icon</label>
                                <input type="text" v-model="category.icon" class="form-control">
                            </div>
                            <div class="form-group row">
                                <label class="control-label">category image</label>
                                <input type="text" v-model="category.image" class="form-control" v-validate="'required|email'" name="email">
                                <span v-show="errors.has('email')" class="help invalid-feedback">{{ errors.first('email') }}</span>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary" @click="validateBeforeSubmit()"><i class="fa fa-dot-circle-o"></i> Create</button>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>
 
<script>
    import vueLoading from 'vue-loading-template';
    export default {
        data: function () {
            return {
                categories: [],
                isLoading: true,
                dangerModal: false,
                selectCompary: {id: null, index: null},
                category: {name: '', icon: '', pagent_id: '', image: ''}
            }
        },
        components: {
            vueLoading
        },
        mounted() {
            var app = this;
            axios.get('/api/v1/categories')
                .then(function (resp) {
                    app.categories = resp.data;
                    app.isLoading = false;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load categories");
                });
        },
        methods: {
            deleteEntry(id, index) {
                var app = this;
                axios.delete('/api/v1/categories/' + id)
                    .then(function (resp) {
                        app.categories.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete category");
                    });
            }
        }
    }
</script>