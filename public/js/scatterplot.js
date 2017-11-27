class ScatterPlot
{

    constructor (starData)
    {
    
        //Creating star data instance
        this.starData = starData;

        //Selects the div
        let div = d3.select("#SPlot").classed("content", true);

        //Initializes the svg elements required for pTable chart
        this.margin = {top: 30, right: 20, bottom: 30, left: 50};
        let svgBounds = div.node().getBoundingClientRect();
        this.svgWidth = svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = this.svgWidth*0.7;

        //Adds svg to the div
        this.svg = div.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .attr("transform", "translate(0, 0)");

        //Appends axis to svg
        this.svg.append("g").attr("id", "xAxis").attr("class", "axisWhite");
        this.svg.append("g").attr("id", "yAxis").attr("class", "axisWhite");
        this.svg.append("g").attr("id", "circs").attr("class", "axisWhite");

    };

    update(xSelected, ySelected, cSelected)
    {
        ///////
        // Plotting scatter plot
        
        //Axis
        let xbuffer = 50;
        let ybuffer = 16;
        let pad = 0.1;
        let r = 3.5

        let d_time = 1000;

        let xmax = d3.max(this.starData, d => +d[xSelected]);
        let xmin = d3.min(this.starData, d => +d[xSelected]);
        let ymax = d3.max(this.starData, d => +d[ySelected]);
        let ymin = d3.min(this.starData, d => +d[ySelected]);
        let cmax = d3.max(this.starData, d => +d[cSelected]);
        let cmin = d3.min(this.starData, d => +d[cSelected]);

        //X scale
        let xScale = d3.scaleLinear()
            .domain([xmin, xmax])
            .range([r+xbuffer, this.svgWidth - xbuffer - r]);
        //Y scale
        let yScale = d3.scaleLinear()
            .domain([ymax, ymin])
            .range([r, this.svgHeight - ybuffer - r]);
        let cScale = d3.scaleLinear()
            .domain([cmin, cmax])
            .range(["yellow", "red"])

        //x-axis setup
        let xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format(".2f"));
        d3.select("#xAxis")
            .attr("transform", "translate( 0, "+(this.svgHeight-ybuffer)+")")
            .transition()
            .duration(d_time)
            .call(xAxis);
        d3.select("#xAxis").selectAll("text");
        //y-axis setup
        let yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.format(".2f"));
        d3.select("#yAxis")
            .attr("transform", "translate("+xbuffer+", 0)")
            .transition()
            .duration(d_time)
            .call(yAxis);

        //Plots data
        let circs = d3.select("#circs")
            .selectAll("circle")
            .data(this.starData);

        let circsNew = circs.enter()
            .append("circle");
        circs.exit().remove;
        circs = circsNew.merge(circs);

        circs.transition()
            .duration(d_time)
            .attr("cx", d =>
            {
                return xScale(parseFloat(d[xSelected]));
            })
            .attr("cy", d =>
            {
                return yScale(parseFloat(d[ySelected]));
            })
            .attr("r", r)
            .style("fill", d =>
            {
                return cScale(+d[cSelected]);
            });

        //////
        // Brush selection
        this.svg.select("#brush").remove()
        this.svg.append("g")
            .attr("id", "brush")
            .call(d3.brush().extent([[xbuffer, 0], [this.svgWidth - xbuffer, this.svgHeight - ybuffer]]).on("brush", brushed).on("end", brushended));

        let self = this;
        function brushed() 
        {
            let s = d3.event.selection,
                x0 = s[0][0],
                y0 = s[0][1],
                dx = s[1][0] - x0,
                dy = s[1][1] - y0;

            self.svg.selectAll('circle')
                .classed("unselected", d => 
                {
                    if (xScale(d[xSelected]) >= x0 && xScale(d[xSelected]) <= x0 + dx && yScale(d[ySelected]) >= y0 && yScale(d[ySelected]) <= y0 + dy)
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                });
                
            d3.select("#GPlot").selectAll('circle')
                .classed("unselected", d => 
                {
                    if (xScale(d[xSelected]) >= x0 && xScale(d[xSelected]) <= x0 + dx && yScale(d[ySelected]) >= y0 && yScale(d[ySelected]) <= y0 + dy)
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                });
        };

        function brushended() 
        {
            if (!d3.event.selection)
            {
                self.svg.selectAll('circle')
                .classed("unselected", false);

                d3.select("#GPlot").selectAll('circle')
                .classed("unselected", false);
            }
        }

    }

}