var pic1;
var pic2;
let plot = () => {
    d3.csv('./data/q2_1_c.csv', function(data) {
        data.forEach(function(d) {
            d.host_response_rate = +d.host_response_rate.slice(0, -1);
            d.review_scores_rating = +d.review_scores_rating;
            d.id = +d.id;
            d.neighbourhood = d.neighbourhood_cleansed;
        });
        plot_chart(data);
    });
    d3.csv('./data/q2_2_c.csv', function(data) {
        data.forEach(function(d) {
            d.minimum_nights = +d.minimum_nights;
            d.review_scores_rating = +d.review_scores_rating;
            d.id = +d.id;
            d.neighbourhood = d.neighbourhood_cleansed;
        });
        plot_chart2(data);
    });
};

let plot_chart2 = data => {
    pic2 = picasso.chart({
        element: document.querySelector('#picasso_container2'),
        data: [{
            type: 'matrix',
            data: data
        }],
        settings: {
            scales: {
                yy: {
                    data: {
                        field: 'review_scores_rating'
                    },
                    invert: true,
                    expand: 0.1
                },
                xx: {
                    data: {
                        field: 'minimum_nights'
                    },
                    expand: 0.1
                },
                col: {
                    data: { extract: { field: 'neighbourhood' } },
                    type: 'color'
                }
            },
            components: [{
                    type: 'legend-cat',
                    scale: 'col',
                    dock: 'right',
                    brush: {
                        trigger: [{
                            contexts: ['highlight'],
                            on: 'tap',
                            action: 'toggle'
                        }],
                        consume: [{
                            context: 'highlight',
                            style: {
                                inactive: {
                                    opacity: 0.4
                                }
                            }
                        }]
                    }
                },

                {
                    type: 'axis',
                    scale: 'yy',
                    dock: 'left'
                },
                {
                    type: 'axis',
                    scale: 'xx',
                    dock: 'bottom'
                },
                {
                    type: 'point',
                    data: {
                        extract: {
                            field: 'neighbourhood',
                            props: {
                                y: { field: 'review_scores_rating' },
                                mar: { field: 'minimum_nights' },
                                fill: { field: 'neighbourhood' }
                            }
                        }
                    },
                    settings: {
                        x: { scale: 'xx', ref: 'mar' },
                        y: { scale: 'yy' },
                        size: () => 0.05,
                        opacity: 0.9,
                        fill: { scale: 'col' }
                    },
                    brush: {
                        trigger: [{
                            contexts: ['highlight'],
                            on: 'tap',
                            action: 'toggle',
                            data: ['fill']
                        }],
                        consume: [{
                            context: 'highlight',
                            style: {
                                inactive: {
                                    opacity: 0
                                }
                            }
                        }]
                    }
                },
                {
                    type: 'text',
                    text: 'Rating',
                    anchor: 'center',
                    dock: 'left',
                    style: {
                        text: { fontSize: '16px' }

                    }
                },
                {
                    type: 'text',
                    text: 'Minimum nights',
                    anchor: 'center',
                    dock: 'bottom',
                    style: {
                        text: { fontSize: '16px' }

                    }
                },
                {
                    type: 'text',
                    text: 'Rating vs. Minimum Nights',
                    anchor: 'center',
                    dock: 'top',
                    style: {
                        text: { fontSize: '18px' }

                    }
                },
            ]
        }
    });
    pic1.brush('highlight').link(pic2.brush('highlight'));
    pic2.brush('highlight').link(pic1.brush('highlight'));
};

//#picasso_container  neighbourhood  review_scores_rating host_response_rate
let plot_chart = data => {
    pic1 = picasso.chart({
        element: document.querySelector('#picasso_container'),
        data: [{
            type: 'matrix',
            data: data
        }],
        settings: {
            scales: {
                yy: {
                    data: {
                        field: 'review_scores_rating'
                    },
                    invert: true,
                    expand: 0.1
                },
                xx: {
                    data: {
                        field: 'host_response_rate'
                    },
                    expand: 0.1
                },
                col: {
                    data: { extract: { field: 'neighbourhood' } },
                    type: 'color'
                }
            },
            components: [{
                    type: 'legend-cat',
                    scale: 'col',
                    dock: 'right',
                    brush: {
                        trigger: [{
                            contexts: ['highlight'],
                            on: 'tap',
                            action: 'toggle'
                        }],
                        consume: [{
                            context: 'highlight',
                            style: {
                                inactive: {
                                    opacity: 0.4
                                }
                            }
                        }]
                    }
                },
                {
                    type: 'axis',
                    scale: 'yy',
                    dock: 'left'
                },
                {
                    type: 'axis',
                    scale: 'xx',
                    dock: 'bottom'
                },
                {
                    type: 'point',
                    data: {
                        extract: {
                            field: 'neighbourhood',
                            props: {
                                y: { field: 'review_scores_rating' },
                                mar: { field: 'host_response_rate' },
                                fill: { field: 'neighbourhood' }
                            }
                        }
                    },
                    settings: {
                        x: { scale: 'xx', ref: 'mar' },
                        y: { scale: 'yy' },
                        size: () => 0.05,
                        opacity: 0.9,
                        fill: { scale: 'col' }
                    },
                    brush: {
                        trigger: [{
                            contexts: ['highlight'],
                            on: 'tap',
                            action: 'toggle',
                            data: ['fill']
                        }],
                        consume: [{
                            context: 'highlight',
                            style: {
                                inactive: {
                                    opacity: 0
                                }
                            }
                        }]
                    }
                },
                // {
                //     type: 'text',
                //     text: 'Rating',
                //     anchor: 'center',
                //     dock: 'left',
                //     style: {
                //         text: { fontSize: '16px' }

                //     }
                // },
                {
                    type: 'text',
                    text: 'Response rate',
                    anchor: 'center',
                    dock: 'bottom',
                    style: {
                        text: { fontSize: '16px' }

                    }
                },
                {
                    type: 'text',
                    text: 'Rating vs. Host Response Rate',
                    anchor: 'center',
                    dock: 'top',
                    style: {
                        text: { fontSize: '18px' }

                    }
                },
            ]
        }
    });
};

