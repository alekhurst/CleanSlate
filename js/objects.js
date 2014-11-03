// Initial Schedule Object
window.DefaultScheduleCSE = {
	fall_quarter : [
		{
			name : "Critical Thinking & Writing 1",
			department : "CTW",
			course_number : "1",
			description : "Critical Thinking & Writing I",
			offering : ["fall_quarter", "winter_quarter"],
			credit : "NO",
			category : "humanities_and_social_science",
            units : "4",
            required_ap_score : "",
            prerequisites: [],
		},
		{
			name : "Precalculus",
			department : "MATH",
			course_number : "9",
			description : "something",
			offering : ["fall_quarter", "winter_quarter", "spring_quarter"],
			credit : "NO",
			category : "math_and_science",
            units : "4",
            required_ap_score : "",
            prerequisites : [],
		},
		{
			name : "General Chemistry 1 + Lab",
			department : "CHEM",
			course_number : "11",
			description : "something",
			offering : ["fall_quarter"],
			credit : "NO",
			category : "math_and_science",
            units : "5",
            required_ap_score : "",
            prerequisites : [],
		},
		{
			name : 'COEN 10',
			description : 'Introduction to Programming + Lab',
			units : '5',
			category: 'engineering',
            
		},
		{
			name : 'ENGR 1',
			description : 'Introduction to Engineering',
			units : '1',
			category: 'engineering',
            
		}
	],
	
	winter_quarter : [
		{
			name : 'University Core',
			description : 'Critical Thinking & Writing 2',
			units : '4',
			category : 'humanities_and_social_science',
            
		},
		{
			name : 'MATH 11',
			description : 'Calculus I',
			units : '4',
			category : 'math_and_science',
            
		},
		{
			name : 'PHYS 31',
			description : 'Physics I + Lab',
			units : '4',
			category : 'math_and_science',
            
		},
		{
			name : 'COEN 11',
			description : 'Advanced Programming + Lab',
			units : '5',
			category: 'engineering',
            modifiers: 'Lab'
		}
	],
	
	spring_quarter : [
		{
			name : 'COEN 19',
			description : 'Discrete Math',
			units : '4',
			category : 'math_and_science',
            
		},
		{
			name : 'MATH 12',
			description : 'Calculus II',
			units : '4',
			category : 'math_and_science',
            
		},
		{
			name : 'PHYS 32',
			description : 'Physics II + Lab',
			units : '5',
			category : 'math_and_science',
            
		},
		{
			name : 'COEN 12',
			description : 'Data Structures + Lab',
			units : '5',
			category: 'engineering',
            
        }
	]
};

window.DefaultScheduleWDE = {
	fall_quarter : [
		{
			name : 'MATH 9',
			description : 'Precalculus',
			units : '4',
			category : 'math_and_science',
            
		},
		{
			name : 'CHEM 11',
			description : 'General Chemistry I + Lab',
			units : '5',
			category : 'math_and_science',
            
		},
		{
			name : 'University Core',
			description : 'Critical Thinking & Writing I',
			units : '4',
			category : 'humanities_and_social_science',
            
		},
		{
			name : 'COEN 10',
			description : 'Introduction to Programming + Lab',
			units : '5',
			category: 'engineering',
		},
		{
			name : 'ENGR 1',
			description : 'Introduction to Engineering',
			units : '1',
			category: 'engineering',
		}
	],
	
	winter_quarter : [
		{
			name : 'MATH 11',
			description : 'Calculus I',
			units : '4',
			category : 'math_and_science',
		},
		{
			name : 'University Core',
			description : 'Critical Thinking & Writing 2',
			units : '4',
			category : 'humanities_and_social_science',
		},
		{
			name : 'University Core',
			description : 'Cultures & Ideas 1',
			units : '4',
			category : 'humanities_and_social_science',
		},
		{
			name : 'COEN 11',
			description : 'Advanced Programming + Lab',
			units : '5',
			category: 'engineering',
		}
	],
	
	spring_quarter : [
		{
			name : 'MATH 12',
			description : 'Calculus II',
			units : '4',
			category : 'math_and_science',
		},
		{
			name : 'University Core',
			description : 'Cultures & Ideas 2',
			units : '4',
			category : 'humanities_and_social_science',
		},
		{
			name : 'University Core',
			description : 'Religion, Theology & Cultures 1',
			units : '4',
			category : 'humanities_and_social_science',
		},
		{
			name : 'COEN 12',
			description : 'Data Structures',
			units : '5',
			category: 'engineering',
		}
	]
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
		description : 'Fill out previous experience',
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

window.APTests = [
	{
		name: 'AP Calculus AB',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	},
	{
		name: 'AP Calculus BC',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	},
	{
		name: 'AP Biology',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	},
	{
		name: 'AP Chemistry',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	},
	{
		name: 'AP Computer Science',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	}
]

