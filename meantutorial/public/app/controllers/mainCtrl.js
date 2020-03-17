angular.module('mainController', ['authServices'])
.controller('mainCtrl', function(Auth, $timeout, $location){
    var app = this;
    
    if(Auth.isLoggedIn()){
        console.log("hey user is logged in");
    }
    else{
        console.log("user is not logged in");
    }
    this.doLogin = function(loginData){
        app.loading     = true;
        app.successMsg  = false; 
        app.errorMsg    = false;
        
        Auth.login(app.loginData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                app.loading     = false;  
                app.successMsg  = data.data.message + "...Redirecting";
                $timeout(function(){
                    $location.path('/about');
                }, 2000);
                
            }
            else {
                app.loading     = false; 
                app.errorMsg    = data.data.message;
            }
        })
    }
    this.logout = function() {
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
        }, 2000);
    }
});

    