    //let pChart = new PTable();


    // loads clustered data from ./data/ClusterData.csv
    d3.csv("data/ClusterData.csv", function(error, starData)
    {
        let GPlot = new Galaxy(starData);
        GPlot.create();

        // loads ptable data from ./data/ptable.csv
        d3.csv("data/ptable.csv", function (error, elements)
        {
            let pTable = new PTable(elements, GPlot, starData);
            pTable.create();
        });
    });
