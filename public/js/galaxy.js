class Galaxy {

    constructor (elements)
    {

        //Creating elements data instance
        this.elements = elements;

        //Selects the tiles
        let divTiles = d3.select("#GPlot").classed("content", true);

        //Initializes the svg elements required for pTable chart
        this.margin = {top: 30, right: 20, bottom: 30, left: 50};
        let svgBounds = divTiles.node().getBoundingClientRect();
        this.svgWidth = svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = this.svgWidth*0.7;

        //Adds svg to the div
        this.svg = divTiles.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .attr("transform", "translate(0, 0)");

        ///////// Background: Start //////////////
        //Appeds bacground to svg future
        this.svg.append("defs")
            .append("pattern")
            .attr("id", "background")
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .append("image")
            .attr("xlink:href", "./data/milky_way_anota_2000.jpg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight);

        this.svg.append("rect")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .attr("fill", "url(#background)");
        ///////// Background: End ////////////////

    };

    update()
    {
        console.log("here")
    };

}
