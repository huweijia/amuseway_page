'use strict';

angular.module('app')
	.run(
		['$rootScope','$state','$stateParams',
			function($rootScope,$state,$stateParams) {
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
			}
		]
	)
	.config(
		['$stateProvider','$urlRouterProvider',
			function($stateProvider,$urlRouterProvider) {
				$urlRouterProvider
					.otherwise('/app/dashboard-v1');
				$stateProvider
					.state('app',{
						abstract:true,
						url:'/app',
						templateUrl:'tpl/app.html'
					})
					.state('app.dashboard-v1',{
						url:'/dashboard-v1',
						templateUrl:'tpl/app_dashboard_v1.html',
						resolve:{
							deps:['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load(['js/controllers/chart.js']);
								}]
						}
					})
					.state('app.dashboard-v2',{
						url:'/dashboard-v2',
						templateUrl:'tpl/app_dashboard_v2.html',
						resolve:{
							deps:['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load(['js/controllers/chart.js']);
								}]
						}
					})
					.state('app.calendar',{
						url:'/calendar',
						templateUrl:'tpl/app_calendar.html',
						//use resolve to load other dependences
						resolve:{
							deps:['$ocLazyLoad','uiLoad',
								function($ocLazyLoad,uiLoad) {
									return uiLoad.load(
										['vendor/jquery/fullcalendar/fullcalendar.css',
											'vendor/jquery/fullcalendar/theme.css',
											'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
											'vendor/libs/moment.min.js',
											'vendor/jquery/fullcalendar/fullcalendar.min.js',
											'js/app/calendar/calendar.js']
									).then(
										function() {
											return $ocLazyLoad.load('ui.calendar');
										}
									)
							}]
						}
					})
					.state('app.mail',{
						abstract:true,
						url:'/mail',
						templateUrl:'tpl/mail.html',
						//use resolve to load the other dependences
						resolve:{
							deps:['uiLoad',
								function(uiLoad) {
									return uiLoad.load(['js/app/mail/mail.js',
										'js/app/mail/mail-service.js',
										'vendor/libs/moment.min.js']);
								}]
						}
					})
					.state('app.mail.list',{
						url:'/indexbox/{fold}',
						templateUrl:'tpl/mail.list.html'
					})
					.state('app.mail.detail',{
						url:'/{mailId:[0-9]{1,4}}',
						templateUrl:'tpl/mail.detail.html'
					})
					.state('app.mail.compose',{
						url:'/compose',
						templateUrl:'tpl/mail.new.html'
					})
					.state('apps',{
						abstract:true,
						url:'/apps',
						templateUrl:'tpl/layout.html'
					})
					.state('apps.note',{
						url:'/note',
						templateUrl:'tpl/apps_note.html',
						resolve:{
							deps:['uiLoad',
								function(uiLoad) {
									return uiLoad.load(['js/app/note/note.js',
										'vendor/libs/moment.min.js']);
								}]
						}
					})
					.state('apps.contact',{
						url:'/content',
						templateUrl:'tpl/apps_contact.html',
						resolve:{
							deps:['uiLoad',
								function(uiLoad) {
									return uiLoad.load(['js/app/contact/contact.js']);
								}]
						}
					})
					.state('apps.weather',{
						url:'/weather',
						templateUrl:'tpl/apps_weather.html',
						resolve:{
							deps:['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load(
										{
											name:'angular-skycons',
											files:['js/app/weather/skycons.js',
												'vendor/libs/moment.min.js',
												'js/app/weather/angular-skycons.js',
												'js/app/weather/ctrl.js']
										}
									);
								}]
						}
					})
					.state('layout',{
						abstract:true,
						url:'/layout',
						templateUrl:'tpl/layout.html'
					})
					.state('layout.fullwidth',{
						url:'/fullwidth',
						views:{
							'':{
								templateUrl:'tpl/layout_fullwidth.html'
							},
							'footer':{
								templateUrl:'tpl/layout_footer_fullwidth.html'
							}
						},
						resolve:{
							deps:['uiLoad',
								function(uiLoad) {
									return uiLoad.load(['js/controllers/vectormap.js']);
								}]
						}
					})
					.state('layout.mobile',{
						url:'/mobile',
						views:{
							'':{
								templateUrl:'tpl/layout_mobile.html'
							},
							'footer':{
								templateUrl:'tpl/layout_footer_mobile.html'
							}
						}
					})
					.state('layout.app',{
						url:'/app',
						views:{
							'':{
								templateUrl:'tpl/layout_app.html'
							},
							'footer':{
								templateUrl:'tpl/layout_footer_fullwidth.html'
							}
						},
						resolve:{
							deps:['uiLoad',
								function(uiLoad) {
									return uiLoad.load(['js/controllers/tab.js']);
								}]
						}
					})
					.state('app.ui',{
						url:'/ui',
						template:'<div ui-view class="fade-in-up"></div>'
					})
					.state('app.ui.buttons',{
						url:'/buttons',
						templateUrl:'tpl/ui_buttons.html'
					})
					.state('app.ui.icons',{
						url:'/icons',
						templateUrl:'tpl/ui_icons.html'
					})
					.state('app.ui.grid',{
						url:'/grid',
						templateUrl:'tpl/ui_grid.html'
					})
					.state('app.ui.widgets',{
						url:'/widgets',
						templateUrl:'tpl/ui_widgets.html'
					})

			}
		]
	);