export { plot };

// let plot_chart = data => {
//   const pic = picasso.chart({
//     element: document.querySelector('#picasso_container'),
//     data: [
//       {
//         type: 'matrix',
//         data: data
//         // sort: (a, b) =>
//         //   a.review_scores_rating > b.review_scores_rating ? -1 : 1
//       }
//     ],
//     settings: {
//       scales: {
//         r: {
//           max: 100,
//           data: {
//             field: 'review_scores_rating'
//           },
//           expand: 0.2,
//           invert: true
//         },
//         h: {
//           data: {
//             field: 'host_response_rate'
//           },
//           expand: 0.1
//         },
//         col: {
//           data: { extract: { field: 'neighbourhood' } },
//           type: 'color'
//         }
//       },
//       components: [
//         {
//           key: 'y-axis',
//           type: 'axis',
//           scale: 'r',
//           dock: 'left'
//         },
//         {
//           type: 'legend-cat',
//           dock: 'right',
//           scale: 'col'
//         },
//         {
//           key: 'x-axis',
//           type: 'axis',
//           scale: 'h',
//           dock: 'bottom'
//         },
//         {
//           key: 'p',
//           type: 'point',
//           data: {
//             extract: {
//               field: 'neighbourhood',
//               props: {
//                 y: { field: 'review_scores_rating' },
//                 x: { field: 'host_response_rate' },
//                 group: { field: 'neighbourhood' }
//               }
//             }
//           },
//           settings: {
//             x: { scale: 'h' },
//             y: { scale: 'r' },
//             shape: 'circle',
//             size: () => 0.3,
//             strokeWidth: 2,
//             stroke: '#fff',
//             opacity: 0.8,
//             fill: { scale: 'col', ref: 'group' }
//           },
//           brush: {
//             trigger: [
//               {
//                 contexts: ['highlight'],
//                 on: 'tap',
//                 action: 'toggle',
//                 data: ['fill']
//               }
//             ],
//             consume: [
//               {
//                 context: 'highlight',
//                 style: {
//                   inactive: {
//                     opacity: 0.4
//                   }
//                 }
//               }
//             ]
//           }
//         }
//       ]

