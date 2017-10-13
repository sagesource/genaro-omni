<template>
    <div id="wrap">
        <Card class="box-card">
            <div class='login_center'>
                <span><img id="logo" src="~@/assets/genaro_logo.png"></span>
                <h3>Genaro</h3>
            </div>
            <Form ref="login" :model="login" :rules="ruleInline">
                <FormItem prop="username">
                    <Input type="text" v-model="login.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="login.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <div class='login_center'>
                    <FormItem>
                        <Button type="primary" @click="submitLogin()">Sign In</Button>
                        <Button type="ghost" style="margin-left: 8px">Sign Up</Button>
                    </FormItem>
                </div>
                <a id="a_forget">Forget Password?</a>
            </Form>
        </Card>
    </div>
</template>

<script> 
    export default {
        name : 'login-view',
        created: function () {
            console.log('login-view init')
        },
        data: function() {
            return {
                login: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: 'please input username', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'please input password', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitLogin() {
                if(this.login.username.length != 0 && this.login.password.length != 0) { 
                    this.$http.get('/static/users.json').then(response => {
                        // success callback
                        console.log('submit success resp:' + response)

                        var index;
                        for(index in response.data) {
                            if(response.data[index].username === this.login.username) {
                                if(response.data[index].password === this.login.password) {
                                    sessionStorage.setItem('username', this.login.username)
                                    sessionStorage.setItem('password', this.login.password)
                                    sessionStorage.setItem('bucketId', response.data[index].bucketId)

                                    this.$router.push({ path: '/index'})
                                } else {
                                    alert('username or password error!')
                                }
                            } else {
                                alert('username not exist!')
                            }
                        }
                    }, response => {
                        // error callback
                        console.log('submit error resp:' + response)
                    });
                }
            }
        }
    }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    position:relative;
    top:-100px;
    margin:0px auto;
  }

  .login_center {
      width: 100%;
      text-align: center;
  }

  #wrap{
    position:fixed;
    top:35%;
    left:0;
    width:100%;
  }

  #login_form {
      width: 100%;
  }

  #a_forget {
      margin-left:10px;
  }

</style>