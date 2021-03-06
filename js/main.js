'use strict';


angular.module('app')
	.controller('AppCtrl',['$scope','$translate','$localStorage','$window','$http',
		function($scope,$translate,$localStorage,$window,$http) {
			//add 'ie' classes to html
			var isIE = !!navigator.userAgent.match(/MSIE/i);
			isIE && angular.element($window.document.body).addClass('ie');
			isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

			//config
			$scope.app = {
				name:'Angulr',
				version:'1.3.3',
				color:{
					primary:'#7266ba',
					info:'#23b7e5',
					success:'#27c24c',
					warning:'#fad733',
					danger:'#f05050',
					light:'#e8eff0',
					dark:'#3a3f51',
					black:'#1c2b36'
				},
				settings:{
                    fontSize:12,
					themeID:1,
					navbarHeaderColor:'bg-black',
					navbarCollapseColor:'bg-white-only',
					asideColor:'bg-black',
					headerFixed:true,
					asideFixed:false,
					asideFolded:false,
					asideDock:false,
					container:false
				}
			};
			//save settings to local storage
			if(angular.isDefined($localStorage.settings)) {
				$scope.app.settings = $localStorage.settings;
			} else {
				$localStorage.settings = $scope.app.settings;
			}
			$scope.$watch('app.settings',function() {
				if($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
					//aside dock and fixed must set the header fixed.
					$scope.app.settings.headerFixed = true;
				}
				//save to local storage
				$localStorage.settings = $scope.app.settings;
			},true);

			//angular translate
			$scope.lang = {isopen:false};
			$scope.langs = {en:'English',de_DE:'German',it_IT:'Italian',cn:'Chinese'};
			$scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
			$scope.setLang = function(langKey,$event) {
				//set the current lang
				$scope.selectLang= $scope.langs[langKey];
				//You can change the language during runtime
				$translate.use(langKey);
				$scope.lang.isoen = !$scope.lang.isopen;
			};

			function isSmartDevice($window) {
				//Adapted from http://www.detectmobilebrowsers.com
				var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
				//check for ios,android,blackberry,opera mini, and windows mobiles device
				return (/iPhone|iPod|iPad|Slik|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
			}
			//fontsize slider
            angular.element("#fontSizeSlider").on('slideStop',function(data) {
                $scope.$apply(function() {
                    $scope.app.settings.fontSize = data.value;
                });
            });
			//获取nav.json 动态生成navigation
			$scope.getNav = function() {
                setTimeout(function() {
                    $http.get('js/controllers/nav.json').success(function(resources) {
                        $scope.resources = resources;
                    });
                },100);
			};
			$scope.getNav();

	}]);
