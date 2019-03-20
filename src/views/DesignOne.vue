<template>
  <div class="design-one container mt-4">

    <div class="row">

      <svg class="col-md-6">
      </svg>

      <div class="data-control col-md-6">
        <div class="community-picker input-group">
          <input type="text" class="form-control"
                  placeholder="Community Name ..."
                  :value="communityChosen">
          <div class="input-group-append">
            <button type="button" class="btn btn-success" v-on:click="loadData()">Submit</button>
          </div>
        </div>

        <div class="month-slider mt-4">
          <b-form-input type="range" @change="monthSliderChange" v-model="chosenMonthNum" min="0" max="11"/>
          <div class="mt-2">{{ chosenMonth }}</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'DesignOne',
    data() {
      return {
        dataFile: '/downtown_calgary_crime_stats.csv',
        crimeData: undefined,
        communityData: [],
        communityJSON: {
          'City': 'Calgary',
          'children': []
        },
        months: ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'],
        communityChosen: 'EAU CLAIRE',
        chosenMonth: 'January',
        chosenMonthNum: 0
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        //let communityChosen = document.getElementById('communityInput').value
        if (this.crimeData === undefined) {
          this.crimeData = await d3.csv(this.dataFile)
        }
        this.crimeData.forEach(row => {
          if (row.CommunityName === this.communityChosen) {
            this.communityData.push(row)
          }
        })
        this.communityJSON = {
          'City': 'Calgary',
          'children': []
        }
        this.communityData.forEach((row) => {
          let January = row.January === undefined ? 0 : row.January
          let February = row.February === undefined ? 0 : row.February
          let March = row.March === undefined ? 0 : row.March
          let April = row.April === undefined ? 0 : row.April
          let May = row.May === undefined ? 0 : row.May
          let June = row.June === undefined ? 0 : row.June
          let July = row.July === undefined ? 0 : row.July
          let August = row.August === undefined ? 0 : row.August
          let September = row.September === undefined ? 0 : row.September
          let October = row.October === undefined ? 0 : row.October
          let November = row.November === undefined ? 0 : row.November
          let December = row.December === undefined ? 0 : row.December
          this.communityJSON.children.push({
            'CommunityName': row.CommunityName,
            'children': [
              {
                'Category': row.Category,
                'children': [
                  {'January': January},
                  {'February': February},
                  {'March': March},
                  {'April': April},
                  {'May': May},
                  {'June': June},
                  {'July': July},
                  {'August': August },
                  {'September': September},
                  {'October': October},
                  {'November': November},
                  {'December': December}
                ]
              }
            ]
          })
        })

        d3.selectAll("svg > *").remove()
        this.initCircles()
      },
      initCircles() {
        let packLayout =
          d3.pack()
            .size([500,500])
        let rootNode = d3.hierarchy(this.communityJSON)
        rootNode.sum((d) => {
          let value = d['January'] === undefined ? 0 : d['January']
          return value
        })
        packLayout(rootNode)
        let nodes = d3.select('svg')
          .selectAll('circle')
          .data(rootNode.descendants())
        let g =
          nodes.enter()
          .append('g')
        g.append('circle')
          .attr('cx', (d) => { return d.x })
          .attr('cy', (d) => { return d.y })
          .attr('r', (d) => { return d.r })
          .style('fill', 'red')
        g.append('text')
          .text((d) => {
            if (d['data']['January']) {
              return d['parent']['data']['Category']
            }
          })
          .style('font-size', function(d) {
            return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 12) + 'px'
          })
          .attr('x', (d) => { return d.x })
          .attr('y', (d) => { return d.y })
          .style('fill', 'white')
          .style('text-anchor', 'middle')
      },
      monthSliderChange() {
        this.chosenMonth = this.months[this.chosenMonthNum]
        this.changeMonth()
      },
      changeMonth() {
        let packLayout =
          d3.pack()
            .size([500,500]);
        let rootNode = d3.hierarchy(this.communityJSON);
        rootNode.sum((d) => {
          let value = d[this.chosenMonth] === undefined ? undefined : d[this.chosenMonth];
          return value;
        });
        packLayout(rootNode);
        // eslint-disable-next-line
        let node = d3.selectAll('g circle')
          .data(rootNode.descendants())
          .transition()
          .duration(500)
          .attr('cx', (d) => { return d.x; })
          .attr('cy', (d) => { return d.y; })
          .attr('r', (d) => { return d.r; });
        // eslint-disable-next-line
        let text = d3.selectAll('g text')
          .data(rootNode.descendants())
          .transition()
          .duration(500)
          .text((d) => {
            if (d['data'][this.chosenMonth]) {
              return d['parent']['data']['Category'];
            }
          })
          .style('font-size', function(d) {
            let len;
            if (this.getComputedTextLength()) {
              len = this.getComputedTextLength();
            } else {
              len = 30;
            }
            let size = d.r/3;
            size *= 10 / len;
            size += 1;
            return Math.round(size)+'px';
          })
          .attr('x', (d) => { return d.x; })
          .attr('y', (d) => { return d.y; })
          .style('fill', 'white')
          .style('text-anchor', 'middle');
      },
      extractCommunities(rawData) {
        let communities = []
        for (var i = 0; i < rawData.length; i+=10) {
          communities.push(rawData[i].CommunityName)
        }
        return communities
      }
    }
  }
</script>

<style>
  svg {
    width: 800px;
    height: 500px;
  }
  circle {
    fill: #333;
    opacity: 0.3;
  }
  @media (max-width: 557px) {
    svg {
      width: 100% !important;
      height: 100vw !important;
    }
  }
</style>
