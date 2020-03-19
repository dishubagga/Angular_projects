angular.module('mainController', ['authServices'])
.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window){
    var app = this;
    app.loadme = false;
    $rootScope.$on('$routeChangeStart', function(){
        if(Auth.isLoggedIn()){
            console.log("hey user is logged in");
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
                
                app.username = data.data.username;
                app.email    = data.data.email;
                app.loadme = true;

            })
        }
        else{
            
            app.isLoggedIn = false;
            app.username = null;
            app.loadme = true;
        }
    });
    this.twitter = function() {
        console.log($window.location.host); //localhost:8080
        console.log($window.location.protocol);
        $window.$location = $window.location.protocol + '//' + $window.location.host + '/auth/twitter';
    }
    this.google = function(){
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/google';
    }
    this.doLogin = function(loginData){
        app.loading     = true;
        app.successMsg  = false; 
        app.errorMsg    = false;
        
        Auth.login(app.loginData).then(function(data){
           
            if(data.data.success){
                app.loading     = false;  
                app.successMsg  = data.data.message + "...Redirecting";
                $timeout(function(){
                    $location.path('/about');
                    app.loginData= '';
                    app.successMsg = false;
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

    