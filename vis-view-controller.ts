/// <reference path="typings/tsd.d.ts" />
/// <reference path="entry.ts" />

class VisViewController {

    private templates = $('#templates');

    constructor(entryCollection: EntryCollection) {
        entryCollection.subscribe(evt => {
            // TODO would be better OO to split into Chart and Table classes
            this.updateTable(evt.entries);
            this.updateChart(evt.entries);
        });
    }

    private updateTable(entries: Entry[]) {
        var container   = $('#sum-container'),
            templ       = this.templates.find('#sum');

        container.empty();

        _.chain(entries)
            .sortBy(e => e.task)
            .sortBy(e => e.project)
            .sortBy(e => e.date.toMillis())
            .each((e, i) => {
                var newRow = templ.clone();

                newRow.attr('id', 'sum-' + i);
                newRow.find('.date').html(e.date.toISOString());
                newRow.find('.project').html(e.project);
                newRow.find('.task').html(e.task);
                newRow.find('.minutes').html(e.minutes.toString());

                container.append(newRow);
            });
    }

    private updateChart(entries: Entry[]) {
        var rad = 100,
            len = 300,
            vis: D3.Selection,
            arc: D3.Svg.Arc,
            pie: D3.Layout.PieLayout,
            color: D3.Scale.OrdinalScale,
            arcs: D3.Selection;

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
