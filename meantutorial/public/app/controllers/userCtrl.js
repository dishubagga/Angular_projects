angular.module('userControllers', [])

.controller('regCtrl', function($http) {
    var app = this;
    
    this.regUser = function(regData){
        app.loading     = true;
        app.successMsg  = false; 
        app.errorMsg    = false;
        console.log(this.regData);
        $http.post('/api/users', this.regData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                app.loading     = false;  
                console.log("successssssss");
                app.successMsg  = data.data.message;
                
            }
            else {
                app.loading     = false; 
                app.errorMsg    = data.data.message;
            }
        })
    }
})

