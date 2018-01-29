<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'Companies'}" class="btn btn-success">Back</router-link>
        </div>
 
        <div class="card">
            <div class="card-header">Create new company</div>
            <div class="card-body">
                <form v-on:submit="saveForm()">
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
                        <input type="text" v-model="company.email" class="form-control" v-validate="'required|email'" name="email">
                        <span v-show="errors.has('email')" class="help invalid-feedback">{{ errors.first('email') }}</span>
                    </div>
                </form>
            </div>
            <div class="card-footer">
                <button type="submit" class="btn btn-primary" @click="validateBeforeSubmit()"><i class="fa fa-dot-circle-o"></i> Create</button>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        data: function () {
            return {
                company: {
                    name: '',
                    address: '',
                    website: '',
                    email: '',
                }
            }
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var newCompany = app.company;
                axios.post('/api/v1/companies', newCompany)
                    .then(function (resp) {
                        app.$router.push({path: '/companies'});
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not create your company");
                    });
            },
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.saveForm();
                    } else {
                        event.preventDefault();
                    }
            });
    }
        }
    }
</script>