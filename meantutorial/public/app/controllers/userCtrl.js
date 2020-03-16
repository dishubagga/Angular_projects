angular.module('userControllers', [])

.controller('regCtrl', function($http) {
    var app = this;
    
    this.regUser = function(regData){
        console.log("testing new button");
        console.log(this.regData);
        $http.post('/api/users', this.regData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                console.log("successssssss");
                app.successMsg = data.data.message;
                
            }
            else {
                app.errorMsg = data.data.message;
            }
        })
    }
})

