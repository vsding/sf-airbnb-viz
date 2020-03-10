let render_q2_response_rate = () => {
  let margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  let x = d3.scale.linear().range([0, width]); //dif
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg
    .axis()
    .scale(x)
    .orient('bottom')
    .ticks(10);

  let yAxis = d3.svg
    .axis()
    .scale(y)
    .orient('left')
    .ticks(10);

  let valueline = d3.svg
    .line()
    .x(function(d) {
      return x(d.host_response_rate);
    })
    .y(function(d) {
      return y(d.review_scores_rating);
    });
  let svg = d3
    .select('#q2Container_1')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv('./data/q2_1.csv', function(error, data) {
    if (error) {
      console.log(error);
      return;
    }
    data.forEach(function(d) {
      d.host_response_rate = +d.host_response_rate.slice(0, -1);
      d.review_scores = +d.review_scores_rating;
      d.id = +d.id;
    });

    // Scale the range of the data
    x.domain(
      d3.extent(data, function(d) {
        return d.host_response_rate;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.review_scores_rating;
      })
    ]);

    // Add the valueline path.
    // svg
    //   .append('path')
    //   .attr('class', 'line')
    //   .attr('d', valueline(data));

    //Add the scatterplot
    let points = svg.selectAll('circle');
    let pointsData = points.data(data, d => d.id);
    let circles = pointsData
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {
        return x(d.host_response_rate);
      })
      .attr('cy', function(d) {
        return y(d.review_scores_rating);
      })
      .style('fill', function(d) {
        return 'orange';
      });

    circles.on('mouseover', function(d) {
      svg
        .append('text')
        .attr('x', x(d.host_response_rate) + 10)
        .attr('y', y(d.review_scores_rating) + 5)
        .text(d.host_response_rate);
    });
    //   .on('mouseout', function(d) {
    //     svg.selectAll('text').remove();
    //   }); //FIXXX

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('class', 'label')
      .attr('x', width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('Host Response Rate (%)');

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Airbnb Rating');
  });
};

let render_q2_2 = () => {
  let margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  let x = d3.scale.linear().range([0, width]); //dif
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg
    .axis()
    .scale(x)
    .orient('bottom')
    .ticks(10);

  let yAxis = d3.svg
    .axis()
    .scale(y)
    .orient('left')
    .ticks(10);

  let valueline = d3.svg
    .line()
    .x(function(d) {
      return x(d.host_response_rate);
    })
    .y(function(d) {
      return y(d.review_scores_rating);
    });
  let svg = d3
    .select('#q2Container_2')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv('./data/q2_2.csv', function(error, data) {
    if (error) {
      console.log(error);
      return;
    }
    data.forEach(function(d) {
      d.minimum_nights = +d.minimum_nights;
      d.review_scores_rating = +d.review_scores_rating;
      d.id = +d.id;
    });

    // Scale the range of the data
    x.domain(
      d3.extent(data, function(d) {
        return d.minimum_nights;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.review_scores_rating;
      })
    ]);

    //Add the scatterplot
    let points = svg.selectAll('circle');
    let pointsData = points.data(data, d => d.id);
    let circles = pointsData
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {
        return x(d.minimum_nights);
      })
      .attr('cy', function(d) {
        return y(d.review_scores_rating);
      })
      .style('fill', function(d) {
        return 'blue';
      });

    circles.on('mouseover', function(d) {
      svg
        .append('text')
        .attr('x', x(d.minimum_nights) + 10)
        .attr('y', y(d.review_scores_rating) + 5)
        .text(d.minimum_nights);
    });

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('class', 'label')
      .attr('x', width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('Minimum Nights');

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Airbnb Rating');
  });
};

