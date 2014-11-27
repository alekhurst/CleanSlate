window.IBTests = [
    {
        id: 0,
        name: "Chemistry",
        description: "IB Chemistry.",
        multiple_fulfillments: [
            {
                min_score: "6",
                max_score: "7",
                fulfillment: [["science_courses", "CHEM", "11"]]
            },
        ],
    },
    {
        id: 1,
        name: "Computer Science",
        description: "Introduction to computer science in Java or C++.",
        multiple_fulfillments: [
            {
                min_score: "6",
                max_score: "7",
                fulfillment: [["coen_courses", "COEN", "10"], ["coen_courses", "COEN", "11"]]
            }
        ]
    }
];
