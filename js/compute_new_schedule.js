/*
 * This function returns the course at a position for a given branch
 *
 * @param {string} branch : The name of the branch that the object is located (i.e. "math_courses")
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
 * @param {object} course - Course object to be tested
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function takenBeforeOrDuringThisQuarter(course, quarter) {
    console.log(JSON.stringify(course));
    var quarter_taken = course['quarter_taken'];

    if (course['credit'] == 'NO') { //If the course has never been taken, return false
        console.log('a');
        return false;
    }
    if (quarter_taken == '' && course['credit'] == 'YES') { //If the course was taken, but is no longer on the schedule
        console.log('b');
        return true;
    }
    if (quarter == 'spring_quarter') { //Must be taken before or during this quarter
        console.log('c');
        return true;
    }
    if (quarter == 'fall_quarter' && quarter_taken == 'fall_quarter') {
        console.log('d');
        return true;
    }
    if (quarter == 'winter_quarter' && quarter_taken != 'spring_quarter') {
        console.log('e');
        return true;
    }

    console.log('f');
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
 * Returns true if a course has all of its prerequisites completed by this quarter, false otherwise
 *
 * @param {object} course - Course object to be tested
 * @param {string} quarter - Current quarter to check after ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function prereqsCompleted(course, quarter) {
    //POTENTIALLY BROKEN
    for (prereq in course['prerequisites']) {
        var prereq_branch = course['prerequisites'][prereq][0];
        var prereq_department = course['prerequisites'][prereq][1];
        var prereq_course_number = course['prerequisites'][prereq][2];

        var prereq_course = getCourse(prereq_branch, getCourseId(prereq_branch, prereq_department, prereq_course_number));
        //Look when prereq_course is in schedule, and if it is during/after current_quarter, then return false
        if (prereq_course['credit'] == 'NO') { //Prereq is not completed at all, return false
            console.log('aa');
            return false;
        }
		switch(prereq_course['quarter_taken']){
			case 'spring_quarter':
				return false;
				break;
			case 'winter_quarter':
				if(quarter != 'spring_quarter') return false;
				break;
			case 'fall_quarter':
				if(quarter == 'fall quarter') return false;
				break;
			default:
				break;
		}
    }
    console.log('ee');
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
    console.log('Parent: ' + JSON.stringify(current_course));
    console.log(current_course['department'] + current_course['course_number'] + ': ' + takenBeforeOrDuringThisQuarter(current_course, quarter) + ', ' + !offeredThisQuarter(current_course, quarter) + ', ' +  !prereqsCompleted(current_course, quarter));
    while (takenBeforeOrDuringThisQuarter(current_course, quarter) || !offeredThisQuarter(current_course, quarter) || !prereqsCompleted(current_course, quarter)) {
        //If the course has been taken before, if the course is not being offered this quarter, or the prereqs are not completed
        //This means the course is not the next one to take, so continue along the branch and look for a different one to take
        if (current_id == window.AllCourses[branch].length - 1) { //At the last element, no more courses
            return null;
        }
        current_id++; //Go along branch
        current_course = getCourse(branch, current_id); //Get next course in branch
        console.log('next iter');
        console.log(current_course);
        console.log(current_course['department'] + current_course['course_number'] + ': ' + takenBeforeOrDuringThisQuarter(current_course, quarter) + ', ' + !offeredThisQuarter(current_course, quarter) + ', ' +  !prereqsCompleted(current_course, quarter));
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
 * Returns the quarter (fall_quarter, winter_quarter, spring_quarter) that the course is being taken this year, or an empty string if it is not being taken this year
 * 
 * @param {Object} course_title - Title of course to be removed (i.e. "COEN10")
 */
function quarterTaken(course_title) {
    for (quarter in window.WorkingSchedule) {
        for (course in window.WorkingSchedule[quarter]) {
            if (course_title == course) {
                console.log(course_title + ' taken previously: ' + quarter);
                return quarter;
            }
        }
    }
    return ''; //Not taken before, return null
}