let render_q2_3 = () => {
  let margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  let x = d3.scale.linear().range([0, width]); //dif
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg
    .axis()
    .scale(x)
    .orient('bottom')
    .ticks(10);

  let yAxis = d3.svg
    .axis()
    .scale(y)
    .orient('left')
    .ticks(10);

  let valueline = d3.svg
    .line()
    .x(function(d) {
      return x(d.reviews_per_month);
    })
    .y(function(d) {
      return y(d.review_scores_rating);
    });
  let svg = d3
    .select('#q2Container_3')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv('./data/q2_3.csv', function(error, data) {
    if (error) {
      console.log(error);
      return;
    }
    data.forEach(function(d) {
      d.reviews_per_month = +d.reviews_per_month;
      d.review_scores = +d.review_scores_rating;
      d.id = +d.id;
    });

    // Scale the range of the data
    x.domain(
      d3.extent(data, function(d) {
        return d.reviews_per_month;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.review_scores_rating;
      })
    ]);

    //Add the scatterplot
    let points = svg.selectAll('circle');
    let pointsData = points.data(data, d => d.id);
    let circles = pointsData
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {
        return x(d.reviews_per_month);
      })
      .attr('cy', function(d) {
        return y(d.review_scores_rating);
      })
      .style('fill', function(d) {
        return 'orange';
      });

    circles.on('mouseover', function(d) {
      svg
        .append('text')
        .attr('x', x(d.reviews_per_month) + 10)
        .attr('y', y(d.review_scores_rating) + 5)
        .text(d.reviews_per_month);
    });

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('class', 'label')
      .attr('x', width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('Reviews per Month');

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Airbnb Rating');
  });
};

let render_q2_4 = () => {
  let margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  let x = d3.scale.linear().range([0, width]); //dif
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg
    .axis()
    .scale(x)
    .orient('bottom')
    .ticks(10);

  let yAxis = d3.svg
    .axis()
    .scale(y)
    .orient('left')
    .ticks(10);

  let valueline = d3.svg
    .line()
    .x(function(d) {
      return x(d.cleaning_fee);
    })
    .y(function(d) {
      return y(d.review_scores_cleanliness);
    });
  let svg = d3
    .select('#q2Container_4')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv('./data/q2_4.csv', function(error, data) {
    if (error) {
      console.log(error);
      return;
    }
    data.forEach(function(d) {
      d.cleaning_fee = +d.cleaning_fee.slice(1);
      d.review_scores_cleanliness = +d.review_scores_cleanliness;
      d.id = +d.id;
    });

    // Scale the range of the data
    x.domain(
      d3.extent(data, function(d) {
        return d.cleaning_fee;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.review_scores_cleanliness;
      })
    ]);

    //Add the scatterplot
    let points = svg.selectAll('circle');
    let pointsData = points.data(data, d => d.id);
    let circles = pointsData
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {
        return x(d.cleaning_fee);
      })
      .attr('cy', function(d) {
        return y(d.review_scores_cleanliness);
      })
      .style('fill', function(d) {
        return 'blue';
      });

    circles.on('mouseover', function(d) {
      svg
        .append('text')
        .attr('x', x(d.cleaning_fee) + 10)
        .attr('y', y(d.review_scores_cleanliness) + 5)
        .text(d.cleaning_fee);
    });

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('class', 'label')
      .attr('x', width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('Cleaning Fee');

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Airbnb Cleanliness Rating');
  });
};

let render_q2_5 = () => {
  let margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  let x = d3.scale.linear().range([0, width]); //dif
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg
    .axis()
    .scale(x)
    .orient('bottom')
    .ticks(10);

  let yAxis = d3.svg
    .axis()
    .scale(y)
    .orient('left')
    .ticks(10);

  let valueline = d3.svg
    .line()
    .x(function(d) {
      return x(d.price_pp);
    })
    .y(function(d) {
      return y(d.review_scores_rating);
    });
  let svg = d3
    .select('#q2Container_5')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv('./data/q2_5.csv', function(error, data) {
    if (error) {
      console.log(error);
      return;
    }
    data.forEach(function(d) {
      d.price_pp = +(d.price.slice(1) / d.guests_included);

      d.review_scores_rating = +d.review_scores_rating;
      d.id = +d.id;
    });

    // Scale the range of the data
    x.domain(
      d3.extent(data, function(d) {
        return d.price_pp;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.review_scores_rating;
      })
    ]);

    //Add the scatterplot
    let points = svg.selectAll('circle');
    let pointsData = points.data(data, d => d.id);
    let circles = pointsData
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {
        return x(d.price_pp);
      })
      .attr('cy', function(d) {
        return y(d.review_scores_rating);
      })
      .style('fill', function(d) {
        return 'orange';
      });

    circles.on('mouseover', function(d) {
      svg
        .append('text')
        .attr('x', x(d.price_pp) + 10)
        .attr('y', y(d.review_scores_rating) + 5)
        .text(d.price_pp);
    });

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('class', 'label')
      .attr('x', width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('Price per Person');

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Airbnb Rating');
  });
};

