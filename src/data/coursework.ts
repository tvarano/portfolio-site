export interface Course {
  code: string;
  name: string;
  highlight?: boolean;
  href?: string;
}

export interface Semester {
  label: string;
  courses: Course[];
}

export const semesters: Semester[] = [
  {
    label: "Fall 2019",
    courses: [
      {
        code: "CMSC132",
        name: "Object-Oriented Programming II",
        href: "https://www.cs.umd.edu/class/fall2019/cmsc132/",
      },
      {
        code: "MATH240",
        name: "Introduction to Linear Algebra",
        href: "https://www-math.umd.edu/offered-courses/372-math-240-introduction-to-linear-algebra.html",
      },
    ],
  },
  {
    label: "Spring 2020",
    courses: [
      {
        code: "CMSC250",
        name: "Discrete Structures",
        href: "http://www.cs.umd.edu/class/spring2019/cmsc250-020X/",
      },
      {
        code: "CMSC216",
        name: "Intro to Computer Systems",
        href: "https://www.cs.umd.edu/class/spring2020/cmsc216/",
      },
      {
        code: "MATH241",
        name: "Calculus III",
        href: "https://www-math.umd.edu/offered-courses/373-math-241-calculus-iii.html",
      },
      {
        code: "ENES210",
        name: "Entrepreneurial Opportunity Analysis",
      },
    ],
  },
  {
    label: "Fall 2020",
    courses: [
      {
        code: "CMSC330",
        name: "Organization of Programming Languages",
        href: "http://www.cs.umd.edu/class/fall2020/cmsc330/",
      },
      {
        code: "CMSC351",
        name: "Algorithms",
        href: "https://www.cs.umd.edu/class/spring2020/cmsc351/",
      },
      {
        code: "MATH401",
        name: "Applications of Linear Algebra",
        href: "https://www-math.umd.edu/undergraduate/departmental-course-pages/offered-courses/381-math-401-applications-of-linear-algebra.html",
      },
    ],
  },
  {
    label: "Spring 2021",
    courses: [
      {
        code: "CMSC320",
        name: "Introduction to Data Science",
        href: "https://cmsc320.github.io/",
      },
      {
        code: "CMSC451",
        name: "Design and Analysis of Algorithms",
        href: "https://www.cs.umd.edu/class/spring2020/cmsc451/",
      },
      {
        code: "CMSC420",
        name: "Advanced Data Structures",
        href: "http://www.cs.umd.edu/class/fall2020/cmsc420-0201/",
      },
      {
        code: "STAT400",
        name: "Applied Probability and Statistics I",
      },
    ],
  },
  {
    label: "Fall 2021",
    courses: [
      {
        code: "CMSC417",
        name: "Computer Networks",
        highlight: true,
        href: "https://www.cs.umd.edu/class/fall2021/cmsc417/",
      },
      {
        code: "CMSC422",
        name: "Intro to Machine Learning",
        highlight: true,
        href: "https://www.cs.umd.edu/class/spring2021/cmsc422/",
      },
      {
        code: "MATH402",
        name: "Algebraic Structures",
      },
      {
        code: "MATH410",
        name: "Advanced Calculus I",
      },
    ],
  },
  {
    label: "Spring 2022",
    courses: [
      {
        code: "CMSC426",
        name: "Computer Vision",
        highlight: true,
      },
      {
        code: "CMSC433",
        name: "Programming Languages and Paradigms",
      },
      {
        code: "MATH406",
        name: "Number Theory",
      },
    ],
  },
];
