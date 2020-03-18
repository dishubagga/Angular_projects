angular.module('userApp', ['appRoutes', 'userControllers', 'userServices', 'mainController', 'authServices'])
.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
    console.log("testing user application");
})