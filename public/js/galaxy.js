class Galaxy {

    constructor (starData)
    {

        //Creating star data instance
        this.starData = starData;

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

    create ()
    {
        //////////
        // Plotting clustered data
        //Used to shift position of stars
        let shiftX = this.svgWidth/2.0;
        let shiftY = this.svgHeight/1.445;
        let dl = 0.49694 // defined in "ApogeeToCsv.py" and must be changed here
        let maxN = d3.max(this.starData, function(d)
            {
                return parseInt(d.NumberOfStars);
            });
        let scale = dl/(2.0);
        // galaxy scale
        let galaxyScale = d3.scaleLinear()
            .domain([-7.5, 7.5])
            .range([-this.svgHeight/5.2, this.svgHeight/5.2]);
        // Color scale
        let ColorScale = d3.scaleLinear()
            .domain([d3.min( this.starData.map(d => d.C) ), d3.max( this.starData.map(d => d.C) )])
            .range(["yellow", "red"]);
        //let RgalaxyScale = d3.scale.log()
        //    .domain([-7.5, 7.5])
        //    .range([-this.svgHeight/4.6, this.svgHeight/4.6]);
            
        //Creates circles for cluster data
        let circ = this.svg.selectAll("circle")
            .data(this.starData);
        let circNew = circ.enter().append("circle");
        circ.exit().remove();
        circ = circNew.merge(circ);

        circ.attr("cx", d => 
            {
                return galaxyScale(d.xLocation)+shiftX;
            })
            .attr("cy", d => 
            {
                return galaxyScale(d.yLocation)+shiftY;
            })
            .attr("r", d => {
                let maxRadius = galaxyScale(scale);
                let Radius = galaxyScale(scale*d.NumberOfStars/maxN);
                let ratio = 1/2.5;
                if (Radius >= maxRadius*ratio)
                {
                    return galaxyScale(scale*d.NumberOfStars/maxN);
                }
                else
                {
                    return maxRadius*ratio;
                }
            })
            .style("fill", d => 
            {
                return ColorScale(d.C);
            });
            
        //////////
    };

    update(selection)
    {
        // Creates an array for possible selection of elements
        let Columns = this.starData.columns
        if (Columns.indexOf(selection.symbol) > -1)
        {
            // Color scale
            let ColorScale = d3.scaleLinear()
                .domain([d3.min( this.starData.map(d => d[selection.symbol]) ), d3.max( this.starData.map(d => d[selection.symbol]) )])
                .range(["yellow", "red"]);
            
            this.svg.selectAll("circle")
                .style("fill", d => { 
                    return ColorScale(d[selection.symbol]);
                });
        }
    };

}
