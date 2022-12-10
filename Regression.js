var data = [{
                "date": new Date(2018, 3, 1),
                "value": 150
            }, {
                "date": new Date(2018, 3, 2),
                "value": 150
            }, {
                "date": new Date(2018, 3, 3),
                "value": 150
            }, {
                "date": new Date(2018, 3, 4),
                "value": 140
            }, {
                "date": new Date(2018, 3, 3),
                "value": 130
            }, {
                "date": new Date(2018, 3, 4),
                "value": 115
            }, {
                "date": new Date(2018, 3, 5),
                "value": 100
            }, {
                "date": new Date(2018, 3, 6),
                "value": 90
            }, {
                "date": new Date(2018, 3, 7),
                "value": 85
            }, {
                "date": new Date(2018, 3, 8),
                "value": 70
            }, {
                "date": new Date(2018, 3, 9),
                "value": 60
            }, {
                "date": new Date(2018, 3, 10),
                "value": 50
            }, {
                "date": new Date(2018, 3, 11),
                "value": 40
            }, {
                "date": new Date(2018, 3, 12),
                "value": 30
            }, {
                "date": new Date(2018, 3, 13),
                "value": 20
            }];

var i,j;
var win=3;
let datavals=[];
let trainingData=[];
for(i=0;i<data.length;i++)
{
    datavals.push(data[i]["value"]);
}

var ma=Math.max.apply(Math,datavals);
var mi=Math.min.apply(Math,datavals);

for(i=0;i<datavals.length;i++)
{
    datavals[i]=(datavals[i]-mi)/(ma-mi);
}


for(i=0;i<datavals.length-win;i++)
{
    trainingData.push({});
    trainingData[i]["input"]=datavals.slice(i,i+win);
    trainingData[i]["output"]=[datavals[i+win]];
}

console.log(trainingData);


var predict_count = 30;
    const net = new brain.recurrent.LSTMTimeStep({
        inputSize: 1,
        hiddenLayers: [10],
        activation: 'sigmoid',
        outputSize: 1,
    });

    //Same test as previous, but combined on a single set
    // trainingData = [
    //         [0.9,0.8,0.6],
    //         [0.7,0.8,0.6],
    //         [0.8,0.8,0.6],
    //         [0.6,0.8,0.6],
    //         [0.7,0.8,0.6],
    //         [0.5,0.8,0.6],
    //         [0.6,0.8,0.6],
    //         [0.4,0.8,0.6],
    //         [0.5,0.8,0.6],
    //         [0.3,0.8,0.6],
    // ];

    net.train(trainingData, { log: true, errorThresh: 0.05, iterations: 2000 });

    //var nextpredict = 0;
    //var trainingDatas = trainingData;
    //while (nextpredict < 3) {
    //    nextpredict = net.run(trainingDatas);
    //    trainingDatas = trainingDatas.push([nextpredict]);
    //    console.log(nextpredict);
    //};
    
    // now we're cookin' with gas!
    var new_train;
    var prev_train=trainingData[9].input;
    for(i=0;i<predict_count;i++)
    {
        pred=net.run(prev_train);
        new_train=prev_train.slice(1);
        new_train.push(pred);
        console.log(new_train);
        prev_train=new_train;
    }


    const forecast = net.forecast(
        trainingData[9].input,
        30
    );

    // ma=Math.max.apply(Math,forecast);
    // mi=Math.min.apply(Math,forecast);

    for(i=0;i<forecast.length;i++)
    {
        forecast[i]=forecast[i]*(ma-mi)+mi;
    }

    console.log('next ' + predict_count + ' predictions', forecast);
