window.initializing = true; // used to prevent event handlers from firing onload

$(document).ready( function() {
	$("#input-component nav ul li").click( function() {
		$(this).siblings().removeClass('select-this-nav');
		$(this).addClass('select-this-nav');
	})
})

var CleanSlateApp = angular.module('CleanSlateApp', []);

CleanSlateApp.controller('CleanSlateController', function ($scope) {

	/* View Controller Variable Declaration */
	$scope.Schedule = {
		fall_quarter : [],
		winter_quarter : [],  
		spring_quarter : []   
	}; 

	$scope.StudentInput = {
		ap_credit : [],
		transfer_credit : [],
		previous_experience : []
	};  

	/* Event listeners */
	$scope.$watch('StudentInput', function() {
		if(initializing)
			initializing = false;
		else 
			$scope.updateScheduleWithNewInput();
	}, true);

	/* Variable Initialization */
	$scope.Schedule = {
		fall_quarter : [
			{
				name : 'University Core',
				description : 'Critical Thinking & Writing I',
				units : '4',
				category : 'humanities_and_social_science'
			},
			{
				name : 'Math 11',
				description : 'Calculus I',
				units : '4',
				category : 'math_and_science'
			},
			{
				name : 'CHEM 11',
				description : 'Chemistry I',
				units : '4',
				category : 'math_and_science'
			},
			{
				name : 'COEN 10',
				description : 'Introduction to Programming',
				units : '4',
				category: 'engineering'
			},
			{
				name : 'ENGR 1',
				description : 'Introduction to Engineering',
				units : '1',
				category: 'engineering'
			}
		],
		
		winter_quarter : [
			{
				name : 'University Core',
				description : 'Critical Thinking & Writing 2',
				units : '4',
				category : 'humanities_and_social_science'
			},
			{
				name : 'Math 12',
				description : 'Calculus II',
				units : '4',
				category : 'math_and_science'
			},
			{
				name : 'PHYS 31',
				description : 'Physics I',
				units : '4',
				category : 'math_and_science'
			},
			{
				name : 'COEN 11',
				description : 'Advanced Programming',
				units : '4',
				category: 'engineering'
			}
		],
		
		spring_quarter : [
			{
				name : 'COEN 19',
				description : 'Discrete Math',
				units : '4',
				category : 'math_and_science'
			},
			{
				name : 'Math 13',
				description : 'Calculus III',
				units : '4',
				category : 'math_and_science'
			},
			{
				name : 'PHYS 32',
				description : 'Physics II',
				units : '4',
				category : 'math_and_science'
			},
			{
				name : 'COEN 12',
				description : 'Data Structures',
				units : '4',
				category: 'engineering'
			}
		]
	};



	/* Methods */


	/**
	 * This function is called on change of the StudentInput object. 
	 * This calls computeNewSchedule() which is in the file: js > compute_new_schedule.js. 
	 * The returned object assigned to $scope.Schedule and therefore updates in the view
	 */
	$scope.updateScheduleWithNewInput = function() {
		$scope.Schedule = computeNewSchedule($scope.StudentInput, $scope.Schedule);
	}

	/**
	 * Used to assign a CSS class that changes the color of the element based on 
	 * the course category.
	 */
	$scope.assignCSSCourseClass = function() {
		switch(this.course.category) {
			case 'engineering' :
				return 'engineering-course';

			case 'math_and_science' :
				return 'math-course';

			case 'humanities_and_social_science' : 
				return 'humanities-course';

			case 'other' :
				return 'other-course';
		}
	};

	/**
	 * I used this function to test if the updateScheduleWithNewInput() function
	 * is called on change of the StudentInput object. I also tested if the file
	 * js > compute_new_schedule.js was linked correctly and the ComputeNewSchedule()
	 * function was called with the correct data.
	 *
	 * This function is called when you click on "transfer credit" in the nav
	 *
	 * UPDATE ------ EVERYTHING WORKS
	 */
	$scope.testScheduleUpdate = function() {
		$scope.StudentInput.ap_credit[0] += 'lalalala';
	}
});