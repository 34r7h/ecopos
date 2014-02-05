angular.module('ecopos.resources', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.resources').config(function($routeProvider) {

    $routeProvider.
    when('agenda',{templateUrl: 'partial/agenda/agenda.html'});

});
angular.module('ecopos.resources').factory('resourcesTest',function() {

	var resourcesTest = {test: "Resources Module Service Working"};

	return resourcesTest;
});
angular.module('ecopos.resources').factory('deliveryRoute',function() {

	var deliveryRoute = {test:"Delivery Route Service"};

	return deliveryRoute;
});
angular.module('ecopos.resources').factory('deliveryFulfillment',function() {

	var deliveryFulfillment = {test:"Delivery Fulfillment Service"};

	return deliveryFulfillment;
});
angular.module('ecopos.resources').factory('schedule',function() {

	var schedule = {test: "Schedule Service"};

	return schedule;
});
angular.module('ecopos.resources').factory('editInfo',function() {

	var editInfo = {test:"Edit Info Service"};

	return editInfo;
});
var language = {

    ms0: 'January',
    ms1: 'February',
    ms2: 'March',
    ms3: 'April',
    ms4: 'May',
    ms5: 'June',
    ms6: 'July',
    ms7: 'August',
    ms8: 'September',
    ms9: 'October',
    ms10: 'November',
    ms11: 'December',

    d0: 'Sunday',
    d1: 'Monday',
    d2: 'Tuesday',
    d3: 'Wednesday',
    d4: 'Thursday',
    d5: 'Friday',
    d6: 'Saturday',

    thisMonth: "This month",
    prevMonth: "Prev",
    nextMonth: "Next",

};

Date.prototype.getMonthFormatted = function() {
    var month = this.getMonth() + 1;
    return month < 10 ? '0' + month : month;
};


angular.module("ecopos.resources").directive('ngHtml', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.ngHtml, function(value) {
            element[0].innerHTML = value;
        });
    };
});


var calendarLinkFunction = function (scope, element) {
    var contentObj = scope.content;
    var targetMonth = parseInt(scope.assignedMonth, 10),
        targetYear = parseInt(scope.assignedyear, 10);

    if(
        !isNaN(targetMonth) &&
            !isNaN(targetYear) &&
            targetMonth > 0 &&
            targetMonth < 12
        ){
        scope.currentDate = new Date(targetYear, targetMonth, 0);
    }
    else{
        scope.currentDate = new Date();
    }

    scope.today = new Date();
    scope.language = language;
    scope.navigate = {};

    // month between 1 and 12
    var daysInMonth = function(month,year){
        return new Date(year, month, 0).getDate();
    };

    scope.navigate.prevMotnth = function(){
        scope.currentDate.setMonth(scope.currentDate.getMonth()-1);
        refreshCalendar();
    };
    scope.navigate.nextMotnth = function(){
        scope.currentDate.setMonth(scope.currentDate.getMonth()+1);
        refreshCalendar();
    };
    scope.navigate.thisMotnth = function(){
        scope.currentDate = new Date();
        refreshCalendar();
    };

    // month between 1 ~ 12
    var getDateContent = function(year,month,date){
        if(contentObj != null && contentObj[year] != null &&
            contentObj[year][month] != null &&
            contentObj[year][month][date] != null){
            return contentObj[year][month][date].join("<br/>");
        }
        return "";
    };

    // month between 1 ~ 12
    var monthGenegrator = function(month, year){
        var monthArray = [];
        var firstDay = new Date(year, month-1, 1, 0, 0, 0, 0);
        //  weekDay between 1 ~ 7 , 1 is Monday, 7 is Sunday
        var firstDayInFirstweek = (firstDay.getDay() > 0) ? firstDay.getDay() : 7;
        var daysOfMonth = daysInMonth(month,year);
        var prevDaysOfMonth = daysInMonth(month-1,year);

        var recordDate = 0; //record which day obj already genegrate

        //first week row
        monthArray.push(weekGenegrator(year , month , recordDate-firstDayInFirstweek ,daysOfMonth , prevDaysOfMonth));

        recordDate = 7 - firstDayInFirstweek;
        //loop for following week row
        while(recordDate < daysOfMonth-1){
            monthArray.push(weekGenegrator(year , month , recordDate , daysOfMonth));
            recordDate += 7;
        }

        //set isToday
        if(scope.currentDate.getMonth() === scope.today.getMonth() &&
            scope.currentDate.getFullYear() === scope.today.getFullYear() ){
            var atWeek = Math.ceil((scope.today.getDate()+firstDayInFirstweek-1) / 7) -1;
            var atDay = (scope.today.getDate()+firstDayInFirstweek-2) % 7;
            monthArray[atWeek][atDay].isToday = true;
        }

        return monthArray;
    };

    //month between 1~12
    var weekGenegrator = function(year , month , startDate , daysOfMonth , prevDaysOfMonth){
        var week = [];
        for(var i =  1 ; i <= 7 ; i++){
            var
                realDate,
                outmonth = false,
                content = "";

            if(startDate + i < 0){
                realDate = prevDaysOfMonth+startDate+i+1;
                outmonth = true;
            }
            else if(startDate + i + 1 > daysOfMonth){
                realDate = startDate+i-daysOfMonth+1;
                outmonth = true;
            }
            else{
                realDate =  startDate+i+1;
                content = getDateContent(year , month , realDate);
            }
            week.push({
                "outmonth" : outmonth,
                "day": i,
                "content": content,
                "date" : realDate
            });
        }
        return week;
    };

    var refreshCalendar = function(){
        scope.month = monthGenegrator(scope.currentDate.getMonth()+1, scope.currentDate.getFullYear());
    };

    refreshCalendar();
};


