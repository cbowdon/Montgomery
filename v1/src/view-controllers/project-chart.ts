/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../entry.ts" />

module ViewController {

    export class ProjectChart {

        private canvas: HTMLCanvasElement;

        private ctx: CanvasRenderingContext2D;

        private chart: CircularInstance;

        constructor(ec: EntryCollection) {
            this.canvas = <HTMLCanvasElement >document.getElementById('chart-container');
            this.ctx = this.canvas.getContext('2d');

            ec.subscribe(e => this.update(e.entries));
        }

        private sumByProject(entries: Entry[]) {
            return _.chain(entries)
                .reduce((acc, e) => {
                    var existing = _.find(acc, a => a.project === e.project);

                    if (!existing) {
                        acc.push({ project: e.project, minutes: e.minutes });
                        return acc;
                    }

                    existing.minutes += e.minutes;
                    return acc;
                }, []);
        }

        private update(entries: Entry[]) {
            var data: CircularChartData[],
                options: PieChartOptions,
                colGen: ColorGenerator;

            colGen = new ColorGenerator();

            data = this.sumByProject(entries)
                .map(s => {
                    var col = colGen.next();
                    return {
                        color: col.toString(),
                        highlight: col.highlight().toString(),
                        label: s.project,
                        value: s.minutes
                    };
                }).value();

            options = {
                showToolTips: true,
                animateRotate: true,
                animateScale: true
            };

            if (this.chart) {
                this.chart.destroy();
            }
            this.chart = new Chart(this.ctx).Pie(data, options);
        }
    }

    class Color {
        constructor(private red: number,
                    private green: number,
                    private blue: number) {}

        public highlight() {
            return new Color(
                this.red + 50,
                this.green + 50,
                this.blue + 50);
        }
        public toString() {
            return 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
        }
    }

    class ColorGenerator {

        private colors = [
            new Color(0x66, 0, 0),
            new Color(0x44, 0x44, 0),
            new Color(0, 0x66, 0),
            new Color(0, 0x44, 0x44),
            new Color(0, 0, 0x66)
        ];

        private idx = 0;

        public next() {
            this.idx += 1;

            if (this.idx >= this.colors.length) {
                this.idx = 0;
            }

            return this.colors[this.idx];
        }
    }
}
