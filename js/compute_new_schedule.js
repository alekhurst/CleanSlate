/* This file does all of the heavy lifting for computing a new schedule */

/**
 * This function is initially called when the student's input from the view has changed.
 * 
 * @param {Object} student_input - object containing the current state of input from the user
 * @param {Object} current_schedule - object containing current state of the schedule in the view
 */
function computeNewSchedule(student_input, current_schedule) {
	console.log(student_input);
	console.log(current_schedule);

	// in this case there is no algorithm, so we just return the same default schedule.
	// Normally, the computation would begin here, and at some point a modified schedule
	// object would be returned.
	//
	// A SCHEDULE OBJECT IN THE SAME FORMAT AS THE DECLARATION MUST BE RETURNED HERE
	//              (obviously with new courses in each quarter)
	return current_schedule;  
}