angular.module("ecopos.resources").directive("calendar", function(){
    return{
        restrict: "E",
        scope: {
            content: '=calendarContent',
            assignedMonth: '=calendarMonth',
            assignedyear: '=calendarYear'
        },
        replace: true,
        link: calendarLinkFunction,
        templateUrl: 'directive/calendar/calendar.html'
    };
});


angular.module('ecopos.resources').directive('todo', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/todo/todo.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').directive('map', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/map/map.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').directive('info', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/info/info.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').filter('mapFilter', function() {
	return function(input,arg) {
		return 'output';
	};
});
angular.module('ecopos.resources').filter('infoFilter', function() {
	return function(input,arg) {
		return 'output';
	};
});
angular.module('ecopos.resources').controller('AgendaCtrl',function($scope, schedule){
$scope.test = schedule.test;

});
angular.module('ecopos.resources').controller('FaqCtrl',function($scope){


});
angular.module('ecopos.resources').controller('DeliveryCtrl',function($scope){
    $scope.map = {
        center: {
            latitude: 49.8353,
            longitude: -124.5247
        },
        zoom: 8
    };

});
angular.module('ecopos.resources').controller('PolicyCtrl',function($scope){


});
angular.module('ecopos.resources').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/agenda/agenda.html',
    "<div class=col-md-12 ng-controller=AgendaCtrl><h3>Agenda</h3><div class=row><div class=\"col-lg-5 panel panel-default\"><calendar></calendar></div><div class=\"col-lg-6 panel panel-default\"><todo></todo></div></div></div>"
  );


  $templateCache.put('partial/delivery/delivery.html',
    "<div class=col-md-12 ng-controller=DeliveryCtrl><h3>Delivery Partial</h3><div class=row><div class=\"col-lg-7 panel panel-default\"><map></map></div><div class=\"col-lg-5 panel panel-default\"><info></info></div></div>Partial Services {{deliveryFulfillment}}, {{deliveryRoute}}, {{editInfo}}</div>"
  );


  $templateCache.put('partial/faq/faq.html',
    "<div class=col-md-12 ng-controller=FaqCtrl></div>"
  );


  $templateCache.put('partial/policy/policy.html',
    "<div class=col-md-12 ng-controller=PolicyCtrl></div>"
  );


  $templateCache.put('directive/calendar/calendar.html',
    "<div><h4>Calendar Directive</h4>{{test}}<div class=calendar><div class=\"clearfix calendarHeader row\"><div class=\"date col-sm-6 col-md-6 col-lg-6\">{{currentDate.getMonthFormatted() }}/{{currentDate.getFullYear() }}</div><div class=\"btn-group col-lg-offset-3 col-md-offset-3 col-sm-offset-2 col-sm-4 col-md-3 col-lg-3\"><button class=\"btn btn-default\" ng-click=navigate.prevMotnth()>{{language.prevMonth}}</button> <button class=\"btn btn-default\" ng-click=navigate.thisMotnth()>{{language.thisMonth}}</button> <button class=\"btn btn-default\" ng-click=navigate.nextMotnth()>{{language.nextMonth}}</button></div></div><div class=\"cal-row-fluid cal-row-head\"><div class=cal-span1>{{language.d1}}</div><div class=cal-span1>{{language.d2}}</div><div class=cal-span1>{{language.d3}}</div><div class=cal-span1>{{language.d4}}</div><div class=cal-span1>{{language.d5}}</div><div class=cal-span1>{{language.d6}}</div><div class=cal-span1>{{language.d0}}</div></div><div class=cal-month-box><div class=cal-row-fluid ng-repeat=\"week in month\"><div class=\"cal-span1 cal-cell\" ng-repeat=\"day in week\"><div class=cal-month-day ng-class=\"{'cal-day-outmonth' : day.outmonth , 'cal-day-weekend' : day.day == 6 || day.day == 7 , 'cal-day-today' : day.isToday }\"><span class=pull-right data-cal-date={{day.dateFormatted}} data-cal-view=day>{{day.date}}</span><div class=content><div ng-html=day.content></div></div></div></div></div></div></div></div>"
  );


  $templateCache.put('directive/info/info.html',
    "<div><h4>Info Directive</h4>{{editInfo}}</div>"
  );


  $templateCache.put('directive/map/map.html',
    "<div><h4>Map Directive</h4><google-map center=map.center zoom=map.zoom></google-map>{{deliveryFulfillment}}, {{deliveryRoute}}</div>"
  );


  $templateCache.put('directive/todo/todo.html',
    "<div><h4>To Do Directive</h4>{{test}}</div>"
  );

}]);
