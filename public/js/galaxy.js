class Galaxy {

    constructor (starData)
    {

        //Creating star data instance
        this.starData = starData;

        //Selects the div
        let div = d3.select("#GPlot").classed("galaxy", true);

        //Initializes the svg elements required for pTable chart
        this.margin = {top: 15, right: 20, bottom: 25, left: 20};
        let svgBounds = div.node().getBoundingClientRect();
        this.svgWidth = svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = this.svgWidth;

        //Adds svg to the div
        this.svg = div.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight+this.margin.bottom)
            .attr("transform", "translate(0, "+this.margin.top+")");

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

///////////////////// Tool Tip Function
    /**
     * Renders the HTML content for tool tip.
     *
     * @param tooltip_data information that needs to be populated in the tool tip
     * @return text HTML content for tool tip
     */
    tooltip_render(tooltip_data)
    {
        let text = "<h2 class = atomicName> Number of Star in Bin:  " + tooltip_data.Nstars + "</h2>";
        text += "<h2 class = atomicName> Average Temperature:  " + tooltip_data.AverageT + "(K) </h2>";
        text += "<h2 class = atomicName> Radius from the Sun:  " + tooltip_data.rS + "(ly) </h2>";
        text += "<h2 class = atomicName> Avg. Chemical Enrichment:  " + tooltip_data.AverageCE + "(dexs) </h2>";

        return text;
    };
//////////////////////

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
            .domain([d3.min(this.starData, d => +d.C), d3.max(this.starData, d => +d.C)])
            .range(["yellow", "red"]);

        //Creates circles for cluster data
        let circ = this.svg.selectAll("circle")
            .data(this.starData);
        let circNew = circ.enter().append("circle");
        circ.exit().remove();
        circ = circNew.merge(circ);

        circ.attr("cx", d =>
            {
                return galaxyScale(+d.xLocation)+shiftX;
            })
            .attr("cy", d =>
            {
                return galaxyScale(+d.yLocation*(-1))+shiftY;
            })
            .attr("r", d => {
                let maxRadius = galaxyScale(scale);
                let Radius = galaxyScale(scale*d.NumberOfStars/maxN);
                let ratio = 0.75;
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
                return ColorScale(+d.C);
            });

        //////////

        ///////////////////////////////
//// PTable ToolTip :Start ////
///////////////////////////////
        //for reference:https://github.com/Caged/d3-tip
        //Use this tool tip element to handle any hover over the chart
            let tip = d3.tip().attr('class', 'd3-tip')
                .direction('nw')
                .offset(function() {
                    return [0,0];
                })
                .html((d)=>{
                    // populate data in the following format
                    let tooltip_data =
                    {
                        "rS": Math.sqrt(parseFloat(d.xLocation)*3261.56*parseFloat(d.xLocation)*3261.56+parseFloat(d.yLocation)*3261.56*parseFloat(d.yLocation)*3261.56).toFixed(0),
                        "Nstars": parseFloat(d.NumberOfStars).toFixed(0),
                        "AverageT": parseFloat(d.TEFF).toFixed(0),
                        "AverageCE": parseFloat(d.M_H).toFixed(3)
                    }
                    //pass this as an argument to the tooltip_render function then,
                    //return the HTML content returned from that method.

                    return this.tooltip_render(tooltip_data);
                });

        //tip for element rectangels
        circ.call(tip);
        let self = this;
        circ.on("mouseover", function(d)
            {
                d3.select(this).classed("selected", true);
                tip.show(d);
            })
            .on("mouseout", function(d)
            {
                d3.select(this).classed("selected", false);
                tip.hide(d);
            });
//         circ.on("mouseover", function(d)
//             {
//                 tip.show;
//                 d3.select(this).classed("selected", true);
//
//             })
//             .on("mouseout", function(d)
//             {
//                 d3.select(this).classed("selected", false)
//                 tip.hide;
//             });

        /////// Text for selected element
        let fontSize = this.svgWidth*0.05
        this.svg.append("text")
            .attr("id", "Chemical")
            .attr("font-size", fontSize)
            .attr("x", 0)
            .attr("y", this.svgHeight+fontSize/2)
            .attr("fill", "white")
            .text("Chemical Distribution for: Carbon")
    };

    update(selection)
    {
        // Creates an array for possible selection of elements
        d3.select("#Chemical").text("Chemical Distribution for: "+selection.Name)
        let Columns = this.starData.columns
        if (Columns.indexOf(selection.symbol) > -1)
        {
            // Color scale
        let ColorScale = d3.scaleLinear()
            .domain([d3.min(this.starData, d => +d[selection.symbol]), d3.max(this.starData, d => +d[selection.symbol])])
            .range(["yellow", "red"]);

            this.svg.selectAll("circle")
                .transition().duration(1000)
                .style("fill", d => {
                    return ColorScale(+d[selection.symbol]);
                });
        }
    };

}
