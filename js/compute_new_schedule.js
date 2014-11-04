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

function parentCourseInSameBranch(current_course, branch) {
    var prereqs = current_course['prerequisites'];
    for (prereq in current_course['prerequisites']) {
        if (current_course['prerequisites'][prereq][0] == branch) { //Found prereq in department, return that
            var branch = branch;
            var department = current_course['prerequisites'][prereq][1];
            var course_number = current_course['prerequisites'][prereq][2];
            var course_id = getCourseId(branch, department, course_number);
            return getCourse(branch, course_id);
        }
    }
    return null; //No prerequisite or none in department
}

/*
 * This function returns true if a course was taken before this quarter, false otherwise
 *
/* @param {object} course - Course object to be tested
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function takenBeforeOrDuringThisQuarter(course, quarter) {
    var quarter_taken = course['quarter_taken'];

    if (course['credit'] == 'NO') { //If the course has never been taken, return false
        return false;
    }
    if (quarter_taken == '' && course['credit'] == 'YES') { //If the course was taken, but is no longer on the schedule
        return true;
    }
    if (quarter == 'spring_quarter') { //Must be taken before or during this quarter
        return true;
    }
    if (quarter == 'fall_quarter' && quarter_taken == 'fall_quarter') {
        return true;
    }
    if (quarter == 'winter_quarter' && quarter_taken != 'spring_quarter') {
        return true;
    }

    return false;
}

/*
 * This function returns if a course if offered this quarter (true if yes, false otherwise)
 *
 * @param {object} course - Course object to be tested
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function offeredThisQuarter(course, quarter) {
    for (_quarter in course['offering']) {
        if (quarter == course['offering'][_quarter])
            return true;
    }
    return false;
}

/*
 * Returns true if a course has all of its prerequisites completed, false otherwise
 *
 * @param {object} course - Course object to be tested
 */
function prereqsCompleted(course) {
    for (prereq in course['prerequisites']) {
        var prereq_branch = course['prerequisites'][prereq][0];
        var prereq_department = course['prerequisites'][prereq][1];
        var prereq_course_number = course['prerequisites'][prereq][2];

        var prereq_course = getCourse(prereq_branch, getCourseId(prereq_branch, prereq_department, prereq_course_number));
        if (prereq_course['credit'] == 'NO')
            return false;
    }
    return true;
}