/*
 * This function is called by removeCourse to remove a course from the default course list at a specific quarter
 * 
 * @param {Object} course_title - Title of course to be removed (i.e. "COEN10")
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function removeCourse(course_title, quarter) {
    console.log(course_title + ', ' + quarter);
    if (quarter == -1) {  //Base case, return and break out of recursion
        console.log(JSON.stringify(window.AllCourses['math_courses']));
        return;
    }

    if (!quarter) { //If no quarter specified (first time), find the quarter and try again
        for (_quarter in window.WorkingSchedule) {
            if (course_title in window.WorkingSchedule[_quarter]) {
                removeCourse(course_title, _quarter);
                return;
            }
        }

        //If here, that means the course has not been taken yet. Find that course and set it to 'taken'.
        var start = 1;
        for (; start < course_title.length; start++) {
            if (parseInt(course_title[start]) == course_title[start]) //You found the first number, start of course_number
                break;
        }
        var course_department = course_title.substring(0, start);
        var course_c_number = course_title.substring(start, course_title.length);

        for (branch in window.AllCourses) {
            for (course in window.AllCourses[branch]) {
                if (window.AllCourses[branch][course]['department'] == course_department && window.AllCourses[branch][course]['course_number'] == course_c_number) {
                    window.AllCourses[branch][course]['credit'] = 'YES'; 
                    console.log(JSON.stringify(window.AllCourses[branch][course]));
                    return;
                }
            }
        }
    }

    var course = window.WorkingSchedule[quarter][course_title];
    var id = getCourseId(course['branch'], course['department'], course['course_number']);
    var next_course_in_series = nextCourseAfter([course.branch, course.department, course.course_number], id, quarter);

    console.log(JSON.stringify(window.AllCourses[course['branch']][id]));
    console.log('removing ' + course_title + ' for ' + quarter);
    delete window.WorkingSchedule[quarter][course_title]; //Remove the course
    window.AllCourses[course['branch']][id]['quarter_taken'] = quarterTaken(course['department'] + course['course_number']); //Record that the course is no longer being taken
    console.log('removing quarter_taken for ' + course_title);

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
		
		/*C&I*/
		if(window.AllCourses['required_courses'][getCourseId('required_courses','C&I',1)]['quarter_taken'] == ''){
			if(WorkingSchedule.fall_quarter.CORE && WorkingSchedule.winter_quarter.CORE){
				delete WorkingSchedule.fall_quarter.CORE; delete WorkingSchedule.winter_quarter.CORE;
				WorkingSchedule.fall_quarter["C&I1"] = getCourse('required_courses',getCourseId('required_courses','C&I',1));
				window.AllCourses['required_courses'][getCourseId('required_courses','C&I',1)]['quarter_taken'] = 'fall_quarter';
				
				WorkingSchedule.winter_quarter["C&I2"] = getCourse('required_courses',getCourseId('required_courses','C&I',2));
				window.AllCourses['required_courses'][getCourseId('required_courses','C&I',2)]['quarter_taken'] = 'winter_quarter';
			}
			if(WorkingSchedule.winter_quarter.CORE && WorkingSchedule.spring_quarter.CORE){
				delete WorkingSchedule.winter_quarter.CORE; delete WorkingSchedule.spring_quarter.CORE;
				WorkingSchedule.winter_quarter["C&I1"] = getCourse('required_courses',getCourseId('required_courses','C&I',1));
				window.AllCourses['required_courses'][getCourseId('required_courses','C&I',1)]['quarter_taken'] = 'winter_quarter';
				WorkingSchedule.spring_quarter["C&I2"] = getCourse('required_courses',getCourseId('required_courses','C&I',2));
				window.AllCourses['required_courses'][getCourseId('required_courses','C&I',2)]['quarter_taken'] = 'spring_quarter';
			
			}
		}
		
    } else { //Take the next course in the series, if there is one
        var next_course = next_course_in_series[0];
        var next_course_id = next_course_in_series[1];

        window.AllCourses[course['branch']][next_course_id]['quarter_taken'] = quarter; //This course is now to be taken, give student credit
        window.AllCourses[course['branch']][next_course_id]['credit'] = 'YES'; //This course is now to be taken, give student credit
        console.log('adding ' + next_course['department'] + next_course['course_number'] + ' for ' + quarter);
        console.log('adding quarter taken for ' + next_course['department'] + next_course['course_number']);

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
function preComputeReadinessExamCSE() {
    computeNewScheduleCSE([{
            function : "removeCourse",
            parameters : ["MATH9"]
        }]);

    return computeNewScheduleCSE( [ ] );
}

function preComputeProgrammingExperienceCSE() {
    computeNewScheduleCSE([{
            function : "removeCourse",
            parameters : ["COEN10"]
        }]);

    return computeNewScheduleCSE( [ ] );
}

function preComputeScheduleTransferCSE(transfer_credit) {
    var schedule_changes = [];

    for (course in window.TransferCredit[transfer_credit['id']]['fulfillment']) {
        course_info = window.TransferCredit[transfer_credit['id']]['fulfillment'][course];
        schedule_changes.push({
            function : "removeCourse",
            parameters : [course_info[1] + course_info[2]]
        });
    }
    computeNewScheduleCSE(schedule_changes);

    return computeNewScheduleCSE( [ ] );
}

function preComputeScheduleAPCSE(ap_test)
{
    //BROKEN, DO LIKE FUNCTION ABOVE
    console.log("ap_test.score = " + ap_test.score)

    console.log("ap_test.min_score = " + ap_test.min_score)
    console.log("ap_test.max_score = " + ap_test.max_score)

    if (ap_test.score >= window.APTests[ap_test.id].min_score && ap_test.score <= window.APTests[ap_test.id].max_score) {
        console.log("inside if statement")
        for (course in window.APTests[ap_test.id].fulfillment) {
               computeNewScheduleCSE([ 
                    { function : "removeCourse", parameters : [window.APTests[ap_test.id].fulfillment[course][1] + window.APTests[ap_test.id].fulfillment[course][2]] }
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
            console.log('NEW FUNCTION : ' + JSON.stringify(student_input[change]));
            //Do changes based on student_input changes
            var param = student_input[change]['parameters'];
            
            // Execute the function
            window[student_input[change]['function']].apply(window,param);
        }       
    }
    return window.WorkingSchedule;
}