let render_q2_6 = () => {
  let margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  let x = d3.scale.linear().range([0, width]); //dif
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg
    .axis()
    .scale(x)
    .orient('bottom')
    .ticks(10);

  let yAxis = d3.svg
    .axis()
    .scale(y)
    .orient('left')
    .ticks(10);

  let svg = d3
    .select('#q2Container_6')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv('./data/q2_6.csv', function(error, data) {
    if (error) {
      console.log(error);
      return;
    }
    data.forEach(function(d) {
      if (d.host_is_superhost === 't') {
        d.host_is_superhost = +1;
      } else {
        d.host_is_superhost = +0;
      }
      //d.host_is_superhost = d.host_is_superhost;
      //d.minimum_nights = +d.minimum_nights;
      d.review_scores_rating = +d.review_scores_rating;
      d.id = +d.id;
    });

    // Scale the range of the data
    x.domain(
      d3.extent(data, function(d) {
        return d.host_is_superhost;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.review_scores_rating;
      })
    ]);

    //Add the scatterplot
    let points = svg.selectAll('circle');
    let pointsData = points.data(data, d => d.id);
    let circles = pointsData
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {
        return x(d.host_is_superhost);
      })
      .attr('cy', function(d) {
        return y(d.review_scores_rating);
      })
      .style('fill', function(d) {
        return 'blue';
      });

    circles.on('mouseover', function(d) {
      svg
        .append('text')
        .attr('x', x(d.host_is_superhost) + 10)
        .attr('y', y(d.review_scores_rating) + 5)
        .text(d.host_is_superhost);
    });

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('class', 'label')
      .attr('x', width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('host_is_superhost');

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Airbnb Rating');
  });
};

//DOESN'T WORK due to incorrect d3 version -- figure out how to use both versions?
/*let render_q2_6 = () => {
  let margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  let x = d3.scale.ordinal().range([0, width]);
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg
    .axis()
    .scale(x)
    .orient('bottom');

  let yAxis = d3.svg
    .axis()
    .scale(y)
    .orient('left')
    .ticks(10);

  let svg = d3
    .select('#q2Container_4')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.tsv(
    './data/q2_6.tsv',
    function(d) {
      d.review_scores_rating = +d.review_scores_rating;
      return d;
    },
    function(error, data) {
      if (error) throw error;

      // Define Extent for each Dataset
      x.domain(
        data.map(function(d) {
          return d.host_is_superhost;
        })
      );
      y.domain([
        0,
        d3.max(data, function(d) {
          return d.review_scores_rating;
        })
      ]);

      // Add Axes
      // X AXIS
      svg
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(-16,' + height + ')')
        .call(xAxis);
      // Y AXIS
      svg
        .append('g')
        .attr('class', 'axis axis--y')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('review_scores_rating');

      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('class', 'bar')
        .attr('cx', function(d) {
          return x(d.host_is_superhost);
        })
        .attr('cy', function(d) {
          return y(d.review_scores_rating);
        })
        .style('fill', function(d) {
          return 'blue';
        });
      //       .attr("width", x.bandwidth())
      //       .attr("height", function(d) { return height - y(d.frequency); });
    }
  );
};*/

export {
  render_q2_response_rate,
  render_q2_2,
  render_q2_3,
  render_q2_4,
  render_q2_5,
  render_q2_6
};
