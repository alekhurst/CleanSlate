window.AllCourses = {
	math_courses : [
		{
			name : "Calculus & Analytic Geometry 1",
			department : "MATH",
			course_number : "11",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "math_and_science",
			next:["MATH 12"]
		},

		{
			name : "Calculus & Analytic Geometry 2",
			department : "MATH",
			course_number : "12",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "math_and_science",
			next:["MATH 13"]
		},

		{
			name : "Calculus & Analytic Geometry 3",
			department : "MATH",
			course_number : "13",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "math_and_science",
			next:["MATH 14"]
		},

		{
			name : "Calculus & Analytic Geometry 4",
			department : "MATH",
			course_number : "14",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "math_and_science",
			next:["MATH 53","AMTH 106","AMTH 108"]
		},

		{
			name : "Linear Algebra",
			department : "MATH",
			course_number : "53",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "math_and_science",
			next:["AMTH 106","AMTH 108"]
		},

		{
			name : "Differential Equations",
			department : "AMTH",
			course_number : "106",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "math_and_science",
			next:["MATH 53","AMTH 108"]
		},

		{
			name : "Probability and Statistics",
			department : "AMTH",
			course_number : "108",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "math_and_science",
			next:["MATH 53","AMTH 106"]
		}
	],

	science_courses : [
		{
			name : "General Chemistry 1",
			department : "CHEM",
			course_number : "11",
			description : "something",
			offering : ["fall_quarter"],
			co_requisite : "LAB",
			credit : "NO",
			category : "math_and_science",
			next:[]
		},

		{
			name : "Physics: Scientists & Engineers 1",
			department : "PHYS",
			course_number : "31",
			description : "something",
			offering : ["winter_quarter"],
			co_requisite : "LAB",
			credit : "NO",
			category : "math_and_science",
			next:["PHYS 32"]
		},

		{
			name : "Physics: Scientists & Engineers 2",
			department : "PHYS",
			course_number : "32",
			description : "something",
			offering : ["spring_quarter"],
			co_requisite : "LAB",
			credit : "NO",
			category : "math_and_science",
			next:["PHYS 33"]
		},

		{
			name : "Physics: Scientists & Engineers 3",
			department : "PHYS",
			course_number : "33",
			description : "something",
			offering : ["fall_quarter"],
			co_requisite : "LAB",
			credit : "NO",
			category : "math_and_science"
		}
	],

	coen_courses : [
		{
			name : "Introduction to Programming",
			department : "COEN",
			course_number : "10",
			description : "something",
			offering : ["fall_quarter", "winter_quarter"],
			co_requisite : "LAB",
			credit : "NO",
			category : "engineering",
			next:["COEN 11"]
		},

		{
			name : "Advanced Programming",
			department : "COEN",
			course_number : "11",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "LAB",
			credit : "NO",
			category : "engineering",
			next:["COEN 12"]
		},

		{
			name : "Abstract Data Types and Data Structures",
			department : "COEN",
			course_number : "12",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "LAB",
			credit : "NO",
			category : "engineering",
			next:["COEN 19","COEN 20","COEN 21","COEN 70"]
		},

		{
			name : "Discrete Math",
			department : "COEN",
			course_number : "19",
			description : "something",
			offering : ["fall_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "engineering",
			next: []
		},

		{
			name : "Introduction to Embedded Systems",
			department : "COEN",
			course_number : "20",
			description : "something",
			offering : ["fall_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "engineering",
			next: ["COEN 21","COEN 70"]
		},

		{
			name : "Introduction to Logic Design",
			department : "COEN",
			course_number : "21",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "LAB",
			credit : "NO",
			category : "engineering",
			next: ["COEN 20","COEN 70"]
		},

		{
			name : "Formal Specification and Advanced Data Structures",
			department : "COEN",
			course_number : "70",
			description : "something",
			offering : ["winter_quarter"],
			co_requisite : "LAB",
			credit : "NO",
			category : "engineering",
			next: ["COEN 20","COEN 21"]
		}
	],

	core_courses : [
		{
			name : "University Core",
			department : "",
			course_number : "",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "humanities_and_social_science"
		}
	],

	required_courses : [
		{
			name : "Critical Thinking & Writing 1",
			department : "CTW",
			course_number : "1",
			description : "Critical Thinking & Writing I",
			offering : ["fall_quarter", "winter_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "humanities_and_social_science"
		},

		{
			name : "Critical Thinking & Writing 2",
			department : "CTW",
			course_number : "2",
			description : "something",
			offering : ["winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "humanities_and_social_science"
		},	

		{
			name : "Cultures & Ideas 1",
			department : "C&I",
			course_number : "1",
			description : "something",
			offering : ["fall_quarter", "winter_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "humanities_and_social_science"
		},

		{
			name : "Cultures & Ideas 2",
			department : "C&I",
			course_number : "2",
			description : "something",
			offering : ["winter_quarter", "spring_quarter"],
			co_requisite : "",
			credit : "NO",
			category : "humanities_and_social_science"
		}
	]
}


