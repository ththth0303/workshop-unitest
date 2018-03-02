<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'Companies'}" class="btn btn-success">Back</router-link>
        </div>
        <vue-loading type="spiningDubbles" color="#2ab27b" :size="{ width: '50px', height: '50px' }" v-if="isLoading"></vue-loading>
         <div class="card" v-else>
                <form v-on:submit="saveForm()">
            <div class="card-header">Create new company</div>
            <div class="card-body">
                    <div class="form-group row">
                        <label class="control-label">Company name</label>
                        <input type="text" v-model="company.name" class="form-control">
                    </div>
                    <div class="form-group row">
                        <label class="control-label">Company address</label>
                        <input type="text" v-model="company.address" class="form-control">
                    </div>
                    <div class="form-group row">
                        <label class="control-label">Company website</label>
                        <input type="text" v-model="company.website" class="form-control">
                    </div>
                    <div class="form-group row">
                        <label class="control-label">Company email</label>
                        <input type="text" v-model="company.email" class="form-control">
                    </div>
            </div>
            <div class="card-footer">
                <button type="submit" class="btn btn-primary" @click="saveForm()"><i class="fa fa-dot-circle-o"></i> Edit</button>
                <button type="reset" class="btn btn-danger"><i class="fa fa-dot-circle-o"></i> Reset</button>
            </div>
                </form>
        </div>
    </div>
</template>
<script>
    import vueLoading from 'vue-loading-template';
    export default {
        mounted() {
            let app = this;
            let id = app.$route.params.id;
            app.companyId = id;
            axios.get('/api/v1/companies/' + id)
                .then(function (resp) {
                    app.company = resp.data;
                    app.isLoading = false;
                    app.message = 'Edit Copmpany';
                })
                .catch(function () {
                    alert("Could not load your company")
                });
        },
        components: {
            vueLoading
        },
        data: function () {
            return {
                companyId: null,
                company: {
                    name: '',
                    address: '',
                    website: '',
                    email: '',
                },
                isLoading: true,
                message: 'Waiting'
            }
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var newCompany = app.company;
                axios.patch('/api/v1/companies/' + app.companyId, newCompany)
                    .then(function (resp) {
                        app.$router.replace('/Companies');
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not create your company");
                    });
            }
        }
    }
</script>