    //let pChart = new PTable();

    // loads ptable data from ./data/ptable.csv
    d3.csv("data/ptable.csv", function (error, elements) {
        let pTable = new PTable(elements);
        let GPlot = new Galaxy(elements);
        GPlot.update();
        pTable.create();
    });
