/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../entry.ts" />

module ViewController {

    export class ProjectChart {

        constructor(ec: EntryCollection) {
            ec.subscribe(e => this.update(e.entries));
        }

        private update(entries: Entry[]) {
            var rad = 100,
                len = 300,
                vis: D3.Selection,
                arc: D3.Svg.Arc,
                pie: D3.Layout.PieLayout,
                color: D3.Scale.OrdinalScale,
                arcs: D3.Selection;

            // TODO use d3's enter/exit/update functionality rather than redrawing
            $('#chart-container').empty();

            // TODO group by projects

            vis = d3.select('#chart-container')
                .append('svg:svg')
                .data([entries])
                .attr('width', len)
                .attr('height', len)
                .append('svg:g')
                .attr('transform', 'translate(' + rad + ', ' + rad + ')');

            arc = d3.svg.arc().outerRadius(rad);

            pie = d3.layout.pie().value(e => e.minutes);

            color = d3.scale.category20();

            arcs = vis.selectAll('g.slice')
                .data(pie)
                .enter()
                .append('svg:g')
                .attr('class', 'slice');

            arcs.append('svg:path')
                .attr('fill', (d: any, i: number) => color(i))
                .attr('d', arc);

            arcs.append('svg:text')
                .attr('transform', (d: any) => {
                    d.innerRadius = 0;
                    d.outerRadius = rad;
                    return 'translate(' + arc.centroid(d) + ')';
                })
                .attr('text-anchor', 'middle')
                .text((d: any, i: number)  => entries[i].project + ': ' + entries[i].minutes);
        }
    }
}