// Initial Schedule Object
window.DefaultScheduleCSE = {
	fall_quarter : {
		CTW1 : {
			name : "Critical Thinking & Writing 1",
			department : "CTW",
			course_number : "1",
			description : "Critical Thinking & Writing I",
            branch : "CTW_courses",
			offering : ["fall_quarter", "winter_quarter"],
			category : "humanities_and_social_science",
            units : "4",
            prerequisites: [],
		},
		MATH9 : {
			name : "Precalculus",
			department : "MATH",
			course_number : "9",
			description : "something",
            branch : "math_courses",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			category : "math_and_science",
            units : "4",
            prerequisites : [],
		},
		CHEM11 : {
			name : "General Chemistry 1 + Lab",
			department : "CHEM",
			course_number : "11",
			description : "something",
            branch : "science_courses",
			offering : ["fall_quarter"],
			category : "math_and_science",
            units : "5",
            prerequisites : [],
		},
		COEN10 : {
			name : "Introduction to Programming + Lab",
			department : "COEN",
			course_number : "10",
			description : "something",
            branch : "coen_courses",
			offering : ["fall_quarter"],
			category : "engineering",
            units : "5",
            prerequisites: [],
		},
        ENGR1 : {
            name : "Introduction to Engineering + Lab",
            department : "ENGR",
            course_number : "1",
            description : "something",
            branch : "engineering_courses",
            offering : ["fall_quarter", "winter_quarter"],
            category : "engineering",
            units : "2",
            prerequisites : [],
        },
	},
	
	winter_quarter : {
		CTW2 : {
			name : "Critical Thinking & Writing 2",
			department : "CTW",
			course_number : "2",
			description : "something",
            branch : "CTW_courses",
			offering : ["winter_quarter", "spring_quarter"],
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [["CTW_courses", "CTW", "1"]],
		},	
		MATH11 : {
			name : "Calculus & Analytic Geometry 1",
			department : "MATH",
			course_number : "11",
			description : "something",
            branch : "math_courses",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "9"]],
		},
		PHYS31 : {
			name : "Physics: Scientists & Engineers 1 + Lab",
			department : "PHYS",
			course_number : "31",
			description : "something",
            branch : "science_courses",
			offering : ["winter_quarter"],
			category : "math_and_science",
            units : "5",
            prerequisites : [["math_courses", "MATH", "11"]],
		},
		COEN11 : {
			name : "Advanced Programming + Lab",
			department : "COEN",
			course_number : "11",
			description : "something",
            branch : "coen_courses",
			offering : ["fall_quarter", "winter_quarter"],
			category : "engineering",
            units : "5",
            prerequisites : [["coen_courses", "COEN", "10"]],
		},
	},
	
	spring_quarter : {
		COEN19 : {
			name : "Discrete Math",
			department : "COEN",
			course_number : "19",
			description : "something",
            branch : "coen_courses",
			offering : ["fall_quarter", "spring_quarter"],
			category : "engineering",
            units : "4",
            prerequisites : [],
		},
		MATH12 : {
			name : "Calculus & Analytic Geometry 2",
			department : "MATH",
			course_number : "12",
			description : "something",
            branch : "math_courses",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "11"]],
		},
		PHYS32 : {
			name : "Physics: Scientists & Engineers 2 + Lab",
			department : "PHYS",
			course_number : "32",
			description : "something",
            branch : "science_courses",
			offering : ["spring_quarter"],
			category : "math_and_science",
            units : "5",
            prerequisites : [["math_courses", "MATH", "11"], ["science_courses", "PHYS", "31"]],
		},
		COEN12 : {
			name : "Abstract Data Types and Data Structures + Lab",
			department : "COEN",
			course_number : "12",
			description : "something",
            branch : "coen_courses",
			offering : ["winter_quarter", "spring_quarter"],
			category : "engineering",
            units : "5",
            prerequisites : [["coen_courses", "COEN", "11"]],
		},
	}
};

