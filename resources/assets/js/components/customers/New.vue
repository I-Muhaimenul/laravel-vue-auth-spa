<template>
    <div class="customer-new">
        <form @submit.prevent="add">
            <div class="form-group row">
                <label for="name">Name</label>
                <input type="text" v-model="customer.name" class="form-control" placeholder="Name">
            </div>
            <div class="form-group row">
                <label for="email">Email</label>
                <input type="email" v-model="customer.email" class="form-control" placeholder="Email Address">
            </div>
            <div class="form-group row">
                <label for="password">Phone:</label>
                    <input type="text" v-model="customer.phone" class="form-control" placeholder="Phone">
                </div>
                    <div class="form-group row">
                    <input type="submit" value="Add">
                </div>
                <router-link to="/customers" >Back</router-link>
        </form>
        <div class="errors" v-if="errors">
            <ul>
                <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import validate from 'validate.js';

    export default {
        name: 'new',
        data() {
            return {
                customer: {
                    name: '',
                    email: '',
                    phone: ''
                },
                errors: null
            }
        },
        computed:{
            currentUser () {
                console.log($store.getters.currentUser.token)
                return this.$store.getters.currentUser;
            }
        }, 
        methods: {
            add() {
                this.errors = null;
                const constraints = this.getConstraints();

                const errors = validate(this.$data.customer, constraints);

                if(errors){
                    this.errors = errors;
                    return;
                }

                axios.post('/api/customers/new', this.$data.customer
                // , {
                //     header: {
                //         "Authorization": `Bearer ${this.currentUser.token}`
                //     }
                // }
                )
                .then((response) => {
                    this.$router.push('./customers');
                }).catch((error) => {
                    console.log(error);
                })
            },
            getConstraints() {
                return {
                    name: {
                        presence: true,
                        length: {
                            minimum: 3,
                            message: 'Must be at least 3 characters long'
                        }
                    },
                    email: {
                        presence: true,
                        email: true
                    },
                    phone: {
                        presence: true,
                        numericality: true,
                        length: {
                            minimum: 10,
                            message: 'Must be at least 10 digits long'
                        }
                    },
                };
            }
        }
    }
</script>