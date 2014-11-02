/* This file does all of the heavy lifting for computing a new schedule */

/**
 * This function determines if a course is valid to be placed this quarter SOLELY BASED ON THIS QUARTER (returns true if so, returns false otherwise)
 *
 * @param {var} this_quarter - Either fall_quarter, winter_quarter, or spring_quarter
 * @param {array} current_quarter_courses - Array containing all courses currently taken this quarter
 * @param {object} course_to_add - Object representing a new course to add
 */
function validCourseToTakeThisQuarter(this_quarter, current_quarter_courses, course_to_add) {
    if (course_to_add["credit"] == "YES") //If course has already been taken, return false
        return false;

    if (current_quarter_courses.length >= 4) // If there are already 4 courses this quarter, return false
        return false;

    var offered_this_quarter = false;
    for (offering in course_to_add["offering"]) //If course is not offered this quarter, return false
        if (course_to_add["offering"][offering] == this_quarter)
            offered_this_quarter = true;
    if (!offered_this_quarter) 
        return false;

    for (course in current_quarter_courses) //If a course with the same department is currently being taken this quarter, return false
        if (current_quarter_courses[course]["department"] == course_to_add["department"])
            return false;

    return true;
}

/**
 * This function is called to create a schedule with the bare-bones required courses (CTW, C+I, etc.). WILL ASSUME SOMETHING CAN BE PLACED THE FIRST TIME AROUND IN THE CORRECT PLACE
 *
 * @param {object} current_schedule - object containing empty schedule object (fall_quarter = [], winter_quarter = [], spring_quarter = [])
 */
function computeRequiredCourses(current_schedule) {
    for (this_quarter in current_schedule) {
        for (index in window.AllCourses["required_courses"]) { //Add required courses first
            var required_course = window.AllCourses["required_courses"][index];
            if (validCourseToTakeThisQuarter(this_quarter, current_schedule[this_quarter], required_course)) {
                current_schedule[this_quarter].push({});
                current_schedule[this_quarter][current_schedule[this_quarter].length - 1] = {
                    name : required_course["co_requisite"] == "" ? required_course["name"] : required_course["name"] + " + " + required_course["co_requisite"],
                    description : required_course["description"],
                    units : (required_course["co_requisite"] != "" && required_course["course_number"] >= 100) ? 5 : 4,
                    category : required_course["category"],
                    class : "required_courses",
                    index : index
                };
                window.AllCourses["required_courses"][index]["credit"] = "YES";
            }
        }
    }
    return current_schedule;
}
function doSomething(schedule,string) {
    console.log('here');
	console.log(schedule);
    console.log(string);
}

function getCourse(name){
	var _name = (name) ? name.split(" ") : ["",""]; // into [dept,courseNo]
	
	for(var i in AllCourses){
		for(var j in AllCourses[i]){
			if(!AllCourses[i][j].name) continue;
			var c = AllCourses[i][j];
			if(c.department == _name[0] && c.course_number == _name[1]) return c;
		}
	}
	return AllCourses["core_courses"][0]; // return by default...
}

function removeCourse(course){
	var _course = getCourse(course);
	var _repl = getCourse( ((_course.next) ? _course.next[0] : 'Core') );
	
	for(var i in window.WorkingSchedule){
		for(var j in window.WorkingSchedule[i]){
			var cl = window.WorkingSchedule[i][j];
			if(!cl.name) continue; // (not a course)
			if(cl.name == course){
				// construct replacement
				var replaceCourse;
				if(_repl.name == "University Core"){
					replaceCourse = {
						name:_repl.name,
						description: "Something",
						units:'4',
						category:_repl.category,
						modifiers:''					
					};
				}
				else{
					replaceCourse = {
						name:_repl.department + " " + _repl.course_number,
						description: _repl.name,
						units:'4',
						category:_repl.category,
						modifiers:''					
					};
					
					// remove other instances of replacement
					removeCourse(replaceCourse.name);
				}
				
				// replace the course 
				window.WorkingSchedule[i][j] = replaceCourse;
				
				// print out
				console.log("Replaced "+_course.department + " " + _course.course_number
								+ " with " + replaceCourse.name);
			}
		}
	}
}

function hasCredit(course){
	removeCourse(course);
}
/**
 * This function is initially called for CSE students when the student's input from the view has changed.
 * 
 * @param {Object} student_input - object containing the current state of input from the user
 */
function computeNewScheduleCSE(student_input) {
    console.log(student_input);

    // in this case there is no algorithm, so we just return the same default schedule.
    // Normally, the computation would begin here, and at some point a modified schedule
    // object would be returned.
    //
    // A SCHEDULE OBJECT IN THE SAME FORMAT AS THE DECLARATION MUST BE RETURNED HERE
    //              (obviously with new courses in each quarter)
    window.WorkingSchedule = window.DefaultScheduleCSE;	// (defined in objects.js)
    //console.log(WorkingSchedule);

    if (student_input.length > 0) { //If there are changes to the default schedule, make those changes
        for (change in student_input) {
            //Do changes based on student_input changes
			var param = student_input[change]['parameters'];
			
			// Execute the function.
            window[student_input[change]['function']].apply(window,param);
        }
    }

    return window.WorkingSchedule;  
}
