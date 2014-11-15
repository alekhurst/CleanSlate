window.CourseCatalogue = {
	math_courses : [
		{
			name : "Precalculus",
			department : "MATH",
			course_number : "9",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "YES",
            quarter_taken: "fall_quarter",
			category : "math_and_science",
            units : "4",
            prerequisites : [],
		},

		{
			name : "Calculus & Analytic Geometry 1",
			department : "MATH",
			course_number : "11",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "YES",
            quarter_taken: "winter_quarter",
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "9"]],
		},

		{
			name : "Calculus & Analytic Geometry 2",
			department : "MATH",
			course_number : "12",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "YES",
            quarter_taken: "spring_quarter",
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "11"]],
		},

		{
			name : "Calculus & Analytic Geometry 3",
			department : "MATH",
			course_number : "13",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "NO",
            quarter_taken: "",
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "12"]],
		},

		{
			name : "Calculus & Analytic Geometry 4",
			department : "MATH",
			course_number : "14",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "NO",
            quarter_taken: "",
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "13"]],
		},

		{
			name : "Differential Equations",
			department : "AMTH",
			course_number : "106",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "NO",
            quarter_taken: "",
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "14"]],
		},

		{
			name : "Probability and Statistics",
			department : "AMTH",
			course_number : "108",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "NO",
            quarter_taken: "",
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "14"]],
		},

		{
			name : "Linear Algebra",
			department : "MATH",
			course_number : "53",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "NO",
            quarter_taken: "",
			category : "math_and_science",
            units : "4",
            prerequisites : [["math_courses", "MATH", "13"]],
		},
	],

	science_courses : [
		{
			name : "General Chemistry 1 + Lab",
			department : "CHEM",
			course_number : "11",
			description : "something",
			offering : ["fall_quarter"],
			credit : "YES",
            quarter_taken: "fall_quarter",
			category : "math_and_science",
            units : "5",
            prerequisites : [],
		},

		{
			name : "Physics: Scientists & Engineers 1 + Lab",
			department : "PHYS",
			course_number : "31",
			description : "something",
			offering : ["winter_quarter"],
			credit : "YES",
            quarter_taken: "winter_quarter",
			category : "math_and_science",
            units : "5",
            prerequisites : [["math_courses", "MATH", "11"]],
		},

		{
			name : "Physics: Scientists & Engineers 2 + Lab",
			department : "PHYS",
			course_number : "32",
			description : "something",
			offering : ["spring_quarter"],
			credit : "YES",
            quarter_taken: "spring_quarter",
			category : "math_and_science",
            units : "5",
            prerequisites : [["math_courses", "MATH", "11"], ["science_courses", "PHYS", "31"]],
		},

		{
			name : "Physics: Scientists & Engineers 3 + Lab",
			department : "PHYS",
			course_number : "33",
			description : "something",
			offering : ["fall_quarter"],
			credit : "NO",
            quarter_taken: "",
			category : "math_and_science",
            units : "5",
            prerequisites : [["math_courses", "MATH", "12"], ["science_courses", "PHYS", "32"]],
		}
	],

    engineering_courses : [
        {
            name : "Introduction to Engineering + Lab",
            department : "ENGR",
            course_number : "1",
            description : "something",
            offering : ["fall_quarter", "winter_quarter"],
            credit : "YES",
            quarter_taken: "fall_quarter",
            category : "engineering",
            units : "2",
            prerequisites : [],
        },
    ],

	coen_courses : [
		{
			name : "Introduction to Programming + Lab",
			department : "COEN",
			course_number : "10",
			description : "something",
			offering : ["fall_quarter"], //technically fall and winter, but you don't want to take it any other time
			credit : "YES",
            quarter_taken: "fall_quarter",
			category : "engineering",
            units : "5",
            prerequisites : [],
		},

		{
			name : "Advanced Programming + Lab",
			department : "COEN",
			course_number : "11",
			description : "something",
			offering : ["fall_quarter", "winter_quarter"], //technically any quarter, but you don't want to take it any other time
			credit : "YES",
            quarter_taken: "winter_quarter",
			category : "engineering",
            units : "5",
            prerequisites : [["coen_courses", "COEN", "10"]],
		},

		{
			name : "Abstract Data Types and Data Structures + Lab",
			department : "COEN",
			course_number : "12",
			description : "something",
			offering : ["winter_quarter", "spring_quarter"], //technically any quarter, but you don't want to take it any other quarter
			credit : "YES",
            quarter_taken: "spring_quarter",
			category : "engineering",
            units : "5",
            prerequisites : [["coen_courses", "COEN", "11"]],
		},

		{
			name : "Discrete Math",
			department : "COEN",
			course_number : "19",
			description : "something",
			offering : ["spring_quarter"], //Technically fall and spring, but you never want to take it fall quarter
			credit : "YES",
            quarter_taken: "spring_quarter",
			category : "engineering",
            units : "4",
            prerequisites : [],
		},
	],

	core_courses : [
		{
			name : "University Core",
			department : "CORE",
			course_number : "",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "",
            quarter_taken: "",
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [],
		}
	],

	CTW_courses : [
		{
			name : "Critical Thinking & Writing 1",
			department : "CTW",
			course_number : "1",
			description : "Critical Thinking & Writing I",
			offering : ["fall_quarter", "winter_quarter"],
			credit : "YES",
            quarter_taken: "fall_quarter",
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [],
		},

		{
			name : "Critical Thinking & Writing 2",
			department : "CTW",
			course_number : "2",
			description : "something",
			offering : ["winter_quarter", "spring_quarter"],
			credit : "YES",
            quarter_taken: "winter_quarter",
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [["CTW_courses", "CTW", "1"]],
		}
    ],

    CI_courses : [	
		{
			name : "Cultures & Ideas 1",
			department : "C&I",
			course_number : "1",
			description : "something",
			offering : ["fall_quarter", "winter_quarter"],
            quarter_taken: "",
			credit : "NO",
            quarter_taken: "",
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [],
		},

		{
			name : "Cultures & Ideas 2",
			department : "C&I",
			course_number : "2",
			description : "something",
			offering : ["winter_quarter", "spring_quarter"],
			credit : "NO",
            quarter_taken: "",
			category : "humanities_and_social_science",
            units : "4",
            prerequisites : [["CI_courses", "C&I", "1"]],
		}
	]
}
