// import PolynomialRegression from "js-polynomial-regression";

var data = [{
                x: new Date(2018, 3, 1),
                y: 150
            }, {
                x: new Date(2018, 3, 2),
                y: 150
            }, {
                x: new Date(2018, 3, 3),
                y: 150
            }, {
                x: new Date(2018, 3, 4),
                y: 140
            }, {
                x: new Date(2018, 3, 3),
                y: 130
            }, {
                x: new Date(2018, 3, 4),
                y: 115
            }, {
                x: new Date(2018, 3, 5),
                y: 100
            }, {
                x: new Date(2018, 3, 6),
                y: 90
            }, {
                x: new Date(2018, 3, 7),
                y: 85
            }, {
                x: new Date(2018, 3, 8),
                y: 70
            }, {
                x: new Date(2018, 3, 9),
                y: 60
            }, {
                x: new Date(2018, 3, 10),
                y: 50
            }, {
                x: new Date(2018, 3, 11),
                y: 40
            }, {
                x: new Date(2018, 3, 12),
                y: 30
            }, {
                x: new Date(2018, 3, 13),
                y: 20
            }];

// const model = PolynomialRegression.read(data, 3);

// const terms = model.getTerms();

// const prediction = model.predictY(terms, 10);

// console.log(prediction);
const x=[]
const y=[]
var i;
for(i=0;i<data.length;i++)
{
	x.push(i);
	y.push(data[i].y);
}

// console.log(x);

// console.log(y);

const PolynomialRegression = require('ml-regression').PolynomialRegression;

// const x = [50, 50, 50, 70, 70, 70, 80, 80, 80, 90, 90, 90, 100, 100, 100];
// const y = [3.3, 2.8, 2.9, 2.3, 2.6, 2.1, 2.5, 2.9, 2.4, 3.0, 3.1, 2.8, 3.3, 3.5, 3.0];
const degree = 2;

const regression = new PolynomialRegression(x, y, degree);

predictions=[];
for(i=0;i<5;i++)
{
	predictions.push(regression.predict(14+i+1));
}
console.log(predictions);
// console.log(regression.predict(17));
console.log(regression.coefficients);
console.log(regression.toString(3));
console.log(regression.toLaTeX());