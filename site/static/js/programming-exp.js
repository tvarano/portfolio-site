const current_year = new Date().getFullYear();

// languages in order of appearance in parallel with dates
var langs = ['java', 'python', 'javascript', 'swift', 'html', 'c', 'git', 'oauth', 'flask', 'jquery', 'bash'];
var years = [2015, 2019, 2019, 2019, 2018, 2020, 2016, 2019, 2019, 2019, 2016];

for (var i = 0; i < langs.length; i++) {
    const yearWord = (current_year - years[i] <= 1) ? "year" : "years";
    const num = (current_year - years[i] == 0) ? "< 1" : (current_year - years[i]) + ""
    console.log(langs[i] + ": " + years[i] + " = " + num)
    document.getElementById(langs[i] + "-exp").innerHTML = num + " " + yearWord + " experience";
}