window.DefaultScheduleWDE = {
	fall_quarter : {
		MATH9 : {
			name : "Precalculus",
			department : "MATH",
			course_number : "9",
			description : "something",
            branch : "math_courses",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			category : "math_and_science",
            units : "4",
            prerequisites : [],
        },
		CHEM11 : {
			name : "General Chemistry 1 + Lab",
			department : "CHEM",
			course_number : "11",
			description : "something",
            branch : "science_courses",
			offering : ["fall_quarter"],
			category : "math_and_science",
            units : "5",
            prerequisites : [],
		},
		CTW1 : {
			name : "Critical Thinking & Writing 1",
			department : "CTW",
			course_number : "1",
			description : "Critical Thinking & Writing I",
            branch : "CTW_courses",
			offering : ["fall_quarter", "winter_quarter"],
			category : "humanities_and_social_science",
            units : "4",
            prerequisites: [],
		},
		COEN10 : {
			name : "Introduction to Programming + Lab",
			department : "COEN",
			course_number : "10",
			description : "something",
            branch : "coen_courses",
			offering : ["fall_quarter"],
			category : "engineering",
            units : "5",
            prerequisites: [],
		},
        ENGR1 : {
            name : "Introduction to Engineering + Lab",
            department : "ENGR",
            course_number : "1",
            description : "something",
            branch : "engineering_courses",
            offering : ["fall_quarter", "winter_quarter"],
            category : "engineering",
            units : "2",
            prerequisites : [],
        },
	},
	
	winter_quarter : {
		CTW2 : {
			name : "Critical Thinking & Writing 2",
			department : "CTW",
			course_number : "2",
			description : "something",
            branch : "CTW_courses",
			offering : ["winter_quarter", "spring_quarter"],
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [["CTW_courses", "CTW", "1"]],
		},	
		MATH11 : {
			name : "Calculus & Analytic Geometry 1",
			department : "MATH",
			course_number : "11",
			description : "something",
            branch : "math_courses",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "9"]],
		},
		"C&I1" : {
			name : "Cultures & Ideas 1",
			department : "C&I",
			course_number : "1",
			description : "something",
            branch : "CI_courses",
			offering : ["fall_quarter", "winter_quarter"],
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [],
		},
		COEN11 : {
			name : "Advanced Programming + Lab",
			department : "COEN",
			course_number : "11",
			description : "something",
            branch : "coen_courses",
			offering : ["fall_quarter", "winter_quarter"],
			category : "engineering",
            units : "5",
            prerequisites : [["coen_courses", "COEN", "10"]],
		},
	},
	
	spring_quarter : {
		MATH12 : {
			name : "Calculus & Analytic Geometry 2",
			department : "MATH",
			course_number : "12",
			description : "something",
            branch : "math_courses",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "11"]],
		},
		"C&I2" : {
			name : "Cultures & Ideas 2",
			department : "C&I",
			course_number : "2",
			description : "something",
            branch : "CI_courses",
			offering : ["winter_quarter", "spring_quarter"],
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [["CI_courses", "C&I", "1"]],
        },
		CORE0 : {
			name : "University Core",
			department : "CORE",
			course_number : "",
			description : "something",
            branch : "core_courses",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [],
		},
		COEN12 : {
			name : "Abstract Data Types and Data Structures + Lab",
			department : "COEN",
			course_number : "12",
			description : "something",
            branch : "coen_courses",
			offering : ["winter_quarter", "spring_quarter"],
			category : "engineering",
            units : "5",
            prerequisites : [["coen_courses", "COEN", "11"]],
		},
	}
};

window.Steps = [
	{
		step_number : 1,
		description : 'Choose a major',
		prev_button : 'false',
		next_button : 'true',
		view : 'initial'
	},
	{
		step_number : 2,
		description : 'Add your AP test scores',
		prev_button : 'true',
		next_button : 'true',
		view : 'main'
	},
	{
		step_number : 3,
		description : 'Add your transfer credit',
		prev_button : 'true',
		next_button : 'true',
		view : 'main'
	},
	{
		step_number : 4,
		description : 'Fill out miscellaneous information',
		prev_button : 'true',
		next_button : 'true',
		view : 'main'
	},
	{
		step_number : 5,
		description : 'All done! Just print and bring to your advisor meeting',
		prev_button : 'true',
		next_button : 'false',
		view : 'main'
	}
];


//================================================================
// BASE PLAN -- MUTABLE COPY

window.BasePlan = {};

function setBasePlan(maj){
    
    switch(maj){
        case 'cse':
            window.BasePlan = jQuery.extend(true,{},window.DefaultScheduleCSE);    // (defined in objects.js)
            break;
        case 'wde':
            window.BasePlan = jQuery.extend(true,{},window.DefaultScheduleWDE);    // (defined in objects.js)
            break;
            
    }
}

setBasePlan('cse');