/* 
 * This function is called to return an array ([course, id]) of the next course and it's id in window.AllCourses
 *
 * @param {array} course_data - course data array of course to remove ([branch, department, course_number])
 * @param {int} id - id of course in window.AllClasses[branch]
 * @param {string} quarter - Current quarter to check after ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function nextCourseAfter(course_data, id, quarter) {
    var branch = course_data[0];
    var department = course_data[1];
    var course_number = course_data[2];

    var current_id = parseInt(id);
    var current_course = getCourse(branch, current_id);

    var parent_course = parentCourseInSameBranch(current_course, branch);
    if (parent_course == null) //No parent course, just increment pointer
        current_id++;
    else //Set current_id to element after parent's course
        current_id = parseInt(getCourseId(parent_course['branch'], parent_course['department'], parent_course['course_number'])) + 1;

    current_course = getCourse(branch, current_id);
    console.log(current_course['department'] + current_course['course_number'] + ': ' + takenBeforeOrDuringThisQuarter(current_course, quarter) + ', ' + !offeredThisQuarter(current_course, quarter) + ', ' +  !prereqsCompleted(current_course));
    while (takenBeforeOrDuringThisQuarter(current_course, quarter) || !offeredThisQuarter(current_course, quarter) || !prereqsCompleted(current_course)) {
        //If the course has been taken before, if the course is not being offered this quarter, or the prereqs are not completed
        //This means the course is not the next one to take, so continue along the branch and look for a different one to take
        if (current_id == window.AllCourses[branch].length - 1) { //At the last element, no more courses
            return null;
        }
        current_id++; //Go along branch
        current_course = getCourse(branch, current_id); //Get next course in branch
        console.log('next iter');
        console.log(current_course);
        console.log(current_course['department'] + current_course['course_number'] + ': ' + takenBeforeOrDuringThisQuarter(current_course, quarter) + ', ' + !offeredThisQuarter(current_course, quarter) + ', ' +  !prereqsCompleted(current_course));
    }

    console.log('returning ' + current_course['department'] + current_course['course_number']);
    return [getCourse(branch, current_id), current_id];
}

/*
 * Given an array of offerings and the current quarter (an offering), return the next quarter the course is offered (or -1)
 *
 * @param {array} offerings - Array of quarters offered (may contain "fall_quarter", "winter_quarter", and/or "spring_quarter")
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function nextOffering(offerings, quarter) {
    console.log(JSON.stringify(window.AllCourses['math_courses'][0]));
    if (quarter == 'spring_quarter') //No other courses, return -1
        return -1;
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
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function removeCourse(course_title, quarter) {
    console.log(course_title + ', ' + quarter);
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
    var id = getCourseId(course['branch'], course['department'], course['course_number']);
    var next_course_in_series = nextCourseAfter([course.branch, course.department, course.course_number], id, quarter);

    console.log(JSON.stringify(window.AllCourses[course['branch']][id]));
    console.log('removing ' + course_title + ' for ' + quarter);
    delete window.WorkingSchedule[quarter][course_title]; //Remove the course
    window.AllCourses[course['branch']][id]['quarter_taken'] = ''; //Record that the course is no longer being taken

    if(next_course_in_series == null) { //Take core course
        var core_course = getCourse('core_courses', 0);

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
    } else { //Take the next course in the series, if there is one
        var next_course = next_course_in_series[0];
        var next_course_id = next_course_in_series[1];


        window.AllCourses[course['branch']][next_course_id]['quarter_taken'] = quarter; //This course is now to be taken, give student credit
        window.AllCourses[course['branch']][next_course_id]['credit'] = 'YES'; //This course is now to be taken, give student credit
        console.log('adding ' + next_course['department'] + next_course['course_number'] + ' for ' + quarter);

        window.WorkingSchedule[quarter][next_course['department'] + next_course['course_number']] = {
            name : next_course['name'],
            department : next_course['department'],
            course_number : next_course['course_number'],
            description : next_course['description'],
            branch : course.branch,
            offering : next_course['offering'],
            category : next_course['category'],
            units : next_course['units'],
            prerequisites : next_course['prerequisites'],
        };
        console.log('recursively checking ' + nextOffering(next_course['offering'], quarter) + ' for ' + next_course['department'] + next_course['course_number']);
        removeCourse(next_course['department'] + next_course['course_number'], nextOffering(next_course['offering'], quarter));
    }
}

function preComputeScheduleTransferCSE(transfer_credit)
{
    computeNewScheduleCSE([ { function : "removeCourse", parameters : [window.TransferCredit[transfer_credit.id].fulfillment[1] + window.TransferCredit[transfer_credit.id].fulfillment[2]] } ])

    return computeNewScheduleCSE( [ ] );
}

function preComputeScheduleAPCSE(ap_test)
{
    if (ap_test.score >= window.APTests[ap_test.id].min_score && ap_test.score <= window.APTests[ap_test.id].max_score) {
        for (course in window.APTests[ap_test.id].fulfillment) {
               computeNewScheduleCSE([ 
                    { function : "removeCourse", parameters : [course[1] + course[2]] }
                                    ])
        }    
    }
    else {
        // score not accepted
    }

    return computeNewScheduleCSE( [ ] );
}


/*
 * This function is initially called for CSE students when the student's input from the view has changed.
 * 
 * @param {Object} student_input - object containing the current state of input from the user
 */
function computeNewScheduleCSE(student_input) {
    // A SCHEDULE OBJECT IN THE SAME FORMAT AS THE DECLARATION MUST BE RETURNED HERE
    //              (obviously with new courses in each quarter)
    //window.WorkingSchedule = window.DefaultScheduleCSE;    // (defined in objects.js)

    if (student_input.length > 0) { //If there are changes to the default schedule, make those changes
        for (change in student_input){
            console.log('ASDASDASD');
            //Do changes based on student_input changes
            var param = student_input[change]['parameters'];
            
            // Execute the function
            window[student_input[change]['function']].apply(window,param);
        }


        
    }
}
