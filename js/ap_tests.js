window.APTests = [
    {
        id: 0,
        name: "Calculus AB" ,
        description: "Single variable calculus differentiation. Intro to integration.",
        min_score: "4",
        max_score: "5",
        fulfillment: [["math_courses", "MATH", "9"], ["math_courses", "MATH", "11"]]
    },
    {
        id: 1,
        name: "Calculus BC",
        description: "Single variable calculus integration. Multi_variable calculus",
        multiple_fulfillments: [
            {
                min_score: "3",
                max_score: "3",
                fulfillment: [["math_courses", "MATH", "9"], ["math_courses", "MATH", "11"]],
            },          
            {
                min_score: "4",
                max_score: "5",
                fulfillment: [["math_courses", "MATH", "9"], ["math_courses", "MATH", "11"], ["math_courses", "MATH", "12"]]
            },
        ],
    },
    {
        id: 2,
        name: "Chemistry",
        description: "AP Chemistry",
        multiple_fulfillments: [
            {
                min_score: "3",
                max_score: "3",
                fulfillment: [["science_courses", "CHEM", "11"]]
            },
            {
                min_score: "4",
                max_score: "5",
                fulfillment: [["science_courses", "CHEM", "11"], ["math_courses", "AMTH", "106"]]
            },
        ],
    },
    {
        id: 3,
        name: "Computer Science A",
        description: "Introduction to computer science in Java or C++",
        multiple_fulfillments: [
            {
                min_score: "3",
                max_score: "3",
                fulfillment: [["coen_courses", "COEN", "10"]]
            },
            {
                min_score: "4",
                max_score: "5",
                fulfillment: [["coen_courses", "COEN", "10"], ["coen_courses", "COEN", "11"]]
            }
        ]
    },
    {   
        id: 4,
        name: "Physics C: Mechanics",
        description: "AP physics with an emphasis on mechanics",
        min_score: "4",
        max_score: "5",
        fulfillment: [["science_courses", "PHYS", "31"]]
    },
    {
        id: 5,
        name: "Physics C: Electricity & Magnetism",
        description: "AP physics with an emphasis on electricity and magnetism",
        min_score: "4",
        max_score: "5",
        fulfillment: [["science_courses", "PHYS", "33"]]
    },
    {
        id: 6,
        name: "Environmental Science",
        description: "Dat enviromental class, yo",
        min_score: "4",
        max_score: "5",
        fulfillment: [["science_courses", "CHEM", "11"]]
    },
];
