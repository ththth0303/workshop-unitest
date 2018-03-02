<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'Create'}" class="btn btn-success">Create new company</router-link>
        </div>
 
        <div class="panel panel-default">
            <div class="panel-heading">Companies list</div>
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
                    <tr v-for="(company, index) in companies" v-bind:key="company.id">
                        <td>{{ company.name }}</td>
                        <td>{{ company.address }}</td>
                        <td>{{ company.website }}</td>
                        <td>{{ company.email }}</td>
                        <td>
                            <router-link :to="{name: 'Edit', params: {id: company.id}}" class="btn btn-xs btn-warning">
                                Edit
                            </router-link>
                            <b-button type="button" variant="danger" @click="dangerModal = true;selectCompary.id = company.id; selectCompary.index = index">Delete</b-button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <b-modal title="Modal title" class="modal-danger" v-model="dangerModal" @ok="dangerModal = false;deleteEntry(selectCompary.id, selectCompary.index)" ok-variant="danger">
                Do you really want to delete it?
            </b-modal>
        </div>
    </div>
</template>
 
<script>
    import vueLoading from 'vue-loading-template';
    export default {
        data: function () {
            return {
                companies: [],
                isLoading: true,
                dangerModal: false,
                selectCompary: {id: null, index: null}
            }
        },
        components: {
            vueLoading
        },
        mounted() {
            var app = this;
            axios.get('/api/v1/companies')
                .then(function (resp) {
                    app.companies = resp.data;
                    app.isLoading = false;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load companies");
                });
        },
        methods: {
            deleteEntry(id, index) {
                var app = this;
                axios.delete('/api/v1/companies/' + id)
                    .then(function (resp) {
                        app.companies.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete company");
                    });
            }
        }
    }
</script>