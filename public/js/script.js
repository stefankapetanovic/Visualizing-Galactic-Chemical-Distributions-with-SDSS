    //loads clustered data from ./data/ClusterData.csv
    d3.csv("data/ClusterData.csv", function(error, starData)
    {
        let GPlot = new Galaxy(starData);
        GPlot.create();

        //loads ptable data from ./data/ptable.csv
        d3.csv("data/ptable.csv", function (error, elements)
        {
            let pTable = new PTable(elements, GPlot, starData);
            pTable.create();
        });

        //scatter plot
        let xActive = document.getElementById("xselect").value;
        let yActive = document.getElementById("yselect").value;
        let cActive = document.getElementById("cselect").value;
        this.SPlot = new ScatterPlot(starData);
        SPlot.update(xActive, yActive, cActive);
    });

function chooseSelection()
{
    let xActive = document.getElementById("xselect").value;
    let yActive = document.getElementById("yselect").value;
    let cActive = document.getElementById("cselect").value;
    this.SPlot.update(xActive, yActive, cActive)
}