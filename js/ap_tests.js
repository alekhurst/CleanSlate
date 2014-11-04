window.APTests = [
    {
        id : 0,
        name : "Calculus AB" ,
        description : 'Single variable calculus differentiation. Intro to integration.',
        min_score : "3",
        max_score : "5",
        fulfillment : [["math-courses", "MATH", "11"], ["math-courses", "MATH", "12"]]
    },
    {
        id : 1,
        name : "Calculus BC",
        description : 'Single variable calculus integration. Multi-variable calculus',
        // [
        //     // {
        //     //     min_score : "3",
        //     //     max_score : "4",
        //     //     fulfillment : [["math-courses", "MATH", "11"]],
        //     // },          
        // ],
        min_score : "4",
        max_score : "5",
        fulfillment : [["math-courses", "MATH", "11"], ["math-courses", "MATH", "12"], ["math-courses", "MATH", "13"]]
    },
    {
        id : 2,
        name : "Chemistry",
        description : 'AP Chemistry',
        min_score : "3",
        max_score : "5",
        fulfillment : [["science-courses", "CHEM", "11"]]
    },
    {
        id : 3,
        name : "Computer Science A",
        description : 'Introduction to computer science in Java or C++',
        min_score : "4",
        max_score : "5",
        fulfillment : [["coen-courses", "COEN", "11"]]
    },
    {   
        id : 4,
        name : "Physics C: Mechanics",
        description : 'AP physics with an emphasis on mechanics',
        min_score : "4",
        max_score : "5",
        fulfillment : [["science-courses", "PHYS", "31"]]
    },
    {
        id : 5,
        name : "Physics C: Electricity & Magnetism",
        description : 'AP physics with an emphasis on electricity and magnetism',
        min_score : "4",
        max_score : "5",
        fulfillment : [["science-courses", "PHYS", "33"]]
    }
];
