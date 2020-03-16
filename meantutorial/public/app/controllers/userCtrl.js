angular.module('userControllers', [])

.controller('regCtrl', function() {
    this.regUser = function(regData){
        console.log("testing new button");
        console.log(this.regData);
    }
})