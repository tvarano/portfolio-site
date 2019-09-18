const current_year = new Date().getFullYear();

// languages in order of appearance in parallel with dates
var langs = ['java', 'python', 'javascript', 'swift', 'html', 'c', 'git', 'oauth', 'flask', 'jquery', 'bash'];
var years = [2016, 2018, 2019, 2018, 2018, 2019, 2016, 2018, 2018, 2019, 2017];

for (var i = 0; i < langs.length; i++) {
    const yearWord = (current_year - years[i] <= 1) ? "year" : "years";
    const num = (current_year - years[i] == 0) ? "< 1" : (current_year - years[i]) + ""
    console.log(langs[i] + ": " + years[i] + " = " + num)
    document.getElementById(langs[i] + "-exp").innerHTML = num + " " + yearWord + " experience";
}