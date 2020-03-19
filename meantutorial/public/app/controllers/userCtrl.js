angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User) {
    var app = this;
    
    this.regUser = function(regData){
        app.loading     = true;
        app.successMsg  = false; 
        app.errorMsg    = false;
        
        User.create(app.regData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                app.loading     = false;  
                app.successMsg  = data.data.message + "...Redirecting";
                $timeout(function(){
                    $location.path('/');
                }, 2000);
                
            }
            else {
                app.loading     = false; 
                app.errorMsg    = data.data.message;
            }
        })
    }

})

.controller('googleCtrl', function($routeParams, Auth, $location, $window){
    var app = this;
    if($window.location.pathname == '/googleerror'){
        app.errorMsg = 'Google email not found in db';
    } else {
        Auth.facebook($routeParams.token);
        $location.path('/');
    }
})

