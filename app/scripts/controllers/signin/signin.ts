﻿/// <reference path="../../_app.ts"/>
/// <reference path="../../components/auth/auth-service.ts"/>

module WhoDidWhat.SignIn {
    /**
     * Defines the Sign In controller scope interface
     */
    export interface ISignInCtrlScope extends ng.IScope {
        /**
         * Signs the user in.
         */
        signIn(): void;

        /**
         * The entered email address.
         */
        email?: string;

        /**
         * The entered password.
         */
        password?: string;

        /**
         * Indicates the the authentication is in progress.
         */
        progress?: boolean;
    }

    /**
     * The Sign In page controller.
     */
    export class SignInCtrl {
        public static $inject = [
            '$scope',
            'authService',
            '$state'
        ];

        constructor(private $scope: ISignInCtrlScope,
            private authService: Auth.AuthService,
            private $state: ng.ui.IStateService) {
            $scope.signIn = <() => void>angular.bind(this, this.signIn);
        }

        /**
         * Signs the user in.
         */
        public signIn(): void {
            this.$scope.progress = true;
            this.authService.authenticate(this.$scope.email, this.$scope.password)
                .then(() => {
                    this.$state.go('account');
                })
                .catch((resp: any) => {
                    if (resp && resp.data && resp.data.modelState) {
                        alert(resp.data.modelState['']);
                    }
                })
                .finally(() => {
                    this.$scope.progress = false;
                });
        }
    }

    angular.module('whoDidWhat.signin', [
            'ui.router',
            'whoDidWhat.auth'
        ])
        .controller('SignInCtrl', SignInCtrl);
}