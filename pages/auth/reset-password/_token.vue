<template>
  <main class="login">
    <LazyCustomHeader>
      <v-container class="center-container">
        <v-row>
          <v-col cols="12" md="8" class="mx-auto mt-5">
            <v-row>
              <v-col cols="12">
                <v-card flat color="transparent">
                  <div class="login__header">
                    <h1 class="text-center login__title py-5">
                      {{ $t('reset_password') }}
                    </h1>
                    <p class="login__sub-title">
                      {{ $t('forget_password_text') }}
                    </p>
                  </div>
                  <form-wrapper :validator="$v.form">
                    <v-form @submit.prevent="handleSubmit">
                      <v-row>
                        <v-col cols="12" class="my-0 py-0">
                          <form-group name="email" attribute="email">
                            <template slot-scope="{ attrs, listeners }">
                              <v-text-field
                                v-bind="attrs"
                                v-on="listeners"
                                filled
                                background-color="#fff"
                                v-model="form.email"
                                type="email"
                                :label="$t('email')"
                                :append-icon="'mdi-email'"
                              ></v-text-field>
                            </template>
                          </form-group>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <form-group name="password" attribute="password">
                            <template slot-scope="{ attrs, listeners }">
                              <v-text-field
                                v-bind="attrs"
                                v-on="listeners"
                                filled
                                background-color="#fff"
                                v-model="form.password"
                                :type="!showPassword ? 'password' : 'text'"
                                :label="$t('new_password')"
                                :append-icon="passwordIcon"
                                @click:append="showPassword = !showPassword"
                              ></v-text-field>
                            </template>
                          </form-group>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <v-btn
                            :loading="loading"
                            :disabled="$v.form.$invalid"
                            height="56px"
                            type="submit"
                            block
                            large
                            class="primary"
                            >{{ $t('send') }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </form-wrapper>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </LazyCustomHeader>
  </main>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'ResetPassword',
  layout: 'auth',
  middleware: ['isAuth'],

  data() {
    return {
      showPassword: false,
      loading: false,
      form: {
        password: '',
        email: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true
      this.$axios
        .post(`/auth/reset-password/${this.$route.params.token}`)
        .then(() => {
          this.$router.push(this.localePath('/login'))
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  computed: {
    passwordIcon() {
      if (!this.showPassword) {
        return 'mdi-eye-off'
      } else {
        return 'mdi-eye'
      }
    },
  },
  validations: {
    form: {
      password: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
}
</script>

