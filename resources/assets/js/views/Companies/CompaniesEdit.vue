<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'Companies'}" class="btn btn-success">Back</router-link>
        </div>
        <vue-loading type="spiningDubbles" color="#2ab27b" :size="{ width: '50px', height: '50px' }" v-if="isLoading"></vue-loading>
         <div class="card">
            <div class="card-header">Create new company</div>
                <div class="card-body">
                    <form>
                        <div class="form-group row th">
                            <label class="control-label">Company name</label>
                            <input type="text" v-model="company.name" class="form-control" v-validate="'required'">
                            <span v-show="errors.has('name')" class="help invalid-feedback">{{ errors.first('name') }}</span>
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
                        <div class="form-group row">
                            <span class="input-group-btn">
                                <a href="#" id="lfm" data-input="thumbnail" data-preview="holder" class="btn btn-primary th">
                                <i class="fa fa-picture-o"></i> Image
                                </a>
                            </span>
                            <input id="thumbnail" class="form-control" type="hidden" name="filepath" v-model="company.image">
                        </div>
                    </form>
                    <img id="holder" style="margin-top:15px;" v-bind:src="company.image">
                </div>
                <div class="card-footer">
                    <button type="text" class="btn btn-primary" @click="validateBeforeSubmit()"><i class="fa fa-dot-circle-o"></i> Create</button>
                </div>
        </div>
    </div>
</template>
<script>
    import vueLoading from 'vue-loading-template';
    export default {
        
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
                    image: ''
                },
                isLoading: true,
                message: 'Waiting'
            }
        },
        mounted() {
            console.log($('#lfm'));
            $('#lfm').filemanager('image');
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
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var newCompany = app.company;
                newCompany.image = $('#thumbnail').val();
                console.log(newCompany);
                axios.patch('/api/v1/companies/' + app.companyId, newCompany)
                    .then(function (resp) {
                        app.$router.replace('/Companies');
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not create your company");
                    });
            },
            validateBeforeSubmit() {
                let app = this;
                const dict = {
                    custom: {
                        email: {
                        required: 'Your email is empty' // messages can be strings as well.
                        },
                        name: {
                        required: () => 'Your name is empty'
                        }
                    }
                };
                this.$validator.localize('en', dict);
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