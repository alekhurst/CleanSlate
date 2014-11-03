/*
 * This function returns the course at a position for a given branch
 *
 * @param {string} branch : The name of the branch that the object is located (o.e. "math_courses")
 * @param {int} id : The id of the course on the branch
 */
function getCourse(branch, id) {
    return window.AllCourses[branch][id];
}

/*
 * This function is called to return the id of the course on a specific branch with a specific department and course number
 *
 * @param {string} branch : The name of the branch that the object is located (i.e. "math_courses")
 * @param {string} department : The name of the course's department (i.e. "MATH")
 * @param {string} course_number : The course number (i.e. "11")
 */
function getCourseId(branch, department, course_number) {
    var _branch = window.AllCourses[branch];
    for (course in _branch) {
        if (_branch[course]['department'] == department && _branch[course]['course_number'] == course_number)
            return course;
    }
    return -1; //Not found
}

/* 
 * This function is called to return an array ([course, id]) of the next course and it's id in window.AllCourses
 *
 * @param {array} course_data - course data array of course to remove ([branch, department, course_number])
 * @param {string} quarter - Current quarter to check after ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function nextCourseAfter(course_data, quarter) {
    var branch = course_data[0];
    var department = course_data[1];
    var course_number = course_data[2];

    for (course in window.AllCourses[branch]) {
        var prereq = window.AllCourses[branch][course]['prerequisites'];
        if (prereq.length == 0) { //No prerequisites, meaning this is not the next course in the series
            continue;
        }
        else if (prereq.length == 1 && prereq[0][0] == branch && prereq[0][1] == department && prereq[0][2] == course_number) { //course_data is the only prereq
            //Only one prerequisite and it is satisfied, so this is the next course 
            
            var id = getCourseId(branch, window.AllCourses[branch][course]['department'], window.AllCourses[branch][course]['course_number']);
            return [window.AllCourses[branch][id], id];
        } else if (prereq.length > 1) { //More than one prerequisite, check if each prereq is satisfied
        }
    }
}

/*
 * Given an array of offerings and the current quarter (an offering), return the next quarter the course is offered (or -1)
 *
 * @param {array} offerings - Array of quarters offered (may contain "fall_quarter", "winter_quarter", and/or "spring_quarter")
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function nextOffering(offerings, quarter) {
    if (quarter == 'spring_quarter') //No other courses, return -1
        return -1
    else if (quarter == 'fall_quarter') {
        var next_offering = '';
        for (offering in offerings) {
            if (offerings[offering] == 'winter_quarter')
                next_offering = 'winter_quarter';
            if (offerings[offering] == 'spring_quarter' && next_offering != 'winter_quarter')
                next_offering = 'spring_quarter';
        }
        if (next_offering == '') //No other offerings after fall, return null
            return -1;
        return next_offering;
    } else if (quarter == 'winter_quarter') {
        for (offering in offerings) {
            if (offerings[offering] == 'spring_quarter')
                return 'spring_quarter';
        }
        return -1; //No other offerings after winter, return null
    }
}

/*
 * This function is called by removeCourse to remove a course from the default course list at a specific quarter
 * 
 * @param {Object} course_title - Title of course to be removed (i.e. "COEN10")
 */

function removeCourse(course_title, quarter) {
    if (quarter == -1) //Base case, return and break out of recursion
        return;

    if (!quarter) { //If no quarter specified (first time), find the quarter and try again
        for (_quarter in window.WorkingSchedule) {
            if (course_title in window.WorkingSchedule[_quarter]) {
                removeCourse(course_title, _quarter);
                return;
            }
        }
    }
    

    var course = window.WorkingSchedule[quarter][course_title];
    var next_course_in_series = nextCourseAfter([course.branch, course.department, course.course_number], quarter);

    delete window.WorkingSchedule[quarter][course_title]; //Remove the course

    if (next_course_in_series[0] != null) { //Take the next course in the series, if there is one
        window.AllCourses[course.branch][next_course_in_series[1]]['credit'] = 'YES'; //This course is now to be taken, give student credit

        window.WorkingSchedule[quarter][next_course_in_series[0]['department'] + next_course_in_series[0]['course_number']] = {
            name : next_course_in_series[0]['name'],
            department : next_course_in_series[0]['department'],
            course_number : next_course_in_series[0]['course_number'],
            description : next_course_in_series[0]['description'],
            branch : course.branch,
            offering : next_course_in_series[0]['offering'],
            category : next_course_in_series[0]['category'],
            units : next_course_in_series[0]['units'],
            prerequisites : next_course_in_series[0]['prerequisites'],
        };
        var new_course = window.WorkingSchedule[quarter][next_course_in_series[0]['department'] + next_course_in_series[0]['course_number']];
        var next_offering = nextOffering(new_course['offering'], quarter);

        removeCourse(new_course['department'] + new_course['course_number'], next_offering); //Recursively "slide down" next offered course
    } else { //Take core class
        var core_course = window.AllCourses['core_courses'][0];

        window.WorkingSchedule[quarter]['CORE'] = {
            name : core_course['name'],
            department : core_course['department'],
            course_number : core_course['course_number'],
            description : core_course['description'],
            branch : 'core-courses',
            offering : core_course['offering'],
            category : core_course['category'],
            units : core_course['units'],
            prerequisites : core_course['prerequisites'],
        };
    }
}

/*
 * This function is initially called for CSE students when the student's input from the view has changed.
 * 
 * @param {Object} student_input - object containing the current state of input from the user
 */
function computeNewScheduleCSE(student_input) {
    // A SCHEDULE OBJECT IN THE SAME FORMAT AS THE DECLARATION MUST BE RETURNED HERE
    //              (obviously with new courses in each quarter)
    window.WorkingSchedule = window.DefaultScheduleCSE;    // (defined in objects.js)

    if (student_input.length > 0) { //If there are changes to the default schedule, make those changes
        for (change in student_input) {
            //Do changes based on student_input changes
            var param = student_input[change]['parameters'];
            
            // Execute the function
            window[student_input[change]['function']].apply(window,param);
        }
    }
}
