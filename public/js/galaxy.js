class PTable {

    constructor (elements)
    {

        //Creating elements data instance
        this.elements = elements;

        //Selects the tiles
        let divTiles = d3.select("#tiles").classed("content", true);

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
    };

///////////////////// Tool Tip Function
    /**
     * Renders the HTML content for tool tip.
     *
     * @param tooltip_data information that needs to be populated in the tool tip
     * @return text HTML content for tool tip
     */
    tooltip_render(tooltip_data) {
        let text = "<h2 class = atomicName>" + tooltip_data.Name + "</h2>"; //Change class here future
        text +=  "Atomic Something: " + tooltip_data.Something; //future will probably be contribution from s or r process
        text += "<ul>"
        tooltip_data.info.forEach((row)=>{
            //if (row.votecount == "" || row.party == "" || row.nominee == "") {}
            text += "<li class = " + row.thing1 + ">" + row.thing2 + ":\t\t" + "</li>"
        });
        text += "</ul>";

        return text;
    }
//////////////////////

    create () 
    {
    ///////////////////
        //Calculates the maximum number of rows and columns to be laid out on the svg
        let maxColumns = d3.max(this.elements, function(d) {
                return parseInt(d.col);
            });

        let maxRows = d3.max(this.elements, function(d){
                return parseInt(d.row);
            });

/////////////////////////////
//// PTable Tiles :Start ////
/////////////////////////////
        //Rectangle sizes and position
        let CurrentPos = 0;
        let rectWidth = this.svgWidth/(maxColumns+1);
        let rectHeight = this.svgHeight/(maxRows+1);

    /////////////////// Source of the elements
        //Big Bang Fusion rectangles
        let bbF = this.svg.selectAll(".bbF")
            .data(this.elements)
            .enter()
            .append("rect")
            .attr("class", "bbf")
            .attr("fill", "blue") //future
            .attr("width", rectWidth)
            .attr("height", d => {
                return rectHeight*d.BigBangFusion;
            })
            .attr("x", d => {
                return d.col*rectWidth;
            })
            .attr("y", d => {
                CurrentPos = +d.CurrentPosition;
                d.CurrentPosition = CurrentPos + parseFloat(d.BigBangFusion);
                return d.row*rectHeight+CurrentPos*rectHeight;
            });

        //Cosmic Ray Fission rectangles
        let crF = this.svg.selectAll(".crF")
            .data(this.elements)
            .enter()
            .append("rect")
            .attr("class", "crf")
            .attr("fill", "pink") //future
            .attr("width", rectWidth)
            .attr("height", d => {
                return rectHeight*d.CosmicRayFission;
            })
            .attr("x", d => {
                return d.col*rectWidth;
            })
            .attr("y", d => {
                CurrentPos = +d.CurrentPosition;
                d.CurrentPosition = CurrentPos + parseFloat(d.CosmicRayFission);
                return d.row*rectHeight+CurrentPos*rectHeight;
            });

        //Merging Neutron Stars rectangles
        let mns = this.svg.selectAll(".mns")
            .data(this.elements)
            .enter()
            .append("rect")
            .attr("class", "mns")
            .attr("fill", "orange") //future
            .attr("width", rectWidth)
            .attr("height", d => {
                return rectHeight*d.MergingNeutronStars;
            })
            .attr("x", d => {
                return d.col*rectWidth;
            })
            .attr("y", d => {
                CurrentPos = +d.CurrentPosition;
                d.CurrentPosition = CurrentPos + parseFloat(d.MergingNeutronStars);
                return d.row*rectHeight+CurrentPos*rectHeight;
            });

        //Exploding Massive Stars rectangles
        let ems = this.svg.selectAll(".ems")
            .data(this.elements)
            .enter()
            .append("rect")
            .attr("class", "ems")
            .attr("fill", "green") //future
            .attr("width", rectWidth)
            .attr("height", d => {
                return rectHeight*d.ExplodingMassiveStars;
            })
            .attr("x", d => {
                return d.col*rectWidth;
            })
            .attr("y", d => {
                CurrentPos = +d.CurrentPosition;
                d.CurrentPosition = CurrentPos + parseFloat(d.ExplodingMassiveStars);
                return d.row*rectHeight+CurrentPos*rectHeight;
            });

        //Dying Low Mass Stars rectangles
        let dlms = this.svg.selectAll(".dlms")
            .data(this.elements)
            .enter()
            .append("rect")
            .attr("class", "dlms")
            .attr("fill", "yellow") //future
            .attr("width", rectWidth)
            .attr("height", d => {
                return rectHeight*d.DyingLowMassStars;
            })
            .attr("x", d => {
                return d.col*rectWidth;
            })
            .attr("y", d => {
                CurrentPos = +d.CurrentPosition;
                d.CurrentPosition = CurrentPos + parseFloat(d.DyingLowMassStars);
                return d.row*rectHeight+CurrentPos*rectHeight;
            });

        //Exploding White Dwarfs rectangles
        let ewd = this.svg.selectAll(".ewd")
            .data(this.elements)
            .enter()
            .append("rect")
            .attr("class", "ewd")
            .attr("fill", "steelblue") //future
            .attr("width", rectWidth)
            .attr("height", d => {
                return rectHeight*d.ExplodingWhiteDwarfs;
            })
            .attr("x", d => {
                return d.col*rectWidth;
            })
            .attr("y", d => {
                CurrentPos = +d.CurrentPosition;
                d.CurrentPosition = CurrentPos + parseFloat(d.ExplodingWhiteDwarfs);
                return d.row*rectHeight+CurrentPos*rectHeight;
            });
    ///////////////////

        //Creates rect for tiles of the pTable 
        let rect =  this.svg.selectAll(".rect")
            .data(this.elements);
        let rectNew = rect.enter().append("rect");
        rect.exit().remove();
        rect = rectNew.merge(rect);

        //Rectangle attributes
        rect.attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("x", d => {
                return d.col*rectWidth;
            })
            .attr("y", d => {
                return d.row*rectHeight;
            })
            //.attr("fill", "white")
            .classed("rect", true)
            .classed("tile", true)
            .attr("fill", d => {
                if (d.CurrentPosition == 0) {
                    return "grey";
                }
                else { return "transparent"}
            });

        // On click function
        rect.on("click", function(d) {
                // Run function to update plot in the future
                d3.selectAll("rect").classed("selected", false); //Un-selects previously selected tile
                d3.select(this).classed("selected", true);
            });
///////////////////////////
//// PTable Tiles :End ////
///////////////////////////

///////////////////////////////
//// PTable ToolTip :Start ////
///////////////////////////////
        //for reference:https://github.com/Caged/d3-tip
        //Use this tool tip element to handle any hover over the chart
            let tip = d3.tip().attr('class', 'd3-tip')
                .direction('se')
                .offset(function() {
                    return [0,0];
                })
                .html((d)=>{
                    // populate data in the following format
                    let tooltip_data = {
                        "Name": d.Name,
                        "Something": d.State_Winner, //future need to change something
                        "info":[
                        {"thing1": d.atomicMass,"thing2": d.electronicConfiguration},
                        {"thing1": d.atomicMass,"thing2": d.electronicConfiguration},
                        {"thing1": d.atomicMass,"thing2": d.electronicConfiguration}
                        ]
                    }
                    //pass this as an argument to the tooltip_render function then,
                    //return the HTML content returned from that method.

                    return this.tooltip_render(tooltip_data);
                });

        //tip for element rectangels
        rect.call(tip);
        rect.on("mouseover", tip.show)
            .on("mouseout", tip.hide);
/////////////////////////////
//// PTable ToolTip :End ////
/////////////////////////////

////////////////////////////
//// PTable Text :Start ////
////////////////////////////
        //Font size from .atomicNumber and .atomicSymbol in style.css
        let N_fontSize = rectWidth*0.25;
        let S_fontSize = rectWidth*0.30;
        //Element labels
        let Etext = this.svg.selectAll("text")
            .data(this.elements);
        let EtextNew = Etext.enter().append("text");
        Etext.exit().remove();
        Etext = EtextNew.merge(Etext);

        Etext.text(d => {return d.atomicNumber})
            .attr("class", "atomicNumber")
            .attr("font-size", N_fontSize)
            .attr("x", d => {
                return d.col*rectWidth+5.0;
            })
            .attr("y", d => {
                return d.row*rectHeight+N_fontSize+2.5;
            })
            .attr("pointer-events", "none")
            .append("tspan")
            .attr("class", "atomicSymbol")
            .attr("font-size", S_fontSize)
            .attr("y", d => {
                return d.row*rectHeight+rectHeight/2+S_fontSize/2;
            })
            .attr("x", d => {
                return d.col*rectWidth+rectWidth/2;
            })
            .text(d => {return d.symbol});
//////////////////////////
//// PTable Text :End ////
//////////////////////////

    ///////////////////
    };

}
