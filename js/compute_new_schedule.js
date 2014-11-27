/**********************************************************************************
 * compute_new_schedule.js
 *
 *         All functions pertaining to the calculation and derivation of course
 *  schedules are held within this file.
 *
 *  This document is divided among the following sections
 *        - COURSE INFORMATION
 *        - SCHEDULE MANIPULATION
 *        - PRECOMPUTATION
 *        - MODIFICATION LOG
 *        - COMPUTATION
 *
 *  Currently, the following majors are implemented:
 *        - Computer Science and Engineering
 *
 **********************************************************************************
 */

//---------------------------------------------------------------------------------
// COURSE INFORMATION FUNCTIONS
//---------------------------------------------------------------------------------

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
    for (var course = 0; course < _branch.length; course++) {
        if (_branch[course]['department'] == department && _branch[course]['course_number'] == course_number)
            return course;
    }
    return -1; //Not found
}

function parentCourseInSameBranch(current_course, branch) {
	
	// Get prereqs.
    var PreReqs = current_course['prerequisites'];
	
	// Search within prereqs...
    for (ind in PreReqs) {
	
		//If branch matches, return the course.
        if (PreReqs[ind][0] == branch) {
			// Get course info.
            var branch = branch;
            var department = PreReqs[ind][1];
            var course_number = PreReqs[ind][2];
			
			// Get course id.
            var course_id = getCourseId(branch, department, course_number);
			
			// Return course.
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

	// If course has not been taken, return false
    if (course['credit'] == 'NO') return false;
	
	// Get the quarter that the course was taken.
    var quarter_taken = course['quarter_taken'];
	
	//If the course was taken, but is no longer on the schedule
    if (quarter_taken == '' && course['credit'] == 'YES') return true;
   
    // If testing against spring_quarter, automatically true.
    if (quarter == 'spring_quarter') return true;
	
	// Only fall courses may be taken before or during fall.
    if (quarter == 'fall_quarter' && quarter_taken == 'fall_quarter') return true;
	
	// Fall or Winter courses may be taken before or during spring.
    if (quarter == 'winter_quarter' && quarter_taken != 'spring_quarter') return true;

	// Unless specified, return false.
    return false;
}

/*
 * This function returns if a course if offered this quarter (true if yes, false otherwise)
 *
 * @param {object} course - Course object to be tested
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function offeredThisQuarter(course, quarter) {
    for (var _quarter in course['offering']) {
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
	
	// Check each prerequisite.
    for (var prereq in course['prerequisites']) {
	
		// Get course information.
        var prereq_branch = course['prerequisites'][prereq][0];
        var prereq_department = course['prerequisites'][prereq][1];
        var prereq_course_number = course['prerequisites'][prereq][2];

		// Get course.
        var prereq_course = getCourse(prereq_branch, getCourseId(prereq_branch, prereq_department, prereq_course_number));
		
		//Prereq is not completed at all, return false
        if (prereq_course['credit'] == 'NO') return false;		
		
        //Look when prereq_course is in schedule, and if it is during/after current_quarter, then return false
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

	// Get old course information.
    var branch = course_data[0];
    var department = course_data[1];
    var course_number = course_data[2];

	// Get old course.
    var current_id = parseInt(id);
    var current_course = getCourse(branch, current_id);

	// Find "parent" course.
    var parent_course = parentCourseInSameBranch(current_course, branch);
	
	 //If no parent course, just take next course.
    if (parent_course == null) current_id++;
	
	// Otherwise, set current_id to element after parent's course
    else current_id = parseInt(getCourseId(branch, parent_course['department'], parent_course['course_number'])) + 1;

	// Get potential next course.
    current_course = getCourse(branch, current_id);
    if (!current_course) { 
        return null;
    }
	
	// DEBUG: Course Info
    // console.log(current_course['department'] + current_course['course_number'] + ': ' + takenBeforeOrDuringThisQuarter(current_course, quarter) + ', ' + !offeredThisQuarter(current_course, quarter) + ', ' +  !prereqsCompleted(current_course, quarter));
   
	// If the course...
	// 		(a) is taken before or in this quarter
	//		(b) is not offered this quarter
	//		(c) does not have its prereqs completed
	// ...then determine another course.
	while (takenBeforeOrDuringThisQuarter(current_course, quarter) || !offeredThisQuarter(current_course, quarter) || !prereqsCompleted(current_course, quarter)) {
	
		// Last element -- no more courses.
        if (current_id == window.AllCourses[branch].length - 1) return null;
		
		// Otherwise, move to next course in branch.
        current_id++;
        current_course = getCourse(branch, current_id);
		
		// DEBUG: Course info.
        //console.log(current_course['department'] + current_course['course_number'] + ': ' + takenBeforeOrDuringThisQuarter(current_course, quarter) + ', ' + !offeredThisQuarter(current_course, quarter) + ', ' +  !prereqsCompleted(current_course, quarter));
    }

	// DEBUG: Replacement course found.
    //console.log('returning ' + current_course['department'] + current_course['course_number']);
	
	// Return replacement course.
    return [getCourse(branch, current_id), current_id];
}

/*
 * Given an array of offerings and the current quarter (an offering), return the next quarter the course is offered (or -1)
 *
 * @param {array} offerings - Array of quarters offered (may contain "fall_quarter", "winter_quarter", and/or "spring_quarter")
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function nextOffering(offerings, quarter) {

	// Spring Quarter: No courses after. Return -1.
    if (quarter == 'spring_quarter') return -1;
	
	// Winter Quarter: Only if offered in Spring.
	if (quarter == 'winter_quarter') {
        for (offering in offerings) {
            if (offerings[offering] == 'spring_quarter')
                return 'spring_quarter';
        }
        return -1; //No other offerings after winter, return null
    }

	// Fall Quarter: Winter or Spring.
    else if (quarter == 'fall_quarter') {
        var next_offering = '';
        for (offering in offerings) {
            if (offerings[offering] == 'winter_quarter')
                next_offering = 'winter_quarter';
            if (offerings[offering] == 'spring_quarter' && next_offering != 'winter_quarter')
                next_offering = 'spring_quarter';
        }
		//No other offerings after fall, return -1.
        if (next_offering == '') return -1;
        return next_offering;
    }
}

/*
 * Returns the quarter (fall_quarter, winter_quarter, spring_quarter) that the course is being taken this year, or an empty string if it is not being taken this year
 * 
 * @param {Object} course_title - Title of course to be removed (i.e. "COEN10")
 */
function quarterTaken(course_title) {

	// (Shorthand schedule)
	var ws = window.WorkingSchedule;
	
	// If found in a quarter, return that quarter.
	if(ws['fall_quarter'][course_title]) return 'fall_quarter';
	if(ws['winter_quarter'][course_title]) return 'winter_quarter';
	if(ws['spring_quarter'][course_title]) return 'spring_quarter';
	
	// If not found, return ''.
	return '';
}

/*
 * This function is called to return the course location [branch, department, course_number] from a course title
 * 
 * @param {Object} course_title - Title of course (i.e. "COEN10")
 */
function getCourseLocFromTitle(course_title) {
    //Get the course's department and course number from course_title
    var start = 1;
    for (; start < course_title.length; start++) {
        if (parseInt(course_title[start]) == course_title[start]) //You found the first number, start of course_number
            break;
    }
    var course_department = course_title.substring(0, start);
    var course_c_number = course_title.substring(start, course_title.length);

    //Get the course's branch
    for (branch in window.AllCourses) {
        for (course in window.AllCourses[branch]) {
            if (window.AllCourses[branch][course]['department'] == course_department && window.AllCourses[branch][course]['course_number'] == course_c_number) {
                return [branch, course_department, course_c_number];
            }
        }
    }
}

function numberOfCoresInQuarter(quarter) {
    var quarter_schedule = window.WorkingSchedule[quarter];
    var cores_in_quarter = 0;
    for (course in quarter_schedule) {
        if (course.indexOf('CORE') > -1) //CORE## found in schedule
            cores_in_quarter++;
    }
    return cores_in_quarter;
}

function getACoreForQuarter(quarter) {
    var quarter_schedule = window.WorkingSchedule[quarter];
    for (course in quarter_schedule) {
        if (course.indexOf('CORE') > -1) //CORE## found in schedule
            return course;
    }
    return -1; //No cores, return -1
}

function nextCore(quarter) {
    var quarter_schedule = window.WorkingSchedule[quarter];
    for (var current_core = 0;;current_core++) { //Keep incrementing current core and return the first core that isnt in schedule
        if (!quarter_schedule['CORE' + current_core])
            return 'CORE' + current_core;
    }
}


function computeTotalUnitsWithoutEngr1(quarter) {
    var quarter_schedule = window.WorkingSchedule[quarter];
    var units = 0;

    for (course in quarter_schedule) {
        if (course == 'ENGR1')
            continue;
        else
            units += parseInt(quarter_schedule[course]['units']);
    }

    return units;
}




//---------------------------------------------------------------------------------
// SCHEDULE MANIPULATION FUNCTIONS
//---------------------------------------------------------------------------------

function moveEngr1() {
    var quarter_offered;
	
	// Find the quarter that currently has ENGR1
    for (quarter in window.WorkingSchedule) {
        for (course in window.WorkingSchedule[quarter]) {
            if (course == 'ENGR1') {
                quarter_offered = quarter;
                break;
            }
        }
        if (quarter_offered)
            break;
    }

	// Initialize the units.
    var total_units_fall = 0;
    var total_units_winter = 0;

	// Count the Units
    total_units_fall = computeTotalUnitsWithoutEngr1('fall_quarter');
    total_units_winter = computeTotalUnitsWithoutEngr1('winter_quarter');

	// DEBUG: Print units.
    //console.log(total_units_fall + ', ' + total_units_winter);
	
	/*
	// ??? : Don't want to delete ENGR 1 entirely...
	
    if (total_units_fall > 17 && total_units_winter > 17) { //Cannot be placed anywhere, remove from schedule
        window.AllCourses['engineering_courses'][0]['quarter_taken'] = '';
        if (quarter_offered == 'fall_quarter') {
            delete window.WorkingSchedule['fall_quarter']['ENGR1'];
        }
        if (quarter_offered == 'winter_quarter') {
            delete window.WorkingSchedule['winter_quarter']['ENGR1'];
        }
        return;
    }
	*/
	
	// Initialize ENGR 1
	var engr1_ref = window.AllCourses['engineering_courses'][0];
	var engr1 = {
			name: engr1_ref["name"],
			department: engr1_ref["department"],
			course_number: engr1_ref["course_number"],
			description: engr1_ref["description"],
			branch: "engineering_courses",
			offering: engr1_ref["offering"],
			category: engr1_ref["category"],
			units: engr1_ref["units"],
			prerequisites: engr1_ref["prerequisites"]
		};
	
	// If ENGR 1 is in Winter, but Fall has less units, move ENGR 1 to Fall.
    if (total_units_fall <= total_units_winter && quarter_offered != 'fall_quarter') {
	
		// Update AllCourses
        window.AllCourses['engineering_courses'][0]['quarter_taken'] = 'fall_quarter';
		
		// Delete Old Instance
        if (quarter_offered == 'winter_quarter') delete window.WorkingSchedule['winter_quarter']['ENGR1'];
		
		// Create New Instance
        window.WorkingSchedule['fall_quarter']['ENGR1'] = engr1;
    }

	// Otherwise, move ENGR 1 to Winter (unless it's already there...)
    else if ( total_units_fall > total_units_winter && quarter_offered != 'winter_quarter') { 
	
		// Update AllCourses
        window.AllCourses['engineering_courses'][0]['quarter_taken'] = 'winter_quarter';

		// Delete Old Instance
        if (quarter_offered == 'fall_quarter') delete window.WorkingSchedule['fall_quarter']['ENGR1'];
		
		// Create New Instance
        window.WorkingSchedule['winter_quarter']['ENGR1'] = engr1;
    }
}

function fixCI() {

	// Check if C&I Is Taken... If it is, return.
	var ws = window.WorkingSchedule;
	if(ws['fall_quarter']['C&I1'] || ws['winter_quarter']['C&I1'] || ws['spring_quarter']['C&I1']){ return; }
	
	// Count number of cores per quarter.
	var fCore = numberOfCoresInQuarter('fall_quarter');
	var wCore = numberOfCoresInQuarter('winter_quarter');
	var sCore = numberOfCoresInQuarter('spring_quarter');
	
	// Put C&I in fall and winter if cores exist.
	if(fCore && wCore){
	
		// Find the CORE classes.
		var fall_core = getACoreForQuarter('fall_quarter');
		var winter_core = getACoreForQuarter('winter_quarter');
		
		// Delete the CORE classes
		delete WorkingSchedule.fall_quarter[fall_core]; delete WorkingSchedule.winter_quarter[winter_core];
		
		// Update C&I in Working Schedule
		WorkingSchedule.fall_quarter['C&I1'] = getCourse('CI_courses',getCourseId('CI_courses','C&I',1));
		WorkingSchedule.winter_quarter['C&I2'] = getCourse('CI_courses',getCourseId('CI_courses','C&I',2));
				
		// Update C&I in AllCourses
		window.AllCourses['CI_courses'][getCourseId('CI_courses','C&I',1)]['quarter_taken'] = 'fall_quarter';
		window.AllCourses['CI_courses'][getCourseId('CI_courses','C&I',2)]['quarter_taken'] = 'winter_quarter';

		return;	
	}
	
	// Otherwise, if core courses exist in winter and spring, assign C&I then.
	if (wCore && sCore) {
	
		// Find the CORE classes
		var winter_core = getACoreForQuarter('winter_quarter');
		var spring_core = getACoreForQuarter('spring_quarter');
		
		// Delete the CORE classes.
		delete WorkingSchedule.winter_quarter[winter_core]; delete WorkingSchedule.spring_quarter[spring_core];
		
		// Update C&I in Working Schedule
		WorkingSchedule.winter_quarter['C&I1'] = getCourse('CI_courses',getCourseId('CI_courses','C&I',1));
		WorkingSchedule.spring_quarter['C&I2'] = getCourse('CI_courses',getCourseId('CI_courses','C&I',2));
		
		// Update C&I in AllCourses
		window.AllCourses['CI_courses'][getCourseId('CI_courses','C&I',1)]['quarter_taken'] = 'winter_quarter';
		window.AllCourses['CI_courses'][getCourseId('CI_courses','C&I',2)]['quarter_taken'] = 'spring_quarter';

		return;
	}
}

/*
 * This function is called to put COEN12 in the correct quarter, based on the completion of COEN10/11
 */
function fixCoen12() {

	// If COEN 12 isn't in Schedule, return.
    if (!window.WorkingSchedule['winter_quarter']['COEN12'] && !window.WorkingSchedule['spring_quarter']['COEN12']) return;

	// If COEN 12 is already preceeded with two CORE classes, it is already fixed.  Return.
    if (window.WorkingSchedule['fall_quarter'][getACoreForQuarter('fall_quarter')]
        && window.WorkingSchedule['winter_quarter'][getACoreForQuarter('winter_quarter')]
        && window.WorkingSchedule['spring_quarter']['COEN12'])
        return;

	// (Shorthand Quarters)
    var fall_quarter = window.WorkingSchedule['fall_quarter'];
    var winter_quarter = window.WorkingSchedule['winter_quarter'];
    var spring_quarter = window.WorkingSchedule['spring_quarter'];

	// If COEN 10 / 11 is taken in the Fall, no fix required.
    if (fall_quarter['COEN10'] || fall_quarter['COEN11'])	return;

    //If you are here, this means the COEN track is as follows:
    //  fall_quarter: CORE, winter_quarter: COEN12, spring_quarter: CORE
    //What it should be is this:
    //  fall_quarter: CORE, winter_quarter: CORE, spring_quarter: COEN12

	// Get Class info on COEN 12
    var coen12_id = getCourseId('coen_courses', 'COEN', '12');
    var coen12 = getCourse('coen_courses', coen12_id);
	
	// Get Class info for CORE
    var core_course = getCourse('core_courses', 0);

    // Delete Old COEN 12 (from Winter) and CORE (from Spring)
    delete window.WorkingSchedule['spring_quarter'][getACoreForQuarter('spring_quarter')];
    delete window.WorkingSchedule['winter_quarter']['COEN12'];
	
	// Copy the Class over.
    window.WorkingSchedule['spring_quarter']['COEN12'] = {
			name: coen12["name"],
			department: coen12["department"],
			course_number: coen12["course_number"],
			description: coen12["description"],
			branch: 'coen_courses',
			offering: coen12["offering"],
			category: coen12["category"],
			units: coen12["units"],
			prerequisites: coen12["prerequisites"]
		};

	// Determine next Core and copy.
    var winter_core = nextCore('winter_quarter');
    window.WorkingSchedule['winter_quarter'][winter_core] = {
			name: core_course["name"],
			department: core_course["department"],
			course_number: core_course["course_number"],
			description: core_course["description"],
			branch: 'core_courses',
			offering: core_course["offering"],
			category: core_course["category"],
			units: core_course["units"],
			prerequisites: core_course["prerequisites"]
		};
}

/*
 * This function is called to check each quarter for units, and removes CORES until there is a valid number of units
 */
 
function fixUnitsQuarter(qtr){
	// While the units exceed 19 units...
	while(computeTotalUnitsWithoutEngr1(qtr) > 19){
	
		// ...look for Core classes...
		var _coreID = getACoreForQuarter(qtr);
		
		// ...and delete them.
		if(_coreID != -1) delete window.WorkingSchedule[qtr][_coreID];
		
		// if none are found, return.
		else return;
	}
}
 
function fixUnits() {

	// Fix the units for each quarter.
	fixUnitsQuarter('fall_quarter');
	fixUnitsQuarter('winter_quarter');
	fixUnitsQuarter('spring_quarter');
}

/*
 * This function is called to remove a course from the default course list at a specific quarter
 * 
 * @param {Object} course_title - Title of course to be removed (i.e. "COEN10")
 * @param {string} quarter - The current quarter ("fall_quarter", "winter_quarter", or "spring_quarter")
 */
function removeCourse(course_title, quarter) {

	// DEBUG: Check course and quarter...
    //console.log(course_title + ', ' + quarter);
    
	  //Base case, return and break out of recursion
	if (quarter == -1) return;

	//If no quarter specified (first time), find the quarter and try again
    if (!quarter) { 
		var _quarter, course_title;
		
		// Search for quarter; if found, removeCourse from the specified quarter.
        for (_quarter in window.WorkingSchedule) {
            if (course_title in window.WorkingSchedule[_quarter]) {
                removeCourse(course_title, _quarter);
                return;
            }
        }

        //If not found, the course has not been taken yet.
		// Find that course and set it to 'taken'.
		
		// Shouldn't move CTW, but just in case... (Meanwhile, C&I shouldn't be here.)
		if(course_title == "CTW1" || course_title == "CTW2"){
			console.log("Trying to remove CTW...");
			var course_department = course_title.substring(0, 3);		
			var course_c_number = course_title.substring(3, course_title.length);
		}
		
		// Get the course dept. and number.
        var course_department = course_title.substring(0, 4);		
        var course_c_number = course_title.substring(4, course_title.length);

		// Update the Course in AllCourses.
        for (var branch in window.AllCourses) {
            for (var course in window.AllCourses[branch]) {
                if (window.AllCourses[branch][course]['department'] == course_department && window.AllCourses[branch][course]['course_number'] == course_c_number) {
                    window.AllCourses[branch][course]['credit'] = 'YES'; 
					
					// DEBUG: Display class that now has Credit.
                    //console.log(JSON.stringify(window.AllCourses[branch][course]));
                    return;
                }
            }
        }
    }

	// Get the course.
    var course = window.WorkingSchedule[quarter][course_title];
	
	// If no course exists, return.
    if(!course){ return;}
	
	// Get Course Id
    var id = getCourseId(course['branch'], course['department'], course['course_number']);
	
	// Get the Next Course in the Series
    var next_course_in_series = nextCourseAfter([course.branch, course.department, course.course_number], id, quarter);

	// DEBUG: Course removal info.
    // console.log(JSON.stringify(window.AllCourses[course['branch']][id]));
    // console.log('removing ' + course_title + ' for ' + quarter);
	
	// Remove the course.
    delete window.WorkingSchedule[quarter][course_title];
	
	// Reflect removal in AllCourses
    window.AllCourses[course['branch']][id]['quarter_taken'] = quarterTaken(course['department'] + course['course_number']);

	// If there isn't a next course in the series, take CORE.
    if(next_course_in_series == null) {
	
		// Get Core Information
        var core_course = getCourse('core_courses', 0);
        var next_core = nextCore(quarter);

		// Copy Over.
        window.WorkingSchedule[quarter][next_core] = {
			name: core_course["name"],
			department: core_course["department"],
			course_number: core_course["course_number"],
			description: core_course["description"],
			branch: 'core_courses',
			offering: core_course["offering"],
			category: core_course["category"],
			units: core_course["units"],
			prerequisites: core_course["prerequisites"]
		};
        
    }  
	// Otherwise, take the next course in the series.
	else {
	
		// Get information on next course.
        var next_course = next_course_in_series[0];
        var next_course_id = next_course_in_series[1];

		// Refect Quarter Taken and Credit in AllCourses.
        window.AllCourses[course['branch']][next_course_id]['quarter_taken'] = quarter;
        window.AllCourses[course['branch']][next_course_id]['credit'] = 'YES';
		
		// DEBUG: Course Addition Information.
        //console.log('adding ' + next_course['department'] + next_course['course_number'] + ' for ' + quarter);
        //console.log('adding quarter taken for ' + next_course['department'] + next_course['course_number']);

		// Construct course from AllCoursesInfo.
        window.WorkingSchedule[quarter][next_course['department'] + next_course['course_number']] = {
			name: next_course["name"],
			department: next_course["department"],
			course_number: next_course["course_number"],
			description: next_course["description"],
			branch: course.branch,
			offering: next_course["offering"],
			category: next_course["category"],
			units: next_course["units"],
			prerequisites: next_course["prerequisites"]
		};
		
		// DEBUG: Recursive check.
        //console.log('recursively checking ' + nextOffering(next_course['offering'], quarter) + ' for ' + next_course['department'] + next_course['course_number']);
		
		// Removed the added course from subsequent quarters.
        removeCourse(next_course['department'] + next_course['course_number'], nextOffering(next_course['offering'], quarter));
    }
}








//---------------------------------------------------------------------------------
// PRECOMPUTATION FUNCTIONS
//---------------------------------------------------------------------------------


// CALCULUS READINESS -------------------------------------------------------------
function getEquivalentReadinessExam(){
    return [{function: 'removeCourse', parameters:['MATH9']}];
}

// PROGRAMMING EXPERIENCE----------------------------------------------------------
function getEquivalentProgrammingExperience(){
    return [{function: 'removeCourse', parameters:['COEN10']}];
}


// TRANSFER CREDIT-----------------------------------------------------------------
function getEquivalentTransferCredit(transfer_credit){
    var schedule_changes = [];

    for (course in window.TransferCredit[transfer_credit['id']]['fulfillment']) {
        course_info = window.TransferCredit[transfer_credit['id']]['fulfillment'][course];
        schedule_changes.push({
            function : 'removeCourse',
            parameters : [course_info[1] + course_info[2]]
        });
    }
    
    return schedule_changes;
}
    

// AP CREDIT-----------------------------------------------------------------------
function getEquivalentAPTest(ap_test)
{
    var mods = new Array();
    var test = window.APTests[ap_test.id];
        if (test.multiple_fulfillments) { //If there are multiple possibilities for AP test scores, go through each one and find the range that ap_test.score falls within, then test out of those classes
            for (test_fulfillment in test.multiple_fulfillments) { //For each fulfillment 
                var this_fulfillment = test.multiple_fulfillments[test_fulfillment];
                if (ap_test.score >= this_fulfillment.min_score && ap_test.score <= this_fulfillment.max_score) { //If ap_test.score falls within a certain range
                    for (course in this_fulfillment.fulfillment) { //For each course that is fulfilled
                        var this_course = this_fulfillment.fulfillment[course];
                        mods.push({
                            function : 'removeCourse',
                            parameters : [this_fulfillment.fulfillment[course][1] + this_fulfillment.fulfillment[course][2]]
                        });
                    }
                    return mods;
                }
            }
        } else {
            if (ap_test.score >= window.APTests[ap_test.id].min_score && ap_test.score <= window.APTests[ap_test.id].max_score) {
                for (course in window.APTests[ap_test.id].fulfillment) {
                    mods.push({
                        function : 'removeCourse',
                        parameters : [window.APTests[ap_test.id].fulfillment[course][1] + window.APTests[ap_test.id].fulfillment[course][2]]
                    } );
                }    
            }
        }
    return mods;
}
// IB CREDIT-----------------------------------------------------------------------
function getEquivalentIBTest(ib_test)
{
    var mods = new Array();
    var test = window.IBTests[ib_test.id];
        if (test.multiple_fulfillments) { //If there are multiple possibilities for IB test scores, go through each one and find the range that ib_test.score falls within, then test out of those classes
            for (test_fulfillment in test.multiple_fulfillments) { //For each fulfillment 
                var this_fulfillment = test.multiple_fulfillments[test_fulfillment];
                if (ib_test.score >= this_fulfillment.min_score && ib_test.score <= this_fulfillment.max_score) { //If ib_test.score falls within a certain range
                    for (course in this_fulfillment.fulfillment) { //For each course that is fulfilled
                        var this_course = this_fulfillment.fulfillment[course];
                        mods.push({
                            function : 'removeCourse',
                            parameters : [this_fulfillment.fulfillment[course][1] + this_fulfillment.fulfillment[course][2]]
                        });
                    }
                    return mods;
                }
            }
        } else {
            if (ib_test.score >= window.IBTests[ib_test.id].min_score && ib_test.score <= window.IBTests[ib_test.id].max_score) {
                for (course in window.IBTests[ib_test.id].fulfillment) {
                    mods.push({
                        function : 'removeCourse',
                        parameters : [window.IBTests[ib_test.id].fulfillment[course][1] + window.IBTests[ib_test.id].fulfillment[course][2]]
                    } );
                }    
            }
        }
    return mods;
}








//---------------------------------------------------------------------------------
// MODIFICATION LOG FUNCTIONS
//---------------------------------------------------------------------------------

window.ModLog = {};

function applyMods(id,mods){
    if(!id || !mods) return;
    window.ModLog[id] = mods;
}

function removeMods(id){
    if(!id) return;
    delete window.ModLog[id];
}









//---------------------------------------------------------------------------------
// COMPUTATION FUNCTIONS
//---------------------------------------------------------------------------------
window.MajorAbbr = 'cse';
function setBasePlan(maj){
    window.MajorAbbr = maj;
    switch(maj){
        case 'cse':
            window.BasePlan = jQuery.extend(true,{},window.DefaultScheduleCSE);    // (defined in objects.js)
            break;
        case 'wde':
            window.BasePlan = jQuery.extend(true,{},window.DefaultScheduleWDE);    // (defined in objects.js)
            break;
            
    }
}


/*
 * This function is initially called for CSE students when the student's input from the view has changed.
 * 
 * @param {Object} student_input - object containing the current state of input from the user
 */
function computeNewSchedule() {
    // A SCHEDULE OBJECT IN THE SAME FORMAT AS THE DECLARATION MUST BE RETURNED HERE
    //              (obviously with new courses in each quarter)

    // RESET
    //DO SOMETHING HERE TO ADD C&I WHERE NEEDED WHEREVER CORES ARE OFFERED
    window.WorkingSchedule = jQuery.extend(true,{},window.BasePlan);    // (defined above)
    window.AllCourses = jQuery.extend(true,{},window.CourseCatalogue);    // (defined in all_courses.js)
    
    for(id in window.ModLog){
        for(course in window.ModLog[id]){
            var record = window.ModLog[id][course]
            // Execute the function
            window[record['function']].apply(window,record['parameters']);
        }
    }
	
	var exemptions = window.CourseExemptions[window.MajorAbbr];
	for(var i = 0; i < exemptions.length; i++){
		window.removeCourse(exemptions[i]);
	}
	
	// POST MAIN
	
        fixCoen12(); //Move COEN12 based on if COEN10/11 are completed
        moveEngr1(); //Move engineering 1 to a better quarter
        fixUnits(); //Remove cores as necessary to get to required number of units
        fixCI(); //Add C&I where you can
    
    return window.WorkingSchedule;
}