//       /*scales: {
//         x: { data: { field: 'host_response_rate' } },
//         y: { data: { field: 'review_scores_rating' } },
//         myScale: {
//           type: 'linear',
//           min: 0,
//           max: 100
//         }
//       },
//       components: [
//         {
//           // specify how to render the chart
//           type: 'axis',
//           scale: 'y',
//           layout: {
//             dock: 'left'
//           }
//         },
//         {
//           type: 'axis',
//           scale: 'x',
//           layout: {
//             dock: 'bottom'
//           }
//         },
//         {
//           type: 'point',
//           data: {
//             extract: {
//               field: 'neighbourhood',
//               props: {
//                 x: { field: 'host_response_rate' },
//                 y: { field: 'review_scores_rating' }
//               }
//             }
//           },
//           settings: {
//             x: {
//               scale: { data: { field: 'host_response_rate' } }
//             },
//             y: {
//               scale: { data: { extract: { field: 'review_scores_rating' } } }
//             },
//             fill: {
//               scale: {
//                 data: { extract: { field: 'neighbourhood' } },
//                 type: 'color'
//               },
//               ref: 'y'
//             },
//             opacity: 0.8,
//             size: () => Math.random(),
//             strokeWidth: 2,
//             stroke: '#fff'
//           }
//         }
//       ]*/
//       /*scales: {
//         y: {
//           type: 'linear',
//           min: 0.0,
//           max: 100.0,
//           data: {
//             field: 'review_scores_rating'
//           }
//           //invert: true,
//           //expand: 0.1
//         },
//         x: {
//           type: 'linear',
//           min: 0.0,
//           max: 100.0,
//           data: {
//             field: 'host_response_rate'
//           }
//           //expand: 0.1
//         },
//         col: {
//           data: { extract: { field: 'neighbourhood' } },
//           type: 'color'
//         }
//       },
//       components: [
//         {
//           type: 'legend-cat',
//           scale: 'col',
//           dock: 'top',
//           brush: {
//             trigger: [
//               {
//                 contexts: ['highlight'],
//                 on: 'tap',
//                 action: 'toggle'
//               }
//             ],
//             consume: [
//               {
//                 context: 'highlight',
//                 style: {
//                   inactive: {
//                     opacity: 0.4
//                   }
//                 }
//               }
//             ]
//           }
//         },
//         {
//           type: 'axis',
//           scale: 'y',
//           dock: 'left'
//         },
//         {
//           type: 'axis',
//           scale: 'x',
//           dock: 'bottom'
//         },
//         {
//           type: 'point',
//           data: {
//             extract: {
//               field: 'neighbourhood',
//               props: {
//                 y_i: { field: 'review_scores_rating' },
//                 x_i: { field: 'host_response_rate' },
//                 fill: { field: 'neighbourhood' }
//               }
//             }
//           },
//           settings: {
//             x: { scale: 'x', ref: 'x_i' },
//             y: { scale: 'y', ref: 'y_i' },
//             size: () => 0.3,
//             opacity: 0.8,
//             fill: { scale: 'col' }
//           },
//           brush: {
//             trigger: [
//               {
//                 contexts: ['highlight'],
//                 on: 'tap',
//                 action: 'toggle',
//                 data: ['fill']
//               }
//             ],
//             consume: [
//               {
//                 context: 'highlight',
//                 style: {
//                   inactive: {
//                     opacity: 0.4
//                   }
//                 }
//               }
//             ]
//           }
//         }
//       ]*/
//     }
//   });
//   const pic2 = picasso.chart({
//     element: document.querySelector('#picasso_container2'),
//     data: [
//       {
//         type: 'matrix',
//         data: [
//           ['Year', 'Month', 'Sales', 'Margin'],
//           ['2010', 'Jan', 1106, 7],
//           ['2010', 'Feb', 5444, 53],
//           ['2010', 'Mar', 147, 64],
//           ['2010', 'Apr', 7499, 47],
//           ['2010', 'May', 430, 62],
//           ['2010', 'June', 9735, 13],
//           ['2010', 'July', 7435, 15],
//           ['2011', 'Jan', 1482, 45],
//           ['2011', 'Feb', 2659, 76],
//           ['2011', 'Mar', 1261, 73],
//           ['2011', 'Apr', 3085, 56],
//           ['2011', 'May', 3035, 91],
//           ['2011', 'June', 7691, 88],
//           ['2011', 'July', 3012, 81],
//           ['2012', 'Jan', 7980, 61],
//           ['2012', 'Feb', 2564, 22],
//           ['2012', 'Mar', 7957, 98],
//           ['2012', 'Apr', 5809, 1],
//           ['2012', 'May', 429, 2],
//           ['2012', 'June', 6757, 77],
//           ['2012', 'July', 9415, 92]
//         ]
//       }
//     ],
//     settings: {
//       scales: {
//         s: {
//           data: {
//             field: 'Sales'
//           },
//           invert: true,
//           expand: 0.1
//         },
//         m: {
//           data: {
//             field: 'Margin'
//           },
//           expand: 0.1
//         },
//         col: {
//           data: { extract: { field: 'Year' } },
//           type: 'color'
//         }
//       },
//       components: [
//         {
//           type: 'legend-cat',
//           scale: 'col',
//           dock: 'top',
//           brush: {
//             trigger: [
//               {
//                 contexts: ['highlight'],
//                 on: 'tap',
//                 action: 'toggle'
//               }
//             ],
//             consume: [
//               {
//                 context: 'highlight',
//                 style: {
//                   inactive: {
//                     opacity: 0.4
//                   }
//                 }
//               }
//             ]
//           }
//         },
//         {
//           type: 'axis',
//           scale: 's',
//           dock: 'left'
//         },
//         {
//           type: 'axis',
//           scale: 'm',
//           dock: 'bottom'
//         },
//         {
//           type: 'point',
//           data: {
//             extract: {
//               field: 'Month',
//               props: {
//                 y: { field: 'Sales' },
//                 mar: { field: 'Margin' },
//                 fill: { field: 'Year' }
//               }
//             }
//           },
//           settings: {
//             x: { scale: 'm', ref: 'mar' },
//             y: { scale: 's' },
//             size: () => Math.random(),
//             opacity: 0.8,
//             fill: { scale: 'col' }
//           },
//           brush: {
//             trigger: [
//               {
//                 contexts: ['highlight'],
//                 on: 'tap',
//                 action: 'toggle',
//                 data: ['fill']
//               }
//             ],
//             consume: [
//               {
//                 context: 'highlight',
//                 style: {
//                   inactive: {
//                     opacity: 0.4
//                   }
//                 }
//               }
//             ]
//           }
//         }
//       ]
//     }
//   });
//   //pic.brush('highlight');
//   //pic.brush('select').link(pic2.brush('highlight'));
// };